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
        $favourites = auth::user()
            ->favouriteStores()
            ->select('stores.*') // نضمن إرجاع أعمدة المتجر
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


    // إضافة متجر للمفضلة
    public function store($storeId)
    {
        $store = Store::findOrFail($storeId);
        Auth::user()->favouriteStores()->syncWithoutDetaching([$store->id]);

        return response()->json(['message' => 'Store added to favourites']);
    }

    // إزالة متجر من المفضلة
    public function destroy($storeId)
    {
        Auth::user()->favouriteStores()->detach($storeId);
        return response()->json(['message' => 'Store removed from favourites']);
    }
}
