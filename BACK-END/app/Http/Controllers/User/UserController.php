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
            'store',       // لتحميل المتجر إذا موجود
            'comments.store', // لتحميل اسم المتجر مع التعليقات
            'ratings.store'   // لتحميل اسم المتجر مع التقييمات
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
        ];

        return response()->json($response);
    }



 public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    if (Auth::id() !== $user->id) {
        return response()->json(['message' => 'غير مصرح'], 403);
    }

    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'username' => 'required|string|max:255|unique:users,username,' . $user->id,
        'email' => 'required|email|max:255|unique:users,email,' . $user->id,
    ], [
        'first_name.required' => 'الاسم الأول مطلوب',
        'last_name.required' => 'اسم العائلة مطلوب',
        'username.required' => 'اسم المستخدم مطلوب',
        'username.unique' => 'اسم المستخدم موجود بالفعل',
        'email.required' => 'البريد الإلكتروني مطلوب',
        'email.email' => 'صيغة البريد الإلكتروني غير صحيحة',
        'email.unique' => 'البريد الإلكتروني مستخدم بالفعل',
    ]);

    $user->first_name = $validated['first_name'];
    $user->last_name = $validated['last_name'];
    $user->username = $validated['username'];
    $user->email = $validated['email'];
    $user->save();

    return response()->json([
        'message' => 'تم تحديث الملف الشخصي بنجاح',
        'user' => [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
        ]
    ]);
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
