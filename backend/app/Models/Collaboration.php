<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collaboration extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'creator_id',
        'title',
        'description',
        'budget',
        'deadline',
        'status',
    ];

    protected $casts = [
        'deadline' => 'date',
    ];

    // Relationships
    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
