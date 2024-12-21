#!/bin/bash

docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 boxfish
