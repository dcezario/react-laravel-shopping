<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    function attributeValues()
    {
    	return $this->hasMany('App\AttributeValue');
    }
}
