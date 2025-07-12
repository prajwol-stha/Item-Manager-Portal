import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { globalStyles, COLORS, FONTSIZES } from '../styles/globalStyles';

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  editable?: boolean;
  style?: any;
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  editable = true,
  style,
}:CustomInputProps) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={globalStyles.label}>{label}</Text>
      <TextInput
        style={[
          globalStyles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.GRAY_M}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
      />
      {error && (
        <Text style={globalStyles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  inputError: {
    borderColor: COLORS.RED,
    borderWidth: 1.5,
  },
});

export default CustomInput;