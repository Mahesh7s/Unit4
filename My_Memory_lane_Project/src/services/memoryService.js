// src/services/memoryService.js

import { database } from '../firebase/config';
import { ref, push, set, get, remove, update } from 'firebase/database';

// Helper function to clean data and remove undefined/null values
const cleanData = (data) => {
  const cleaned = {};
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        // Clean each item in the array
        cleaned[key] = value.map(item => 
          typeof item === 'object' ? cleanData(item) : item
        );
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        // Recursively clean nested objects
        cleaned[key] = cleanData(value);
      } else {
        cleaned[key] = value;
      }
    }
  });
  return cleaned;
};

export const createMemory = async (userId, memoryData) => {
  try {
    const memoriesRef = ref(database, `memories/${userId}`);
    const newMemoryRef = push(memoriesRef);
    
    // Clean the memory data first
    const cleanMemoryData = cleanData(memoryData);
    
    const memory = {
      ...cleanMemoryData,
      id: newMemoryRef.key,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId,
      // Ensure all fields have proper fallbacks
      title: cleanMemoryData.title || 'Untitled Memory',
      description: cleanMemoryData.description || '',
      location: cleanMemoryData.location || '',
      tags: cleanMemoryData.tags || [],
      isMilestone: cleanMemoryData.isMilestone || false,
      isPublic: cleanMemoryData.isPublic || false,
      date: cleanMemoryData.date || new Date().toISOString().split('T')[0],
      // Media handling with proper defaults
      mediaUrl: cleanMemoryData.mediaUrl || '',
      mediaType: cleanMemoryData.mediaType || '',
      mediaPublicId: cleanMemoryData.mediaPublicId || '',
      mediaFormat: cleanMemoryData.mediaFormat || '',
      // Multiple media support with cleaned arrays
      mediaFiles: (cleanMemoryData.mediaFiles || []).map(file => ({
        url: file.url || '',
        type: file.type || '',
        publicId: file.publicId || '',
        format: file.format || '',
        originalName: file.originalName || '',
        size: file.size || 0,
        duration: file.duration || 0 // Ensure duration is always a number
      })),
      mediaCount: cleanMemoryData.mediaCount || 0
    };
    
    console.log('Creating memory in Firebase:', memory);
    
    // Clean the final memory object before saving
    const finalMemory = cleanData(memory);
    
    await set(newMemoryRef, finalMemory);
    return memory;
  } catch (error) {
    console.error('Error creating memory:', error);
    throw error;
  }
};

