<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'role' => $this->faker->randomElement(['customer', 'designer', 'admin']),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'avatar' => $this->faker->imageUrl(200, 200, 'people'),
            'bio' => $this->faker->paragraph(),
            'location' => $this->faker->city(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'suspended']),
            'remember_token' => Str::random(10),
        ];
    }

    public function admin()
    {
        return $this->state([
            'role' => 'admin',
            'email' => 'admin@skyis.com',
            'status' => 'active',
        ]);
    }

    public function designer()
    {
        return $this->state([
            'role' => 'designer',
            'status' => 'active',
        ]);
    }

    public function customer()
    {
        return $this->state([
            'role' => 'customer',
            'status' => 'active',
        ]);
    }

    public function unverified()
    {
        return $this->state([
            'email_verified_at' => null,
        ]);
    }
}
