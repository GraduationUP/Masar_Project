<?php

namespace App\Http\Controllers\User;

use App\Models\Store;
use App\Models\Rating;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    // إضافة تقييم جديد لمتجر
    public function store(Request $request, Store $store)
    {
        $request->validate([
            'score' => 'required|integer|min:1|max:5',
        ]);

        // تحقق إن المستخدم لم يقم بتقييم هذا المتجر سابقًا
        if ($store->ratings()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'You have already rated this store.'], 403);
        }

        // إنشاء تقييم جديد
        $rating = $store->ratings()->create([
            'user_id' => Auth::id(),
            'score' => $request->score,
        ]);

        return response()->json($rating, 201);
    }

    // تحديث تقييم موجود
    public function update(Request $request, Rating $rating)
    {
        if ($rating->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'score' => 'required|integer|min:1|max:5',
        ]);

        $rating->update([
            'score' => $request->score,
        ]);

        return response()->json($rating);
    }

    // حذف تقييم
    public function destroy(Rating $rating)
    {
         $user = Auth::user();

    if ($user->id !== $rating->user_id && ! $user->hasRole('admin')) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

        $rating->delete();

        return response()->json(['message' => 'Rating deleted successfully.']);
    }
}
