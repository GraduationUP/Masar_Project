<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasRoles;
    public function store()
    {
        return $this->hasOne(Store::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function analytics()
    {
        return $this->hasMany(Analytics::class, 'seller_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function ban()
    {
        return $this->hasOne(Ban::class, 'target_id');
    }
public function admin()
{
    return $this->belongsTo(\App\Models\User::class, 'banned_by');
}

public function favouriteStores()
{
    return $this->belongsToMany(Store::class, 'favourite_stores', 'user_id', 'store_id')->withTimestamps();
}




    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
