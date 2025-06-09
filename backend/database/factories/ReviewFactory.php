<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Review;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition()
    {
        $reviewable = $this->reviewableType();

        return [
            'user_id' => User::factory(),
            'reviewable_id' => $reviewable['id'],
            'reviewable_type' => $reviewable['type'],
            'rating' => $this->faker->numberBetween(1, 5),
            'comment' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }

    private function reviewableType()
    {
        $type = $this->faker->randomElement([Product::class, Shop::class]);

        return [
            'id' => $type::factory()->create()->id,
            'type' => $type
        ];
    }

    public function approved()
    {
        return $this->state([
            'status' => 'approved'
        ]);
    }

    public function forProduct()
    {
        return $this->state([
            'reviewable_id' => Product::factory(),
            'reviewable_type' => Product::class
        ]);
    }

    public function forShop()
    {
        return $this->state([
            'reviewable_id' => Shop::factory(),
            'reviewable_type' => Shop::class
        ]);
    }
}
