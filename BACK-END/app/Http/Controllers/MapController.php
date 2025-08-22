<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\Service;
use Illuminate\Routing\Controller;

class MapController extends Controller
{
    public function getMapData()
    {
        $serviceTypes = [
            'aids',
            'market',
            'gas_station',
            'restaurants',
            'car_services',
            'petrol_station',
            'internet',
            'delivery'
        ];

        $services = [];

        foreach ($serviceTypes as $type) {
            $services[$type] = Service::where('type', $type)
                ->where('status', true)
                ->get()
                ->map(fn($s) => [
                    'id' => $s->id,
                    'name' => $s->name,
                    'coordinates' => json_decode($s->coordinates),
                ]);
        }

        // إضافة المتاجر مع الإحداثيات
        $services['stores'] = Store::where('status', 1)
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get()
            ->map(fn($store) => [
                'store_id'=> $store->id,
                'name' => $store->store_name,
                'coordinates' => [(float) $store->latitude, (float) $store->longitude],
            ]);

        return response()->json([
            'city' => 'غزة',
            'services' => $services,
        ]);
    }
}
