<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\RatingController;
use App\Http\Controllers\Seller\StoreController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\Guest\CategoryController;
use App\Http\Controllers\Seller\ProductController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Seller\DashboardController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\UserController as AdminUsersController;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Guest\UserController as GuestUserController;
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
Route::get('/guest/stores/{id}', [GuestStoreController::class, 'show']);

Route::get('/guest/products', [GuestProductController::class, 'index']);
Route::get('/guest/products/{id}', [GuestProductController::class, 'show']);

Route::get('/guest/categories', [CategoryController::class, 'index']);


Route::get('/map-data', [MapController::class, 'getMapData']);

Route::get('/stores/{id}', [GuestStoreController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/{id}', [UserController::class, 'show']);   // عرض الملف الشخصي
    Route::put('/users/{id}', [UserController::class, 'update']); // تعديل الملف الشخصي
    Route::post('/users/change-password', [UserController::class, 'changePassword']);

});
// راوت للزوار (مش مسجلين) يشوفوا بيانات عامة فقط
Route::get('/guest/users/{id}', [GuestUserController::class, 'show']);

//Rating Routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/stores/{store}/ratings', [RatingController::class, 'store']);
    Route::put('/ratings/{rating}', [RatingController::class, 'update']);
    Route::delete('/ratings/{rating}', [RatingController::class, 'destroy']);
});

//comments Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/stores/{store}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    Route::post('/comments/{comment}/report', [CommentController::class, 'report']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reports', [ReportController::class, 'store']);
});


Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::post('/notifications/send', [AdminNotificationController::class, 'send']);
     Route::get('/users', [AdminUsersController::class, 'index']);
    Route::post('/users/{id}/ban', [AdminUsersController::class, 'ban']);
    Route::post('/users/{id}/unban', [AdminUsersController::class, 'unban']);
});

Route::middleware('auth:sanctum')->get('/notifications', [NotificationController::class, 'index']);
Route::middleware('auth:sanctum')->patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
Route::middleware('auth:sanctum')->patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
Route::middleware('auth:sanctum')->delete('/notifications/{id}', [NotificationController::class, 'destroy']);



