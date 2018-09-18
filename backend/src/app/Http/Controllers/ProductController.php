<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\ProductResource;

use App\Product;

class ProductController extends Controller
{
    public function getProduct(Product $product)
    {
    	return new ProductResource($product);
    }
}
