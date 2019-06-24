FROM node as builder
WORKDIR /

RUN  git clone  --depth 1    --single-branch   --branch master https://github.com/pontusvision/pontus-gdpr-gui.git && \
     cd pontus-gdpr-gui && \
     ./build-local.sh


FROM alpine
RUN mkdir -p /opt/pontus/pontus-gui-gdpr
COPY --from=builder /pontus-gdpr-gui/build /opt/pontus/pontus-gui-gdpr/lib

