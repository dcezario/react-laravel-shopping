<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\OrderResource;
use App\Cart;
use App\Order;
use App\Customer;
use App\ItemOrder;
use App\Product;

class OrderController extends Controller
{
    public function makeOrder(Request $request)
    {
    	$customer = Customer::where('access_token', $request->accessToken)->get();
    	$cart = Cart::with('items')->where('hash', $request->cartToken)->first();

    	if (!$customer || !$cart) {
    		return response()->json(['error' => 'Houve um problema processando sua solicitacao'], 400);
    	}
    	$order = new Order();
    	$order->customer_id = $customer->id;
    	$order->address_id = $request->addressId;
    	$order->save();
    	foreach ($cart->items as $item) {
    		$product = Product::where('id',$item->product_id)->first();
    		$itemOrder = new ItemOrder();
    		$itemOrder->product_id = $item->product_id;
    		$itemOrder->order_id = $order->id;
    		$itemOrder->quantity = $item->quantity;
    		$itemOrder->unit_price = $product->price;
    		$itemOrder->save();
    		unset($product);
    	}
    	$cart->delete();
    	return response()->json(['success' => 'Pedido recebido']);
    }
    public function getOrders(Request $request)
    {
        if (!$request->token) {
            return response()->json(['error' => 'orders not found'], 400);
        }
        $orders = Order::whereHas('customer', function($q) use ($request) {
            $q->where('access_token', $request->token);
        })->with('items');
        if (!$orders) {
            return response()->json(['success' => 'orders not found'], 200);
        }
        return OrderResource::collection($orders->get());
    }
}
