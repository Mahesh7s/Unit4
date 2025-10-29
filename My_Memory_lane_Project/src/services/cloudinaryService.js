// src/services/cloudinaryService.js

// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dzgnwrzsj';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const uploadToCloudinary = async (file, onProgress = null) => {
  try {
    console.log('Starting Cloudinary upload for file:', file.name, file.type);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    // Determine resource type based on file type
    let resourceType = 'auto';
    if (file.type.startsWith('image/')) {
      resourceType = 'image';
    } else if (file.type.startsWith('video/')) {
      resourceType = 'video';
    } else if (file.type.startsWith('audio/')) {
      resourceType = 'video'; // Audio files are uploaded as video resource type in Cloudinary
    }
    
    formData.append('resource_type', resourceType);

    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener('load', () => {
        console.log('Cloudinary response status:', xhr.status);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log('Cloudinary upload successful:', response);
          
          // Determine the actual media type for our application
          let mediaType = resourceType;
          if (resourceType === 'video' && file.type.startsWith('audio/')) {
            mediaType = 'audio';
          }
          
          // Ensure all properties have proper values (no undefined)
          resolve({
            url: response.secure_url || '',
            publicId: response.public_id || '',
            resourceType: mediaType || '',
            format: response.format || '',
            width: response.width || 0,
            height: response.height || 0,
            bytes: response.bytes || 0,
            duration: response.duration || 0, // Ensure duration is always a number
            originalName: file.name || ''
          });
        } else {
          console.error('Cloudinary upload failed:', xhr.status, xhr.responseText);
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        console.error('Cloudinary upload network error');
        reject(new Error('Network error during upload'));
      });

      xhr.open('POST', CLOUDINARY_API_URL);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Error in uploadToCloudinary:', error);
    throw new Error('Failed to upload to Cloudinary: ' + error.message);
  }
};

export const uploadAudioToCloudinary = async (file, onProgress = null) => {
  try {
    console.log('Starting Cloudinary audio upload for file:', file.name, file.type);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    formData.append('resource_type', 'video'); // Audio files are uploaded as video resource type

    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percentComplete = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentComplete));
        }
      });

      xhr.addEventListener('load', () => {
        console.log('Cloudinary audio response status:', xhr.status);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log('Cloudinary audio upload successful:', response);
          resolve({
            url: response.secure_url || '',
            publicId: response.public_id || '',
            resourceType: 'audio',
            format: response.format || '',
            duration: response.duration || 0, // Ensure duration is always a number
            bytes: response.bytes || 0,
            originalName: file.name || ''
          });
        } else {
          console.error('Cloudinary audio upload failed:', xhr.status, xhr.responseText);
          reject(new Error(`Audio upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        console.error('Cloudinary audio upload network error');
        reject(new Error('Network error during audio upload'));
      });

      xhr.open('POST', CLOUDINARY_API_URL);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Error in uploadAudioToCloudinary:', error);
    throw new Error('Failed to upload audio to Cloudinary: ' + error.message);
  }
};

export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;
  
  try {
    // Insert transformation parameters into Cloudinary URL
    const transformations = `w_${width},h_${height},c_fill,q_${quality},f_${format}`;
    
    if (url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/${transformations}/`);
    }
    
    return url;
  } catch (error) {
    console.error('Error optimizing image URL:', error);
    return url;
  }
};

export const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes('cloudinary.com')) return null;
  
  try {
    // Generate thumbnail from video
    if (videoUrl.includes('/upload/')) {
      return videoUrl.replace('/upload/', '/upload/w_400,h_300,c_fill,so_0/').replace(/\.(mp4|mov|avi|webm)$/, '.jpg');
    }
    return null;
  } catch (error) {
    console.error('Error generating video thumbnail:', error);
    return null;
  }
};