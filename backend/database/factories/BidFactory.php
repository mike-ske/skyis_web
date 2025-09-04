<?php

namespace Database\Factories;

use App\Models\Bid;
use App\Models\Auction;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BidFactory extends Factory
{
    protected $model = Bid::class;

    public function definition()
    {
        return [
            'auction_id' => Auction::factory(),
            'user_id' => User::factory(),
            'amount' => $this->faker->randomFloat(2, 50, 1000),
            'auto_increment' => $this->faker->boolean(30),
            'status' => $this->faker->randomElement(['active', 'outbid', 'winning', 'lost']),
        ];
    }

    public function winning()
    {
        return $this->state([
            'status' => 'winning'
        ]);
    }

    public function active()
    {
        return $this->state([
            'status' => 'active'
        ]);
    }
}
