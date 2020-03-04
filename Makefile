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
	npm install $(args) --save
	docker exec -it app npm install $(args) --save

uninstall:
	npm uninstall $(args) --save
	docker exec -it app npm uninstall $(args) --save
