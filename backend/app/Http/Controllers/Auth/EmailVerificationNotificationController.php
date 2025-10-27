<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);

        $userId = $request->route('id');
        $hash = $request->route('hash');

        $user = User::findOrFail($userId);

        // Verify the hash matches
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json([
                'message' => 'Invalid verification link.',
            ], 400);
        }

        // Check if URL is signed and not expired
        if (!URL::hasValidSignature($request)) {
            return response()->json([
                'message' => 'Invalid or expired verification link.',
            ], 400);
        }


        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Your email is already verified. Please log in.',
                'redirect' => '/login', // Redirect to login page
            ], 409); // 409 Conflict status code
        }

        // Send the verification email
        $user->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Verification link sent! Please check your email.',
        ], 200);
    }

     /**
     * Mark the user's email address as verified via the verification link.
     */
    public function verify(Request $request): JsonResponse
    {
        $userId = $request->route('id');
        $hash = $request->route('hash');

        Log::info('Email verification attempt', [
            'user_id' => $userId,
            'hash' => $hash
        ]);

        $user = User::findOrFail($userId);

        // Verify the hash matches
        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            Log::error('Invalid verification hash', ['user_id' => $userId]);
            
            // Redirect to frontend with error
            $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
            return response()->json([
                'message' => 'Invalid verification link.',
                'redirect' => "$frontendUrl/invalid-token"
            ], 400);
        }

        // Check if URL signature is valid
        if (!$request->hasValidSignature()) {
            Log::error('Expired verification link', ['user_id' => $userId]);
            
            $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
            return response()->json([
                'message' => 'This verification link has expired.',
                'redirect' => "$frontendUrl/invalid-token"
            ], 400);
        }

        if ($user->hasVerifiedEmail()) {
            Log::info('Email already verified', ['user_id' => $userId]);
            
            $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
            return response()->json([
                'message' => 'Email already verified.',
                'redirect' => "$frontendUrl/login?verified=1"
            ]);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
            Log::info('Email verified successfully', ['user_id' => $userId]);
        }

        // Create token for auto-login
        $token = $user->createToken('auth-token')->plainTextToken;

        $frontendUrl = config('app.frontend_url', 'http://localhost:5173');
        
        return response()->json([
            'message' => 'Email verified successfully!',
            'user' => $user,
            'token' => $token,
            'redirect' => "$frontendUrl/verification-success"
        ]);
    }

    /**
     * Resend the email verification notification.
     */
    public function resend(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email']
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'No account found with this email address.',
            ], 404);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Your email is already verified. You can log in now.',
            ], 200);
        }

        $user->sendEmailVerificationNotification();

        Log::info('Verification email resent', ['user_id' => $user->id]);

        return response()->json([
            'message' => 'Verification email sent! Please check your inbox.',
        ], 200);
    }


}