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
	Route::get('/{id}', 'CategoryController@getCategory')->where('id', '[0-9]+');
});
