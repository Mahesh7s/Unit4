import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { getUserAlbums, createAlbum, deleteAlbum, getUserMemories, addMemoryToAlbum } from '../services/memoryService';
import MemoryCard from '../components/MemoryCard';
import CreateAlbumModal from '../components/CreateAlbumModal';
import { Plus, Album, Trash2, Users, Lock, Globe, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const AlbumsPage = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [memories, setMemories] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    loadAlbums();
    loadMemories();
  }, [user]);

  useEffect(() => {
    if (selectedAlbum) {
      loadAlbumMemories();
    }
  }, [selectedAlbum, memories]);

  const loadAlbums = async () => {
    if (!user) return;
    
    try {
      const userAlbums = await getUserAlbums(user.uid);
      setAlbums(userAlbums);
    } catch (error) {
      toast.error('Failed to load albums');
    } finally {
      setLoading(false);
    }
  };

  const loadMemories = async () => {
    if (!user) return;
    
    try {
      const userMemories = await getUserMemories(user.uid);
      setMemories(userMemories);
    } catch (error) {
      console.error('Error loading memories:', error);
    }
  };

  const loadAlbumMemories = () => {
    if (!selectedAlbum || !memories.length) return;
    
    const albumMemoryIds = selectedAlbum.memoryIds || [];
    const filteredMemories = memories.filter(memory => 
      albumMemoryIds.includes(memory.id)
    );
    setAlbumMemories(filteredMemories);
  };

  const handleCreateAlbum = async (albumData) => {
    try {
      await createAlbum(user.uid, albumData);
      await loadAlbums();
      toast.success('Album created successfully!');
    } catch (error) {
      toast.error('Failed to create album');
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    if (window.confirm('Are you sure you want to delete this album?')) {
      try {
        await deleteAlbum(user.uid, albumId);
        setAlbums(prev => prev.filter(album => album.id !== albumId));
        if (selectedAlbum?.id === albumId) {
          setSelectedAlbum(null);
        }
        toast.success('Album deleted successfully');
      } catch (error) {
        toast.error('Failed to delete album');
      }
    }
  };

  const handleAddMemoryToAlbum = async (memoryId) => {
    if (!selectedAlbum) return;
    
    try {
      await addMemoryToAlbum(user.uid, selectedAlbum.id, memoryId);
      await loadAlbums();
      toast.success('Memory added to album!');
    } catch (error) {
      toast.error('Failed to add memory to album');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading albums...</p>
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
              Memory Albums
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Organize your memories into beautiful collections
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Albums List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Albums</h2>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4" />
                  New
                </button>
              </div>

              {albums.length === 0 ? (
                <div className="text-center py-8">
                  <Album className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No albums yet</p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Create Your First Album
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {albums.map((album) => (
                    <div
                      key={album.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedAlbum?.id === album.id
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                      }`}
                      onClick={() => setSelectedAlbum(album)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                            {album.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {album.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span>{(album.memoryIds || []).length} memories</span>
                            <div className="flex items-center gap-1">
                              {album.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                              {album.isPublic ? 'Public' : 'Private'}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAlbum(album.id);
                          }}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Album Content */}
          <div className="lg:col-span-2">
            {selectedAlbum ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedAlbum.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedAlbum.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {new Date(selectedAlbum.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      {selectedAlbum.isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      {selectedAlbum.isPublic ? 'Public Album' : 'Private Album'}
                    </div>
                  </div>
                </div>

                {albumMemories.length === 0 ? (
                  <div className="text-center py-12">
                    <Album className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No memories in this album
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Add memories from your timeline to this album
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {albumMemories.map((memory) => (
                      <MemoryCard
                        key={memory.id}
                        memory={memory}
                        showActions={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
                <Album className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Select an Album
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose an album from the left to view its memories
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Create Album Modal */}
        <CreateAlbumModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateAlbum}
        />
      </div>
    </div>
  );
};

export default AlbumsPage;