<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_description',
        'product_price',
        'price',
        'quantity',
        'total',
        'product_attributes',
    ];

    protected $casts = [
        'product_price' => 'decimal:2',
        'price' => 'decimal:2',
        'total' => 'decimal:2',
        'quantity' => 'integer',
        'product_attributes' => 'array',
    ];

    protected $appends = [
        'formatted_price',
        'formatted_total',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }

    public function getFormattedTotalAttribute(): string
    {
        return '$' . number_format($this->total, 2);
    }

    public function getProductAttributesLabelAttribute(): string
    {
        if (empty($this->product_attributes)) {
            return '';
        }

        return collect($this->product_attributes)
            ->map(function ($value, $key) {
                return ucfirst($key) . ': ' . $value;
            })
            ->implode(', ');
    }

    public static function createFromCartItem(CartItem $cartItem, int $orderId): self
    {
        return static::create([
            'order_id' => $orderId,
            'product_id' => $cartItem->product_id,
            'product_name' => $cartItem->product->name,
            'product_description' => $cartItem->product->description,
            'product_price' => $cartItem->product->price,
            'price' => $cartItem->price,
            'quantity' => $cartItem->quantity,
            'total' => $cartItem->quantity * $cartItem->price,
            'product_attributes' => $cartItem->product_attributes, // if you have product variations
        ]);
    }

    public function updateProductStock(): void
    {
        if ($this->product) {
            $this->product->decrement('stock_quantity', $this->quantity);
        }
    }

    public function restoreProductStock(): void
    {
        if ($this->product) {
            $this->product->increment('stock_quantity', $this->quantity);
        }
    }
}