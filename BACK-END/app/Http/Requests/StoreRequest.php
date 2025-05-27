<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // لاحقًا ممكن نستخدمها مع الصلاحيات
    }

    public function rules(): array
    {
        return [
            'store_name' => 'required|string|max:255',
            'id_card_photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'phone' => 'required|string|max:20',
            'location_address' => 'required|string|max:255',
            'status' => 'required|boolean',
        ];
    }

}
