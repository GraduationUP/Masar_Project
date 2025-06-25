<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function show($id)
    {
        $user = User::with(['store', 'comments.store', 'ratings.store'])->findOrFail($id);

        if (!Auth::check() || Auth::id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->getRoleNames()->first(),
            'store' => $user->store,
            'comments' => $user->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'store_id' => $comment->store_id,
                    'store_name' => $comment->store->store_name ?? null,
                    'comment' => $comment->content,
                    'created_at' => $comment->created_at,
                ];
            }),
            'ratings' => $user->ratings->map(function ($rating) {
                return [
                    'id' => $rating->id,
                    'store_id' => $rating->store_id,
                    'store_name' => $rating->store->store_name ?? null,
                    'rating' => $rating->score,
                    'created_at' => $rating->created_at,
                ];
            }),
        ]);
    }


    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (Auth::id() !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->first_name = $validated['first_name'];
        $user->last_name = $validated['last_name'];
        $user->username = $validated['username'];
        $user->email = $validated['email'];



        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
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
        ]);

        $user = Auth::user();

        // تحقق من كلمة المرور الحالية
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'كلمة المرور الحالية غير صحيحة'], 422);
        }

        // تحديث كلمة المرور
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['message' => 'تم تحديث كلمة المرور بنجاح']);
    }
}
