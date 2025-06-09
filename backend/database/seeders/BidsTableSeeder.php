<?php

namespace Database\Seeders;

use App\Models\Bid;
use Illuminate\Database\Seeder;

class BidsTableSeeder extends Seeder
{
    public function run()
    {
        // Create 50 random bids
        Bid::factory()
            ->count(50)
            ->firstOrCreate();

        // Create some winning bids
        Bid::factory()
            ->count(10)
            ->winning()
            ->firstOrCreate();
    }
}
