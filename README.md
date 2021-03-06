# Iniciando o backend #

Acesse o diretório do backend.

No arquivo docker-compose.yml, insira uma senha para o seu banco de dados:

```MYSQL_ROOT_PASSWORD: sua_senha_do_bd```

Então, fazemos o build de nossos containers:

```docker-compose up```

Apos o build ser finalizado, verificamos se todos os containers subiram:
``` sudo docker ps```
Na listagem acima, devemos visualizar os seguintes servicos:

* backend_app (php e apache)
* db (mysql)
* cache (redis)
* elastic (Elasticsearch)
* adminer

Se houver algum problema no container do Elasticsearch relacionado ao *vp_max_map_count*, ele pode ser corrigido com o código abaixo ([referencia](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)):
```
sysctl -w vm.max_map_count=262144
```
Aguarde até a mensagem de confirmação no terminal informando que nosso servidor web está disponível.

```
Laravel development server started: <http://0.0.0.0:8081>
```

Com todos os containers rodando, precisamos realizar as configuraçẽs iniciais do laravel:
```
sudo docker exec -it backend_app /bin/bash
php artisan migrate --seed
php artisan passport:install
```
Após o comando acima, copie o token gerado para o **client 2** (usaremos no frontend)

Alimente os índices do Elasticsearch:

```
php artisan tinker
Product::createIndex($shards = null, $replicas = null);

Product::putMapping($ignoreConflicts = true);

Product::addAllToIndex();
```

# Iniciando o frontend #

Acesse o diretório do frontend.

Suba os containers:

```docker-compose up```

Acesse o arquivo abaixo e insira o token que copiamos:

```
/frontend/app/src/layout/Root.js
```
Linha 136 

# Endereço dos serviços #

Adminer: 
```http://localhost:8282```

Backend:
```http://localhost:8081```

Frontend:
```http://localhost:3000```

Elasticsearch:
```http://localhost:9200```
