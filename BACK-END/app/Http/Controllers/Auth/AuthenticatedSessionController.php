<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    // تسجيل الدخول وإنشاء توكن
    public function store(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            $user = \App\Models\User::where('email', $request->email)->first();

            // ✅ التحقق من وجود المستخدم
            if (!$user || !\Illuminate\Support\Facades\Hash::check($request->password, $user->password)) {
                return response()->json([
                    'response_code' => 401,
                    'status'  => 'error',
                    'message'   => 'بيانات الدخول غير صحيحة',
                ], 401);
            }

            // ✅ التحقق من الحظر
            if ($user->ban) {
                return response()->json([
                    'response_code' => 403,
                    'status'  => 'banned',
                    'message'   => 'تم حظرك مؤقتًا من استخدام المنصة بسبب: ' . $user->ban->reason,
                ], 403);
            }

            // ✅ تسجيل الدخول
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
                    'role' => $user->getRoleNames()->first()
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
            \Illuminate\Support\Facades\Log::error('Login Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'  => 'error',
                'message'  => 'Login failed',
            ], 500);
        }
    }


    public function destroy(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                $user->tokens()->delete();

                return response()->json([
                    'response_code' => 200,
                    'status'        => 'success',
                    'message'       => 'Successfully logged out',
                ]);
            }

            return response()->json([
                'response_code' => 401,
                'status'        => 'error',
                'message'       => 'User not authenticated',
            ], 401);
        } catch (\Exception $e) {
            Log::error('Logout Error: ' . $e->getMessage());

            return response()->json([
                'response_code' => 500,
                'status'        => 'error',
                'message'       => 'An error occurred during logout',
            ], 500);
        }
    }
}
