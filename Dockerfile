############################################################
# https://github.com/Kriegslustig/Docker-Meteorbase
#
# mkdir -p <host directory>/db
# docker run --restart=always -d --name mongo_<name of your app> -v <host directory>:/data mongo
#
# # In your projects directory do:
# demeteorizer
# docker build -t <app name> .
# docker run -dp <host port>:80 --link db_<app name>:mongo --name <app name> --restart=always <app name>
#
# *For further documentation refer to https://github.com/Kriegslustig/Docker-Meteorbase/blob/master/README.md*
#
# Based on centos:7
############################################################

FROM centos:7
MAINTAINER Kriegslustig

# yum (Yellowdog Updater, Modified)
#   A package-manager
#   epel-release (Enterprise Linux) Makes "not so free" Packages availible.
#     It is required to install npm (Node Package Manager) which includes nodejs
#   make
#     Some node modules require to be built on the Machine it will be running on
RUN yum update
RUN yum install -y gcc gcc-c++ make tar imagemagick
RUN curl http://nodejs.org/dist/v0.12.0/node-v0.12.0.tar.gz | tar xz && cd node-v0.12.0 && ./configure && make && make install

# ADD
#   This COPIES  everything from the `.demeteorizer` directory to `/var/app` inside the container
#   Note that it copies these files and doesn't just link them.
#   Hence if you make changes in the directory on the host, the container won't be changed
#   You'll have to rebuild it, for them to take effect
ADD ./.demeteorized /var/app

# All commands should be executed relative to this dir
WORKDIR /var/app

# This environment-variable is required to be set by demeteorizer.
ENV ROOT_URL='http://inventory-keeper.kriegslustig.me'
# This is also required and sets the port the app will be running on (inside the container).
ENV PORT=80

# This installs all dependecies defined in ./demeteorized/package.json
RUN npm install

# This publishes port 80 and makes it available for forwarding
EXPOSE 80

# export
#   sets the env-var `MONGO_URL` to match the linked mongo container
#     It can only be done after the container was linked and the used env-vars are available
#     This is why it runs when you don't define a command
# node
#   executes the generated `main.js`
CMD export MONGO_URL="mongodb://${MONGO_PORT_27017_TCP_ADDR}:${MONGO_PORT_27017_TCP_PORT}${MONGO_NAME}"; node main.js