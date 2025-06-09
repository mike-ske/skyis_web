<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Shop;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
             UsersTableSeeder::class,
            ShopsTableSeeder::class,
            CategoriesTableSeeder::class,
            ProductsTableSeeder::class,
            AuctionsTableSeeder::class,
            BidsTableSeeder::class,
            OrdersTableSeeder::class,
            ReviewsTableSeeder::class,
            // Add other seeders as needed
        ]);
        // Create admin user if doesn't exist
        User::firstOrCreate(
            ['email' => 'admin@skyis.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // Create designer user if doesn't exist
        $designer = User::firstOrCreate(
            ['email' => 'designer@skyis.com'],
            [
                'name' => 'Fashion Designer',
                'password' => Hash::make('password'),
                'role' => 'designer',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // Create sample shop
        $shop = Shop::create([
            'user_id' => $designer->id,
            'name' => 'Skyis Fashion House',
            'slug' => 'skyis-fashion-house',
            'description' => 'Premium fashion designs for modern people',
            'status' => 'active',
            'verified_at' => now(),
        ]);

        // Create categories
        $categories = [
            ['name' => 'Clothing', 'slug' => 'clothing', 'status' => true],
            ['name' => 'Accessories', 'slug' => 'accessories', 'status' => true],
            ['name' => 'Footwear', 'slug' => 'footwear', 'status' => true],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create sample products
        $clothingCategory = Category::where('slug', 'clothing')->first();

        $products = [
            [
                'shop_id' => $shop->id,
                'category_id' => $clothingCategory->id,
                'name' => 'Premium Silk Dress',
                'slug' => 'premium-silk-dress',
                'description' => 'Elegant silk dress for special occasions',
                'price' => 199.99,
                'rental_price' => 49.99,
                'condition' => 'new',
                'type' => 'both',
                'status' => 'published',
                'featured' => true,
            ],
            [
                'shop_id' => $shop->id,
                'category_id' => $clothingCategory->id,
                'name' => 'Designer Denim Jacket',
                'slug' => 'designer-denim-jacket',
                'description' => 'Handcrafted denim jacket with unique details',
                'price' => 149.99,
                'condition' => 'new',
                'type' => 'sell',
                'status' => 'published',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
