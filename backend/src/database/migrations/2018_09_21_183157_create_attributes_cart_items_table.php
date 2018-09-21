<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttributesCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attribute_cart_items', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('attribute_product_id');
            $table->unsignedInteger('item_id');
            $table->foreign('attribute_product_id')
                ->references('id')
                ->on('attribute_value_product');
            $table->foreign('item_id')
                ->references('id')
                ->on('item_order')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('attribute_cart_items', function(Blueprint $table) {
            $table->dropForeign(['attribute_product_id']);
            $table->dropForeign(['item_id']);
        });
        Schema::dropIfExists('attribute_cart_items');
    }
}
