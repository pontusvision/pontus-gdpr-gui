FROM node as builder

WORKDIR /

COPY package.json package-lock.json /pontus-gdpr-gui/

WORKDIR /pontus-gdpr-gui
RUN  npm install

#RUN  mkdir /pontus-gdpr-gui && \
     #cd /pontus-gdpr-gui

COPY . /pontus-gdpr-gui/
#RUN  git clone  --depth 1    --single-branch   --branch master https://github.com/pontusvision/pontus-gdpr-gui.git && \

COPY --from=pontusvisiongdpr/pontus-i18n:latest /*.json  /pontus-gdpr-gui/src/
#RUN  cd /pontus-gdpr-gui && \
#     mv ../node_modules . && \
RUN   ./build-local.sh


FROM scratch
#RUN mkdir -p /opt/pontus/pontus-gui-gdpr
COPY --from=builder /pontus-gdpr-gui/build /opt/pontus/pontus-gui-gdpr/lib

