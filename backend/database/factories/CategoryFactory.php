<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition()
    {
        $name = $this->faker->unique()->word();

        return [
            'parent_id' => null,
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence(),
            'image' => $this->faker->imageUrl(400, 400, 'fashion'),
            'status' => true,
        ];
    }

    public function withParent()
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => Category::factory(),
            ];
        });
    }

    public function inactive()
    {
        return $this->state([
            'status' => false,
        ]);
    }
}
