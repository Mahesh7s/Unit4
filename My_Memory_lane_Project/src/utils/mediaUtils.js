export const getMediaType = (url) => {
  if (!url) return 'unknown';
  
  console.log('Getting media type for URL:', url);
  
  // Check file extension
  const extension = url.split('.').pop()?.toLowerCase()?.split('?')[0] || '';
  console.log('File extension:', extension);
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
    console.log('Detected as image');
    return 'image';
  }
  
  if (['mp4', 'avi', 'mov', 'wmv', 'webm', 'mkv'].includes(extension)) {
    console.log('Detected as video');
    return 'video';
  }
  
  if (['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'].includes(extension)) {
    console.log('Detected as audio');
    return 'audio';
  }
  
  // Check Cloudinary resource type in URL
  if (url.includes('cloudinary.com')) {
    if (url.includes('/video/upload/')) {
      console.log('Cloudinary video detected');
      return 'video';
    }
    if (url.includes('/image/upload/')) {
      console.log('Cloudinary image detected');
      return 'image';
    }
    // Default to image for Cloudinary URLs
    console.log('Cloudinary default to image');
    return 'image';
  }
  
  // Default to image if we can't determine the type
  console.log('Defaulting to image');
  return 'image';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateFile = (file, type = 'image') => {
  const maxSizes = {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024, // 100MB
    audio: 25 * 1024 * 1024 // 25MB
  };
  
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'],
    audio: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac']
  };
  
  if (file.size > maxSizes[type]) {
    throw new Error(`File size must be less than ${formatFileSize(maxSizes[type])}`);
  }
  
  if (!allowedTypes[type].includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${allowedTypes[type].join(', ')}`);
  }
  
  return true;
};

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateShareableLink = (memory) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/shared/${memory.id}`;
};

export const downloadAsJSON = (data, filename) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = filename || 'memories.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
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