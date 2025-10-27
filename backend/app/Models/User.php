<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'password',
        'avatar',
        'bio',
        'location',
        'status',
        'first_name',
        'last_name', 
        'provider',
        'provider_id',
        'avatar',
        'email_verified_at',
        'google_id',
        
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relationships
    public function shops()
    {
        return $this->hasMany(Shop::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function bids()
    {
        return $this->hasMany(Bid::class);
    }

    public function wonAuctions()
    {
        return $this->hasMany(Auction::class, 'winner_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function collaborations()
    {
        return $this->hasMany(Collaboration::class, 'creator_id');
    }

    public function collaboratingShops()
    {
        return $this->belongsToMany(Shop::class, 'collaborations', 'creator_id', 'shop_id');
    }
    // Accessor for full name
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function getOrCreateCart()
    {
        if (!$this->cart) {
            $this->cart()->create();
        }
        return $this->cart;
    }
}
