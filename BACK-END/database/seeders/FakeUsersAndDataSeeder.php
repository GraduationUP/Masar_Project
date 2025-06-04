<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Store;
use App\Models\Product;

class FakeUsersAndDataSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'System',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole('admin');

        // Seller
        $seller = User::create([
            'first_name' => 'Saleh',
            'last_name' => 'Seller',
            'username' => 'seller123',
            'email' => 'seller@example.com',
            'password' => Hash::make('password'),
        ]);
        $seller->assignRole('seller');

        // إنشاء متجر واحد فقط للبائع باستخدام الفاكتوري مع ربطه بالبائع
        $store = Store::factory()->create([
            'user_id' => $seller->id,
        ]);

        // إنشاء 10 منتجات مرتبطة بالمتجر
        Product::factory()->count(10)->create([
            'store_id' => $store->id,
            'category_id' => 1,
        ]);

        // User عادي
        $user = User::create([
            'first_name' => 'Ahmed',
            'last_name' => 'User',
            'username' => 'ahmed123',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
        ]);
        $user->assignRole('user');
    }
}
