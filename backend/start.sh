#!/bin/bash

mkdir /var/www/html/storage
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/framework/views

chmod 777 /var/www/html/storage -R
cd /var/www/html/ && composer install

if [ ! -f .env ]; then
	cp .env.example .env
	source .env
	php artisan key:generate
fi;

php artisan serve --host=0.0.0.0 --port=8081