<?php
/ ==========================================
// 9. FRONTEND INTEGRATION HELPER
// ==========================================

// Create a helper controller for frontend integration
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthStatusController extends Controller
{
    /**
     * Check authentication status
     */
    public function status(Request $request)
    {
        if ($request->user()) {
            return response()->json([
                'authenticated' => true,
                'user' => $request->user(),
                'email_verified' => $request->user()->hasVerifiedEmail(),
            ]);
        }

        return response()->json([
            'authenticated' => false,
            'user' => null,
            'email_verified' => false,
        ]);
    }

    /**
     * Get CSRF token for frontend
     */
    public function csrf()
    {
        return response()->json([
            'csrf_token' => csrf_token(),
        ]);
    }
}