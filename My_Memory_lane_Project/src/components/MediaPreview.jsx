import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getMediaType, getOptimizedImageUrl, getVideoThumbnail } from '../utils/mediaUtils';
import { Play, Volume2, Image as ImageIcon, Maximize2 } from 'lucide-react';

const MediaPreview = ({ 
  url, 
  title, 
  mediaType: propMediaType,
  className = '', 
  showControls = true, 
  autoPlay = false,
  onClick = null 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Use prop mediaType if provided, otherwise detect from URL
  const mediaType = propMediaType || getMediaType(url);
  
  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    console.error('Failed to load media:', url);
  };

  const renderMedia = () => {
    if (!url) {
      return (
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No media available</p>
          </div>
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Failed to load media</p>
          </div>
        </div>
      );
    }

    switch (mediaType) {
      case 'image':
        return (
          <div className="relative group overflow-hidden rounded-lg">
            {isLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
            )}
            <img
              src={getOptimizedImageUrl(url, { width: 800, height: 600 })}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              } ${onClick ? 'cursor-pointer group-hover:scale-105' : ''}`}
              onLoad={handleLoad}
              onError={handleError}
              onClick={onClick}
              loading="lazy"
            />
            {onClick && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="text-white w-8 h-8" />
              </div>
            )}
          </div>
        );
      
      case 'video':
        return (
          <div className="relative overflow-hidden rounded-lg">
            {showControls ? (
              <>
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                )}
                <video
                  src={url}
                  className={`w-full h-full object-cover rounded-lg ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  controls
                  autoPlay={autoPlay}
                  muted={autoPlay}
                  onLoadedData={handleLoad}
                  onError={handleError}
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </>
            ) : (
              <div 
                className="bg-gray-900 rounded-lg flex items-center justify-center h-full min-h-[200px] cursor-pointer group relative overflow-hidden"
                onClick={onClick}
              >
                {getVideoThumbnail(url) ? (
                  <>
                    <img
                      src={getVideoThumbnail(url)}
                      alt={title}
                      className="w-full h-full object-cover"
                      onLoad={handleLoad}
                      onError={handleError}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                        <Play className="text-gray-900 w-8 h-8 ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-200">
                    <Play className="text-gray-900 w-12 h-12 ml-1" />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      case 'audio':
        return (
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 min-h-[120px]">
            {showControls ? (
              <div className="flex items-center justify-center h-full">
                <audio
                  src={url}
                  controls
                  className="w-full max-w-md"
                  onLoadedData={handleLoad}
                  onError={handleError}
                  preload="metadata"
                >
                  Your browser does not support the audio tag.
                </audio>
              </div>
            ) : (
              <div 
                className="flex items-center justify-center h-full cursor-pointer group"
                onClick={onClick}
              >
                <div className="bg-white/20 rounded-full p-4 group-hover:bg-white/30 transition-colors duration-200">
                  <Volume2 className="text-white w-8 h-8" />
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 flex items-center justify-center min-h-[120px]">
            <div className="text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Unsupported media type</p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderMedia()}
    </motion.div>
  );
};

export default MediaPreview;