<?php

namespace App\Http\Controllers\Guest;

use App\Models\Product;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('store')->get();

        // تعديل المنتجات لإضافة رابط الصورة الكامل لكل منتج ولكل متجر
        $products = $products->map(function ($product) {
            $product->photo = $product->photo ? asset('storage/' . $product->photo) : null;

            if ($product->store) {
                $product->store->id_card_photo_url = $product->store->id_card_photo
                    ? asset('storage/' . $product->store->id_card_photo)
                    : null;
            }

            return $product;
        });

        return response()->json([
            'status' => true,
            'data' => $products
        ]);
    }


    public function show($id)
    {
        $product = Product::with('store', 'category')->findOrFail($id);

        // جلب منتجات ذات صلة بنفس التصنيف مع استثناء المنتج الحالي
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(5) // أو استخدم 3 إذا كنت تفضل
            ->get()
            ->map(function ($related) {
                return [
                    'id' => $related->id,
                    'name' => $related->name,
                    'price' => $related->price,
                    'photo' => $related->photo ? asset('storage/' . $related->photo) : null,
                ];
            });

        return response()->json([
            'status' => true,
            'data' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'photo' => $product->photo ? asset('storage/' . $product->photo) : null,
                'store_id' => $product->store_id,
                'store_name' => $product->store?->store_name,
                'store_phone' => $product->store?->phone,
                'store_photo' => $product->store?->id_card_photo
                    ? asset('storage/' . $product->store->id_card_photo)
                    : null,
                'category_name' => $product->category?->name,
                'latitude' => $product->latitude,
                'longitude' => $product->longitude,
                'show_location' => $product->show_location,
                'location_address' => $product->store?->location_address,
                'created_at' => $product->created_at->toDateTimeString(),
                'related_products' => $relatedProducts,
            ]
        ]);
    }
}
