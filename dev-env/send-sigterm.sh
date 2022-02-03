#!/bin/bash

docker stop $(docker ps | grep hello-kate | grep -Po '^...') --time 360