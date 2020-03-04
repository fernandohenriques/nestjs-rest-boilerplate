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

test: build
	docker run -d -i \
    --env-file $(variables) \
    $(APP_NAME) \
    /bin/sh -c "npm run test"

# DEVELOPMENT TASKS
install:
	yarn add $(args)
	docker exec -it $(APP_NAME) yarn add $(args)

uninstall:
	yarn remove $(args)
	docker exec -it $(APP_NAME) yarn remove $(args)
