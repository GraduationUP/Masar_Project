<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'store_id' => 1,
            'name' => 'Panadol Extra',
            'description' => 'مسكن ألم وخافض حرارة',
            'photo' => 'panadol_extra.jpg',
            'category_id' => 1,
            'price' => 12.50,
            'latitude' => '31.5016',
            'longitude' => '34.4668',
            'show_location' => true
        ]);

        Product::create([
            'store_id' => 1,
            'name' => 'Aspirin 100mg',
            'description' => 'مضاد تجلطات الدم',
            'photo' => 'aspirin.jpg',
            'category_id' => 1,
            'price' => 8.00,
            'latitude' => '31.5030',
            'longitude' => '34.4675',
            'show_location' => true
        ]);
    }
}
