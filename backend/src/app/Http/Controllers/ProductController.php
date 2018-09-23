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
        $product = Product::where('id', $request->id)->with('attributes')->first();
    	return new ProductResource($product);
    }
    public function getProductsFromCategory(Category $category)
    {
        $products = Product::whereHas('categories', function($q) use ($category) {
                $q->where('category_id', $category->id);
            })->paginate(20);
    	return response($products);
    }
    public function search(Request $request)
    {
        if (!isset($request->q) || empty($request->q)) {
            return response()->json(['error' => 'query not provided'], 400);
        }
        $product = Product::searchByQuery([
          'multi_match' => [
            'query' => $request->q,
            'fields' => [ "name^5", "description"]
          ],
        ]);;
        return response($product);
    }
}
