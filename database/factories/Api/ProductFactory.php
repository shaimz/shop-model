<?php

namespace Database\Factories\Api;

use App\Models\Api\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->text(20);
        return [
            'name' => $name,
            'description' => $this->faker->text(155),
            'url' => Str::slug($name),
            'category_id' => $this->faker->numberBetween(1,6),
            'price' => $this->faker->numberBetween(10,5500),
        ];
    }
}
