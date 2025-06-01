<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Seller\StoreController;
use App\Http\Controllers\Seller\ProductController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Seller\DashboardController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Guest\StoreController as GuestStoreController;
use App\Http\Controllers\Seller\StoreController as SellerStoreController;
use App\Http\Controllers\Guest\ProductController as GuestProductController;

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

    Route::post('/store', [StoreController::class, 'store']);
    Route::get('/store', [StoreController::class, 'show']);
    Route::put('/store', [StoreController::class, 'update']);
    Route::delete('/store', [StoreController::class, 'destroy']);



Route::post('/products', [ProductController::class, 'store']);
Route::get('/products', [ProductController::class, 'index']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);
Route::get('/dashboard', [DashboardController::class, 'index']);

});

Route::get('/guest/stores', [GuestStoreController::class, 'index']);
Route::get('/guest/products', [ProductController::class, 'index']);
