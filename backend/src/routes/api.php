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
Route::group(['prefix' => 'customer', 'middleware' => 'auth:api'], function() {
	Route::get('/{customer}', 'CustomerController@getCustomer');
});
Route::group(['prefix' => 'product', 'middleware' => 'auth:api'], function() {
	Route::get('/{id}', 'ProductController@getProduct')->where('id', '[0-9]+');
	Route::get('/category/{category}', 'ProductController@getProductsFromCategory');
});
Route::group(['prefix' => 'cart', 'middleware' => 'auth:api'], function() {
	Route::get('/', 'CartController@index');
	Route::post('/', 'CartController@insertItem');
	Route::post('/remove/item', 'CartController@removeItem');
});