<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Resources\CustomerResource;
use Illuminate\Support\Facades\Hash;

use App\Customer;

class CustomerController extends Controller
{
    public function getCustomer(Request $request)
    {
    	$accessToken = $request->token;
    	if (!Cache::has('customerInfo:'.$accessToken)) {
    		$customer = Customer::where('access_token', $request->token)->first();
    		if (!$customer) {
    			return response()->json(['error' => 'customer not found'], 400);
    		}
            $customerInfo = new CustomerResource($customer);
    		$minutes = now()->addMinutes(15);
    		Cache::add('customerInfo:'.$accessToken, $customerInfo, $minutes);
    	}
    	return response(Cache::get('customerInfo:'.$accessToken));
    }
    public function authenticate(Request $request)
    {
    	if (empty($request->email) || empty($request->password)) {
    		return response()->json(['error' => 'missing parameters'], 400);
    	}
    	$customer = Customer::where('email', $request->email)->first();
    	if (!$customer) {
    		return response()->json(['error' => 'Invalid credentitals'], 401);
    	}
    	if (Hash::check($request->password, $customer->password)) {
    		$accessToken = Hash::make(microtime().uniqid());
    		$accessToken = str_replace('/', '', $accessToken);
    		$customer->access_token = $accessToken;
    		$customer->save();
    		return ['success' => $accessToken];
    	}
    	return response()->json(['error' => 'Invalid credentitals'], 401);

    }
    public function checkToken(Request $request) {
    	if (!isset($request->token) || empty($request->token)) {
    		return response()->json(['error' => 'token not found'], 400);
    	}
    	$customer = Customer::where('access_token', $request->token)->first();
    	if (!$customer) {
    		return response()->json(['error' => 'customer not found'], 401);
    	}
    	return response()->json(['success' => 'token is valid'], 200);
    }
}
