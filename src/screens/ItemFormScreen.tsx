import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useItems } from '../context/ItemContext';
import { globalStyles, COLORS, FONTSIZES } from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { RootStackParamList } from '../navigation/navigation';

type ItemFormScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ItemForm'>;
type ItemFormScreenRouteProp = RouteProp<RootStackParamList, 'ItemForm'>;

interface FormData {
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  stock: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  description?: string;
  imageUrl?: string;
  stock?: string;
}

const ItemFormScreen: React.FC = () => {
  const navigation = useNavigation<ItemFormScreenNavigationProp>();
  const route = useRoute<ItemFormScreenRouteProp>();
  const { itemId } = route.params || {};
  const { addItem, updateItem, getItemById } = useItems();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: '',
    description: '',
    imageUrl: '',
    stock: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isEditMode = !!itemId;

  useEffect(() => {
    if (isEditMode && itemId) {
      const item = getItemById(itemId);
      if (item) {
        setFormData({
          name: item.name,
          category: item.category,
          price: item.price.toString(),
          description: item.description,
          imageUrl: item.imageUrl,
          stock: item.stock.toString(),
        });
      }
    }
  }, [itemId, isEditMode, getItemById]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    } else if (formData.category.trim().length < 2) {
      newErrors.category = 'Category must be at least 2 characters long';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    } else if (Number(formData.price) > 999999) {
      newErrors.price = 'Price cannot exceed 999,999';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock must be a non-negative number';
    } else if (!Number.isInteger(Number(formData.stock))) {
      newErrors.stock = 'Stock must be a whole number';
    } else if (Number(formData.stock) > 999999) {
      newErrors.stock = 'Stock cannot exceed 999,999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const itemData = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim(),
        stock: parseInt(formData.stock, 10),
      };

      if (isEditMode && itemId) {
        updateItem(itemId, itemData);
        Alert.alert('Success', 'Item updated successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        addItem(itemData);
        Alert.alert('Success', 'Item created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancel = () => {
    const hasChanges = Object.values(formData).some(value => value.trim() !== '');
    
    if (hasChanges && !isEditMode) {
      Alert.alert(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
    }
  };



  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.card}>
          <Text style={globalStyles.heading2}>
            {isEditMode ? 'Edit Item' : 'Add New Item'}
          </Text>

          <CustomInput
            label="Item Name *"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Enter item name"
            error={errors.name}
            editable={!isLoading}
          />
          
          <CustomInput
            label="Category *"
            value={formData.category}
            onChangeText={(value) => handleInputChange('category', value)}
            placeholder="Enter category (e.g., Electronics, Apparel)"
            error={errors.category}
            editable={!isLoading}
          />
          
          <CustomInput
            label="Price *"
            value={formData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            placeholder="Enter price (e.g., 29.99)"
            keyboardType="decimal-pad"
            error={errors.price}
            editable={!isLoading}
          />
          
          <CustomInput
            label="Stock Quantity *"
            value={formData.stock}
            onChangeText={(value) => handleInputChange('stock', value)}
            placeholder="Enter stock quantity"
            keyboardType="numeric"
            error={errors.stock}
            editable={!isLoading}
          />
          
          <CustomInput
            label="Description *"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Enter detailed description of the item"
            multiline={true}
            error={errors.description}
            editable={!isLoading}
          />
          
          <CustomInput
            label="Image URL *"
            value={formData.imageUrl}
            onChangeText={(value) => handleInputChange('imageUrl', value)}
            placeholder="Enter image URL (https://example.com/image.jpg)"
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.imageUrl}
            editable={!isLoading}
          />

          <View style={styles.buttonContainer}>
            <CustomButton
              title={isEditMode ? 'Update Item' : 'Create Item'}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
            />

            <CustomButton
              title="Cancel"
              onPress={handleCancel}
              variant="secondary"
              disabled={isLoading}
              style={styles.cancelButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: FONTSIZES.MEDIUM,
    color: COLORS.GRAY_M,
    marginBottom: 12,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 12,
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical:12
  },
  disabledButton: {
    opacity: 0.6,
  },
  helpSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.GRAY_L,
    borderRadius: 8,
  },
  helpTitle: {
    fontSize: FONTSIZES.MEDIUM,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  helpText: {
    fontSize: FONTSIZES.SMALL,
    color: COLORS.GRAY_D,
    marginBottom: 6,
    lineHeight: 18,
  },
});

export default ItemFormScreen;