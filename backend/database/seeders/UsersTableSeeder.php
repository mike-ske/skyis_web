<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // Create admin user
        User::factory()->admin()->create([
            'name' => 'Admin',
            'password' => Hash::make('password'),
        ]);

        // Create 5 designers
        User::factory()
            ->count(5)
            ->designer()
            ->create();

        // Create 20 customers
        User::factory()
            ->count(20)
            ->customer()
            ->create();

        // Create some inactive users
        User::factory()
            ->count(3)
            ->state([
                'status' => 'inactive'
            ])
            ->create();
    }
}
