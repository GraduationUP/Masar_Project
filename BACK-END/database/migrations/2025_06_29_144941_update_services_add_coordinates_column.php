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
    Schema::table('services', function (Blueprint $table) {
        $table->dropColumn(['latitude', 'longitude']); // حذف الأعمدة القديمة
        $table->json('coordinates')->nullable();        // عمود جديد لتخزين كل الإحداثيات
    });
}


    /**
     * Reverse the migrations.
     */
   public function down()
{
    Schema::table('services', function (Blueprint $table) {
        $table->dropColumn('coordinates');
        $table->string('latitude')->nullable();
        $table->string('longitude')->nullable();
    });
}

};
