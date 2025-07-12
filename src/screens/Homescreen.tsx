import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useItems, Item } from '../context/ItemContext';
import { globalStyles, COLORS, FONTSIZES } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';
import { RootStackParamList } from '../navigation/navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { items, loading, error, deleteItem } = useItems();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (item: Item) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDeletingId(item.id);
            deleteItem(item.id);
            setDeletingId(null);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={globalStyles.card}
      onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}
    >
      <View style={styles.itemHeader}>
        <View>
          <Text style={globalStyles.heading3}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <Text style={styles.stockText}>Stock: {item.stock}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Edit"
          onPress={() => navigation.navigate('ItemForm', { itemId: item.id })}
          variant='primary'
        />
        
        <CustomButton
          title="Delete"
          onPress={() => handleDelete(item)}
          variant="delete"
          loading={deletingId === item.id}
        />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Loading items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.errorContainer}>
        <Text style={globalStyles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{height:6}} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items available</Text>
          </View>
        )}
      />
      <CustomButton
        title="Add New Item"
        onPress={() => navigation.navigate('ItemForm')}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  category: {
    fontSize: FONTSIZES.SMALL,
    color: COLORS.GRAY_M,
    marginBottom: 8,
  },
  price: {
    fontSize: FONTSIZES.LARGE,
    fontWeight: '600',
    color: COLORS.GREEN,
  },
  stockContainer: {
    backgroundColor: COLORS.GRAY_L,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 4,
  },
  stockText: {
    fontSize: FONTSIZES.SMALL,
    color: COLORS.GRAY_D,
    padding:8,
    backgroundColor:COLORS.WHITE,
    borderRadius:16
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent:'flex-end',
  },
  addButton: {
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  emptyText: {
    fontSize: FONTSIZES.LARGE,
    fontWeight: '500',
    color: COLORS.GRAY_D,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: FONTSIZES.MEDIUM,
    color: COLORS.GRAY_M,
    textAlign: 'center',
    marginTop: 6,
  },
  loadingText: {
    marginTop: 12,
    fontSize: FONTSIZES.MEDIUM,
    color: COLORS.GRAY_D,
  },
});

export default HomeScreen;
