<?php

namespace App\Http\Controllers\Guest;

use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
 public function show($id)
 {
  $user = User::with('store')->findOrFail($id);

  return response()->json([
   'id' => $user->id,
   'first_name' => $user->first_name,
   'last_name' => $user->last_name,
   'username' => $user->username,
   'store' => $user->store,
  ]);
 }

 public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json([
                'status' => false,
                'message' => 'يرجى إدخال كلمة للبحث.',
            ], 400);
        }

        // البحث في المنتجات (اسم أو وصف)
        $products = Product::where('name', 'LIKE', "%$query%")
            ->orWhere('description', 'LIKE', "%$query%")
            ->with('store:id,store_name') // لو بدك تجيب اسم المتجر المرتبط
            ->get();

        $stores = Store::where('store_name', 'LIKE', "%$query%")
            ->orWhere('location_address', 'LIKE', "%$query%")

            ->get();

        return response()->json([
            'status' => true,
            'query' => $query,
            'products' => $products,
            'stores' => $stores,
        ]);
    }
}


