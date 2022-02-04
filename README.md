
# Hello Kate!
Hello Kate is a simple cluster test application for Kubernetes. It displays basic information about the node/pod that served the webpage, and also sends the time continuously over a websocket.

## Features

- WebSockets
- Healthcheck endpoint
- Attempts to stay alive through SIGTERM while there are active websocket connections
- Uses a database backend to also test persistant storage

## Installation
Installation is done via Helm.

```
helm install --create-namespace --namespace hello-kate-app hello-kate ./helm/
```

## Environment flags
- `basepath`: basepath to prepend to all endpoints

## Developing

**Requirements**
- jq
- node
- docker
- typescript

**Updating the version**
For simplicity, the `set-version.sh` script updates version tags where necessary.
```
./set-verison.sh 1.3.0
```

**To start a build**
```
make build-image
```

**To push the build (update the repository first in the makefile)**
```
make push-image
```

**To test locally**
From the `dev-env` directory, run `docker-compose up` and access the site via http://localhost:8080

## Credits/Thanks to

[Johan Hernefeldt](https://github.com/presidenten) for being amazing and making what was essentially version 1 of this and what still comprises the majority of the source code.

## License

[MIT](https://choosealicense.com/licenses/mit/)
