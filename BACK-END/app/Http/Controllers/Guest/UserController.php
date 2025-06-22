<?php

namespace App\Http\Controllers\Guest;

use App\Models\User;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
 public function show($id)
 {
  $user = User::with('store')->findOrFail($id);

  return response()->json([
   'id' => $user->id,
   'first_name' => $user->first_name,
   'last_name' => $user->last_name,
   'username' => $user->username,
   'store' => $user->store,
  ]);
 }
}

