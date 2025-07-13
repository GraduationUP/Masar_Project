<?php

namespace App\Http\Controllers\Guest;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::where('status', true)->get();

        return response()->json([
            'status' => true,
            'data' => $stores
        ]);
    }

    public function show($id)
    {
        $store = Store::with(['products', 'ratings.user', 'comments.user', 'user'])->findOrFail($id);

        $ratings = $store->ratings->keyBy('user_id');
        $comments = $store->comments->keyBy('user_id');

        $userIds = $ratings->keys()->merge($comments->keys())->unique();

        $feedback = $userIds->map(function ($userId) use ($ratings, $comments) {
            $rating = $ratings->get($userId);
            $comment = $comments->get($userId);

            return [
                'user_name' => $rating?->user->username ?? $comment?->user->username ?? 'مستخدم غير معروف',
                'score' => $rating?->score,
                'content' => $comment?->content ?? '',
                'created_at' => $rating && $comment
                    ? max($rating->created_at, $comment->created_at)->toDateTimeString()
                    : ($rating?->created_at ?? $comment?->created_at)?->toDateTimeString(),
            ];
        })->values();

        // حساب متوسط التقييم
        $averageRating = $store->ratings->avg('score');

        return response()->json([
            'id' => $store->id,
            'seller_id' => $store->user_id,
            'name' => $store->store_name,
            'latitude' => (float) $store->latitude,
            'longitude' => (float) $store->longitude,
            'location_address' => $store->location_address,
            'phone' => $store->phone,

            'average_rating' => round($averageRating, 2), // تقريب لـ رقمين بعد الفاصلة
            'products' => $store->products,
            'feedback' => $feedback,
        ]);
    }
}
