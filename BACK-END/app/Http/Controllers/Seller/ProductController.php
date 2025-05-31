<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

    public function store(Request $request)
    {
        $store = Auth::user()->store;

        if (!$store) {
            return response()->json(['message' => 'Store not found.'], 404);
        }

        try {
            $photoPath = $request->file('photo')?->store('products', 'public');

            $product = $store->products()->create([
                'name'          => $request->name,
                'description'   => $request->description,
                'photo'         => $photoPath,
                'category_id'   => $request->category_id,
                'price'         => $request->price,
                'latitude'      => $request->latitude,
                'longitude'     => $request->longitude,
                'show_location' => $request->boolean('show_location', true),
            ]);

            Log::info('Product created', ['product_id' => $product->id]);

            return response()->json([
                'message' => 'Product created successfully.',
                'product' => $product->load('category')
            ], 201);
        } catch (\Exception $e) {
            Log::error('Product creation failed', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Failed to create product.'], 500);
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
                'name', 'description', 'category_id',
                'price', 'latitude', 'longitude', 'show_location'
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
