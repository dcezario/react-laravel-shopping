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
    public function getCategory(Request $request)
    {
    	if (!Cache::has('category:'.$request->id)) {
    		$category = Category::find($request->id);
    		$minutes = now()->addMinutes(60);
    		Cache::add('category:'.$request->id, $category, $minutes);
    	}
    	return response(Cache::get('category:'.$request->id));
    }
}
