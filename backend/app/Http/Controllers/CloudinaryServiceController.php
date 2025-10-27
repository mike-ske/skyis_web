<?php
/* 
5. LARAVEL CLOUDINARY SERVICE
========================================
*/

namespace App\Services;

use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class CloudinaryService
{
    /**
     * Upload image to Cloudinary
     */
    public function uploadImage($file, $folder = 'avatars', $options = [])
    {
        try {
            $defaultOptions = [
                'folder' => $folder,
                'resource_type' => 'image',
                'format' => 'jpg',
                'quality' => 'auto:good',
                'fetch_format' => 'auto',
            ];

            $uploadOptions = array_merge($defaultOptions, $options);
            
            $result = Cloudinary::upload($file->getRealPath(), $uploadOptions);

            return [
                'success' => true,
                'url' => $result->getSecurePath(),
                'public_id' => $result->getPublicId(),
                'width' => $result->getWidth(),
                'height' => $result->getHeight(),
                'format' => $result->getExtension(),
                'size' => $result->getSize(),
            ];
        } catch (\Exception $e) {
            \Log::error('Cloudinary upload failed', [
                'error' => $e->getMessage(),
                'file' => $file->getClientOriginalName()
            ]);

            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Delete image from Cloudinary
     */
    public function deleteImage($publicId)
    {
        try {
            $result = Cloudinary::destroy($publicId);
            return $result;
        } catch (\Exception $e) {
            \Log::error('Cloudinary delete failed', [
                'error' => $e->getMessage(),
                'public_id' => $publicId
            ]);
            return false;
        }
    }

    /**
     * Generate transformed image URL
     */
    public function getTransformedUrl($publicId, $transformations = [])
    {
        return Cloudinary::getUrl($publicId, $transformations);
    }

    /**
     * Generate responsive image URLs
     */
    public function getResponsiveUrls($publicId)
    {
        return [
            'thumbnail' => $this->getTransformedUrl($publicId, [
                'width' => 150,
                'height' => 150,
                'crop' => 'fill',
                'quality' => 'auto:good'
            ]),
            'small' => $this->getTransformedUrl($publicId, [
                'width' => 300,
                'height' => 300,
                'crop' => 'fill',
                'quality' => 'auto:good'
            ]),
            'medium' => $this->getTransformedUrl($publicId, [
                'width' => 600,
                'height' => 600,
                'crop' => 'fill',
                'quality' => 'auto:good'
            ]),
            'large' => $this->getTransformedUrl($publicId, [
                'width' => 1200,
                'height' => 1200,
                'crop' => 'limit',
                'quality' => 'auto:good'
            ])
        ];
    }
}
