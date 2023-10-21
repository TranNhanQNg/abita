import React, {useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,
   Image,} from 'react-native';
  import axios from 'axios';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import { useIsFocused } from '@react-navigation/native';
const { abita_amin }=diachiDaTa;
import SanPham_CuaHangUuTu from './sanPham_CuaHangUuTu'
import TieuDe_CuaHang from '../../sanpham/chitietsanpham/component/tieude_cuahang'
export default function Render_CuaHangUuTu ({ item, navigation,color,color1,MaTinh}) {
  const Wifi = useSelector(state => state.cart.Wifi);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 
  
  const [like, setlike] = useState(false);
  const [reflike, setReflike] = useState(true);
  const MaUid = useSelector(state => state.cart.MaUid);

  const matinh = useSelector(state => state.cart.MaTinh);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(Wifi){
            kiemtralike()
            
          }
    }, [reflike,Wifi,isFocused]);
   
    const kiemtralike =() => {
      axios.post(abita_amin+'Like_TheoDoi/KiemTraLike.php?MaTinh='+MaTinh,
         JSON.stringify(
                {
                DienThoaiKH:SoDienThoai,
                MaUid:MaUid,
                MaUidNCC:item.MAUIDNCC,
                }
            )
          )
              .then((response) => {setlike(response.data.kq)})
              .catch(function (error) {console.log(error)})
         };

    
  const dataAnh={AnhDaiDienCH:item.ANHDAIDIENCH,AnhNen:item.ANHNEN}
  
    return(

    <View>
        <TieuDe_CuaHang 
          item={item}
            navigation={navigation}
            MaTinh={matinh}
            
        />       
          <SanPham_CuaHangUuTu
          item={item}
          navigation={navigation}
          
        />
             
              
      </View>
    );
  }

  const styles1 = StyleSheet.create({

  imageSile:{
     flex:1,
    resizeMode:'cover',
    borderRadius:50
    
  },
  })