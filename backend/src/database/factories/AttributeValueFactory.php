<?php

use Faker\Generator as Faker;
use Faker\Provider\Color;
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

$factory->define(App\AttributeValue::class, function (Faker $faker) {
	$faker->addProvider(new Color($faker));
    return [
        'value' => $faker->colorName,
    ];
});
