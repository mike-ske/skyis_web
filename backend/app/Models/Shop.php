<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'banner_image',
        'logo',
        'status',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function collaborations()
    {
        return $this->hasMany(Collaboration::class);
    }

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'collaborations', 'shop_id', 'creator_id');
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }
}
