<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AdminCategoryController extends Controller
{
    // عرض جميع التصنيفات
    public function index()
    {
         if (!Auth::user()->hasRole('admin')) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

        return response()->json(Category::all());
    }

    // إضافة تصنيف جديد
 public function store(Request $request)
{
    if (!Auth::user()->hasRole('admin')) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $request->validate([
        'name' => 'required|string|unique:categories,name',
    ]);

    $category = Category::create([
        'name' => $request->name,
    ]);

    return response()->json([
        'message' => 'تم إنشاء التصنيف بنجاح',
        'category' => $category
    ], 201);
}


    // تعديل تصنيف
    public function update(Request $request, Category $category)
    {
     if (!Auth::user()->hasRole('admin')) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

        $request->validate([
            'name' => 'required|string|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'message' => 'تم تعديل التصنيف بنجاح',
            'category' => $category
        ]);
    }

    // حذف تصنيف
    public function destroy(Category $category)
    {
     if (!Auth::user()->hasRole('admin')) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

        $category->delete();

        return response()->json([
            'message' => 'تم حذف التصنيف بنجاح'
        ]);
    }
}
