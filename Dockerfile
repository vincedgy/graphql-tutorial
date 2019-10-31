FROM node:lts-alpine

WORKDIR /usr/src
COPY . .

RUN npm install
RUN npm run build

EXPOSE 4000
CMD [ "node", "dist-prod/bundle.js" ]

HEALTHCHECK --interval=10s --timeout=2s --start-period=15s \
  CMD ["node","healthcheck.js"]
