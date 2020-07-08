#!/bin/bash

#funcion para obtener valores de .env
read_var() {
  if [ -z "$1" ]; then
    echo "environment variable name is required"
    return
  fi

  local ENV_FILE='.env'
  if [ ! -z "$2" ]; then
    ENV_FILE="$2"
  fi

  local VAR
  VAR=$(grep $1 "$ENV_FILE" | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  echo ${VAR[1]}
}

#obtener valores de .env
MYSQL_DB=$(read_var MYSQL_DB .env)
MYSQL_PORT=$(read_var MYSQL_PORT .env)
MYSQL_PASSWORD=$(read_var MYSQL_PASSWORD .env)
MYSQL_ROOT_PASSWORD=$(read_var MYSQL_ROOT_PASSWORD .env)
MYSQL_USER=$(read_var MYSQL_USER .env)

MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-defaultRootPassword}

echo "Iniciando instancia de MySQL..."
mkdir -p $PWD/mysql/datadir
docker run --user="$(id -u):$(id -g)" \
  --env "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD" \
  --env "MYSQL_PASSWORD=$MYSQL_PASSWORD" \
  --env "MYSQL_USER=$MYSQL_USER" \
  --env "MYSQL_DATABASE=$MYSQL_DB" \
  --rm \
  -d \
  -p 127.0.0.1:$MYSQL_PORT:3306 \
  --mount type=bind,src=$PWD/mysql/my.cnf,dst=/etc/my.cnf \
  --mount type=bind,src=$PWD/mysql/datadir,dst=/var/lib/mysql \
  --name mysql_nestjs mysql

mysql_ip=`docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" mysql_nestjs`;
echo "MySQL docker ip: $mysql_ip"
docker ps