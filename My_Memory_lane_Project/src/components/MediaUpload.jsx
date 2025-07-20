import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Video, Mic, X, Check, AlertCircle } from 'lucide-react';
import { uploadToCloudinary, uploadAudioToCloudinary } from '../services/cloudinaryService';
import { validateFile, formatFileSize } from '../utils/mediaUtils';
import toast from 'react-hot-toast';

const MediaUpload = ({ onUploadComplete, onUploadStart, acceptedTypes = ['image', 'video', 'audio'] }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    try {
      const fileType = file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 
                      file.type.startsWith('audio/') ? 'audio' : 'unknown';
      
      if (!acceptedTypes.includes(fileType)) {
        toast.error(`${fileType} files are not allowed`);
        return;
      }

      validateFile(file, fileType);
      setSelectedFile({ file, type: fileType });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setUploadProgress(0);
      onUploadStart && onUploadStart();

      let result;
      if (selectedFile.type === 'audio') {
        result = await uploadAudioToCloudinary(selectedFile.file, setUploadProgress);
      } else {
        result = await uploadToCloudinary(selectedFile.file, setUploadProgress);
      }

      onUploadComplete({
        ...result,
        originalName: selectedFile.file.name,
        size: selectedFile.file.size,
        type: selectedFile.type
      });

      setSelectedFile(null);
      toast.success('Media uploaded successfully!');
    } catch (error) {
      toast.error('Upload failed: ' + error.message);
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'image': return <Image className="w-8 h-8" />;
      case 'video': return <Video className="w-8 h-8" />;
      case 'audio': return <Mic className="w-8 h-8" />;
      default: return <Upload className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-4">
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
        onClick={() => fileInputRef.current?.click()}
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
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Upload Media
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
            </div>
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
                    Uploading... {uploadProgress}%
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

      {/* Selected File Preview */}
      <AnimatePresence>
        {selectedFile && !uploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  {getIcon(selectedFile.type)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedFile.file.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatFileSize(selectedFile.file.size)} • {selectedFile.type}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpload}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                  Upload
                </button>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaUpload;