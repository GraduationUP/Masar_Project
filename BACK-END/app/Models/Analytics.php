<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Analytics extends Model
{
        use HasFactory;

    protected $guarded = [];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function seller() {
        return $this->belongsTo(User::class, 'seller_id');
    }
}
