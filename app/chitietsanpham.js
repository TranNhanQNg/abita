import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import {  View} from 'react-native';
import ChiTiet_SanPham from '../compomens/chitiet_sanpham/chitiet_sanpham';
export default function ChiTietSanpham() {


  
    return (
      <View style={{flex:1}}>
        <Stack.Screen options={{ header: () => null }} />    
          <ChiTiet_SanPham navigation={navigator}/>   
      </View>
         
   
     
    );
};
