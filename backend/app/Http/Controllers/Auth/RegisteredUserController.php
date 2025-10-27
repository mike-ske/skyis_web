<?php
// ==========================================
// UPDATED LARAVEL CONTROLLER - NO EMAIL VERIFICATION
// ==========================================

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RegisteredUserController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        try {
            // Log incoming request for debugging
            \Log::info('Registration request received', [
                'email' => $request->email,
                'name' => $request->name,
                'has_password' => !empty($request->password),
                'has_confirmation' => !empty($request->password_confirmation),
            ]);

            // Validate the incoming request with detailed rules
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'min:2', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'password' => [
                    'required', 
                    'string', 
                    'min:8',
                    'regex:/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/' // Must contain special character
                ],
                'password_confirmation' => ['required', 'string', 'same:password'],
            ], [
                // Custom error messages
                'name.required' => 'Full name is required.',
                'name.min' => 'Name must be at least 2 characters.',
                'email.required' => 'Email address is required.',
                'email.email' => 'Please enter a valid email address.',
                'email.unique' => 'An account with this email already exists.',
                'password.required' => 'Password is required.',
                'password.min' => 'Password must be at least 8 characters.',
                'password.regex' => 'Password must contain at least one special character.',
                'password_confirmation.required' => 'Password confirmation is required.',
                'password_confirmation.same' => 'Password confirmation does not match.',
            ]);

            if ($validator->fails()) {
                \Log::warning('Registration validation failed', [
                    'errors' => $validator->errors()->toArray(),
                    'email' => $request->email
                ]);

                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                    'details' => $validator->errors()->first(),
                ], 422);
            }

            // Use database transaction for safety
            DB::beginTransaction();

            try {
                // Check if user already exists (double-check within transaction)
                $existingUser = User::where('email', strtolower($request->email))->first();
                if ($existingUser) {
                    \Log::info('User already exists', ['email' => $request->email]);
                    
                    DB::rollBack();
                    
                    return response()->json([
                        'message' => 'An account with this email already exists. Please log in instead.',
                    ], 409);
                }

                // Create the new user with combined name only
                $user = User::create([
                    'name' => trim($request->name), // Only store combined name
                    'email' => strtolower(trim($request->email)),
                    'password' => Hash::make($request->password),
                    'email_verified_at' => now(), // Auto-verify immediately
                ]);

                \Log::info('New user created successfully', [
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name, // Combined name
                ]);

                // Generate authentication token
                $token = $user->createToken('auth-token')->plainTextToken;

                // Commit transaction
                DB::commit();

                return response()->json([
                    'message' => 'Registration successful! You can now access your account.',
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name, // Combined name
                        'email' => $user->email,
                        'email_verified_at' => $user->email_verified_at,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                    ],
                    // 'token' => $token,
                    'requires_login' => true, // New flag to indicate login is required
                    'requires_verification' => false, // No verification needed
                ], 201);

            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }

        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Database error during registration', [
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
                'email' => $request->email ?? 'unknown'
            ]);

            // Check for unique constraint violation
            if ($e->getCode() === '23000') {
                return response()->json([
                    'message' => 'An account with this email already exists.',
                    'errors' => ['email' => ['This email is already registered.']]
                ], 409);
            }

            return response()->json([
                'message' => 'Registration failed due to database error. Please try again.',
            ], 500);

        } catch (\PDOException $e) {
            \Log::error('Database PDO connection error', [
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
                'email' => $request->email ?? 'unknown'
            ]);

            return response()->json([
                'message' => 'Database connection failed. Please try again later.',
            ], 500);

        } catch (\Exception $e) {
            \Log::error('Registration error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'email' => $request->email ?? 'unknown'
            ]);

            return response()->json([
                'message' => 'Registration failed. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error',
            ], 500);
        }
    }
}