<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Store extends Model
{       use HasFactory;
        protected $guarded = [];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->hasMany(Product::class);
    }

    public function ratings() {
        return $this->hasMany(Rating::class);
    }

    public function comments()
{
    return $this->hasMany(\App\Models\Comment::class);
}

public function scopeActive($query)
{
   return $query->where('status', true);
}

public function favouritedBy()
{
    return $this->belongsToMany(User::class, 'favourite_stores', 'store_id', 'user_id')->withTimestamps();
}

public function getStorePhotoUrlAttribute()
{
    return $this->id_card_photo
        ? asset('storage/' . $this->id_card_photo)
        : null;
}



}
