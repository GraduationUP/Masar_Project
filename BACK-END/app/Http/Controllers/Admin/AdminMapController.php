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

        return response()->json([
            'city' => 'غزة',


            'aids' => Service::where('type', 'aid')->get()->map(fn($s) => [
                'id'          => $s->id,
                'name' => $s->name,
                'status' => (bool) $s->status,
                'coordinates' => json_decode($s->coordinates),
            ]),

            'markets' => Service::where('type', 'market')->get()->map(fn($s) => [
                'id'          => $s->id,
                'name' => $s->name,
                'status' => (bool) $s->status,
                'coordinates' => json_decode($s->coordinates),
            ]),

            'GasStations' => Service::where('type', 'gas_station')->get()->map(fn($s) => [
                'id'          => $s->id,
                'name' => $s->name,
                'status' => (bool) $s->status,
                'coordinates' => json_decode($s->coordinates),
            ]),

            'stores' => Store::all()->map(fn($store) => [
                'id' => $store->id,
                'name' => $store->store_name,
                'status' => (bool) $store->status,
                'coordinates' => [(float) $store->latitude, (float) $store->longitude],
            ]),
        ]);
    }



public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'type'        => 'required|in:store,market,warehouse,aid,gas_station',
            'coordinates' => 'required|json', // نتوقع نص JSON لمصفوفة الإحداثيات
            'status'      => 'boolean',
        ]);

        $service = Service::create([
            'name'        => $request->name,
            'type'        => $request->type,
            'coordinates' => $request->coordinates,  // نخزن JSON كما هو
            'status'      => $request->status ?? true, // افتراضيًا مفعّل
        ]);

        return response()->json([
            'message' => 'Service added successfully.',
            'data'    => $service,
        ]);
    }

    // تعديل خدمة موجودة
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $request->validate([
            'name'        => 'sometimes|string|max:255',
            'type'        => 'sometimes|in:store,market,warehouse,aid,gas_station',
            'coordinates' => 'sometimes|json',
            'status'      => 'sometimes|boolean',
        ]);

        $service->update($request->only(['name', 'type', 'coordinates', 'status']));

        return response()->json([
            'message' => 'Service updated successfully.',
            'data'    => $service,
        ]);
    }
}
