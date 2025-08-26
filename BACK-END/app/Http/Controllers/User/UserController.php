<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function show()
    {
        $user = Auth::user(); // المستخدم الحالي

        $user->load([
            'store',            // لتحميل المتجر إذا موجود
            'comments.store',   // لتحميل اسم المتجر مع التعليقات
            'ratings.store',    // لتحميل اسم المتجر مع التقييمات
            'favouriteStores'   // إضافة المفضلات
        ]);

        // تجهيز response
        $response = [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->getRoleNames()->first() ?? null,
            'store' => $user->store ? [
                'id' => $user->store->id,
                'name' => $user->store->store_name,
                'description' => $user->store->description,

                'store_image' => $user->store->id_card_photo ? asset('storage/' . $user->store->id_card_photo) : null,

                'created_at' => $user->store->created_at,
            ] : null,
            'comments' => $user->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'store_id' => $comment->store->id,
                    'store_name' => $comment->store->store_name,
                    'comment' => $comment->content,
                    'created_at' => $comment->created_at,
                ];
            }),
            'ratings' => $user->ratings->map(function ($rating) {
                return [
                    'id' => $rating->id,
                    'store_id' => $rating->store->id,
                    'store_name' => $rating->store->store_name,
                    'rating' => $rating->score,
                    'created_at' => $rating->created_at,
                ];
            }),
            'favourites' => $user->favouriteStores->map(function ($store) {
                return [
                    'id' => $store->id,
                    'store_name' => $store->store_name,
                    'phone' => $store->phone,
                    'location_address' => $store->location_address,
                    'status' => $store->status,
                    'latitude' => $store->latitude,
                    'longitude' => $store->longitude,
                    'store_image' => $store->id_card_photo ? asset('storage/' . $store->id_card_photo) : null,
                    'created_at' => $store->created_at,
                ];
            }),
        ];

        return response()->json($response);
    }




    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'current_password.required' => 'كلمة المرور الحالية مطلوبة',
            'password.required' => 'كلمة المرور الجديدة مطلوبة',
            'password.min' => 'كلمة المرور الجديدة يجب أن تحتوي على 8 أحرف على الأقل',
            'password.confirmed' => 'تأكيد كلمة المرور غير متطابق',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'كلمة المرور الحالية غير صحيحة'], 422);
        }

        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['message' => 'تم تحديث كلمة المرور بنجاح']);
    }
}
