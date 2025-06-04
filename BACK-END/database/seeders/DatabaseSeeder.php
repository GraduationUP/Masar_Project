<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
 public function run(): void
 {
  // إنشاء الأدوار
  $userRole = Role::firstOrCreate(['name' => 'user']);
  $sellerRole = Role::firstOrCreate(['name' => 'seller']);
  $adminRole = Role::firstOrCreate(['name' => 'admin']);

  // إنشاء الصلاحيات
  $permissions = [
   // صلاحيات المستخدم العادي
   'view stores',
   'rate stores',
   'comment',
   'receive notifications',
   'send reports',

   // صلاحيات البائع
   'manage own store',
   'manage products',
   'access seller dashboard',

   // صلاحيات الأدمن
   'access admin dashboard',
   'block users',
   'block stores',
   'block products',
   'send notifications',
  ];

  foreach ($permissions as $permission) {
   Permission::firstOrCreate(['name' => $permission]);
  }

  // ربط الصلاحيات بالأدوار
  $userRole->givePermissionTo([
   'view stores',
   'rate stores',
   'comment',
   'receive notifications',
   'send reports',
  ]);

  $sellerRole->givePermissionTo([
   'view stores',
   'rate stores',
   'comment',
   'receive notifications',
   'send reports',
   'manage own store',
   'manage products',
   'access seller dashboard',
  ]);

  $adminRole->givePermissionTo(Permission::all());

  $this->call([
   CategorySeeder::class,
   FakeUsersAndDataSeeder::class,
  ]);
 }
}
