<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBidsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bids', function (Blueprint $table) {
            $table->id();

            // link to auction
            $table->foreignId('auction_id')->constrained('auctions')->onDelete('cascade');

            // user who placed the bid
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // bid amount, allow large numbers and cents
            $table->decimal('amount', 15, 2);

            // optional: whether bid is active/accepted/rejected — useful for admin/logic
            $table->string('status', 32)->default('placed'); // placed, accepted, outbid, cancelled

            // optional: metadata (json) for extensibility
            $table->json('meta')->nullable();

            $table->timestamps();

            // faster lookups for highest bids
            $table->index(['auction_id', 'amount']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bids');
    }
}
