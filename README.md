# Alexa-CCTV
A camera feed using hls.js

## Docker setup
1.  Run `docker build -t alexa-nginx .` to create an image from the Dockerfile.

2.  Run `docker run -d -p 127.0.0.1:1337:80 --name alexa-server -t alexa-nginx` to bind localhost:1337 to the container's port 80, name it `alexa-server` while using the `alexa-nginx` image, and finally to turn the daemon on.

3.  Development.

## Steps to recreate
1.  First, set up your docker image. I used Nginx, which supports RTMP and HTTP requests.

2.  Mount your local volume to the docker instance and make sure nginx is configired to serve `index.html` as the root. This will also solve any port issues.

3.  Do dev work.

4.  The local code will need to be updated using the `cp <localfile.txt> <container>:<remotefile.txt>` command.

#### Development workflow
1.  Do your code as normal in the HTML/Sass/js files.

2.  run `npm run build-css` to export your Sass to CSS.

3.  Copy over your files to the Docker instance to see your changes.

#### Issues

Doing live file syncing with Docker is currently impossible due to a [wontfix in virtualbox](https://www.virtualbox.org/ticket/10660) so we'll have to manually copy over our files to the Docker instance
