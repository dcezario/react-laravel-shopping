<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Cart;
use App\ItemCart;

class CartController extends Controller
{
    public function insertItem(Request $request) {
    	//Iniciando um novo carrinho
    	dd($request->all());
    	if (!isset($request->token) || is_null($request->token) || empty($request->token)) {
    		$token = Hash::make(uniqid());
    		$cart = new Cart();
    		$cart->hash = $token;
    		$cart->save();
    	} else {
			$cart = Cart::where('hash', $request->token)->first();
		}
		$items = ItemCart::where('cart_id', $cart->id)->where('product_id', $request->product_id)->first();
		if ($items) {
			$items->cart_id = $cart->id;
			$items->product_id = $request->product_id;
			$items->quantity+= $request->quantity;
			$items->update();
		} else {
			$items = new ItemCart;
			$items->cart_id = $cart->id;
			$items->product_id = $request->product_id;
			$items->quantity = $request->quantity;
			$items->save();
		}
		return response($cart);
    }
    public function removeItem(Request $request) {
    	if (!isset($request->token)) {
    		return response()->json(['error'=>'cart not found'], 400);
    	}
    	$cart = Cart::where('hash', $request->token)->first();
    	$items = ItemCart::where('cart_id', $cart->id)
    	->where('product_id', $request->product_id)->delete();
    	return response()->json(['success' => 'item removed'], 200);
    }
}
