<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ban extends Model
{
        use HasFactory;

        protected $guarded = [];
         public function target() {
        return $this->belongsTo(User::class, 'target_id');
    }

 public function admin()
{
    return $this->belongsTo(\App\Models\User::class, 'banned_by')->select('id', 'username');
}

}
