FROM nginx

COPY . /usr/share/nginx/html
WORKDIR .

EXPOSE 80
