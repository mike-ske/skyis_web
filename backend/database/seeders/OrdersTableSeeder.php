<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\Shop;
use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
{
    public function run()
    {
        $users = User::where('role', 'customer')->take(5)->get();
        $shops = Shop::all();

        $statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        $paymentStatuses = ['pending', 'paid', 'failed', 'refunded'];

        foreach ($users as $user) {
            Order::create([
                'user_id' => $user->id,
                'shop_id' => $shops->random()->id,
                'total_amount' => rand(5000, 50000) / 100,
                'status' => $statuses[array_rand($statuses)],
                'payment_status' => $paymentStatuses[array_rand($paymentStatuses)],
                'delivery_address' => '123 Main St, City, Country',
            ]);
        }

        Order::factory()
            ->count(50)
            ->hasOrderItems(rand(1, 5))
            ->create();
    }
}
