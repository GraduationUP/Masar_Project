<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreRequest;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{

    public function store(StoreRequest $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user->hasRole('admin') && !$user->hasRole('seller')) {
            return response()->json(['message' => 'Unauthorized. Only sellers can create stores.'], 403);
        }

        if ($user->store) {
            return response()->json(['message' => 'You already have a store.'], 400);
        }

        $idCardPath = $request->file('id_card_photo')->store('id_cards', 'public');

        $store = Store::create([
            'user_id' => $user->id,
            'store_name' => $request->store_name,
            'phone' => $request->phone,
            'location_address' => $request->location_address,
            'id_card_photo' => $idCardPath,
            'status' => false, // بانتظار موافقة المشرف
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,

        ]);

        return response()->json([
            'message' => 'Store created successfully!',
            'store' => $store,
        ], 201);
    }

    public function show(): JsonResponse
    {
        $user = Auth::user();

        if (!$user->hasRole('admin') && !$user->hasRole('seller')) {
            return response()->json(['message' => 'Unauthorized. Only sellers can view store.'], 403);
        }

        $store = $user->store;

        if (!$store) {
            return response()->json(['message' => 'No store found.'], 404);
        }

        // إضافة رابط الصورة الكامل
        $storeData = $store->toArray();
        $storeData['id_card_photo_url'] = $store->id_card_photo
            ? asset('storage/' . $store->id_card_photo)
            : null;

        return response()->json(['store' => $storeData]);
    }


    public function update(StoreRequest $request): JsonResponse
    {
        $user = Auth::user();

        if (!$user->hasRole('seller')) {
            return response()->json(['message' => 'Unauthorized. Only sellers can update stores.'], 403);
        }

        $store = $user->store;

        if (!$store) {
            return response()->json(['message' => 'No store found.'], 404);
        }

        $data = $request->only(['store_name', 'phone', 'location_address', 'latitude', 'longitude']);

        if ($request->hasFile('id_card_photo')) {
            $data['id_card_photo'] = $request->file('id_card_photo')->store('id_cards', 'public');
        }

        $store->fill($data)->save();

        return response()->json([
            'message' => 'Store updated successfully!',
            'store' => $store,
        ]);
    }
    public function destroy(): JsonResponse
    {
        $user = Auth::user();

        if (!$user->hasRole('admin') && !$user->hasRole('seller')) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $store = $user->store;

        if (!$store) {
            return response()->json(['message' => 'No store found.'], 404);
        }

        $store->delete();

        return response()->json(['message' => 'Store deleted successfully.']);
    }

    public function toggleStatus(): JsonResponse
{
    $store = Auth::user()->store;

    if (!$store) {
        return response()->json(['message' => 'Store not found.'], 404);
    }

    if (in_array($store->status, ['pending', 'banned'])) {
        return response()->json([
            'message' => 'You cannot change the status of a store that is pending or banned.'
        ], 403);
    }

    $store->status = $store->status === 'active' ? 'inactive' : 'active';
    $store->save();

    return response()->json([
        'message' => 'Store status changed successfully.',
        'new_status' => $store->status,
    ]);
}
}
