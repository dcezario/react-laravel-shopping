<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

use App\Customer;

class CustomerController extends Controller
{
    public function getCustomer(Request $request) {
    	$customerId = $request->id;
    	if (!Cache::has('customer:'.$customerId)) {
    		$customer = Customer::where('id', $customerId)->with('addresses')->get();
    		$minutes = now()->addMinutes(15);
    		Cache::add('customer:'.$customerId, $customer, $minutes);
    	}
    	return response(Cache::get('customer:'.$customerId));
    	return response($customer);
    }
}
