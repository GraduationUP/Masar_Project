<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MapController extends Controller
{
    public function getMapData()
    {
        // جلب كل النقاط المفعلة فقط (store, market, warehouse)
        $services = Service::where('status', true)->get()->map(function ($service) {
            return [
                'id' => $service->id,
                'name' => $service->name,
                'type' => $service->type,
                'latitude' => (float) $service->latitude,
                'longitude' => (float) $service->longitude,
            ];
        });

        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }
}
