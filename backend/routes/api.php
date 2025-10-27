<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Api\AuctionController;
use App\Http\Controllers\RentalController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
// Registration route
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware(['throttle:5,1']); // Rate limit: 5 attempts per minute

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware(['throttle:5,1']);
    
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

// Password Reset
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);   
Route::post('/verify-reset-token', [PasswordResetLinkController::class, 'verifyToken']);

// Email Verification
Route::post('/email/resend', [EmailVerificationNotificationController::class, 'store']);
Route::get('/email/verify/{id}/{hash}', [EmailVerificationNotificationController::class, 'verify'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');
    // In routes/api.php - update the verification route

Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});


Route::middleware('auth:sanctum')->group(function () {
    // Get specific auction details
    Route::get('auctions/bid/{id}', [AuctionController::class, 'getAuction']);
    // Route::post('/auctions/bid', [AuctionController::class, 'getAuction']);
    Route::get('/auctions/highest-bid/{product_id}', [AuctionController::class, 'highestBid']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/update/{id}', [CartController::class, 'update']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);
    Route::post('/checkout', [CheckoutController::class, 'process']);
    Route::get('/orders', [CheckoutController::class, 'orderHistory']);
    Route::get('/orders/{id}', [CheckoutController::class, 'orderDetails']);
});

// Email Verification  
Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'resend'])
    ->middleware(['throttle:3,1']);

// Google Auth
Route::post('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::post('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
Route::post('/auth/google', [GoogleAuthController::class, 'handleGoogleCallback']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('/user', [ProfileController::class, 'show']);
    Route::put('/user', [ProfileController::class, 'update']);
    Route::post('/change-password', [ProfileController::class, 'changePassword']);
});

// Routes requiring verified email
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    // Add protected routes that require email verification here
    Route::get('/shopperdashboard', function () {
        return response()->json(['message' => 'Welcome to dashboard!']);
    });
});

