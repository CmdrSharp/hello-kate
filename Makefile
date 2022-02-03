REGISTRY ?= docker.io
REPOSITORY ?= cmdrsharp
NAME ?= hello-kate
VERSION ?= $(shell cat src/package.json | jq -r .version)
IMAGE = $(REGISTRY)/$(REPOSITORY)/$(NAME)

.PHONY: build-image
build-image:
	(cd src; npm run build); \
	DOCKER_BUILDKIT=1 docker image build --no-cache \
		-t ${NAME}:${VERSION} \
		--build-arg PROXY=${PROXY} \
		.

.PHONY: push-image
push-image:
	docker image tag ${NAME}:${VERSION} $(IMAGE):${VERSION}; \
	docker push $(IMAGE):$(VERSION)