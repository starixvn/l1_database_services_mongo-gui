# Definindo a imagem base
FROM hub.lumigame.com/base/node:20.9.0-alpine

COPY . /app

WORKDIR /app

RUN npm install

# HEALTHCHECK --interval=10s CMD curl --fail http://localhost:4321 || exit 1

ENTRYPOINT ["sh","/app/entrypoint.sh"]