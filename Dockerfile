FROM node as builder
WORKDIR /

COPY package.json package-lock.json /

RUN  npm install

RUN  git clone  --depth 1    --single-branch   --branch master https://github.com/pontusvision/pontus-gdpr-gui.git && \
     cd pontus-gdpr-gui && \
     mv ../node_modules . && \
     ./build-local.sh


FROM scratch
#RUN mkdir -p /opt/pontus/pontus-gui-gdpr
COPY --from=builder /pontus-gdpr-gui/build /opt/pontus/pontus-gui-gdpr/lib
