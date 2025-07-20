import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { searchMemories, getUserMemories } from '../services/memoryService';
import MemoryCard from '../components/MemoryCard';
import { Search, Filter, Calendar, MapPin, Tag, Star, X } from 'lucide-react';
import { debounce } from '../utils/mediaUtils';

const SearchPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [memories, setMemories] = useState([]);
  const [filteredMemories, setFilteredMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    tag: '',
    dateFrom: '',
    dateTo: '',
    location: '',
    milestone: undefined
  });
  const [allTags, setAllTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadMemories();
  }, [user]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      performSearch();
    }, 300);

    debouncedSearch();
  }, [searchTerm, filters, memories]);

  const loadMemories = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const userMemories = await getUserMemories(user.uid);
      setMemories(userMemories);
      setFilteredMemories(userMemories);
      
      // Extract all unique tags
      const tags = [...new Set(userMemories.flatMap(memory => memory.tags || []))];
      setAllTags(tags);
    } catch (error) {
      console.error('Error loading memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    if (!user) return;
    
    try {
      const searchFilters = {
        ...filters,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined,
        location: filters.location || undefined
      };

      const results = await searchMemories(user.uid, searchTerm, searchFilters);
      setFilteredMemories(results);
    } catch (error) {
      console.error('Error searching memories:', error);
      setFilteredMemories(memories);
    }
  };

  const clearFilters = () => {
    setFilters({
      tag: '',
      dateFrom: '',
      dateTo: '',
      location: '',
      milestone: undefined
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || filters.tag || filters.dateFrom || filters.dateTo || filters.location || filters.milestone !== undefined;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading memories...</p>
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
              Search Memories
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Find your memories by keywords, tags, dates, or locations
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search memories by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            {hasActiveFilters && (
              <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Tag className="w-4 h-4 inline mr-2" />
                  Tag
                </label>
                <select
                  value={filters.tag}
                  onChange={(e) => setFilters(prev => ({ ...prev, tag: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Milestone Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Star className="w-4 h-4 inline mr-2" />
                  Milestones
                </label>
                <select
                  value={filters.milestone === undefined ? '' : filters.milestone.toString()}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    milestone: e.target.value === '' ? undefined : e.target.value === 'true'
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All memories</option>
                  <option value="true">Milestones only</option>
                  <option value="false">Regular memories</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredMemories.length} {filteredMemories.length === 1 ? 'memory' : 'memories'} found
            {hasActiveFilters && ' with current filters'}
          </p>
        </div>

        {/* Memory Grid */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {memories.length === 0 ? 'No memories yet' : 'No memories found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {memories.length === 0 
                ? 'Start creating memories to search through them'
                : 'Try adjusting your search terms or filters'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map((memory) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                showActions={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;