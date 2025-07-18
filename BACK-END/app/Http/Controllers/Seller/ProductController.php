<?php

namespace App\Http\Controllers\Seller;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $store = Auth::user()->store;

        if (!$store) {
            return response()->json(['message' => 'Store not found.'], 404);
        }

        return response()->json([
            'products' => $store->products()->with('category')->get()
        ]);
    }

    public function store(ProductRequest $request)
    {

        try {
            $user = Auth::user();
            $store = $user->store;
            if (!$store) {
                return response()->json(['message' => 'Store not found for this user'], 404);
            }

            // رفع الصورة إن وجدت
            $photoPath = null;
            if ($request->hasFile('photo')) {
                $photoPath = $request->file('photo')->store('products', 'public');
            }

            // إنشاء المنتج
            $product = $store->products()->create([
                'name' => $request->name,
                'description' => $request->description,
                'photo' => $photoPath,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'latitude' => $request->latitude ?? 31.41,     // تعويض بقيمة افتراضية لو null
    'longitude' => $request->longitude ?? 34.39,   // تعويض بقيمة افتراضية لو nu
                'show_location' => $request->show_location ?? true,
            ]);

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product,
            ], 201);
      } catch (\Exception $e) {
    return response()->json([
        'message' => 'Failed to create product',
        'error' => $e->getMessage(),
        'trace' => $e->getTrace(), // أضف هذا مؤقتًا لتفاصيل أعمق
    ], 500);
}
}



    public function update(ProductRequest $request, Product $product)
    {
        $store = Auth::user()->store;

        if (!$store || $product->store_id !== $store->id) {
            return response()->json(['message' => 'Unauthorized or product not found.'], 403);
        }

        try {
            $updateData = $request->only([
                'name',
                'description',
                'category_id',
                'price',
                'latitude',
                'longitude',
                'show_location'
            ]);

            if ($request->hasFile('photo')) {
                // Delete old photo if it exists
                if ($product->photo) {
                    Storage::disk('public')->delete($product->photo);
                }
                $updateData['photo'] = $request->file('photo')->store('products', 'public');
            }

            $product->update($updateData);

            Log::info('Product updated', ['product_id' => $product->id]);

            return response()->json([
                'message' => 'Product updated successfully.',
                'product' => $product->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Product update failed', [
                'product_id' => $product->id,
                'error'      => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to update product.'], 500);
        }
    }

    public function destroy(Product $product)
    {
        $store = Auth::user()->store;

        if (!$store || $product->store_id !== $store->id) {
            return response()->json(['message' => 'Unauthorized or product not found.'], 403);
        }

        try {
            if ($product->photo) {
                Storage::disk('public')->delete($product->photo);
            }

            $product->delete();

            Log::info('Product deleted', ['product_id' => $product->id]);

            return response()->json(['message' => 'Product deleted successfully.']);
        } catch (\Exception $e) {
            Log::error('Product deletion failed', [
                'product_id' => $product->id,
                'error'      => $e->getMessage()
            ]);
            return response()->json(['message' => 'Failed to delete product.'], 500);
        }
    }
}
