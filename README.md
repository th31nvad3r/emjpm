# eMJPM

[![Build Status](https://travis-ci.com/SocialGouv/emjpm.svg?branch=master)](https://travis-ci.com/SocialGouv/emjpm?branch=master)


## Fiche technique du projet

[Fiche technique du projet](./tech.md)

## Getting started


### Dependencies
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [nodejs >= 15](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
- [lerna](https://github.com/lerna/lerna)

### Install all the packages
```sh
yarn
```
This will trigger some build on the `postinstall` script:
```sh
husky install
lerna link
```

### Development

run docker-compose services db, hasura, maildev, api
launch hasura console
run react-scripts start
```
yarn dev
```

### Logs containers

```sh
yarn dev:server:log
```

### Stop
to stop current react dev console:
press `CTRL+C` in current terminal

to stop current containers:
```sh
docker-compose down
```

### Cleaning
to remove installed packages
```sh
rm -rf node_modules
rm -rf packages/app/node_modules
rm -rf packages/api/node_modules
```

to remove db
```sh
docker volume rm emjpm_emjpm-pgdata
```

### Test production build
this work without any previous install
```sh
yarn dev:prod
```

to rely on local installation (gitlab-ci emulation):
```sh
export BUILD_ENV=usecache
yarn dev:prod
```

## Database

### Restaurer un dump

default path for dump is dump/db.dump
```bash
yarn dev:restore_dump [my-path-to-emjpm.dump]
```

## Test

[Fonctionnement des tests](./test/md)

## Release policy

### Semantic releases

[On a successful `master` branch pipeline click on trigger the `Release` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines)

To increase production deployment and avoid to run two pipeline,
You can trigger release locally using `yarn release` script.
You have to provide a github token by providing `GH_TOKEN` env var,
or put your token in untracked `.gh-token` file at root path of the projet.
```sh
yarn release
```

### Deploy from local build (fast and furious)
You have to provide a K8S credentials by providing `KUBECONFIG` env var,
or put your token in untracked `.kubeconfig` file at root path of the projet.
And providing untracked `.env.deploy` with variables viewable in `.env.deploy.sample`
requirements:
- docker@^19.03
- bash@^4
- git@^2
- kubectl@^1.19
```sh
yarn deploy:fast
```
*With great power there must also come great responsibility*

## Deployment policy

All branches and tags are automatically deployed
See https://github.com/SocialGouv/emjpm/deployments


- **Development** : https://master.emjpm.dev.fabrique.social.gouv.fr/
- **Prod Mirror** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
- **Pre Prod** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
- **Prod** : https://emjpm.fabrique.social.gouv.fr

New releases are deployed on production when pipeline end with success

## Branch name

You need to name your branch with the commit lint convention

branch name template:

```
type/***-***
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

as a reference see https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular
