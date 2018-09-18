<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

use App\Category;

class CategoryController extends Controller
{
	/**
	 * List all available categories
	 * @return categories
	 */
    public function index()
    {
    	if (!Cache::has('categories')) {
    		$categories = Category::all();
    		$minutes = now()->addMinutes(60);
    		Cache::add('categories', $categories, $minutes);
    	}
    	return response(Cache::get('categories'));
    }
    public function getCategory(Category $category)
    {
    	if (!Cache::has('category:'.$category->id)) {
    		$minutes = now()->addMinutes(60);
    		Cache::add('category:'.$category->id, $category, $minutes);
    	}
    	return response(Cache::get('category:'.$category->id));
    }
}
