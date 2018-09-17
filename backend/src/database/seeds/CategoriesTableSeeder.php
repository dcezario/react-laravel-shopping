<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['Decoração', 'Iluminação', 'Móveis', 'Infantil', 'Lazer'];
        foreach ($categories as $category) {
        	DB::table('categories')->insert([
        		'name' => $category
        	]);
        }
    }
}
