<?php

namespace App\Http\Controllers\Guest;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::where('status', 'active')->get()->map(function ($store) {
            $averageRating = round($store->ratings()->avg('score'), 1);

            return [
                'id' => $store->id,
                'user_id' => $store->user_id,
                'store_name' => $store->store_name,
                'phone' => $store->phone,
                'location_address' => $store->location_address,
                'status' => $store->status,
                'created_at' => $store->created_at,
                'updated_at' => $store->updated_at,
                'latitude' => $store->latitude,
                'longitude' => $store->longitude,

                'average_rating' => $averageRating,

                'store_image' => $store->id_card_photo
                    ? asset('storage/' . $store->id_card_photo)
                    : null,
            ];
        });

        return response()->json([
            'status' => true,
            'data' => $stores
        ]);
    }


    public function show($id)
    {
        $store = Store::with(['products.category', 'ratings.user', 'comments.user', 'user'])->findOrFail($id);

        $ratings = $store->ratings->keyBy('user_id');
        $comments = $store->comments->keyBy('user_id');

        $userIds = $ratings->keys()->merge($comments->keys())->unique();

        $feedback = $userIds->map(function ($userId) use ($ratings, $comments) {
            $rating = $ratings->get($userId);
            $comment = $comments->get($userId);

            return [
                'user_name' => $rating?->user->username ?? $comment?->user->username ?? 'مستخدم غير معروف',
                'user_id' => $rating?->user_id ?? $comment?->user_id,
                'score' => $rating?->score,
                'content' => $comment?->content ?? '',
                'created_at' => $rating && $comment
                    ? max($rating->created_at, $comment->created_at)->toDateTimeString()
                    : ($rating?->created_at ?? $comment?->created_at)?->toDateTimeString(),
            ];
        })->values();

        $averageRating = $store->ratings->avg('score');

        $products = $store->products->load('category')->map(function ($product) {
            return [
                'id' => $product->id,
                'store_id' => $product->store_id,
                'name' => $product->name,
                'description' => $product->description,
                'photo' => $product->photo ? asset('storage/' . $product->photo) : null,
                'category_name' => $product->category?->name ?? 'غير مصنف',
                'price' => $product->price,
                'latitude' => $product->latitude,
                'longitude' => $product->longitude,
                'show_location' => $product->show_location,
                'created_at' => $product->created_at,
                'updated_at' => $product->updated_at,
            ];
        });


        return response()->json([
            'id' => $store->id,
            'seller_id' => $store->user_id,
            'name' => $store->store_name,
            'latitude' => (float) $store->latitude,
            'longitude' => (float) $store->longitude,
            'location_address' => $store->location_address,
            'phone' => $store->phone,
            'store_image' => $store->id_card_photo
                ? asset('storage/' . $store->id_card_photo)
                : null,
            'average_rating' => round($averageRating, 2),
            'products' => $products,
            'feedback' => $feedback,
        ]);
    }
}
