import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getUserMemories, deleteMemory, updateMemory, getRandomMemory, searchMemories } from '../services/memoryService';
import { generateShareableLink } from '../utils/mediaUtils';
import { exportMemoriesToPDF } from '../utils/exportUtils';
import MemoryCard from '../components/MemoryCard';
import CreateMemoryModal from '../components/CreateMemoryModal';
import { Plus, Calendar, Search, Filter, Shuffle, Sparkles, Download, Share2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = ({ openCreateModal = false }) => {
  const { user } = useAuth();
  const [memories, setMemories] = useState([]);
  const [filteredMemories, setFilteredMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(openCreateModal);
  const [editingMemory, setEditingMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [showReminisce, setShowReminisce] = useState(false);
  const [reminisceMemory, setReminisceMemory] = useState(null);
  const [shareModalMemory, setShareModalMemory] = useState(null);

  const allTags = [...new Set(memories.flatMap(memory => memory.tags || []))];

  useEffect(() => {
    loadMemories();
  }, [user]);

  useEffect(() => {
    filterMemories();
  }, [memories, searchTerm, filterTag]);

  const loadMemories = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userMemories = await getUserMemories(user.uid);
      setMemories(userMemories);
    } catch (error) {
      toast.error('Failed to load memories');
    } finally {
      setLoading(false);
    }
  };

  const filterMemories = async () => {
    if (!user) return;
    
    try {
      const filtered = await searchMemories(user.uid, searchTerm, {
        tag: filterTag
      });
      setFilteredMemories(filtered);
    } catch (error) {
      console.error('Error filtering memories:', error);
      setFilteredMemories(memories);
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    if (window.confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
      try {
        await deleteMemory(user.uid, memoryId);
        setMemories(prev => prev.filter(memory => memory.id !== memoryId));
        toast.success('Memory deleted successfully');
      } catch (error) {
        toast.error('Failed to delete memory');
      }
    }
  };

  const handleEditMemory = (memory) => {
    setEditingMemory(memory);
    setIsCreateModalOpen(true);
  };

  const handleUpdateMemory = async (updatedData) => {
    try {
      await updateMemory(user.uid, editingMemory.id, updatedData);
      setMemories(prev =>
        prev.map(memory =>
          memory.id === editingMemory.id
            ? { ...memory, ...updatedData, updatedAt: Date.now() }
            : memory
        )
      );
      toast.success('Memory updated successfully');
      setEditingMemory(null);
    } catch (error) {
      toast.error('Failed to update memory');
    }
  };

  const handleReminisce = async () => {
    if (memories.length === 0) {
      toast.error('No memories to reminisce about yet!');
      return;
    }

    try {
      const randomMemory = await getRandomMemory(user.uid);
      if (randomMemory) {
        setReminisceMemory(randomMemory);
        setShowReminisce(true);
      }
    } catch (error) {
      toast.error('Failed to get random memory');
    }
  };

  const handleShareMemory = (memory) => {
    setShareModalMemory(memory);
  };

  const handleCopyShareLink = (memory) => {
    const shareLink = generateShareableLink(memory);
    navigator.clipboard.writeText(shareLink);
    toast.success('Share link copied to clipboard!');
  };

  const handleExportMemories = () => {
    if (memories.length === 0) {
      toast.error('No memories to export');
      return;
    }
    
    const userInfo = {
      name: user.displayName || user.email,
      email: user.email
    };
    
    toast.promise(
      exportMemoriesToPDF(memories, userInfo),
      {
        loading: 'Generating PDF export...',
        success: (result) => `PDF exported successfully: ${result.fileName}`,
        error: 'Failed to export memories to PDF'
      }
    );
  };

  const milestones = memories.filter(memory => memory.isMilestone);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user?.displayName || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have {memories.length} memories in your timeline
            </p>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleExportMemories}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
            
            <button
              onClick={handleReminisce}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Shuffle className="w-5 h-5" />
              Reminisce
            </button>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add Memory
            </button>
          </div>
        </div>

        {/* Milestones Section */}
        {milestones.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Memory Milestones</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.slice(0, 3).map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onEdit={handleEditMemory}
                  onDelete={handleDeleteMemory}
                  onShare={handleShareMemory}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Recent Memories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {searchTerm || filterTag ? 'Filtered Memories' : 'Your Timeline'}
            </h2>
          </div>

          {filteredMemories.length === 0 ? (
            <div className="text-center py-16">
              {memories.length === 0 ? (
                <div>
                  <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No memories yet</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Start creating your first memory to begin your journey</p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Create Your First Memory
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No memories found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onEdit={handleEditMemory}
                  onDelete={handleDeleteMemory}
                  onShare={handleShareMemory}
                />
              ))}
            </div>
          )}
        </motion.section>

        {/* Create Memory Modal */}
        <CreateMemoryModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingMemory(null);
          }}
          onSubmit={editingMemory ? handleUpdateMemory : loadMemories}
          editingMemory={editingMemory}
        />

        {/* Reminisce Modal */}
        <AnimatePresence>
          {showReminisce && reminisceMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowReminisce(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 text-center border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Memory Lane Reminisce</h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Here's a memory from your past...</p>
                </div>
                
                <div className="p-6">
                  <MemoryCard
                    memory={reminisceMemory}
                    onEdit={handleEditMemory}
                    onDelete={handleDeleteMemory}
                    onShare={handleShareMemory}
                    className="shadow-none border border-gray-200 dark:border-gray-700"
                  />
                </div>
                
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex gap-3">
                  <button
                    onClick={handleReminisce}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Another Memory
                  </button>
                  <button
                    onClick={() => setShowReminisce(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Share Modal */}
        <AnimatePresence>
          {shareModalMemory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShareModalMemory(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md"
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share Memory</h3>
                  <button
                    onClick={() => setShareModalMemory(null)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{shareModalMemory.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{shareModalMemory.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleCopyShareLink(shareModalMemory)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors duration-200"
                    >
                      <Share2 className="w-5 h-5" />
                      Copy Share Link
                    </button>
                    
                    {shareModalMemory.isPublic ? (
                      <p className="text-sm text-green-600 dark:text-green-400 text-center">
                        This memory is public and can be shared
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        This memory is private. Make it public to share with others.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;