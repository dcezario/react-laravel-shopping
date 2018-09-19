<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
            'id' => $this->id,
            'phone' => $this->phone,
            'address' => $this->address,
            'complement' => $this->complement,
            'region'    => $this->region,
            'city'  => $this->city,
            'state'=> $this->state,
            'zipcode' => $this->zipcode,
        ];
    }
}
