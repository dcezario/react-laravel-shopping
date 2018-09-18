#!/bin/bash

mkdir /var/www/html/storage
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/framework/views

chmod 777 /var/www/html/storage -R

if [ ! -f /var/www/html/.env ]; then
	cp /var/www/html/.env.example /var/www/html/.env
fi;

cd /var/www/html/ && composer install