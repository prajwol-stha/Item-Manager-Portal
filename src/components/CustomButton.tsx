import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { globalStyles, COLORS } from '../styles/globalStyles';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'delete';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}:CustomButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return globalStyles.secondaryButton;
      case 'delete':
        return globalStyles.deleteButton;
      default:
        return globalStyles.button;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return globalStyles.secondaryButtonText;
      default:
        return globalStyles.buttonText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.WHITE} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.6,
  },
});

export default CustomButton;