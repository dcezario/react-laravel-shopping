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
    public function getProduct(Request $request)
    {
        $product = Product::find($request->id)->with('attributes')->first();
    	return new ProductResource($product);
    }
    public function getProductsFromCategory(Category $category)
    {
        $products = Product::whereHas('categories', function($q) use ($category) {
                $q->where('category_id', $category->id);
            })->paginate(20);
    	return response($products);
    }
}
