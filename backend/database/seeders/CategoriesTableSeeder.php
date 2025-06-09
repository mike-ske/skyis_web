<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategoriesTableSeeder extends Seeder
{
    public function run()
    {
        // Create main categories
        $mainCategories = [
            'Clothing',
            'Accessories',
            'Footwear',
            'Jewelry',
            'Bags'
        ];

        foreach ($mainCategories as $category) {
           Category::factory()->firstOrCreate([
                'name' => $category,
                'slug' => Str::slug($category),
            ]);
        }

        // Create subcategories
        $clothingSubcategories = [
            'Dresses',
            'Tops',
            'Bottoms',
            'Outerwear'
        ];

        $clothing = Category::where('name', 'Clothing')->first();

        foreach ($clothingSubcategories as $subcategory) {
            Category::factory()->create([
                'parent_id' => $clothing->id,
                'name' => $subcategory,
                'slug' => Str::slug($subcategory),
            ]);
        }

        // Create some inactive categories
        Category::factory()
            ->count(2)
            ->inactive()
            ->create();
    }
}
