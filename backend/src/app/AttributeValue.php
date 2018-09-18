<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AttributeValue extends Model
{
	protected $table = "attribute_value";

    public function attribute()
    {
    	return $this->belongsTo('App\Attribute');
    }
    public function products()
    {
    	return $this->belongsToMany('App\Product');
    }
}
