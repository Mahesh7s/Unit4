import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Tag, Star, Globe, Lock } from 'lucide-react';
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
    mediaUrl: '',
    mediaType: '',
    tags: [],
    isMilestone: false,
    isPublic: false
  });

  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState(null);

  useEffect(() => {
    if (editingMemory) {
      setFormData({
        title: editingMemory.title || '',
        description: editingMemory.description || '',
        date: editingMemory.date || new Date().toISOString().split('T')[0],
        location: editingMemory.location || '',
        mediaUrl: editingMemory.mediaUrl || '',
        mediaType: editingMemory.mediaType || '',
        tags: editingMemory.tags || [],
        isMilestone: editingMemory.isMilestone || false,
        isPublic: editingMemory.isPublic || false
      });
      
      if (editingMemory.mediaUrl) {
        setUploadedMedia({
          url: editingMemory.mediaUrl,
          type: editingMemory.mediaType
        });
      }
    }
  }, [editingMemory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    setLoading(true);
    try {
      const memoryData = {
        ...formData,
        mediaUrl: uploadedMedia?.url || null,
        mediaType: uploadedMedia?.type || null,
        mediaPublicId: uploadedMedia?.publicId || null,
        mediaFormat: uploadedMedia?.format || null
      };

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
      mediaUrl: '',
      mediaType: '',
      tags: [],
      isMilestone: false,
      isPublic: false
    });
    setTagInput('');
    setUploadedMedia(null);
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
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

  const handleMediaUpload = (mediaData) => {
    setUploadedMedia(mediaData);
    toast.success('Media uploaded successfully!');
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
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Media
                    </label>
                    
                    {uploadedMedia ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <MediaPreview 
                            url={uploadedMedia.url} 
                            title={formData.title}
                            className="w-full h-64"
                          />
                          <button
                            type="button"
                            onClick={() => setUploadedMedia(null)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                          Media uploaded successfully! You can replace it by uploading a new file.
                        </p>
                      </div>
                    ) : (
                      <MediaUpload 
                        onUploadComplete={handleMediaUpload}
                        acceptedTypes={['image', 'video', 'audio']}
                      />
                    )}
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
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : (editingMemory ? 'Update Memory' : 'Create Memory')}
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