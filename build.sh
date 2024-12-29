#!/bin/bash

docker build --no-cache . \
    -t mschnr/boxfish:latest \
    --force-rm
