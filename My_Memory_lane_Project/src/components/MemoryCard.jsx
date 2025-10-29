import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/mediaUtils';
import MediaPreview from './MediaPreview';
import { Calendar, MapPin, Tag, Star, Edit, Trash2, Share2, Eye, X, Images, FolderPlus, Play, Volume2 } from 'lucide-react';

const MemoryCard = ({ 
  memory, 
  onEdit, 
  onDelete, 
  onShare,
  onAddToAlbum,
  className = '',
  showActions = true 
}) => {
  const [showFullMedia, setShowFullMedia] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { title, description, date, location, tags, mediaUrl, mediaType, isMilestone, isPublic, mediaFiles = [] } = memory;

  // Use mediaFiles array if available, otherwise fall back to single media
  const displayMedia = mediaFiles.length > 0 ? mediaFiles : (mediaUrl ? [{
    url: mediaUrl,
    type: mediaType,
    originalName: title
  }] : []);

  const handleShare = () => {
    if (onShare) {
      onShare(memory);
    }
  };

  const handleAddToAlbum = () => {
    if (onAddToAlbum) {
      onAddToAlbum(memory);
    }
  };

  const handleNextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % displayMedia.length);
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + displayMedia.length) % displayMedia.length);
  };

  const openMediaAtIndex = (index) => {
    setCurrentMediaIndex(index);
    setShowFullMedia(true);
  };

  // Get media type icon
  const getMediaTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Play className="w-3 h-3" />;
      case 'audio': return <Volume2 className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full ${className}`}
      >
        {/* Media Preview */}
        {displayMedia.length > 0 && (
          <div className="h-48 relative overflow-hidden flex-shrink-0">
            {/* Primary Media Display */}
            <MediaPreview 
              url={displayMedia[0].url} 
              title={displayMedia[0].originalName || title}
              mediaType={displayMedia[0].type}
              showControls={false}
              onClick={() => openMediaAtIndex(0)}
              className="w-full h-full"
            />
            
            {/* Media Type Badge */}
            {displayMedia[0].type && displayMedia[0].type !== 'image' && (
              <div className="absolute top-3 left-3">
                <div className="bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                  {getMediaTypeIcon(displayMedia[0].type)}
                  {displayMedia[0].type.charAt(0).toUpperCase() + displayMedia[0].type.slice(1)}
                </div>
              </div>
            )}

            {/* Multiple Files Indicator */}
            {displayMedia.length > 1 && (
              <div className="absolute top-3 right-3">
                <div className="bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                  <Images className="w-3 h-3" />
                  {displayMedia.length}
                </div>
              </div>
            )}

            {/* Thumbnail Strip for Multiple Files */}
            {displayMedia.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {displayMedia.slice(0, 5).map((media, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        openMediaAtIndex(index);
                      }}
                      className={`flex-shrink-0 w-10 h-10 rounded-lg border-2 overflow-hidden transition-all duration-200 relative ${
                        index === 0 ? 'border-white shadow-lg' : 'border-white/50 hover:border-white'
                      }`}
                    >
                      <MediaPreview 
                        url={media.url} 
                        title={media.originalName}
                        mediaType={media.type}
                        showControls={false}
                        className="w-full h-full"
                      />
                      {media.type && media.type !== 'image' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          {getMediaTypeIcon(media.type)}
                        </div>
                      )}
                    </button>
                  ))}
                  {displayMedia.length > 5 && (
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-medium border-2 border-white/30">
                      +{displayMedia.length - 5}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {isMilestone && (
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-lg">
                  <Star className="w-3 h-3" />
                  Milestone
                </div>
              )}
              {isPublic && (
                <div className="bg-green-400 text-green-900 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-lg">
                  <Eye className="w-3 h-3" />
                  Public
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
              {title}
            </h3>
          </div>

          {/* Description */}
          {description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed text-sm flex-1">
              {description}
            </p>
          )}

          {/* Meta Information */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{formatDate(date)}</span>
            </div>

            {location && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-700/50 shadow-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
                {tags.length > 4 && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600">
                    +{tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Media Count & Actions */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {/* Media Count */}
              {displayMedia.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Images className="w-4 h-4" />
                  <span>{displayMedia.length} media</span>
                </div>
              )}

              {/* Quick Actions */}
              {showActions && (
                <div className="flex gap-1">
                  <button
                    onClick={() => onEdit(memory)}
                    className="p-2 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                    title="Edit memory"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleAddToAlbum}
                    className="p-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                    title="Add to album"
                  >
                    <FolderPlus className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                    title="Share memory"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Full Actions Row */}
            {showActions && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(memory)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                
                <button
                  onClick={handleAddToAlbum}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                >
                  <FolderPlus className="w-4 h-4" />
                  Album
                </button>
                
                <button
                  onClick={() => onDelete(memory.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Full Media Modal */}
      {showFullMedia && displayMedia.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowFullMedia(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows for Multiple Files */}
            {displayMedia.length > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors duration-200 z-10 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors duration-200 z-10 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Current Media */}
            <div className="bg-black rounded-2xl overflow-hidden">
              <MediaPreview 
                url={displayMedia[currentMediaIndex].url} 
                title={displayMedia[currentMediaIndex].originalName || title}
                mediaType={displayMedia[currentMediaIndex].type}
                showControls={true}
                className="w-full max-h-[70vh]"
              />
            </div>

            {/* Media Info */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium">{displayMedia[currentMediaIndex].originalName || title}</span>
                <span className="text-white/70">•</span>
                <span className="capitalize">{displayMedia[currentMediaIndex].type}</span>
              </div>
            </div>

            {/* Media Counter */}
            {displayMedia.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                {currentMediaIndex + 1} / {displayMedia.length}
              </div>
            )}

            {/* Thumbnail Strip in Modal */}
            {displayMedia.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                {displayMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all duration-200 backdrop-blur-sm ${
                      index === currentMediaIndex 
                        ? 'border-white scale-110 shadow-lg' 
                        : 'border-white/30 hover:border-white/70'
                    }`}
                  >
                    <MediaPreview 
                      url={media.url} 
                      title={media.originalName}
                      mediaType={media.type}
                      showControls={false}
                      className="w-full h-full"
                    />
                    {media.type && media.type !== 'image' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        {getMediaTypeIcon(media.type)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowFullMedia(false)}
              className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 backdrop-blur-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MemoryCard;