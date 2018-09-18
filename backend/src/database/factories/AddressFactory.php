<?php

use Faker\Generator as Faker;
use Faker\Provider\pt_BR\Address;
use Faker\Provider\pt_BR\PhoneNumber;
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
	$faker->addProvider(new Address($faker));
	$faker->addProvider(new PhoneNumber($faker));
    return [
        'phone' => $faker->phone,
        'address' => $faker->address,
        'complement' => '',
        'region'	=> $faker->word,
        'city'  => $faker->city,
        'state' => $faker->stateAbbr,
        'zipcode' => $faker->postcode,
    ];
});