export const getUserMemories = async (userId) => {
  try {
    const memoriesRef = ref(database, `memories/${userId}`);
    const snapshot = await get(memoriesRef);
    
    if (snapshot.exists()) {
      const memoriesData = snapshot.val();
      const memories = Object.keys(memoriesData).map(key => {
        const memory = memoriesData[key];
        // Clean up any undefined values and ensure proper structure
        return {
          id: key,
          title: memory.title || 'Untitled Memory',
          description: memory.description || '',
          date: memory.date || new Date().toISOString().split('T')[0],
          location: memory.location || '',
          tags: memory.tags || [],
          isMilestone: memory.isMilestone || false,
          isPublic: memory.isPublic || false,
          mediaUrl: memory.mediaUrl || '',
          mediaType: memory.mediaType || '',
          mediaPublicId: memory.mediaPublicId || '',
          mediaFormat: memory.mediaFormat || '',
          mediaFiles: (memory.mediaFiles || []).map(file => ({
            url: file.url || '',
            type: file.type || '',
            publicId: file.publicId || '',
            format: file.format || '',
            originalName: file.originalName || '',
            size: file.size || 0,
            duration: file.duration || 0
          })),
          mediaCount: memory.mediaCount || 0,
          createdAt: memory.createdAt || Date.now(),
          updatedAt: memory.updatedAt || Date.now(),
          userId: memory.userId || userId
        };
      });
      
      console.log('Retrieved memories from Firebase:', memories.length, 'memories');
      
      // Sort by date descending (newest first)
      return memories.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return [];
  } catch (error) {
    console.error('Error fetching memories:', error);
    throw error;
  }
};

export const deleteMemory = async (userId, memoryId) => {
  try {
    const memoryRef = ref(database, `memories/${userId}/${memoryId}`);
    await remove(memoryRef);
  } catch (error) {
    console.error('Error deleting memory:', error);
    throw error;
  }
};

export const updateMemory = async (userId, memoryId, updates) => {
  try {
    const memoryRef = ref(database, `memories/${userId}/${memoryId}`);
    
    // Clean up updates to remove undefined values
    const cleanUpdates = cleanData(updates);
    
    const updateData = {
      ...cleanUpdates,
      updatedAt: Date.now()
    };
    
    console.log('Updating memory in Firebase:', updateData);
    
    await update(memoryRef, updateData);
  } catch (error) {
    console.error('Error updating memory:', error);
    throw error;
  }
};

export const createAlbum = async (userId, albumData) => {
  try {
    const albumsRef = ref(database, `albums/${userId}`);
    const newAlbumRef = push(albumsRef);
    
    const album = {
      ...albumData,
      id: newAlbumRef.key,
      createdAt: Date.now(),
      memoryIds: [],
      collaborators: [],
      userId
    };
    
    await set(newAlbumRef, album);
    return album;
  } catch (error) {
    console.error('Error creating album:', error);
    throw error;
  }
};

export const getUserAlbums = async (userId) => {
  try {
    const albumsRef = ref(database, `albums/${userId}`);
    const snapshot = await get(albumsRef);
    
    if (snapshot.exists()) {
      const albumsData = snapshot.val();
      return Object.keys(albumsData).map(key => ({
        ...albumsData[key],
        id: key
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};

export const deleteAlbum = async (userId, albumId) => {
  try {
    const albumRef = ref(database, `albums/${userId}/${albumId}`);
    await remove(albumRef);
  } catch (error) {
    console.error('Error deleting album:', error);
    throw error;
  }
};

export const addMemoryToAlbum = async (userId, albumId, memoryId) => {
  try {
    const albumRef = ref(database, `albums/${userId}/${albumId}`);
    const snapshot = await get(albumRef);
    
    if (snapshot.exists()) {
      const album = snapshot.val();
      const memoryIds = album.memoryIds || [];
      
      if (!memoryIds.includes(memoryId)) {
        memoryIds.push(memoryId);
        await update(albumRef, { memoryIds });
      }
    }
  } catch (error) {
    console.error('Error adding memory to album:', error);
    throw error;
  }
};

export const getRandomMemory = async (userId) => {
  try {
    const memories = await getUserMemories(userId);
    if (memories.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * memories.length);
    return memories[randomIndex];
  } catch (error) {
    console.error('Error getting random memory:', error);
    throw error;
  }
};

export const searchMemories = async (userId, searchTerm, filters = {}) => {
  try {
    const memories = await getUserMemories(userId);
    
    return memories.filter(memory => {
      const matchesSearch = !searchTerm || 
        memory.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTag = !filters.tag || memory.tags?.includes(filters.tag);
      
      let matchesDateRange = true;
      if (filters.dateFrom || filters.dateTo) {
        const memoryDate = new Date(memory.date);
        if (filters.dateFrom) {
          matchesDateRange = matchesDateRange && memoryDate >= new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
          matchesDateRange = matchesDateRange && memoryDate <= new Date(filters.dateTo);
        }
      }
      
      const matchesLocation = !filters.location || 
        memory.location?.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMilestone = filters.milestone === undefined || memory.isMilestone === filters.milestone;
      
      return matchesSearch && matchesTag && matchesDateRange && matchesLocation && matchesMilestone;
    });
  } catch (error) {
    console.error('Error searching memories:', error);
    throw error;
  }
};