<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{
    // عرض كل المنتجات بدون فلترة (الأدمن يشوف كل المنتجات)
    public function index()
    {
   $products = Product::with(['store' => function($query) {
        $query->select('id', 'store_name');
    }])->get();
    //ساعدني اعرض صورة المنتج
    $products->transform(function ($product) {
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

    // عرض تفاصيل منتج معين مع بيانات المتجر
    public function show($id)
    {
        $product = Product::with('store')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $product
        ]);
    }

    // حذف منتج بشكل نهائي
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.'
        ]);
    }
}
