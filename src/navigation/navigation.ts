export type RootStackParamList = {
  Home: undefined;
  ItemDetail: { itemId: number };
  ItemForm: { itemId?: number } | undefined;
};