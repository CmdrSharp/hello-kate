#!/bin/bash

COLOR_OFF='\033[0m'
CYAN='\033[0;36m'

echo -e ""

if [[ -z $1 ]] ; then
  echo -e "Usage:"
  echo -e " $CYAN $0 <version>$COLOR_OFF"
  echo -e ""
  echo -e "Examples:"
  echo -e " $CYAN $0 1.0.4 $COLOR_OFF"
else
  sed -r -i "s|(image: hello-kate:).+|\1$1|" dev-env/docker-compose.yaml

  sed -r -i "s|(\"version\": ).+|\1\"$1\",|" src/package.json

  sed -r -i "s|^(version: ).+|\1$1|" helm/Chart.yaml
  sed -r -i "s|^(appVersion: ).+|\1$1|" helm/Chart.yaml
fi
