<?php

namespace Database\Factories;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShopFactory extends Factory
{
    protected $model = Shop::class;

    public function definition()
    {
        $name = $this->faker->unique()->company();

        return [
            'user_id' => User::factory()->designer(),
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(3),
            'banner_image' => $this->faker->imageUrl(1200, 400, 'business'),
            'logo' => $this->faker->imageUrl(200, 200, 'business'),
            'status' => $this->faker->randomElement(['pending', 'active', 'inactive']),
            'verified_at' => $this->faker->optional(0.7)->dateTimeBetween('-1 year', 'now'), // 70% chance of being verified
        ];
    }

    public function active()
    {
        return $this->state([
            'status' => 'active',
            'verified_at' => now(),
        ]);
    }

    public function pending()
    {
        return $this->state([
            'status' => 'pending',
            'verified_at' => null,
        ]);
    }
}
