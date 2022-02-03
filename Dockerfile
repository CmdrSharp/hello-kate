FROM node:14.19-alpine3.15

ARG PROXY=''

ENV http_proxy ${PROXY}
ENV https_proxy ${PROXY}

ENV mongodb ''

COPY src /app

WORKDIR /app

RUN npm i && \
    addgroup -S -g 1001 user && \
    adduser -S -u 1001 -G user user && \
    chown user:user /app && \
    chown -R user:user /app

EXPOSE 8080

CMD ["npm", "start"]