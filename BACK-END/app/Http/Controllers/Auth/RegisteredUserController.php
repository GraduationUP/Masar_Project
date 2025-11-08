<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;


class RegisteredUserController extends Controller
{
    /**
     *  طلب تسجيل مستخدم جديد.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Rules\Password::defaults()],
            'account_type' => ['required', Rule::in(['user', 'seller','admin'])],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // إنشاء المستخدم
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // تعيين الدور للمستخدم الجديد
        $this->assignUserRole($user, $request->account_type);

        event(new Registered($user));

        $token = $user->createToken('auth_token')->plainTextToken;

        //  تحديد مدة الصلاحية
        $minutes = 60 * 24 * 7;


        return response()->json([
            'message' => 'User registered and logged in successfully',
            'role' => $request->account_type,
            'user_id' => $user->id,
            'username' => $user->username,
            'full_name' => $user->first_name . ' ' . $user->last_name,

        ])
        ->cookie(
            'auth_token',                             // اسم الكوكي
            $token,                                   // قيمة التوكن
            $minutes,                                 // مدة الصلاحية بالدقائق
            '/',                                      // المسار (متاح لكل التطبيق)
            null,                                     // الدومين (null للدومين الحالي)
            config('app.env') === 'production',
            true,                                     // $httpOnly: الأهم! يمنع وصول JavaScript
            false,                                    // $raw: لا
            'Strict'                                  // $sameSite: لمنع CSRF
        );
    }

    /**
     * تعيين الدور للمستخدم الجديد
     */
    protected function assignUserRole(User $user, string $accountType): void
    {
        $roleName = $this->mapAccountTypeToRole($accountType);

        // التأكد من وجود الدور قبل تعيينه
        $role = Role::firstOrCreate(['name' => $roleName]);

        $user->assignRole($role);
    }

    /**
     * تحويل account_type إلى اسم دور مناسب
     */
    protected function mapAccountTypeToRole(string $accountType): string
    {
        return match ($accountType) {
            'seller' => 'seller',
            'admin'  => 'admin',
            default  => 'user',
        };
    }
}
