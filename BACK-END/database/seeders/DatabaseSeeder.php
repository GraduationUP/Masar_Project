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

        // جميع الصلاحيات المطلوبة
        $permissions = [
            // صلاحيات المستخدم العادي
            'view stores',
            'rate stores',
            'comment',
            'receive notifications',
            'send reports',
            'edit comment',
            'delete comment',

            // صلاحيات البائع
            'manage own store',
            'manage products',
            'access seller dashboard',
            'report comment',

            // صلاحيات الأدمن
            'access admin dashboard',
            'block users',
            'block stores',
            'block products',
            'send notifications',
        ];

        // إنشاء الصلاحيات إن لم تكن موجودة
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ربط الصلاحيات بالأدوار

        // المستخدم
        $userRole->givePermissionTo([
            'view stores',
            'rate stores',
            'comment',
            'receive notifications',
            'send reports',
            'edit comment',
            'delete comment',
        ]);

        // البائع
        $sellerRole->givePermissionTo([
            'view stores',
            'rate stores',
            'comment',
            'receive notifications',
            'send reports',
            'manage own store',
            'manage products',
            'access seller dashboard',
            'report comment',
        ]);

        // الأدمن يمتلك كل الصلاحيات
        $adminRole->syncPermissions(Permission::all());

        // استدعاء سييدرات أخرى
        $this->call([
            CategorySeeder::class,
            FakeUsersAndDataSeeder::class,
        ]);
    }
}
