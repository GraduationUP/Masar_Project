<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeLatLongTypeInStoresAndProducts extends Migration
{
    public function up()
    {
         Schema::table('stores', function (Blueprint $table) {
        $table->double('latitude', 10, 8)->nullable()->change();
        $table->double('longitude', 11, 8)->nullable()->change();
    });
        

        Schema::table('products', function (Blueprint $table) {
            $table->double('latitude')->change();
            $table->double('longitude')->change();
        });
    }

    public function down()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->string('latitude')->change();
            $table->string('longitude')->change();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->string('latitude')->change();
            $table->string('longitude')->change();
        });
    }
}
