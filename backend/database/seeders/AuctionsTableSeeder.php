<?php

namespace Database\Seeders;

use App\Models\Auction;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
class AuctionsTableSeeder extends Seeder
{
    public function run()
    {
        // Create 20 active auctions
        Auction::factory()
            ->count(20)
            ->active()
            ->firstOrCreate();

        // Create 10 completed auctions
        Auction::factory()
            ->count(10)
            ->completed()
            ->firstOrCreate();

        // Create some pending auctions
        Auction::factory()
            ->count(5)
            ->state([
                'status' => 'pending',
                'start_date' => Carbon::now()->addDays(2),
                'end_date' => Carbon::now()->addDays(9)
            ])
            ->firstOrCreate();
    }
}
