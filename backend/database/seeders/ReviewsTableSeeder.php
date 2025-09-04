<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    public function run()
    {
        // Create 50 product reviews
        Review::factory()
            ->count(50)
            ->forProduct()
            ->approved()
            ->firstOrCreate();

        // Create 30 shop reviews
        Review::factory()
            ->count(30)
            ->forShop()
            ->approved()
            ->firstOrCreate();

        // Create some pending reviews
        Review::factory()
            ->count(20)
            ->state([
                'status' => 'pending'
            ])
            ->firstOrCreate();
    }
}
