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

        return response()->json([
            'city' => 'غزة',

            'aids' => Service::where('type', 'aid')->get()->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'status' => (bool) $s->status,
                'coordinates' => json_decode($s->coordinates),
            ]),

            'markets' => Service::where('type', 'market')->get()->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'status' => (bool) $s->status,
                'coordinates' => json_decode($s->coordinates),
            ]),

            'GasStations' => Service::where('type', 'gas_station')->get()->map(fn($s) => [
                'id' => $s->id,
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
        if (!auth::user() || !auth::user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:store,market,warehouse,aid,gas_station',
            'coordinates' => 'required|json',
            'status' => 'boolean',
        ]);

        $service = Service::create([
            'name' => $request->name,
            'type' => $request->type,
            'coordinates' => $request->coordinates,
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
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:store,market,warehouse,aid,gas_station',
            'coordinates' => 'sometimes|json',
            'status' => 'sometimes|boolean',
        ]);

        $service->update($request->only(['name', 'type', 'coordinates', 'status']));

        return response()->json([
            'message' => 'Service updated successfully.',
            'data' => $service,
        ]);
    }
}
