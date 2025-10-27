<?php
// ==========================================
// 6. USER PROFILE CONTROLLER (app/Http/Controllers/Auth/ProfileController.php)
// ==========================================

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\EmailService;

class ProfileController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    /**
     * Get user profile
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Update user profile
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only(['first_name', 'last_name', 'email']));

        // Update full name
        if ($request->has('first_name') || $request->has('last_name')) {
            $user->name = ($user->first_name ?? '') . ' ' . ($user->last_name ?? '');
            $user->save();
        }

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user->fresh(),
        ]);
    }

    /**
     * Change user password
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required',
            'password' => [
                'required',
                'confirmed',
                'min:8',
                'regex:/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/',
            ],
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect',
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        // Revoke all existing tokens for security
        $user->tokens()->delete();
        
        // Send password changed notification (queued)
        dispatch(function() use ($user) {
            $this->emailService->sendPasswordChangedNotification($user);
        })->onQueue('emails');

        // Create new token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Password changed successfully',
            'token' => $token,
        ]);
    }
}