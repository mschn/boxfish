#!/bin/sh

# Default linux sock address
SOCK="/var/run/docker.sock"

# Windows Cygwin with docker desktop
if echo "$(uname -s)" | grep "MINGW"; then
    SOCK="//var/run/docker.sock"  
fi

# for MacOS colima, using ~/.colima/default/docker.sock doesnt work
# better to create a symlink to /var/run/docker.sock

TAG=$(cat version.txt)

docker run -d \
    --rm \
    --name boxfish \
    -p 3000:3000 \
    -v ${SOCK}:/var/run/docker.sock \
    mschnr/boxfish:${TAG}
