<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{           use HasFactory;

        protected $guarded = [];
         public function store() {
        return $this->belongsTo(Store::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function analytics() {
        return $this->hasMany(Analytics::class);
    }

    public function location() {
        return $this->hasOne(ProductLocation::class);
    }

}
