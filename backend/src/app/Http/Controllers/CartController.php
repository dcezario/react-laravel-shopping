<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Cart;
use App\ItemCart;

class CartController extends Controller
{
    public function insertItem(Request $request)
    {
    	//Iniciando um novo carrinho
    	if (!isset($request->token) || is_null($request->token) || empty($request->token)) {
    		$token = Hash::make(uniqid());
            $token = str_replace('/', '', $token);
    		$cart = new Cart();
    		$cart->hash = $token;
    		$cart->save();
    	} else {
			$cart = Cart::where('hash', $request->token)->first();
		}
		$items = ItemCart::where([['cart_id', '=', $cart->id], ['product_id', "=", $request->product_id] ])->first();
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
		return response()->json($cart);
    }
    public function removeItem(Request $request) {
    	if (!isset($request->token)) {
    		return response()->json(['error'=>'cart not found'], 400);
    	}
    	$cart = Cart::where('hash', $request->token)->first();
    	if (!$cart) {
            return response()->json(['error' => 'cart not found'], 400);
        }
        $cartItem = ItemCart::find($request->item_id)->delete();
    	return response()->json($cart, 200);
    }
    public function getItems(Request $request) {
        if (!isset($request->token)) {
            return response()->json(['error'=>'Token not found'], 400);
        }
        $cartItems = ItemCart::with('products')->whereHas('cart', function($q) use ($request) {
            $q->where('hash', $request->token);
        });
        if (!$cartItems) {
            return response()->json(['message' => 'Items for cart not found'], 200);
        }
        return response($cartItems->get());
    }
}
