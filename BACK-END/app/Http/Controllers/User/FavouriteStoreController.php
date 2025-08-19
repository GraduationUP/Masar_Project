<?php

namespace App\Http\Controllers\User;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FavouriteStoreController extends Controller
{
    // عرض المفضلات
    public function index()
    {
        $favourites = Auth::user()
            ->favouriteStores()
            ->select('stores.*')
            ->get()
            ->map(function ($store) {
                return [
                    'id' => $store->id,
                    'store_name' => $store->store_name,
                    'phone' => $store->phone,
                    'location_address' => $store->location_address,
                    'status' => $store->status,
                    'latitude' => $store->latitude,
                    'longitude' => $store->longitude,
                    'store_image' => $store->id_card_photo
                        ? asset('storage/' . $store->id_card_photo)
                        : null,
                    'created_at' => $store->created_at,
                ];
            });

        return response()->json($favourites);
    }

    // إضافة أو إزالة المتجر من المفضلة
    public function toggle($storeId)
    {
        $store = Store::findOrFail($storeId);
        $user = Auth::user();

        if ($user->favouriteStores()->where('store_id', $storeId)->exists()) {
            // إذا موجود، يشيل المتجر
            $user->favouriteStores()->detach($storeId);
            return response()->json(['message' => 'تم ازالة المتجر من المفضلة']);
        } else {
            // إذا مش موجود، يضيف المتجر
            $user->favouriteStores()->attach($storeId);
            return response()->json(['message' => 'تم اضافة المتجر الى المفضلة']);
        }
    }
}
