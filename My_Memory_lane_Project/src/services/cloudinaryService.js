// Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'dzgnwrzsj';
const CLOUDINARY_UPLOAD_PRESET = 'unsigned_preset';
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

export const uploadToCloudinary = async (file, onProgress = null) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    // Determine resource type based on file type
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';
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
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.secure_url,
            publicId: response.public_id,
            resourceType: response.resource_type,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes
          });
        } else {
          reject(new Error('Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'));
      });

      xhr.open('POST', CLOUDINARY_API_URL);
      xhr.send(formData);
    });
  } catch (error) {
    throw new Error('Failed to upload to Cloudinary: ' + error.message);
  }
};

export const uploadAudioToCloudinary = async (file, onProgress = null) => {
  try {
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
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.secure_url,
            publicId: response.public_id,
            resourceType: 'audio',
            format: response.format,
            duration: response.duration,
            bytes: response.bytes
          });
        } else {
          reject(new Error('Audio upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Audio upload failed'));
      });

      xhr.open('POST', CLOUDINARY_API_URL);
      xhr.send(formData);
    });
  } catch (error) {
    throw new Error('Failed to upload audio to Cloudinary: ' + error.message);
  }
};

export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const { width = 800, height = 600, quality = 'auto', format = 'auto' } = options;
  
  // Insert transformation parameters into Cloudinary URL
  const transformations = `w_${width},h_${height},c_fill,q_${quality},f_${format}`;
  return url.replace('/upload/', `/upload/${transformations}/`);
};

export const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes('cloudinary.com')) return null;
  
  // Generate thumbnail from video
  return videoUrl.replace('/upload/', '/upload/w_400,h_300,c_fill,so_0/').replace(/\.(mp4|mov|avi)$/, '.jpg');
};