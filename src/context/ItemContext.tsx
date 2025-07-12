import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import productsData from '../assets/products.json';
import { saveLocalData, getLocalData } from '../utils/localOperations';

export interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

interface ItemContextType {
  items: Item[];
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: number, item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteItem: (id: number) => void;
  getItemById: (id: number) => Item | undefined;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const useItems = () => {
  const data = useContext(ItemContext);
  if (!data) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return data;
};

interface ItemProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'inventory_items';

export const ItemProvider = ({ children }: ItemProviderProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const savedItems = await getLocalData(STORAGE_KEY);
      
      if (savedItems && Array.isArray(savedItems) && savedItems.length > 0) {
        setItems(savedItems);
      } else {
        setItems(productsData);
        await saveLocalData(STORAGE_KEY, productsData);
      }
    } catch (err) {
      console.error('Error loading items:', err);
      setError('Failed to load items');
      setItems(productsData);
    } finally {
      setLoading(false);
    }
  };

  const saveItems = async (newItems: Item[]) => {
    try {
      await saveLocalData(STORAGE_KEY, newItems);
    } catch (err) {
      console.error('Error saving items:', err);
      setError('Failed to save items');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const addItem = async (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString();
      const id = Math.max(...items.map(item => item.id), 0) + 1;
      const item: Item = {
        ...newItem,
        id,
        createdAt: now,
        updatedAt: now,
      };
      
      const updatedItems = [...items, item];
      setItems(updatedItems);
      await saveItems(updatedItems);
      setError(null);
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item');
    }
  };

  const updateItem = async (id: number, updatedItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const updatedItems = items.map(item => 
        item.id === id 
          ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() }
          : item
      );
      
      setItems(updatedItems);
      await saveItems(updatedItems);
      setError(null);
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Failed to update item');
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      await saveItems(updatedItems);
      setError(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item');
    }
  };

  const getItemById = (id: number) => {
    return items.find(item => item.id === id);
  };

  const value: ItemContextType = {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
  };

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  );
};