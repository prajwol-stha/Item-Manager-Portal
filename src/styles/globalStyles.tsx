import { StyleSheet } from 'react-native';

export const COLORS = {
  PRIMARY: '#83c764',
  SECONDARY: '#10B981',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_L: '#F3F4F6',
  GRAY_M: '#9CA3AF',
  GRAY_D: '#374151',
  GREEN: '#10B981',
  RED: '#DD3333',
  BLUE: '#3B82F6',
};

export const FONTSIZES = {
    LARGE: 16,
    MEDIUM: 14,
    SMALL: 12,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 16,
  },
  heading1: {
    fontSize: FONTSIZES.LARGE,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 16,
  },
  heading2: {
    fontSize: FONTSIZES.MEDIUM,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  heading3: {
    fontSize: FONTSIZES.LARGE,
    fontWeight: '400',
    color: COLORS.GRAY_D,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: FONTSIZES.MEDIUM,
    color: COLORS.BLACK,
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: FONTSIZES.MEDIUM,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: COLORS.RED,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.WHITE,
    fontSize: FONTSIZES.MEDIUM,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: COLORS.RED,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    // marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.GRAY_M,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: FONTSIZES.MEDIUM,
    backgroundColor: COLORS.WHITE,
    marginVertical: 8,
  },
  label: {
    fontSize: FONTSIZES.MEDIUM,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  errorText: {
    color: COLORS.RED,
    fontSize: FONTSIZES.SMALL,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.GRAY_L,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  centerText: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});