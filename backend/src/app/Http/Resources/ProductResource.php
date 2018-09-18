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
        return [
            'name'        => $this->name,
            'price'       => (float)$this->price,
            'description' => $this->description,
            'picture'     => $this->picture,
            'attributes'  => AttributeValueProductResource::collection($this->attributes)
        ];
    }
}
