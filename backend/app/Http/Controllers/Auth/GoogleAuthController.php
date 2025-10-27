<?php

// ===========================================
// 5. GOOGLE AUTH CONTROLLER (app/Http/Controllers/Auth/GoogleAuthController.php)
// ===========================================
// ==========================================
// GOOGLE OAUTH PRODUCTION REQUIREMENTS
// ==========================================

/* 
1. GOOGLE CLOUD CONSOLE SETUP
========================================

Steps to create Google OAuth credentials:

1. Go to Google Cloud Console (https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google+ API / Google OAuth2 API
4. Go to "APIs & Services" > "Credentials"
5. Click "Create Credentials" > "OAuth 2.0 Client IDs"
6. Configure OAuth consent screen:
   - App name: "Your App Name"
   - User support email: your-email@domain.com
   - App logo: Upload your app logo (120x120px recommended)
   - App domain: https://yourdomain.com
   - Authorized domains: yourdomain.com
   - Privacy policy URL: https://yourdomain.com/privacy
   - Terms of service URL: https://yourdomain.com/terms

7. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: "Your App Production"
   - Authorized JavaScript origins:
     * https://yourdomain.com
     * https://www.yourdomain.com
   - Authorized redirect URIs:
     * https://yourdomain.com/api/auth/google/callback
     * https://www.yourdomain.com/api/auth/google/callback

8. Download credentials JSON or copy Client ID and Secret

COSTS: Google OAuth is FREE (no limits for standard use)
*/

/* 
2. PRODUCTION ENVIRONMENT VARIABLES
========================================
*/


// Install packages
// composer require laravel/socialite
// composer require socialiteproviders/google

/* 
4. PRODUCTION GOOGLE AUTH CONTROLLER
========================================
*/

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Google_Client;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;  // ✅ Add this line
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Google_Service_Oauth2;

class GoogleAuthController extends Controller
{
    /**
     * Redirect to Google for authentication
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes(['openid', 'profile', 'email'])
            ->with(['access_type' => 'offline', 'approval_prompt' => 'force'])
            ->redirect();
    }

    /**
     * Handle Google authentication callback
     */
    public function handleGoogleCallback(Request $request): JsonResponse
    {
        // try {
        //     $googleUser = Socialite::driver('google')->stateless()->user();

        //     $user = User::where('email', $googleUser->email)->first();

        //     if (!$googleUser->email) {
        //         throw new \Exception('No email provided by Google');
        //     }

        //     if ($user) {
        //         // Update Google info if user exists
        //         $user->update([
        //             'provider' => 'google',
        //             'provider_id' => $googleUser->id,
        //             'avatar' => $googleUser->avatar,
        //             'email_verified_at' => now(), // Google emails are pre-verified
        //         ]);
        //     } else {
        //         // Create new user
        //         $nameParts = explode(' ', $googleUser->name, 2);
        //         $user = User::create([
        //             'name' => $googleUser->name,
        //             'first_name' => $nameParts[0] ?? $googleUser->name,
        //             'last_name' => $nameParts[1] ?? '',
        //             'email' => $googleUser->email,
        //             'provider' => 'google',
        //             'provider_id' => $googleUser->id,
        //             'avatar' => $googleUser->avatar,
        //             'email_verified_at' => now(),
        //             'password' => Hash::make(Str::random(24)), // Random password for Google users
        //         ]);
        //         // Log new user registration
        //         \Log::info('New Google user registered', [
        //             'user_id' => $user->id,
        //             'email' => $user->email,
        //             'name' => $user->name
        //         ]);
        //     }

        //     Auth::login($user);
        //     $token = $user->createToken('auth-token')->plainTextToken;

        //     // Redirect to frontend with token
        //     $frontendUrl = env('FRONTEND_URL', 'https://skyis.co');
        //     return redirect($frontendUrl . '/auth/callback?token=' . $token . '&user=' . urlencode(json_encode($user)));

        // } catch (\Exception $e) {
        //     \Log::error('Google authentication failed', [
        //         'error' => $e->getMessage(),
        //         'trace' => $e->getTraceAsString()
        //     ]);

        //     $frontendUrl = env('FRONTEND_URL', 'https://skyis.co');
        //     return redirect($frontendUrl . '/auth/error?message=' . urlencode('Authentication failed'));
        // }
    

   try {
            // Log the incoming request
            Log::info('Google Auth Request:', [
                'has_credential' => $request->has('credential'),
                'credential_length' => $request->input('credential') ? strlen($request->input('credential')) : 0
            ]);

            $credential = $request->input('credential');
            
            if (!$credential) {
                return response()->json([
                    'success' => false,
                    'message' => 'No credential provided'
                ], 400);
            }

            // Check if Google Client ID is set
            $clientId = env('GOOGLE_CLIENT_ID');
            if (!$clientId) {
                Log::error('GOOGLE_CLIENT_ID not set in .env file');
                return response()->json([
                    'success' => false,
                    'message' => 'Google authentication not configured'
                ], 500);
            }

            Log::info('Attempting to verify Google token with Client ID: ' . substr($clientId, 0, 20) . '...');

            // Verify the Google token
            $client = new Google_Client(['client_id' => $clientId]);
            
            try {
                $payload = $client->verifyIdToken($credential);
            } catch (\Exception $e) {
                Log::error('Token verification failed: ' . $e->getMessage());
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Google token: ' . $e->getMessage()
                ], 401);
            }
            
            if (!$payload) {
                Log::error('Token verification returned null/false');
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid Google token - verification failed'
                ], 401);
            }

            Log::info('Token verified successfully', [
                'email' => $payload['email'] ?? 'unknown',
                'sub' => $payload['sub'] ?? 'unknown'
            ]);

            // Extract user information
            $googleId = $payload['sub'];
            $email = $payload['email'];
            $name = $payload['name'] ?? 'Google User';
            $avatar = $payload['picture'] ?? null;

            // Validate required fields
            if (!$googleId || !$email) {
                Log::error('Missing required fields from Google payload');
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid user data from Google'
                ], 400);
            }

            // Find or create user
            $user = User::where('email', $email)->first();

            if (!$user) {
                Log::info('Creating new user for email: ' . $email);
                
                // Create new user
                $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'google_id' => $googleId,
                    'avatar' => $avatar,
                    'password' => Hash::make(Str::random(24)),
                    'email_verified_at' => now(),
                ]);

                Log::info('User created successfully', ['user_id' => $user->id]);
            } else {
                Log::info('User found, updating Google ID', ['user_id' => $user->id]);
                
                // Update existing user with Google ID if not set
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleId,
                        'avatar' => $avatar ?? $user->avatar,
                    ]);
                }
            }

            // Log the user in
            Auth::login($user);
            Log::info('User logged in successfully');

            // Create token (using Laravel Sanctum)
            $token = $user->createToken('google-auth-token')->plainTextToken;
            Log::info('Token created successfully');

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                ],
            ], 200);

        } catch (\Google_Exception $e) {
            Log::error('Google Exception: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Google API error: ' . $e->getMessage()
            ], 401);

        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database Error: ' . $e->getMessage());
            Log::error('SQL: ' . $e->getSql());
            
            return response()->json([
                'success' => false,
                'message' => 'Database error. Please check server logs.'
            ], 500);

        } catch (\Exception $e) {
            Log::error('Google Auth Error: ' . $e->getMessage());
            Log::error('Error type: ' . get_class($e));
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Authentication failed: ' . $e->getMessage(),
                'error_type' => get_class($e)
            ], 500);
        }
    }
}



