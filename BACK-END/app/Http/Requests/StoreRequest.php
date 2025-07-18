<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // تأكد أنه مسموح لأي مستخدم مصادق يرسل الطلب
    }
public function rules(): array
{
    if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
        return [
            'store_name' => 'sometimes|string|max:255',
            'id_card_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'phone' => 'sometimes|string|max:20',
            'location_address' => 'sometimes|string|max:255',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ];
    }

    return [
        'store_name' => 'required|string|max:255',
        'id_card_photo' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        'phone' => 'required|string|max:20',
        'location_address' => 'required|string|max:255',
        'latitude' => 'nullable|numeric',
        'longitude' => 'nullable|numeric',
    ];
}
}
