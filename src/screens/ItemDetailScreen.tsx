import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useItems } from '../context/ItemContext';
import { globalStyles, COLORS, FONTSIZES } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';

type ItemDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ItemDetail'>;
type ItemDetailScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

const ItemDetailScreen: React.FC = () => {
  const navigation = useNavigation<ItemDetailScreenNavigationProp>();
  const route = useRoute<ItemDetailScreenRouteProp>();
  const { itemId } = route.params;
  const { getItemById, deleteItem } = useItems();

  const item = getItemById(itemId);

  const handleDelete = () => {
    if (!item) return;
    
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteItem(item.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!item) {
    return (
      <View style={globalStyles.errorContainer}>
        <Text style={globalStyles.errorText}>Item not found</Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={globalStyles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.card}>
        <View style={styles.header}>
          <Text style={globalStyles.heading1}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{item.category}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Stock:</Text>
          <Text style={[styles.value, { color: item.stock > 0 ? COLORS.GREEN : COLORS.RED }]}>
            {item.stock} units
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.label}>Created:</Text>
            <Text style={styles.value}>{formatDate(item.createdAt)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Last Updated:</Text>
            <Text style={styles.value}>{formatDate(item.updatedAt)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Image URL:</Text>
            <Text style={[styles.value, styles.urlText]} numberOfLines={2}>
              {item.imageUrl}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Edit Item"
          onPress={() => navigation.navigate('ItemForm', { itemId: item.id })}
          style={styles.editButton}
        />

        <CustomButton
          title="Delete Item"
          onPress={handleDelete}
          variant="delete"
          style={styles.deleteButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  priceContainer: {
    backgroundColor: COLORS.GREEN,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  price: {
    fontSize: FONTSIZES.LARGE,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_M,
  },
  label: {
    fontSize: FONTSIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.GRAY_D,
    flex: 1,
  },
  value: {
    fontSize: FONTSIZES.MEDIUM,
    color: COLORS.BLACK,
    flex: 2,
    textAlign: 'right',
  },
  urlText: {
    fontSize: FONTSIZES.SMALL,
    color: COLORS.BLUE,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: FONTSIZES.LARGE,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  description: {
    fontSize: FONTSIZES.MEDIUM,
    color: COLORS.GRAY_D,
    lineHeight: 22,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  editButton: {
    marginBottom: 10,
  },
  deleteButton: {
    marginBottom: 10,
  },
  backButton: {
    marginBottom: 10,
  },
});

export default ItemDetailScreen;