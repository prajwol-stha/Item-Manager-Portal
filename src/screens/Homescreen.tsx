import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTSIZES, globalStyles} from '../styles/globalStyles';
import products from '../assets/products.json';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';

const Homescreen = () => {
    type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const navigation = useNavigation<HomeScreenNavigationProp>();
  const renderItem = ({ item }:any) => (
    <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate('ItemDetailsScreen')}>
        <View>
            <Text style={globalStyles.heading2}>{item.name}</Text>
            <Text style={globalStyles.heading3}>{item.category}</Text>
        </View>
        <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
    <Text style={[globalStyles.heading1,{alignSelf:'center'}]}>Item Manager Portal</Text>
    <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (<Text style={{ textAlign: 'center', marginTop: 20 }}>No products available.</Text>)}
    />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
    list: {
  },
  itemContainer: {
    padding: 12,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor: COLORS.GRAY_L,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  price: {
    fontSize: FONTSIZES.SMALL,
    color:COLORS.GREEN,
    marginTop: 4,
  },
})