<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class AuthenticatedSessionController extends Controller
{


    public function store(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $user = \App\Models\User::where('email', $request->email)->first();

            // تحقق من صحة البيانات
            if (!$user || !\Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
                return response()->json([
                    'response_code' => 401,
                    'status'  => 'error',
                    'message'   => 'بيانات الدخول غير صحيحة',
                ], 401);
            }

            // التحقق من وجود حظر
            if ($user->ban) {
    // إذا الحظر منتهي نحذفه تلقائي
    if ($user->ban->expires_at && now()->greaterThanOrEqualTo($user->ban->expires_at)) {
        $user->ban->delete();

        // إن كان المستخدم بائع، يتم تفعيل متجره تلقائياً
        if ($user->hasRole('seller') && $user->store) {
            $user->store->update(['status' => true]);
        }

    } else {
        // لا يزال محظورًا
        return response()->json([
            'response_code' => 403,
            'status' => 'error',
            'message' => 'تم حظرك مؤقتاً حتى ' . optional($user->ban->expires_at)->format('Y-m-d H:i'),
        ], 403);
    }
}


            // تسجيل الدخول وإنشاء توكن
            Auth::login($user);
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'response_code' => 200,
                'status'  => 'success',
                'message'   => 'Login successful',
                'user_info'  => [
                    'id' => $user->id,
                    'name' => $user->first_name . ' ' . $user->last_name,
                    'email' => $user->email,
                    'role' => $user->getRoleNames()->first(),
                ],
                'token'   => $token,
                'token_type' => 'Bearer',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'response_code' => 422,
                'status'  => 'error',
                'message'   => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Login Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'  => 'error',
                'message'   => 'Login failed',
            ], 500);
        }
    }
}
