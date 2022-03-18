
# Hello Kate!
Hello Kate is a simple cluster test application for Kubernetes. It displays basic information about the node/pod that served the webpage, and also sends the time continuously over a websocket.

## Features

- WebSockets
- Healthcheck endpoint
- Attempts to stay alive through SIGTERM while there are active websocket connections
- Uses a database backend to also test persistant storage

## Installation
Installation is done via Helm.

**From repo**
```
helm repo add hello-kate https://cmdrsharp.github.io/hello-kate

helm install hello-kate hello-kate/hello-kate \
	--set mongodb.persistence.storageClass=your-storageclass-name
```

**From source**
```
git clone https://github.com/CmdrSharp/hello-kate.git
helm install hello-kate ./hello-kate/helm/ \
	--set mongodb.persistence.storageClass=your-storageclass-name
```

The default path after installation is http://loadbalancer-ip/
To get the assigned LB IP: `kubectl get svc hello-kate`

## Environment flags
- `basepath`: basepath to prepend to all endpoints

## Deploying with an ingress
Hello Kate has support for deploying with an ingress.

**Deploying with any ingress**
This assumes you're defining the ingress yourself.

```
helm install hello-kate hello-kate/hello-kate \
	--set mongodb.persistence.storageClass=your-storageclass-name \
	--set service.type=ClusterIP \
	--set ingress.enabled=true
```

**Deploying with Istio Ingress**
The Istio Ingress values allow you to have the deployment create a gateway, and a Virtual Service. Please refer to [values.yaml](templates/values.yaml) for a full list of values to set.

```
helm install hello-kate hello-kate/hello-kate \
	--set mongodb.persistence.storageClass=your-storageclass-name \
	--set service.type=ClusterIP \
	--set ingress.enabled=true \
	--set ingress.istio.gateway.deploy=true \
	--set ingress.istio.virtualservice.deploy=true
```

When deploying with an ingress, the basepath is /hello-kate by default, meaning the application is accessed via http://ingress-ip/hello-kate

This can be overridden either using environment variables, or by modifying the `ingress.routing.basepath` value.

## Developing

**Requirements**
- jq
- node
- docker
- typescript

**Updating the version**
For simplicity, the `set-version.sh` script updates version tags where necessary.
```
./set-version.sh 1.3.1
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
