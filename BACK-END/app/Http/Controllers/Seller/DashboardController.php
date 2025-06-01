<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
  public function index()
    {
        $user = Auth::user();
        $store = $user->store;

        if (!$store) {
            return response()->json(['message' => 'Store not found.'], 404);
        }

        $products = $store->products()->with('category')->latest()->get();

        return response()->json([
            'store' => [
                'name' => $store->store_name,
                'status' => $store->is_active ? 'Active' : 'Inactive',
                'created_at' => $store->created_at->toDateTimeString(),
                'total_products' => $products->count(),
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
        ]);
    }
}
