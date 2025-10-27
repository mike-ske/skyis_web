/*
===============================================
7. FRONTEND CLOUDINARY INTEGRATION
===============================================
This section covers the integration of Cloudinary for image uploads in the React frontend.

1. Install Cloudinary SDK
Ensure you have the Cloudinary SDK installed in your React project:
npm install cloudinary-react

2. Create Image Service
Create a service file to handle image uploads to Cloudinary. This service will include functions to upload avatars and general images.

File: src/pages/auth/services/imageService.js
*/

// React service for image uploads
export const imageService = {
  async uploadAvatar(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
  },

  async uploadImage(file, folder = 'general') {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    return await response.json();
  }
};