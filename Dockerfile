FROM nginx
MAINTAINER Scott Jones <scottdj92@gmail.com>

RUN apt-get update
RUN apt-get install -y vim

COPY . /usr/share/nginx/html
WORKDIR .
