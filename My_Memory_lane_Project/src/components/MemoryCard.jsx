import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/mediaUtils';
import MediaPreview from './MediaPreview';
import { Calendar, MapPin, Tag, Star, Edit, Trash2, Share2, Eye, X } from 'lucide-react';

const MemoryCard = ({ 
  memory, 
  onEdit, 
  onDelete, 
  onShare,
  className = '',
  showActions = true 
}) => {
  const [showFullMedia, setShowFullMedia] = useState(false);
  const { title, description, date, location, tags, mediaUrl, mediaType, isMilestone, isPublic } = memory;

  const handleShare = () => {
    if (onShare) {
      onShare(memory);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${className}`}
      >
        {/* Media Preview */}
        {mediaUrl && (
          <div className="h-48 relative overflow-hidden">
            {console.log('Memory media data:', { mediaUrl, mediaType, title })}
            <MediaPreview 
              url={mediaUrl} 
              title={title} 
              mediaType={mediaType}
              showControls={false}
              onClick={() => setShowFullMedia(true)}
              className="w-full h-full"
            />
            {isMilestone && (
              <div className="absolute top-3 right-3">
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-lg">
                  <Star className="w-3 h-3" />
                  Milestone
                </div>
              </div>
            )}
            {isPublic && (
              <div className="absolute top-3 left-3">
                <div className="bg-green-400 text-green-900 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium shadow-lg">
                  <Eye className="w-3 h-3" />
                  Public
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
              {title}
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Meta Information */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(date)}</span>
            </div>

            {location && (
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => onEdit(memory)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
              >
                <Share2 className="w-4 h-4" />
                Share
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
      </motion.div>

      {/* Full Media Modal */}
      {showFullMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowFullMedia(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <MediaPreview 
              url={mediaUrl} 
              title={title} 
              showControls={true}
              className="w-full h-full"
            />
            <button
              onClick={() => setShowFullMedia(false)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
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