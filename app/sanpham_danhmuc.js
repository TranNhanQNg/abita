import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from "expo-router";
import { View,Image} from 'react-native';
import SanPhamDM_CH from '../compomens/home/sanphamdanhmuc/sanphamDM_CH';



export default function SanPham_DanhMuc() {
  return (
    <View style={{flex:1}}>
       <Stack.Screen options={{ header: () => null }} />    
      <SanPhamDM_CH
      />
    </View>
)};
