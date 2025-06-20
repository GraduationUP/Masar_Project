<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * عرض معلومات لوحة تحكم البائع
     */
    public function index()
    {
        // جلب المستخدم والمتجر والتحقق من وجود المتجر
        $user = Auth::user();
        $store = $user->store;
        if (!$store) {
            return response()->json(['message' => 'Store not found.'], 404);
        }

        // جلب المنتجات المرتبطة مع التصنيف
        $products = $store->products()->with('category')->latest()->get();

        // متوسط التقييم وعدد التقييمات
        $averageRating = round($store->ratings()->avg('score'), 1);
        $ratingsCount = $store->ratings()->count();

        // آخر 5 تقييمات مع بيانات المستخدم
        $recentRatings = $store->ratings()
            ->with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($rating) {
                return [
                    'user' => $rating->user->username,
                    'score' => $rating->score,
                    'created_at' => $rating->created_at->toDateTimeString(),
                ];
            });

        // آخر 5 تعليقات مع بيانات المستخدم
        $recentComments = $store->comments()
            ->with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($comment) {
                return [
                    'user' => $comment->user->username,
                    'comment' => $comment->content,
                    'created_at' => $comment->created_at->toDateTimeString(),
                ];
            });

        // إرسال الرد
        return response()->json([
            'store' => [
                'name' => $store->store_name,
                'status' => $store->is_active ? 'Active' : 'Inactive',
                'created_at' => $store->created_at->toDateTimeString(),
                'total_products' => $products->count(),
                'average_rating' => $averageRating,
                'ratings_count' => $ratingsCount,
            ],
            'recent_products' => $products->take(5)->map(function ($product) {
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
