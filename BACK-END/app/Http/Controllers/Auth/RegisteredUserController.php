<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
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

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // لا نحتاج لحقل role هنا لأننا نستخدم spatie/permission
        ]);

        // تعيين الدور للمستخدم الجديد
        $this->assignUserRole($user, $request->account_type);

        event(new Registered($user));
        Auth::login($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'role' => $request->account_type
        ]);
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
            default => 'user',
        };
    }
}
