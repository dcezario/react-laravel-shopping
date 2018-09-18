<?php

use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Product::class, 200)->create()->each(function($product) {
        	$product->categories()->sync(App\Category::all()->random(3));
        	$product->attributes()->sync(App\AttributeValue::all()->random(1));
        });
    }
}
