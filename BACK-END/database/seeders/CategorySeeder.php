<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'أدوية']);
        Category::create(['name' => 'مستلزمات طبية']);
        Category::create(['name' => 'أجهزة طبية']);
    }
}
