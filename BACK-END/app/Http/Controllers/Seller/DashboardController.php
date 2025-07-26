<?php

namespace App\Http\Controllers\Seller;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
  * عرض معلومات لوحة تحكم البائع
  */

    public function index()
    {
        $user = Auth::user();
        $store = $user->store;

        if (!$store) {
            return response()->json(['message' => 'Store not found.'], 404);
        }


        $products = $store->products()->with('category')->latest()->get();
        $averageRating = round($store->ratings()->avg('score'), 1);

        $recentRatings = $store->ratings()
            ->with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($rating) {
                return [
                    'id' => $rating->id,
                    'user' => $rating->user->username,
                    'score' => $rating->score,
                    'created_at' => $rating->created_at->toDateTimeString(),
                ];
            });

        $recentComments = $store->comments()
            ->with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'user' => $comment->user->username,
                    'comment' => $comment->content,
                    'created_at' => $comment->created_at->toDateTimeString(),
                ];
            });

        //  إحصائيات رقمية
        $totalProducts = $products->count();
        $totalRatings = $store->ratings()->count();
        $totalComments = $store->comments()->count();



        return response()->json([
            'store' => [
                'id' => $store->id,
                'name' => $store->store_name,
                'owner_phone' => $store->phone,
                'status' => $store->is_active ? 'Active' : 'Inactive',
                'created_at' => $store->created_at->toDateTimeString(),
                'average_rating' => $averageRating,
                'latitude' => $store->latitude,
                'longitude' => $store->longitude,
                'id_card_photo_url' => $store->id_card_photo
                    ? asset('storage/' . $store->id_card_photo)
                    : null,
            ],


            'recent_products' => $products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'category' => $product->category?->name,
                    'created_at' => $product->created_at->toDateTimeString(),
                ];
            }),

            'recent_ratings' => $recentRatings,
            'recent_comments' => $recentComments,
        ]);
    }
}
