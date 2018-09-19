<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use App\Http\Resources\CustomerResource;

use App\Customer;

class CustomerController extends Controller
{
    public function getCustomer(Customer $customer) {
    	$customerId = $customer->id;
    	if (!Cache::has('customerInfo:'.$customerId)) {
            $customerInfo = new CustomerResource($customer);
    		$minutes = now()->addMinutes(15);
    		Cache::add('customerInfo:'.$customerId, $customerInfo, $minutes);
    	}
    	return response(Cache::get('customerInfo:'.$customerId));
    }
}
