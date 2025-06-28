<?php

namespace App\Http\Controllers\Admin;

use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminStoreController extends Controller
{
    public function index()
    {
        $stores = Store::with('user')->get(); // لو عندك علاقة user

        return response()->json([
            'status' => true,
            'data' => $stores
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
