<?php

namespace App\Http\Controllers\User;

use App\Models\Store;
use App\Models\Rating;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
    public function store(Request $request, Store $store)
    {
        $request->validate([
            'score' => 'required|integer|min:1|max:5',
            'content' => 'nullable|string',
        ]);

        // تأكد أن المستخدم لم يقيّم هذا المتجر سابقًا
        if ($store->ratings()->where('user_id', Auth::id())->exists()) {
            return response()->json(['message' => 'You have already rated this store.'], 403);
        }

        $rating = $store->ratings()->create([
            'user_id' => Auth::id(),
            'score' => $request->score,
            'content' => $request->content,
        ]);

        return response()->json($rating, 201);
    }

    public function update(Request $request, Rating $rating)
    {
        if ($rating->user_id !== auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'score' => 'required|integer|min:1|max:5',
            'content' => 'nullable|string',
        ]);

        $rating->update([
            'score' => $request->score,
            'content' => $request->content,
        ]);

        return response()->json($rating);
    }

    public function destroy(Rating $rating)
{
 if ($rating->user_id !== auth::id()) {
  return response()->json(['message' => 'Unauthorized'], 403);
 }

 $rating->delete();

 return response()->json(['message' => 'Rating deleted successfully.']);
}

}
