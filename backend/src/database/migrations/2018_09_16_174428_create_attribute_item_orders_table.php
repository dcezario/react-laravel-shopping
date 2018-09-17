<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttributeItemOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attribute_item_order', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('attribute_product_id');
            $table->unsignedInteger('item_id');
            $table->foreign('attribute_product_id')
                ->references('id')
                ->on('attribute_product');
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
        Schema::table('attribute_item_order', function(Blueprint $table) {
            $table->dropForeign(['attribute_product_id']);
            $table->dropForeign(['item_id']);
        });
        Schema::dropIfExists('attribute_item_orders');
    }
}
