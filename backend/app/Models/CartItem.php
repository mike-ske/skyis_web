<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'cart_id',
        'product_id',
        'quantity',
        'price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'total',
    ];

    /**
     * Get the cart that owns the cart item.
     */
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    /**
     * Get the product that owns the cart item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Calculate the total price for this item.
     */
    public function getTotalAttribute(): float
    {
        return $this->quantity * $this->price;
    }

    /**
     * Increment the quantity of the cart item.
     */
    public function incrementQuantity(int $amount = 1): bool
    {
        return $this->update([
            'quantity' => $this->quantity + $amount
        ]);
    }

    /**
     * Decrement the quantity of the cart item.
     */
    public function decrementQuantity(int $amount = 1): bool
    {
        $newQuantity = max(0, $this->quantity - $amount);
        
        if ($newQuantity === 0) {
            return $this->delete();
        }

        return $this->update([
            'quantity' => $newQuantity
        ]);
    }

    /**
     * Update the price of the cart item.
     */
    public function updatePrice(float $newPrice): bool
    {
        return $this->update(['price' => $newPrice]);
    }

    /**
     * Check if the item is for a specific product.
     */
    public function isForProduct(int $productId): bool
    {
        return $this->product_id === $productId;
    }

    /**
     * Scope a query to only include items for a specific product.
     */
    public function scopeForProduct($query, int $productId)
    {
        return $query->where('product_id', $productId);
    }

    /**
     * Scope a query to only include items with positive quantity.
     */
    public function scopeWithQuantity($query)
    {
        return $query->where('quantity', '>', 0);
    }

    /**
     * Boot method for the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-delete if quantity becomes zero
        static::updating(function ($cartItem) {
            if ($cartItem->quantity <= 0) {
                $cartItem->delete();
                return false;
            }
        });
    }
}