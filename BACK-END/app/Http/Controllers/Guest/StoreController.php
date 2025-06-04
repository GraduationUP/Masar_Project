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
    $store = \App\Models\Store::with('products')->findOrFail($id);

    return response()->json([
        'id' => $store->id,
        'name' => $store->store_name,
        'latitude' => (float) $store->latitude,
        'longitude' => (float) $store->longitude,
        'products' => $store->products, // حسب الحاجة
    ]);
}
}
