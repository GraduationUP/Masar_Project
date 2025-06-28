<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Store;          // ✔️ استدعاء موديل المتاجر

class AdminMapController extends Controller
{
    /**
     * عرض جميع النقاط للخريطة:
     *  - كل الخدمات (store / market / warehouse) مهما كانت حالتها
     *  - كل المتاجر (نشطة أو معطَّلة)
     */
    public function index()
    {
        // الخدمات من جدول services
        $services = Service::all()->map(function ($service) {
            return [
                'id'        => $service->id,
                'name'      => $service->name,
                'type'      => $service->type,      // store | market | warehouse
                'latitude'  => (float) $service->latitude,
                'longitude' => (float) $service->longitude,
                'status'    => (bool)  $service->status,
            ];
        });

        // المتاجر من جدول stores
        $stores = Store::all()->map(function ($store) {
            return [
                'id'        => $store->id,
                'name'      => $store->store_name,
                'type'      => 'store',            // نوحّدها مع نوع service
                'latitude'  => (float) $store->latitude,
                'longitude' => (float) $store->longitude,
                'status'    => (bool)  $store->status,
            ];
        });

        // دمج النتائج
        $points = $services->merge($stores);

        return response()->json([
            'status' => true,
            'data'   => $points
        ]);
    }

    /* ───────── الدوال السابقة (store / update / destroy) كما هي ───────── */

    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string',
            'type'      => 'required|in:store,market,warehouse',
            'latitude'  => 'required',
            'longitude' => 'required',
        ]);

        $service = Service::create([
            'name'      => $request->name,
            'type'      => $request->type,
            'latitude'  => $request->latitude,
            'longitude' => $request->longitude,
            'status'    => true,
        ]);

        return response()->json([
            'message' => 'Service point added successfully.',
            'data'    => $service
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $request->validate([
            'name'      => 'sometimes|string',
            'type'      => 'sometimes|in:store,market,warehouse',
            'latitude'  => 'sometimes',
            'longitude' => 'sometimes',
            'status'    => 'sometimes|boolean',
        ]);

        $service->update($request->only(['name', 'type', 'latitude', 'longitude', 'status']));

        return response()->json([
            'message' => 'Service point updated successfully.',
            'data'    => $service
        ]);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Service point deleted successfully.'
        ]);
    }
}
