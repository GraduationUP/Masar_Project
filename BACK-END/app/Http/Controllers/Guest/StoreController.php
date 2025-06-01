<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::where('status', true)->get();

        return response()->json([
            'status' => true,
            'data' => $stores
        ]);
    }
}
