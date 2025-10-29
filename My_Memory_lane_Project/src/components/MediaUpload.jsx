// src/components/MediaUpload.jsx

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Video, Mic, X, Loader, Plus } from 'lucide-react';
import { uploadToCloudinary } from '../services/cloudinaryService';
import { validateFile, formatFileSize } from '../utils/mediaUtils';
import toast from 'react-hot-toast';

const MediaUpload = ({ 
  onUploadComplete, 
  onMultipleUploadComplete,
  onUploadStart, 
  acceptedTypes = ['image', 'video', 'audio'],
  multiple = false,
  maxFiles = 10
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFilesSelect = (files) => {
    const validFiles = [];
    const errors = [];

    Array.from(files).forEach(file => {
      try {
        // Determine file type
        let fileType = 'unknown';
        if (file.type.startsWith('image/')) {
          fileType = 'image';
        } else if (file.type.startsWith('video/')) {
          fileType = 'video';
        } else if (file.type.startsWith('audio/')) {
          fileType = 'audio';
        }
        
        if (!acceptedTypes.includes(fileType)) {
          errors.push(`${file.name}: ${fileType} files are not allowed`);
          return;
        }

        validateFile(file, fileType);
        validFiles.push({ file, type: fileType });
      } catch (error) {
        errors.push(`${file.name}: ${error.message}`);
      }
    });

    if (errors.length > 0) {
      toast.error(`Some files were rejected:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      if (multiple) {
        // Check if adding these files would exceed maxFiles
        const totalFiles = selectedFiles.length + validFiles.length;
        if (totalFiles > maxFiles) {
          toast.error(`Maximum ${maxFiles} files allowed`);
          return;
        }
        setSelectedFiles(prev => [...prev, ...validFiles]);
      } else {
        setSelectedFiles(validFiles);
      }
    }
  };

  const handleUpload = async (filesToUpload = null) => {
    const files = filesToUpload || selectedFiles;
    if (files.length === 0) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      onUploadStart && onUploadStart(files.length);

      const uploadPromises = files.map(async (fileData, index) => {
        let result;
        
        // Use the main upload function for all file types
        result = await uploadToCloudinary(fileData.file, (progress) => {
          // Calculate overall progress
          const individualProgress = progress / files.length;
          setUploadProgress(prev => Math.min(prev + individualProgress, 100));
        });

        return {
          ...result,
          originalName: fileData.file.name,
          size: fileData.file.size,
          type: fileData.type
        };
      });

      const results = await Promise.all(uploadPromises);
      
      if (multiple && onMultipleUploadComplete) {
        onMultipleUploadComplete(results);
      } else if (onUploadComplete) {
        results.forEach(result => onUploadComplete(result));
      }

      setSelectedFiles([]);
      toast.success(`Successfully uploaded ${results.length} file${results.length !== 1 ? 's' : ''}`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed: ' + error.message);
      setSelectedFiles([]);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = multiple ? e.dataTransfer.files : [e.dataTransfer.files[0]];
      handleFilesSelect(files);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = multiple ? e.target.files : [e.target.files[0]];
      handleFilesSelect(files);
      // Reset input value to allow uploading same file again
      e.target.value = '';
    }
  };

  const removeSelectedFile = (indexToRemove) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Mic className="w-5 h-5" />;
      default: return <Upload className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Selected Files Preview */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Selected Files ({selectedFiles.length})
              </h4>
              {!uploading && (
                <button
                  onClick={() => handleUpload()}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Upload className="w-4 h-4" />
                  Upload All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedFiles.map((fileData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    {getIcon(fileData.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {fileData.file.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatFileSize(fileData.file.size)} • {fileData.type}
                    </p>
                  </div>
                  {!uploading && (
                    <button
                      onClick={() => removeSelectedFile(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
        } ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.map(type => {
            switch (type) {
              case 'image': return 'image/*';
              case 'video': return 'video/*';
              case 'audio': return 'audio/*';
              default: return '';
            }
          }).join(',')}
          onChange={handleInputChange}
          disabled={uploading}
          multiple={multiple}
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              {uploading ? (
                <Loader className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
              ) : (
                <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {uploading ? 'Uploading...' : 'Upload Media'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {uploading 
                ? 'Please wait while we upload your files' 
                : multiple 
                  ? `Drag and drop your files here, or click to browse (max ${maxFiles} files)`
                  : 'Drag and drop your file here, or click to browse'
              }
            </p>
            
            {!uploading && (
              <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
                {acceptedTypes.includes('image') && (
                  <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    Images
                  </div>
                )}
                {acceptedTypes.includes('video') && (
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    Videos
                  </div>
                )}
                {acceptedTypes.includes('audio') && (
                  <div className="flex items-center gap-1">
                    <Mic className="w-4 h-4" />
                    Audio
                  </div>
                )}
                {multiple && (
                  <div className="flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Multiple files
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 rounded-xl"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - uploadProgress / 100)}`}
                      className="text-purple-600 transition-all duration-300"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Uploading... {Math.round(uploadProgress)}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please wait while we upload your media
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MediaUpload;