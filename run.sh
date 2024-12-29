#!/bin/bash

SOCK="/var/run/docker.sock"

if [ -e "~/.colima/docker.sock" ]; then
    SOCK="~/.colima/docker.sock"
fi

docker run -d \
    --rm \
    --name boxfish \
    -p 3000:3000 \
    -v ${SOCK}:/var/run/docker.sock \
    mschnr/boxfish:latest
