import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Tag, Star, Globe, Lock, Plus, Trash2 } from 'lucide-react';
import { createMemory, updateMemory } from '../services/memoryService';
import { useAuth } from '../contexts/AuthContext';
import MediaUpload from './MediaUpload';
import MediaPreview from './MediaPreview';
import toast from 'react-hot-toast';

const CreateMemoryModal = ({ isOpen, onClose, onSubmit, editingMemory = null }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    tags: [],
    isMilestone: false,
    isPublic: false
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [currentUploads, setCurrentUploads] = useState(0);
  const [totalUploads, setTotalUploads] = useState(0);

  useEffect(() => {
    if (editingMemory && isOpen) {
      setFormData({
        title: editingMemory.title || '',
        description: editingMemory.description || '',
        date: editingMemory.date || new Date().toISOString().split('T')[0],
        location: editingMemory.location || '',
        tags: editingMemory.tags || [],
        isMilestone: editingMemory.isMilestone || false,
        isPublic: editingMemory.isPublic || false
      });
      
      // Handle both single media (backward compatibility) and multiple media files
      if (editingMemory.mediaFiles && editingMemory.mediaFiles.length > 0) {
        // Use the mediaFiles array for multiple media
        setUploadedMedia(editingMemory.mediaFiles.map(media => ({
          url: media.url || '',
          type: media.type || '',
          publicId: media.publicId || '',
          format: media.format || '',
          originalName: media.originalName || 'media',
          size: media.size || 0,
          duration: media.duration || 0 // Ensure duration is always a number
        })));
      } else if (editingMemory.mediaUrl) {
        // Fallback to single media for backward compatibility
        setUploadedMedia([{
          url: editingMemory.mediaUrl || '',
          type: editingMemory.mediaType || '',
          publicId: editingMemory.mediaPublicId || '',
          format: editingMemory.mediaFormat || '',
          originalName: editingMemory.originalName || 'media',
          size: editingMemory.bytes || 0,
          duration: editingMemory.duration || 0 // Ensure duration is always a number
        }]);
      } else {
        setUploadedMedia([]);
      }
    } else if (!editingMemory && isOpen) {
      // Reset for new memory
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        location: '',
        tags: [],
        isMilestone: false,
        isPublic: false
      });
      setUploadedMedia([]);
      setTagInput('');
    }
  }, [editingMemory, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    // Require at least one media file
    if (uploadedMedia.length === 0) {
      toast.error('Please upload at least one image, video, or audio file');
      return;
    }

    if (uploadingMedia) {
      toast.error('Please wait for media uploads to complete');
      return;
    }

    setLoading(true);
    try {
      // For multiple media, we'll store the first one as primary and all in an array
      const primaryMedia = uploadedMedia[0];
      const allMedia = uploadedMedia;

      const memoryData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: formData.date,
        location: formData.location.trim(),
        tags: formData.tags,
        isMilestone: formData.isMilestone,
        isPublic: formData.isPublic,
        // Primary media (for backward compatibility)
        mediaUrl: primaryMedia?.url || '',
        mediaType: primaryMedia?.type || '',
        mediaPublicId: primaryMedia?.publicId || '',
        mediaFormat: primaryMedia?.format || '',
        // Multiple media support - ensure all properties have values
        mediaFiles: allMedia.map(media => ({
          url: media.url || '',
          type: media.type || '',
          publicId: media.publicId || '',
          format: media.format || '',
          originalName: media.originalName || '',
          size: media.size || 0,
          duration: media.duration || 0 // Ensure duration is always a number
        })),
        mediaCount: allMedia.length
      };

      console.log('Submitting memory data:', memoryData);

      if (editingMemory) {
        await updateMemory(user.uid, editingMemory.id, memoryData);
        toast.success('Memory updated successfully!');
      } else {
        await createMemory(user.uid, memoryData);
        toast.success('Memory created successfully!');
      }

      onSubmit && onSubmit();
      handleClose();
    } catch (error) {
      console.error('Error saving memory:', error);
      toast.error('Failed to save memory: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      tags: [],
      isMilestone: false,
      isPublic: false
    });
    setTagInput('');
    setUploadedMedia([]);
    setUploadingMedia(false);
    setCurrentUploads(0);
    setTotalUploads(0);
    onClose();
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name === 'tagInput') {
      e.preventDefault();
      addTag();
    }
  };

  const handleMediaUploadStart = (totalFiles = 1) => {
    setUploadingMedia(true);
    setCurrentUploads(0);
    setTotalUploads(totalFiles);
    console.log(`Media upload started for ${totalFiles} files...`);
  };

  const handleMediaUpload = (mediaData) => {
    console.log('Single media uploaded:', mediaData);
    // Ensure all media data properties have proper values
    const cleanMediaData = {
      url: mediaData.url || '',
      type: mediaData.type || '',
      publicId: mediaData.publicId || '',
      format: mediaData.format || '',
      originalName: mediaData.originalName || '',
      size: mediaData.size || 0,
      duration: mediaData.duration || 0 // Ensure duration is always a number
    };
    
    setUploadedMedia(prev => [...prev, cleanMediaData]);
    setCurrentUploads(prev => prev + 1);
    
    if (currentUploads + 1 >= totalUploads) {
      setUploadingMedia(false);
      toast.success(`Successfully uploaded ${totalUploads} file(s)!`);
    }
  };

  const handleMultipleMediaUpload = (mediaArray) => {
    console.log('Multiple media uploaded:', mediaArray);
    // Clean all media data to ensure no undefined values
    const cleanMediaArray = mediaArray.map(media => ({
      url: media.url || '',
      type: media.type || '',
      publicId: media.publicId || '',
      format: media.format || '',
      originalName: media.originalName || '',
      size: media.size || 0,
      duration: media.duration || 0 // Ensure duration is always a number
    }));
    
    setUploadedMedia(prev => [...prev, ...cleanMediaArray]);
    setUploadingMedia(false);
    toast.success(`Successfully uploaded ${mediaArray.length} files!`);
  };

  const handleRemoveMedia = (indexToRemove) => {
    setUploadedMedia(prev => prev.filter((_, index) => index !== indexToRemove));
    toast.success('Media removed');
  };

  const handleReorderMedia = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    
    const newMedia = [...uploadedMedia];
    const [movedItem] = newMedia.splice(fromIndex, 1);
    newMedia.splice(toIndex, 0, movedItem);
    setUploadedMedia(newMedia);
  };

  const getMediaTypeDisplay = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingMemory ? 'Edit Memory' : 'Create New Memory'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter memory title..."
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tell the story of this memory..."
                    />
                  </div>

                  {/* Date and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Where was this?"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Tag className="w-4 h-4 inline mr-2" />
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        name="tagInput"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Add a tag..."
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        Add
                      </button>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="hover:text-purple-900 dark:hover:text-purple-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Settings */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="milestone"
                        checked={formData.isMilestone}
                        onChange={(e) => setFormData(prev => ({ ...prev, isMilestone: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="milestone" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Mark as milestone
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="public"
                        checked={formData.isPublic}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                        className="w-5 h-5 text-purple-600 border-gray-300 dark:border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="public" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {formData.isPublic ? (
                          <Globe className="w-4 h-4 text-green-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                        Make public (shareable)
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column - Media */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Media Files *
                        {uploadedMedia.length > 0 && (
                          <span className="text-purple-600 dark:text-purple-400 ml-2">
                            ({uploadedMedia.length} file{uploadedMedia.length !== 1 ? 's' : ''} uploaded)
                          </span>
                        )}
                      </label>
                      {uploadedMedia.length > 1 && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Drag to reorder • First file will be featured
                        </div>
                      )}
                    </div>
                    
                    {/* Uploaded Media Grid */}
                    {uploadedMedia.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        {uploadedMedia.map((media, index) => (
                          <motion.div
                            key={`${media.publicId || media.url}-${index}`}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`relative group bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden border-2 ${
                              index === 0 ? 'border-purple-500' : 'border-transparent'
                            }`}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', index.toString());
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.add('border-blue-500');
                            }}
                            onDragLeave={(e) => {
                              e.currentTarget.classList.remove('border-blue-500');
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              e.currentTarget.classList.remove('border-blue-500');
                              const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                              handleReorderMedia(fromIndex, index);
                            }}
                            onDragEnd={(e) => {
                              e.currentTarget.classList.remove('border-blue-500');
                            }}
                          >
                            <MediaPreview 
                              url={media.url} 
                              title={media.originalName || `Media ${index + 1}`}
                              mediaType={media.type}
                              className="w-full h-32"
                              showControls={false}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => handleRemoveMedia(index)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              {getMediaTypeDisplay(media.type)}
                            </div>
                            {index === 0 && (
                              <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                                Featured
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Upload Progress */}
                    {uploadingMedia && (
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            Uploading files...
                          </span>
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            {currentUploads} of {totalUploads}
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentUploads / totalUploads) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Upload Area */}
                    <MediaUpload 
                      onUploadComplete={handleMediaUpload}
                      onMultipleUploadComplete={handleMultipleMediaUpload}
                      onUploadStart={handleMediaUploadStart}
                      acceptedTypes={['image', 'video', 'audio']}
                      multiple={true}
                      maxFiles={10}
                    />

                    {/* Media Requirement Note */}
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Note:</strong> At least one image, video, or audio file is required to create a memory.
                        The first file will be featured as the main media.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingMedia || uploadedMedia.length === 0}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {editingMemory ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingMemory ? 'Update Memory' : 'Create Memory'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateMemoryModal;