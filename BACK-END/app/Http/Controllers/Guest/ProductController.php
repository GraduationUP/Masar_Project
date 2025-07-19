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
            $product->photo_url = $product->photo ? asset('storage/' . $product->photo) : null;

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
            ]
        ]);
    }
}
