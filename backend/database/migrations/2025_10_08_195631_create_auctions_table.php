<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuctionsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('auctions', function (Blueprint $table) {
            $table->id();
            // product_id should reference your products table (assumes 'products' exists)
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            
            $table->decimal('starting_price', 15, 2)->default(0.00);
            $table->decimal('current_bid', 15, 2)->nullable();
            
            // winner_id references users when auction ends; nullable while open
            $table->foreignId('winner_id')->nullable()->constrained('users')->onDelete('set null');
            
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            
            // status: open, closed, cancelled, etc.
            $table->string('status', 32)->default('open');
            
            $table->timestamps();
            $table->enum('status', ['upcoming', 'active', 'ended'])->default('upcoming');
            // Useful indices
            $table->index(['product_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('auctions');
    }
}
