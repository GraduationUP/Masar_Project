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

        $authUser = Auth::user();

        if (! $authUser || (
            ! $authUser->hasRole('admin') && $authUser->id !== $user->id
        )) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $feedback = collect();

        $storesIds = $user->comments->pluck('store_id')
            ->merge($user->ratings->pluck('store_id'))
            ->unique();

        foreach ($storesIds as $storeId) {
            $comment = $user->comments->firstWhere('store_id', $storeId);
            $rating = $user->ratings->firstWhere('store_id', $storeId);

            $feedback->push([
                'store_id'   => $storeId,
                'store_name' => optional($comment?->store ?? $rating?->store)->store_name,
                'comment'    => $comment?->content,
                'rating'     => $rating?->score,
                'created_at' => collect([
                    $comment?->created_at,
                    $rating?->created_at
                ])->filter()->max(), // الأحدث بينهم
            ]);
        }
        $feedback = $feedback->sortByDesc('created_at')->values();

        return response()->json([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->getRoleNames()->first(),
            'store' => $user->store,
            'feedback' => $feedback,
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
