<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::table('comments', function (Blueprint $table) {
        // حذف قيد المفتاح الخارجي المرتبط بproduct_id
        $table->dropForeign(['product_id']);
        // حذف العمود product_id
        $table->dropColumn('product_id');
    });
}

public function down()
{
    Schema::table('comments', function (Blueprint $table) {
        // إضافة العمود مجددًا مع القيد
        $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
    });
}
}
;
