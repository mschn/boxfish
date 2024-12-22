#!/bin/bash

SOCK="/var/run/docker.sock"

if [ -e "~/.colima/docker.sock" ]; then
    SOCK="~/.colima/docker.sock"
fi

docker run -d \
    -v ${SOCK}:/var/run/docker.sock \
    -p 3000:3000 boxfish

