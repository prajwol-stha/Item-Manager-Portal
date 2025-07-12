
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalData = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving local data:', error);
  }
};

export const getLocalData = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading local data:', error);
    return null;
  }
};

export const updateLocalData = async (key: string, updatedValue: any): Promise<void> => {
  await saveLocalData(key, updatedValue); 
};

export const deleteLocalData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting local data:', error);
  }
};
