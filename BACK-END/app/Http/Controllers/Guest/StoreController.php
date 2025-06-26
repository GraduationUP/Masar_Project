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
        $store = \App\Models\Store::with(['products', 'ratings.user', 'comments.user'])->findOrFail($id);

        return response()->json([
            'id' => $store->id,
            'name' => $store->store_name,
            'latitude' => (float) $store->latitude,
            'longitude' => (float) $store->longitude,
            'location_address' => $store->location_address,
            'phone' => $store->phone,

            // المنتجات
            'products' => $store->products,

            // التقييمات
            'ratings' => $store->ratings->map(function ($rating) {
                return [
                    'id' => $rating->id,
                    'user_id' => $rating->user_id,
                    'user_name' => $rating->user->username ?? null,
                    'score' => $rating->score,
                    'created_at' => $rating->created_at,
                ];
            }),

            // التعليقات
            'comments' => $store->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'user_id' => $comment->user_id,
                    'user_name' => $comment->user->username ?? null,
                    'content' => $comment->content,
                    'created_at' => $comment->created_at,
                ];
            }),
        ]);
    }
}
