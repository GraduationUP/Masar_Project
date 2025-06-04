<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MapController extends Controller
{
   public function getMapData()
   {
      $filePath = resource_path('data/mapData.json');

      if (!file_exists($filePath)) {
         return response()->json([
            'message' => 'Map data file not found.',
         ], 404);
      }

      // قراءة البيانات من ملف json
      $json = file_get_contents($filePath);
      $mapData = json_decode($json, true);

      // جلب المتاجر من قاعدة البيانات
      $stores = Store::select('id', 'store_name', 'latitude', 'longitude')
         ->whereNotNull('latitude')
         ->whereNotNull('longitude')
         ->get()
         ->map(function ($store) {
            return [
               'id' => $store->id,
               'name' => $store->store_name,
               'latitude' => (float) $store->latitude,
               'longitude' => (float) $store->longitude,
               'link' => url("/api/stores/" . $store->id),
            ];
         });

      // دمج المتاجر مع بيانات الجيسون
      $mapData['stores'] = $stores;

      return response()->json($mapData);
   }
}
