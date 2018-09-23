<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            'created_at' => date('d/m/Y', strtotime($this->created_at)),
            'item_count' => $this->whenLoaded('items', function() {
                $total = 0;
                foreach ($this->items as $item) {
                    $total += $item->quantity;
                }
                return $total;
            }),
            'order_value' => $this->whenLoaded('items', function() {
                $total = 0;
                foreach ($this->items as $item) {
                    $total += $item->unit_price;
                }
                return $total;
            })
        ];
    }
}
