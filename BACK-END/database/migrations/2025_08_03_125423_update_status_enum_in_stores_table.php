<?php
// database/migrations/xxxx_xx_xx_xxxxxx_update_status_enum_in_stores_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateStatusEnumInStoresTable extends Migration
{
    public function up()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->enum('status', ['pending', 'active', 'inactive', 'banned'])->default('pending')->change();
        });
    }

    public function down()
    {
        Schema::table('stores', function (Blueprint $table) {
            $table->string('status')->default('pending')->change(); // حسب حالتك السابقة
        });
    }
}
