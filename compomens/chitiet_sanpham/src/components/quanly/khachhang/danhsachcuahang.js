import React, {Component,useEffect,useState,useLayoutEffect} from 'react';
import { Text, View,Image,TouchableOpacity } from 'react-native';
import { useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons//FontAwesome5';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';



const {abita_amin,hinhanh}=diachiDaTa;

export default DanhSachCuaHang =({item,navigation})=>{
    const [count_like,setcount_like]= useState(true);
  const [like, setlike] = useState(0);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const MaTinh = useSelector(state => state.cart.MaTinh);

  useLayoutEffect(() => {
    fetch(abita_amin+'Like_TheoDoi/LuotTheoDoi.php?MaTinh='+MaTinh+'&DienThoaiNCC='+item.DIENTHOAINCC)
      .then((response) => response.json())
      .then((json) => {setcount_like(json.countDHMoi)})
    }, []);

  return(
    <View style={{backgroundColor:'#FFFFFF',height:60}}
    >

        <View style={{marginVertical:5,backgroundColor:'#20B2AA',flex:1,flexDirection:'row',alignItems:'center'}}>
            <View style={{justifyContent:'space-between',marginLeft:85,flex:1,marginVertical:3}}>
            <Text style={{fontSize:16, color:'#FFFFFF',}}>{item.TENCUAHANG}</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between', marginRight:20,alignItems:'center'}}>
                <Text style={{fontSize:13, color:'#EE82EE'}}>{count_like} <Icon name="thumbs-up" size={13}  /> theo dõi </Text>
            
            </View>
            </View>
            <TouchableOpacity style={{marginRight:20}}
                          onPress={()=>navigation.navigate("CuaHang",{dienthoaincc:item.DIENTHOAINCC, tencuahang:item.TENCUAHANG, anhch:item.ANHCH,anhdaidiench:item.ANHDAIDIENCH})}
            >
            <Text style={{color:'#FFFFFF'}}>Xem cửa hàng ➣</Text>
            </TouchableOpacity>
            
        </View>
        <View
            style={{width:60,height:60,borderRadius:50,borderWidth:5,borderColor:'#FFFFFF', marginLeft:15,position:'absolute'}}>
             <Image source={{uri:hinhanh+'slileApp/'+item.ANHDAIDIENCH}} 
                style={{flex:1,resizeMode:'stretch',borderRadius:50}} />  
        </View>
 <View style={{height:1,width:'100%',backgroundColor:'blue'}}/>
</View>
  )
  
};