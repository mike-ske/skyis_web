<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'session_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the cart.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items for the cart.
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Calculate the total quantity of items in the cart.
     */
    public function getTotalQuantityAttribute(): int
    {
        return $this->items->sum('quantity');
    }

    /**
     * Calculate the subtotal of the cart.
     */
    public function getSubtotalAttribute(): float
    {
        return $this->items->sum(function ($item) {
            return $item->quantity * $item->price;
        });
    }

    /**
     * Check if the cart is empty.
     */
    public function getIsEmptyAttribute(): bool
    {
        return $this->items->isEmpty();
    }

    /**
     * Add an item to the cart.
     */
    public function addItem(int $productId, int $quantity, float $price): CartItem
    {
        return $this->items()->updateOrCreate(
            ['product_id' => $productId],
            [
                'quantity' => $quantity,
                'price' => $price,
            ]
        );
    }

    /**
     * Update item quantity in the cart.
     */
    public function updateItem(int $cartItemId, int $quantity): bool
    {
        $item = $this->items()->where('id', $cartItemId)->first();
        
        if ($item) {
            return $item->update(['quantity' => $quantity]);
        }

        return false;
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(int $cartItemId): bool
    {
        $item = $this->items()->where('id', $cartItemId)->first();
        
        if ($item) {
            return $item->delete();
        }

        return false;
    }

    /**
     * Clear all items from the cart.
     */
    public function clear(): void
    {
        $this->items()->delete();
    }

    /**
     * Find cart by session ID or user ID.
     */
    public static function findBySessionOrUser(?string $sessionId, ?int $userId): ?Cart
    {
        if ($userId) {
            return static::where('user_id', $userId)->first();
        }

        if ($sessionId) {
            return static::where('session_id', $sessionId)->first();
        }

        return null;
    }

    /**
     * Merge guest cart with user cart after login.
     */
    public function mergeWithCart(Cart $guestCart): void
    {
        foreach ($guestCart->items as $guestItem) {
            $existingItem = $this->items()
                ->where('product_id', $guestItem->product_id)
                ->first();

            if ($existingItem) {
                $existingItem->update([
                    'quantity' => $existingItem->quantity + $guestItem->quantity,
                    'price' => $guestItem->price, // Use the latest price
                ]);
            } else {
                $this->items()->create([
                    'product_id' => $guestItem->product_id,
                    'quantity' => $guestItem->quantity,
                    'price' => $guestItem->price,
                ]);
            }
        }

        // Delete the guest cart after merging
        $guestCart->delete();
    }
}