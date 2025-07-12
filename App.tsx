import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import ItemDetailScreen from './src/screens/ItemDetailScreen';
import { COLORS } from './src/styles/globalStyles';
import { ItemProvider } from './src/context/ItemContext';
import ItemFormScreen from './src/screens/ItemFormScreen';
import HomeScreen from './src/screens/Homescreen';

export type RootStackParamList = {
  Home: undefined;
  ItemDetail: { itemId: number };
  ItemForm: { itemId?: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ItemProvider>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator 
          initialRouteName="Home"
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="ItemDetail" 
            component={ItemDetailScreen} 
            options={{ title: 'Item Details' }}
          />
          <Stack.Screen 
            name="ItemForm" 
            component={ItemFormScreen} 
            options={({ route }) => ({ 
              title: route.params?.itemId ? 'Edit Item' : 'Add New Item' 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemProvider>
  );
}

export default App;