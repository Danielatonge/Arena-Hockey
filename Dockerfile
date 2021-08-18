ARG APP_HOME="/usr/share/nginx/html"
ARG NGINX_CONF_HOME="/usr/share/nginx/conf"

FROM node:16-alpine as dependency-image

WORKDIR /build

COPY ./package.json ./package-lock.json ./
RUN apk add --update python2 make
RUN npm ci


FROM dependency-image as compile-image

WORKDIR /build

COPY ./public ./public
COPY ./src  ./src
COPY \
    ./.browserslistrc \
    ./.eslintrc.js \
    ./package.json \
    ./server.js \
    ./static.json \
    ./vue.config.js \
    ./
RUN npm run build


FROM nginx:1.21-alpine as runtime-image
ARG APP_HOME
ARG NGINX_CONF_HOME

ENV APP_HOME=${APP_HOME}
ENV NGINX_CONF_HOME=${NGINX_CONF_HOME}

RUN mkdir -p ${NGINX_CONF_HOME} && \
    mkdir -p ${APP_HOME} && \
    \
    rm -rf ${NGINX_CONF_HOME:?}/* && \
    rm -rf ${APP_HOME:?}/*

COPY ./nginx.conf ${NGINX_CONF_HOME}/nginx.conf
COPY --from=compile-image /build/dist ${APP_HOME}

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh && \
    ln -s /usr/local/bin/docker-entrypoint.sh /

WORKDIR ${APP_HOME}
EXPOSE 8080

STOPSIGNAL SIGQUIT

ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD [ "app" ]