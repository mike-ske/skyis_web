<?php

namespace Database\Seeders;

use App\Models\Shop;
use Illuminate\Database\Seeder;

class ShopsTableSeeder extends Seeder
{
    public function run()
    {
        // Create 10 active shops
        Shop::factory()
            ->count(10)
            ->active()
            ->create();

        // Create 3 pending shops
        Shop::factory()
            ->count(3)
            ->pending()
            ->create();

        // Create some inactive shops
        Shop::factory()
            ->count(2)
            ->state([
                'status' => 'inactive'
            ])
            ->create();
    }
}
