<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', 'min:8'],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            \Log::info("Password updated for: " . $request->email);
            return response()->json(['message' => 'تم تحديث كلمة المرور بنجاح']);
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        return response()->json([
            'token' => $request->token,
            'email' => $request->query('email'),
            'message' => 'Password reset page data'
        ]);
    }
}
