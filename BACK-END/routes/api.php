<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Seller\StoreController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::middleware('auth:sanctum')->post('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
    ->name('password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store']);

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])->middleware('auth:sanctum');
Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::middleware(['auth:sanctum'])->prefix('seller')->group(function () {

    // المتجر
    Route::post('/store', [StoreController::class, 'store']); // إنشاء المتجر
    Route::get('/store', [StoreController::class, 'show']);   // عرض المتجر
    Route::put('/store', [StoreController::class, 'update']);
    Route::delete('/store', [StoreController::class, 'destroy']);

});    // Route::post('/store', [StoreController::class, 'store']);
    // Route::put('/store', [StoreController::class, 'update']);

//     // المنتجات
//     Route::get('/products', [ProductController::class, 'index']);
//     Route::post('/products', [ProductController::class, 'store']);
//     Route::put('/products/{id}', [ProductController::class, 'update']);
//     Route::delete('/products/{id}', [ProductController::class, 'destroy']);
// });




