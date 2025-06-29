<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Store;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'store_id' => null,
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 5, 100),
            'category_id' => 1,
           'latitude' => $request->latitude ?? $product->latitude ?? 31.41,
            'longitude' => $request->longitude ?? $product->longitude ?? 34.39,
        ];
    }
}
