<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        // Create 30 regular products
        Product::factory()
            ->count(30)
            ->published()
            ->create();

        // Create 10 rental-only products
        Product::factory()
            ->count(10)
            ->forRent()
            ->published()
            ->create();

        // Create 10 products available for both
        Product::factory()
            ->count(10)
            ->forBoth()
            ->published()
            ->create();

        // Create some featured products
        Product::factory()
            ->count(5)
            ->published()
            ->state([
                'featured' => true,
            ])
            ->create();
    }
}
