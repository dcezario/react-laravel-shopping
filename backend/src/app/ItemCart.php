<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ItemCart extends Model
{
    protected $table = 'cart_items';
    protected $fillable = ['product_id', 'quantity'];
    public function cart()
    {
    	return $this->belongsTo('App\Cart');
    }
    public function products() {
    	return $this->belongsTo('App\Product', 'product_id');
    }
}
