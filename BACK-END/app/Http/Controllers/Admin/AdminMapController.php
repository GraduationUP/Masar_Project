<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Models\Store;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminMapController extends Controller
{
    public function index()
    {
        if (!auth::user() || !auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $serviceTypes = [
            'stores',
            'market',
            'aids',
            'gas_station',
            'restaurants',
            'car_services',
            'petrol_station',
            'internet',
            'delivery'
        ];

        $services = [];
        foreach ($serviceTypes as $type) {
            $services[$type] = Service::where('type', $type)->get()->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'status' => (bool) $s->status,
                'coordinates' => json_decode($s->coordinates),
            ]);
        }

        // إضافة المتاجر مع الإحداثيات
        $services['stores'] = Store::whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->where('status', 'active')
            ->get()
            ->map(fn($store) => [
                'id' => $store->id,
                'name' => $store->store_name,
                'status' => $store->status,
                'coordinates' => [(float) $store->latitude, (float) $store->longitude],
            ]);

        return response()->json([
            'city' => 'غزة',
            'services' => $services,
        ]);
    }



    public function store(Request $request)

    {
        if (!auth::user() || !auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:stores,market,aids,gas_station,restaurants,car_services,petrol_station,internet,delivery',
            'coordinates' => 'required|array',
            'status' => 'boolean',
        ]);


        $service = Service::create([
            'name' => $request->name,
            'type' => $request->type,
            'coordinates' => json_encode($request->coordinates),
            'status' => $request->status ?? true,
        ]);

        return response()->json([
            'message' => 'Service added successfully.',
            'data' => $service,
        ]);
    }

    public function update(Request $request, $id)
    {
        if (!auth::user() || !auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $service = Service::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:stores,market,aids,gas_station,restaurants,car_services,petrol_station,internet,delivery',
            'coordinates' => 'required|array',
            'status' => 'boolean',
        ]);

        $data = $request->only(['name', 'type', 'status']);

        if ($request->has('coordinates')) {
            $data['coordinates'] = json_encode($request->coordinates);
        }

        $service->update($data);

        return response()->json([
            'message' => 'Service updated successfully.',
            'data' => $service,
        ]);
    }
    public function destroy($id)
    {
        if (!Auth::check() || !Auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Service deleted successfully.'
        ]);
    }
}
