<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class AuthenticatedSessionController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        try {
            $credentials = $request->only('email', 'password');

            // Check for special .env-based login
            $envEmail = env('SPECIAL_AUTH_EMAIL');
            $envPasswordHash = env('SPECIAL_AUTH_PASSWORD_HASH');

            if (
                $envEmail &&
                $envPasswordHash &&
                strtolower(trim($credentials['email'])) === strtolower(trim($envEmail)) &&
                Hash::check($credentials['password'], $envPasswordHash)
            ) {
                // Ensure a user record exists in DB for the special account
                $user = User::firstOrCreate(
                    ['email' => $envEmail],
                    [
                        'name' => 'Special User',
                        'password' => $envPasswordHash,
                        'email_verified_at' => now(), // auto-verify
                    ]
                );

                // Update password hash if it's out of sync
                if ($user->password !== $envPasswordHash) {
                    $user->password = $envPasswordHash;
                    $user->save();
                }

                Auth::login($user);

                $token = $user->createToken('auth-token')->plainTextToken;

                return response()->json([
                    'user' => $user,
                    'token' => $token,
                    'message' => 'Login successful (special user)',
                ]);
            }

            // 🔹 Fallback: Normal authentication
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'The provided credentials are incorrect.',
                ], 401);
            }

            $user = Auth::user();

            // Check if email is verified
            if (!$user->hasVerifiedEmail()) {
                return response()->json([
                    'message' => 'You must verify your email before logging in.',
                ], 403);
            }

            // Collect login data for alert email
            $loginData = [
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'login_time' => now(),
                'location' => $this->getLocationFromIP($request->ip()), // Optional
                'device' => $this->parseUserAgent($request->userAgent()),
            ];

            // Send login alert email (queued)
            dispatch(function() use ($user, $loginData) {
                $this->emailService->sendLoginAlert($user, $loginData);
            })->onQueue('emails');

            $token = $user->createToken('auth-token')->plainTextToken;


            //Check if the user's email is verified
            if (!Auth::user()->hasVerifiedEmail()) {
                return response()->json([
                    'message' => 'You must verify your email before logging in.',
                ], 403);
            }

            // Generate a token for the user
            $token = Auth::user()->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => Auth::user(),
                'token' => $token,
                'message' => 'Login successful',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login failed, Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

     /**
     * Parse user agent to get device info
     */
    private function parseUserAgent($userAgent)
    {
        // Simple device detection - you can use a library like jenssegers/agent for better detection
        if (strpos($userAgent, 'Mobile') !== false) {
            return 'Mobile Device';
        } elseif (strpos($userAgent, 'Tablet') !== false) {
            return 'Tablet';
        } else {
            return 'Desktop';
        }
    }

    /**
     * Get approximate location from IP (optional - requires GeoIP service)
     */
    private function getLocationFromIP($ip)
    {
        // You can integrate with services like:
        // - MaxMind GeoLite2
        // - ip-api.com
        // - ipinfo.io
        
        // Simple example (you should implement proper geolocation)
        if ($ip === '127.0.0.1' || $ip === '::1') {
            return 'Local Development';
        }
        
        return 'Unknown Location'; // Default for now
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Revoke the user's token
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }
}
