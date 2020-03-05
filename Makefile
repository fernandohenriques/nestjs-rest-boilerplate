variables ?= ./.env
args = $(filter-out $@,$(MAKECMDGOALS))

include $(variables)
export $(shell sed 's/=.*//' $(variables))

build:
	docker build \
    -f ./docker/Dockerfile \
    -t $(APP_NAME) \
    --build-arg NODE_ENV=$(NODE_ENV) \
    --build-arg PORT=$(PORT) \
    .

stop:
	docker stop $(POSTGRES_HOST) || true; docker rm $(POSTGRES_HOST) || true
	docker stop $(APP_NAME) || true; docker rm $(APP_NAME) || true

test: stop build
	docker run -d -it \
    --name $(POSTGRES_HOST) \
    -e "POSTGRES_DB=$(POSTGRES_DB)" \
    -e "POSTGRES_USER=$(POSTGRES_USER)" \
    -e "POSTGRES_PASSWORD=$(POSTGRES_PASSWORD)" \
    -p $(POSTGRES_PORT):$(POSTGRES_PORT) \
    postgres:latest
	docker run -i -t \
    --env-file $(variables) \
		--user node \
    --link $(POSTGRES_HOST):$(POSTGRES_HOST) \
    $(APP_NAME) \
    /bin/sh -c "yarn migration:run && yarn test && yarn test:e2e"

# DEVELOPMENT TASKS
install:
	yarn add $(args)
	docker exec -it $(APP_NAME) yarn add $(args)

uninstall:
	yarn remove $(args)
	docker exec -it $(APP_NAME) yarn remove $(args)
