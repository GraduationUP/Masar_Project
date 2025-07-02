<?php

namespace App\Http\Controllers\Admin;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminStoreController extends Controller
{

  public function index()
{
    $stores = Store::with('user')->get();

    $data = $stores->map(function ($store) {
        return [
            'id' => $store->id,
            'user_id' => $store->user_id,
            'store_name' => $store->store_name,
            'id_card_photo' => $store->id_card_photo,
            'phone' => $store->phone,
            'location_address' => $store->location_address,
            'active' => $store->status,
            'is_banned' => $store->status == 0,  
            'created_at' => $store->created_at->toIso8601String(),
            'updated_at' => $store->updated_at->toIso8601String(),
            'latitude' => $store->latitude,
            'longitude' => $store->longitude,
            'user' => [
                'id' => $store->user->id,
                'first_name' => $store->user->first_name,
                'last_name' => $store->user->last_name,
                'username' => $store->user->username,
                'email' => $store->user->email,
                'created_at' => $store->user->created_at->toIso8601String(),
                'updated_at' => $store->user->updated_at->toIso8601String(),
            ],
        ];
    });

    return response()->json([
        'status' => true,
        'data' => $data,
    ]);
}


    public function show($id)
    {
        $store = Store::with('user', 'products')->findOrFail($id);

        return response()->json([
            'status' => true,
            'data' => $store
        ]);
    }

    public function banStore($id)
    {
        $store = Store::findOrFail($id);

        $store->status = false; // أو false حسب نوع العمود
        $store->save();

        return response()->json([
            'message' => 'Store has been deactivated.'
        ]);
    }

    public function unbanStore($id)
    {
        $store = Store::findOrFail($id);

        $store->status = true; // أو true
        $store->save();

        return response()->json([
            'message' => 'Store has been activated.'
        ]);
    }


    public function destroy($id)
    {
        $store = Store::findOrFail($id);
        $store->delete();

        return response()->json([
            'message' => 'Store deleted successfully.'
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $store = Store::findOrFail($id);
        $request->validate([
            'status' => 'required|in:0,1',
        ]);

        $store->status = $request->status;
        $store->save();

        return response()->json(['message' => 'Store status updated']);
    }
}
