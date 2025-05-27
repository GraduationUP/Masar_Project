<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\StoreController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('auth:sanctum');
Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify');





Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});

