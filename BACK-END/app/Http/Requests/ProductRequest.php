<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        // نفترض إن المصادقة متحكم فيها بالـ middleware
        return true;
    }

    public function rules(): array
    {
        if ($this->isMethod('POST')) {
            // قواعد عند إنشاء منتج جديد
            return [
                'name' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'photo' => ['required', 'image', 'max:2048'],  // الصورة مطلوبة عند الإنشاء
                'category_id' => ['required', 'exists:categories,id'],
                'price' => ['required', 'numeric', 'min:0'],
                'latitude' => ['nullable', 'numeric'],
                'longitude' => ['nullable', 'numeric'],
                'show_location' => ['nullable', 'boolean'],
            ];
        }

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            // قواعد عند تحديث المنتج: الحقول تكون اختيارية (nullable) أو sometimes
            return [
                'name' => ['sometimes', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'photo' => ['nullable', 'image', 'max:2048'],  // الصورة اختيارية عند التحديث
                'category_id' => ['sometimes', 'exists:categories,id'],
                'price' => ['sometimes', 'numeric', 'min:0'],
                'latitude' => ['nullable', 'numeric'],
                'longitude' => ['nullable', 'numeric'],
                'show_location' => ['nullable', 'boolean'],
            ];
        }

        // افتراضياً، لا قواعد (ممكن تضيف قواعد للطلبات الأخرى لو حبيت)
        return [];
    }
}
