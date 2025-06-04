<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
 public function show($id)
 {
  $user = User::findOrFail($id);

  // تحقق إنه المستخدم نفسه مش يطلب بيانات غيره
  if (Auth::id() !== $user->id) {
   return response()->json(['message' => 'Unauthorized'], 403);
  }

  return response()->json([
   'id' => $user->id,
   'first_name' => $user->first_name,
   'last_name' => $user->last_name,
   'username' => $user->username,
   'email' => $user->email,
   'role' => $user->getRoleNames()->first(),
  ]);
 }
}

