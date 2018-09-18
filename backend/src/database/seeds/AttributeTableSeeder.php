<?php

use Illuminate\Database\Seeder;

class AttributeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		factory(App\Attribute::class)->create(['name' => 'cor'])->each(function($customer) {
			$customer->attributeValues()->save(factory(App\AttributeValue::class)->make());
		});
    }
}
