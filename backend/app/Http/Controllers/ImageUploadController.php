<?php

/* 
6. IMAGE UPLOAD CONTROLLER
========================================
*/

namespace App\Http\Controllers;

use App\Services\CloudinaryService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ImageUploadController extends Controller
{
    protected $cloudinaryService;

    public function __construct(CloudinaryService $cloudinaryService)
    {
        $this->cloudinaryService = $cloudinaryService;
    }

    /**
     * Upload avatar image
     */
    public function uploadAvatar(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        $user = $request->user();
        
        // Delete old avatar if exists
        if ($user->avatar_public_id) {
            $this->cloudinaryService->deleteImage($user->avatar_public_id);
        }

        $result = $this->cloudinaryService->uploadImage(
            $request->file('image'),
            'avatars/' . $user->id,
            [
                'width' => 400,
                'height' => 400,
                'crop' => 'fill',
                'gravity' => 'face'
            ]
        );

        if ($result['success']) {
            // Update user avatar
            $user->update([
                'avatar' => $result['url'],
                'avatar_public_id' => $result['public_id']
            ]);

            return response()->json([
                'message' => 'Avatar uploaded successfully',
                'avatar_url' => $result['url'],
                'responsive_urls' => $this->cloudinaryService->getResponsiveUrls($result['public_id'])
            ]);
        }

        return response()->json([
            'message' => 'Upload failed',
            'error' => $result['error']
        ], 500);
    }

    /**
     * Upload general images
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB max
            'folder' => 'sometimes|string|max:50'
        ]);

        $folder = $request->input('folder', 'general');
        
        $result = $this->cloudinaryService->uploadImage(
            $request->file('image'),
            $folder,
            [
                'quality' => 'auto:good',
                'fetch_format' => 'auto'
            ]
        );

        if ($result['success']) {
            return response()->json([
                'message' => 'Image uploaded successfully',
                'data' => $result
            ]);
        }

        return response()->json([
            'message' => 'Upload failed',
            'error' => $result['error']
        ], 500);
    }
}
