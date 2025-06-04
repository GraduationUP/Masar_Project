<?php

namespace Database\Factories;

use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StoreFactory extends Factory
{
    protected $model = Store::class;

    public function definition(): array
    {
        return [

            'user_id' => null, // أو يتم تمريره يدويًا عند الاستخدام
            'store_name' => $this->faker->company,
            'id_card_photo' => 'default-id.jpg', // صورة وهمية أو static
            'phone' => $this->faker->phoneNumber,
            'location_address' => $this->faker->address,
            'status' => true,
        ];
    }
}
