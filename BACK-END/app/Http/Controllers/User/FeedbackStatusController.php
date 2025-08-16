<?php

namespace App\Http\Controllers\User;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FeedbackStatusController extends Controller
{
    public function check(Request $request, $storeId)
    {
        $user = $request->user();

        $store = Store::find($storeId);

        if (!$store) {
            return response()->json([
                'status' => false,
                'message' => 'المتجر غير موجود.'
            ], 404);
        }

        $rating = $store->ratings()
            ->where('user_id', $user->id)
            ->first();

        $comment = $store->comments()
            ->where('user_id', $user->id)
            ->first();

       $isFavorite = \DB::table('favourite_stores')
    ->where('user_id', $user->id)
    ->where('store_id', $store->id)
    ->exists();

        return response()->json([
            'score' => $rating?->score,
            'score_id' => $rating?->id,
            'content' => $comment?->content,
            'content_id' => $comment?->id,
            'is_favorite' => $isFavorite,

        ]);
    }
}
