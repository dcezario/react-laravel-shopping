#Inicindo o backend#

Primeiramente, fazemos o build de nossos containers:

```docker-compose up```

Apos o build ser finalizado, verificamos se todos os containers subiram:
``` sudo docker ps```
Na listagem acima, devemos visualizar os seguintes servicos:

* backend_app (php e apache)
* db (mysql)
* cache (redis)
* elastic (Elasticsearch)

Se houver algum problema no container do Elasticsearch relacionado ao *vp_max_map_count*, ele pode ser corrigido com o codigo abaixo ([referencia:](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)):
```
sysctl -w vp_max_map_count=262144
```

Com todos os containers rodando, precisamos realizar as configuracoes iniciais do laravel

Acesse o container:
```
sudo docker exec -it backend_app /bin/bash
```
De as permissoes para a pasta de storage
```
chmod 777 storage -R
```
Gere a chave da aplicacao
```
php artisan key:generate
```