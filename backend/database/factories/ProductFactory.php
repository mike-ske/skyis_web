<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Shop;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        $name = $this->faker->unique()->words(3, true);

        return [
            'shop_id' => Shop::factory(),
            'category_id' => Category::factory(),
            'name' => ucfirst($name),
            'slug' => str_replace(' ', '-', strtolower($name)),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'rental_price' => $this->faker->optional(0.7)->randomFloat(2, 5, 100), // 70% chance of having rental price
            'condition' => $this->faker->randomElement(['new', 'used', 'refurbished']),
            'type' => $this->faker->randomElement(['sell', 'rent', 'both']),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'featured' => $this->faker->boolean(20), // 20% chance of being featured
        ];
    }

    // Factory States for different product types
    public function forSale()
    {
        return $this->state([
            'type' => 'sell',
            'rental_price' => null,
        ]);
    }

    public function forRent()
    {
        return $this->state([
            'type' => 'rent',
            'rental_price' => $this->faker->randomFloat(2, 5, 100),
        ]);
    }

    public function forBoth()
    {
        return $this->state([
            'type' => 'both',
            'rental_price' => $this->faker->randomFloat(2, 5, 100),
        ]);
    }

    public function published()
    {
        return $this->state([
            'status' => 'published',
        ]);
    }
}
