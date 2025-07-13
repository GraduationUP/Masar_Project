<?php

namespace App\Http\Controllers\Guest;

use App\Models\Store;
use App\Models\Product;
use App\Models\Analytics;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('store')->get();

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
                'photo' => $product->photo,
                'store_id' => $product->store_id,
                'store_name' => $product->store?->store_name,
                'store_phone' => $product->store?->phone,
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
