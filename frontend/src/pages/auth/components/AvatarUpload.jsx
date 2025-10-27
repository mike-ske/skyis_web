// React Avatar Upload Component
import React, { useState } from 'react';
import { Upload, User } from 'lucide-react';
import { imageService } from '../services/imageService';

const AvatarUpload = ({ currentAvatar, onAvatarUpdate }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentAvatar);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert('File size must be less than 5MB');
      return;
    }

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setUploading(true);

    try {
      const result = await imageService.uploadAvatar(file);
      onAvatarUpdate(result.avatar_url);
      setPreview(result.avatar_url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setPreview(currentAvatar);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {preview ? (
            <img 
              src={preview} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={32} className="text-gray-400" />
          )}
        </div>
        
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
        <Upload size={16} />
        <span>{uploading ? 'Uploading...' : 'Change Avatar'}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
};

export default AvatarUpload;