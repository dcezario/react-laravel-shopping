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

$factory->define(App\Address::class, function (Faker $faker) {
    return [
        'phone' => $faker->tollFreePhoneNumber,
        'address' => $faker->address,
        'complement' => '',
        'region'	=> $faker->word,
        'city'  => $faker->city,
        'state' => $faker->state,
        'zipcode' => $faker->postcode,
    ];
});
