<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Elasticquent\ElasticquentTrait;

class Product extends Model
{
	use ElasticquentTrait;
	protected $mappingProperties = array(
	   'name' => [
	        'type' => 'text',
	        'analyzer' => 'standard'
	    ],
	    'description' => [
	        'type' => 'text',
	        'analyzer' => 'standard'
	    ],
	);
    public function categories()
    {
    	return $this->belongsToMany('App\Category');
    }
    public function attributes()
    {
    	return $this->belongsToMany('App\AttributeValue');
    }
}
