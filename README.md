## Implementación de NestJS

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instalación

```bash
$ npm install
```

## Ejecutar

```bash
# defaults
$ cp dotenv .env

# iniciar servicio de mysql (docker)
./docker-mysql.sh

# iniciar en development
$ npm run start

# iniciar en modo watch
$ npm run start:dev

# iniciar en producción
$ npm run start:prod
```

## Pruebas

```bash
# unitarias
$ npm run test

# de integración
$ npm run test:e2e

# test coverage
$ npm run test:cov
```