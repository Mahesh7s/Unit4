import { database } from '../firebase/config';
import { ref, push, set, get, query, orderByChild, equalTo, remove, update, orderByKey, limitToLast } from 'firebase/database';

export const createMemory = async (userId, memoryData) => {
  try {
    const memoriesRef = ref(database, `memories/${userId}`);
    const newMemoryRef = push(memoriesRef);
    
    const memory = {
      ...memoryData,
      id: newMemoryRef.key,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId,
      // Ensure media fields are properly stored
      mediaUrl: memoryData.mediaUrl || null,
      mediaType: memoryData.mediaType || null,
      mediaPublicId: memoryData.mediaPublicId || null,
      mediaFormat: memoryData.mediaFormat || null
    };
    
    await set(newMemoryRef, memory);
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
      const memories = Object.values(snapshot.val());
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
    await update(memoryRef, {
      ...updates,
      updatedAt: Date.now()
    });
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
      return Object.values(snapshot.val());
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
        memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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