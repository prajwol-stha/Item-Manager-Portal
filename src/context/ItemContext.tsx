import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import productsData from '../assets/products.json';

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
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};

interface ItemProviderProps {
  children: ReactNode;
}

export const ItemProvider = ({ children }:ItemProviderProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 1000));
        setItems(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  const addItem = (newItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const id = Math.max(...items.map(item => item.id), 0) + 1;
    const item: Item = {
      ...newItem,
      id,
      createdAt: now,
      updatedAt: now,
    };
    setItems(prev => [...prev, item]);
  };

  const updateItem = (id: number, updatedItem: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
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