<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Cache;

use App\Product;
use App\Category;

class ProductController extends Controller
{
    public function getProduct(Product $product)
    {
        $product->with('attributes');
    	return new ProductResource($product);
    }
    public function getProductsFromCategory(Category $category)
    {
    	if (!Cache::has('category_products:'.$category->id)) {

    		$minutes = now()->addMinutes(5);
    		$products = Product::whereHas('categories', function($q) use ($category) {
	    		$q->where('category_id', $category->id);
	    	})->get();
    		Cache::add('category_products:'.$category->id, $products, $minutes);
    	}
    	return response(Cache::get('category_products:'.$category->id));
    }
}
