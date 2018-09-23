<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!x
|
*/

Route::group(['prefix' => 'category', 'middleware' => 'auth:api'], function() {
	Route::get('/', 'CategoryController@index');
	Route::get('/{category}', 'CategoryController@getCategory');
});
Route::group(['prefix' => 'customer', 'middleware' => ['auth:api', 'cors']], function() {
	Route::get('/{token}', 'CustomerController@getCustomer');
	Route::post('/login', 'CustomerController@authenticate');
	Route::get('/check/{token}', 'CustomerController@checkToken');
});
Route::group(['prefix' => 'order', 'middleware' => ['auth:api', 'cors']], function() {
	Route::get('/{token}', 'OrderController@getOrders');
	Route::post('/', 'OrderController@makeOrder');
});
Route::group(['prefix' => 'product', 'middleware' => 'auth:api'], function() {
	Route::get('/{id}', 'ProductController@getProduct')->where('id', '[0-9]+');
	Route::get('/category/{category}', 'ProductController@getProductsFromCategory');
	Route::get('/search/{q}', 'ProductController@search');
});
Route::group(['middleware' => ['cors', 'auth:api']], function() {
   Route::post('/cart','CartController@insertItem' );
   Route::get('/cart/items/{token}', 'CartController@getItems');
   Route::post('/cart/item/remove','CartController@removeItem');
});
