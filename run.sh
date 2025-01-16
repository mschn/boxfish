#!/bin/sh

# Default linux sock address
SOCK="/var/run/docker.sock"

# Windows Cygwin with docker desktop
if echo "$(uname -s)" | grep "MINGW"; then
    SOCK="//var/run/docker.sock"  
fi

# Mac OS colima
if [ -e "${HOME}/.colima/docker.sock" ]; then
    SOCK="${HOME}/.colima/docker.sock"
fi

docker run -d \
    --rm \
    --name boxfish \
    -p 3000:3000 \
    -v ${SOCK}:/var/run/docker.sock \
    mschnr/boxfish:latest
