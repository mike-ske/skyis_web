<?php

namespace Database\Factories;

use App\Models\Auction;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuctionFactory extends Factory
{
    protected $model = Auction::class;

    public function definition()
    {
        $startDate = Carbon::now()->subDays(rand(1, 30));
        $endDate = $startDate->copy()->addDays(rand(3, 14));
        $isCompleted = $endDate->isPast();

        return [
            'product_id' => Product::factory(),
            'starting_price' => $this->faker->randomFloat(2, 50, 500),
            'current_bid' => $isCompleted ? $this->faker->randomFloat(2, 60, 600) : null,
            'winner_id' => $isCompleted ? User::factory() : null,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'status' => $isCompleted ? 'completed' : $this->faker->randomElement(['pending', 'active']),
        ];
    }

    public function active()
    {
        return $this->state([
            'start_date' => Carbon::now()->subDay(),
            'end_date' => Carbon::now()->addDays(7),
            'status' => 'active'
        ]);
    }

    public function completed()
    {
        return $this->state([
            'start_date' => Carbon::now()->subDays(10),
            'end_date' => Carbon::now()->subDays(3),
            'status' => 'completed'
        ]);
    }
}
