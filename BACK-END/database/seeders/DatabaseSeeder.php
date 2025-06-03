<?php

namespace Database\Seeders;
use Spatie\Permission\Models\Role;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
Role::firstOrCreate(['name' => 'user']);
Role::firstOrCreate(['name' => 'seller']);
Role::firstOrCreate(['name' => 'admin']);
    $this->call(CategorySeeder::class);
$this->call(FakeUsersAndDataSeeder::class);


    }
}
