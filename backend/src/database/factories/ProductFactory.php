<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Product::class, function (Faker $faker) {
    return [
        'name' 		  => 'Produto ' . $faker->word,
        'description' => $faker->text,
        'price' 	  => $faker->randomFloat(2, 1, 10),
        'picture' 	  => 'https://semantic-ui.com/images/wireframe/image.png'
    ];
});
