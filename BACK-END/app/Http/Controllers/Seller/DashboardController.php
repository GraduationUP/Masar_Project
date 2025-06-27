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
        // جلب المستخدم الحالي والمتجر الخاص به
        $user = Auth::user();
        $store = $user->store;

        // التحقق من وجود المتجر
        if (!$store) {
            return response()->json(['message' => 'Store not found.'], 404);
        }

        // جلب المنتجات مع تصنيفاتها
        $products = $store->products()->with('category')->latest()->get();

        // حساب متوسط التقييم
        $averageRating = round($store->ratings()->avg('score'), 1);

        // جلب آخر 5 تقييمات
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

        // جلب آخر 5 تعليقات
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

        // إرسال الرد بصيغة JSON
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
