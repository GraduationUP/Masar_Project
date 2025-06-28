<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class AdminMapController extends Controller
{
    // عرض جميع النقاط (المتاجر، الأسواق، المخازن)
    public function index()
    {
        $services = Service::all();

        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    // إضافة نقطة جديدة للخريطة
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'type' => 'required|in:store,market,warehouse',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $service = Service::create([
            'name' => $request->name,
            'type' => $request->type,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => true, // مفعلة تلقائيًا
        ]);

        return response()->json([
            'message' => 'Service point added successfully.',
            'data' => $service
        ]);
    }

    // تعديل نقطة موجودة
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string',
            'type' => 'sometimes|in:store,market,warehouse',
            'latitude' => 'sometimes',
            'longitude' => 'sometimes',
            'status' => 'sometimes|boolean',
        ]);

        $service->update($request->only(['name', 'type', 'latitude', 'longitude', 'status']));

        return response()->json([
            'message' => 'Service point updated successfully.',
            'data' => $service
        ]);
    }

    // حذف نقطة من الخريطة
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json([
            'message' => 'Service point deleted successfully.'
        ]);
    }
}
