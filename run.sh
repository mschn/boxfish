#!/bin/bash

# Default linux sock address
SOCK="/var/run/docker.sock"

# Windows Cygwin with docker desktop
if [ $(uname -s) == MINGW* ]; then
    SOCK="//var/run/docker.sock"  
fi

# Mac OS colima
if [ -e "~/.colima/docker.sock" ]; then
    SOCK="~/.colima/docker.sock"
fi

docker run -d \
    --rm \
    --name boxfish \
    -p 3000:3000 \
    -v ${SOCK}:/var/run/docker.sock \
    mschnr/boxfish:latest
