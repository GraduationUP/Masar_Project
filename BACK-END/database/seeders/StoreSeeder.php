<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Store;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            Store::create([
        'user_id' => 1,
        'store_name' => 'Al-Salam Pharmacy',
        'id_card_photo' => 'id_card_1.jpg',
        'phone' => '0599123456',
        'location_address' => 'Gaza, Al-Rimal Street',
        'status' => true
    ]);
    }
}
