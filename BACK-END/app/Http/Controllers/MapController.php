<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MapController extends Controller
{
   public function getMapData()
{
    // أولًا: الخدمات من جدول services
    $services = Service::where('status', true)->get()->map(function ($service) {
        return [
            'id' => $service->id,
            'name' => $service->name,
            'type' => $service->type, // store / market / warehouse
            'latitude' => (float) $service->latitude,
            'longitude' => (float) $service->longitude,
        ];
    });

    // ثانيًا: المتاجر النشطة من جدول stores
    $activeStores = Store::where('status', 1)->get()->map(function ($store) {
        return [
            'id' => $store->id,
            'name' => $store->store_name,
            'type' => 'store', // نوحدها مع نوع service
            'latitude' => (float) $store->latitude,
            'longitude' => (float) $store->longitude,
        ];
    });

    // دمج النتائج في مصفوفة وحدة
    $combined = $services->merge($activeStores);

    return response()->json([
        'status' => true,
        'data' => $combined
    ]);
}

}
