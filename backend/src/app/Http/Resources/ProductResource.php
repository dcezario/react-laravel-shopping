<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $attribute = $this->whenLoaded('attributes', function() {
                $attr = [];
                foreach ($this->attributes as $attribute) {
                    $attr[$attribute->attribute->name][] = [
                        'attribute_value_id' => $attribute->pivot->attribute_value_id,
                        'value' => $attribute->value,
                    ];
                    $attr[$attribute->attribute->name][] = [
                        'attribute_value_id' => $attribute->pivot->attribute_value_id,
                        'value' => $attribute->value,
                    ];
                }
                return (array)$attr;
        });
        $attribute['cor'][] = [
            'attribute_value_id' => 5,
            'value' => 'verde',
        ];
        return [
            'id'          => $this->id,
            'name'        => $this->name,
            'price'       => (float)$this->price,
            'description' => $this->description,
            'picture'     => $this->picture,
            'attributes'  => $attribute,
        ];
    }
}
