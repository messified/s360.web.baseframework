# Builds a Docker to deliver dist/
FROM dtr.stationddc.com/stationcasinos/s360.web.imagebase
COPY ./dist /var/www/app/current/public
COPY ./app.json /var/www/app/current/app.json