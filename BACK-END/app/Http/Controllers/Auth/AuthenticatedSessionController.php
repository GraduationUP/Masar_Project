<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash; // تأكد من استيراد Hash
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
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'response_code' => 401,
                    'status'  => 'error',
                    'message'   => 'بيانات الدخول غير صحيحة',
                ], 401);
            }

            // التحقق من وجود حظر
            if ($user->ban) {
                //  التحقق من انتهاء الحظر أو إرجاع رسالة الحظر
                if ($user->ban->expires_at && now()->greaterThanOrEqualTo($user->ban->expires_at)) {
                    $user->ban->delete();
                    if ($user->hasRole('seller') && $user->store) {
                        $user->store->update(['status' => true]);
                    }
                } else {
                    return response()->json([
                        'response_code' => 403,
                        'status' => 'error',
                        'message' => 'تم حظرك مؤقتاً حتى ' . optional($user->ban->expires_at)->format('Y-m-d H:i'),
                    ], 403);
                }
            }

            $token = $user->createToken('authToken')->plainTextToken;

            $minutes = 60 * 24 * 7;

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
            ])
            ->cookie(
                'auth_token',                             // اسم الكوكي
                $token,                                   // قيمة التوكن
                $minutes,                                 // مدة الصلاحية بالدقائق
                '/',                                      // المسار
                null,                                     // الدومين
                config('app.env') === 'production',       // Secure: True في بيئة الإنتاج
                true,                                     // HttpOnly: الأهم! يمنع وصول JavaScript
                false,                                    // Raw
                'Strict'                                  // SameSite: لمنع CSRF
            );
        } catch (ValidationException $e) {
            //  (التعامل مع خطأ التحقق)
            return response()->json([
                'response_code' => 422,
                'status'  => 'error',
                'message'   => 'Validation failed',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            //  (التعامل مع خطأ عام)
            Log::error('Login Error: ' . $e->getMessage());
            return response()->json([
                'response_code' => 500,
                'status'  => 'error',
                'message'   => 'Login failed',
            ], 500);
        }
    }
}
