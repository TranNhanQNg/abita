import React,{useState,useEffect} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,Dimensions,StyleSheet,
  RefreshControl,Animated, Image, ScrollView,} from 'react-native';
import { Heigth_Width } from '../../../api/heigth_width';
  import api from '../../../api/api';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import { Link } from 'expo-router';
  

import axios from 'axios';
import {ThongTin_CuaHang} from './thongtincuahang'

 export default TenCuaHang =({tencuahang,dataAnh,heightAvata,MaTinh,navigation,MaUidNCC,dienthoaincc})=>{
    const {hinhanh,abita_amin} = api;
    const [modalVisible, setModalVisible] = useState(false);
 const SoDienThoai =dienthoaincc


   
    return(
      
      <Animated.View style={{flexDirection:'row',margin:5}}
      >
 <Link href={''}>

                  <View style={{flexDirection:'row',alignItems:'center',}}>
                    <View 
                     style={{width:Heigth_Width.width/4,height:Heigth_Width.width/4,borderRadius:70,borderWidth:2,borderColor:'#FFFFFF',marginHorizontal:5}}>
                      <Image source={{uri:hinhanh+'slileApp/'+dataAnh.AnhDaiDienCH}} 
                      style={[styles1.imageSile,{borderRadius:50}]} />  
                    </View>
                    <View style={{justifyContent:'center'}}>
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'bold'}}>{tencuahang}</Text>
                      <Text style={{fontSize:13, color:'#EE82EE'}}>{dataAnh.LuotThichCH>1000?Math.round((dataAnh.LuotThichCH/1000)*100)/100+'k':dataAnh.LuotThichCH} <Icon name="thumbs-up" size={13}  /> thích | <Text style={{fontSize:13, color:'#F4A460'}}>{dataAnh.LuotXemCH>1000?Math.round((dataAnh.LuotXemCH/1000)*100)/100+'k':dataAnh.LuotXemCH}  lượt xem </Text></Text>
                    </View>
                  </View>
                
          </Link>  
              <ThongTin_CuaHang modalVisible={modalVisible} setModalVisible={setModalVisible} dataAnh={dataAnh}/>
        </Animated.View>
    )
  };


    const styles1 = StyleSheet.create({
  
     //Hình paner
    
       viewImagePaner:{
          height: Heigth_Width.width/2,
        
    },
    imageSile:{
       flex:1,
      resizeMode:"cover",
      
    },
    })