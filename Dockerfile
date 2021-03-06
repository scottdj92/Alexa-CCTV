FROM nginx
MAINTAINER Scott Jones <scottdj92@gmail.com>

RUN apt-get update
RUN apt-get install -y vim
# RUN apt-get install gstreamer1.0*
RUN npm install
RUN npm run build-css

COPY . /usr/share/nginx/html
WORKDIR .
