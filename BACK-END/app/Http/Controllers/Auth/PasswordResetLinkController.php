<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Password;

class PasswordResetLinkController extends Controller
{
   public function store(Request $request)
{
    $request->validate(['email' => ['required', 'email']]);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    // أضف هذا السطر للتصحيح
    \Log::info("Password reset link status: ".$status);

    if ($status !== Password::RESET_LINK_SENT) {
        return response()->json(['message' => __($status)], 422);
    }

    return response()->json([
        'message' => __($status),
        'status' => 'success'
    ]);
}
}
