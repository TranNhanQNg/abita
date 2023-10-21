import React, { useEffect,useState,useRef,useMemo} from 'react';
import { Text, View,TouchableOpacity,ActivityIndicator, Image,RefreshControl,
ScrollView,Animated} from 'react-native';

import api from '../../../api/api';
import {RenderDanhMuc} from './render_danhmuc';
// import {TieudeHome,TieuDeLoc} from '../../../dungchung/tieudeChung';
import axios from 'axios';
import { Heigth_Width } from '../../../api/heigth_width';
const mobi =Heigth_Width.mobi

const {abita_amin,hinhanh} = api; 

export default function DanhMucCuaHang ({navigation,MaTinh,GiaTriMuc, Muc,dataAnh,morong,setMoRong}) {
const [data, setdata]=useState([])
  
  useEffect(()=>{
    FechDanhMuc()
  },[GiaTriMuc])
  const FechDanhMuc =()=>{
    
    axios.post(abita_amin+'DanhMuc_CuaHang.php?MaTinh='+MaTinh, 
            JSON.stringify({
              GiaTriMuc:GiaTriMuc,
              Muc:Muc
            })
        ).then(function (response) {
          setdata(response.data)
        })
        .catch(function (error) {
          console.log(error);
         
        });  
  };
  const heghtMoRong = useRef(new Animated.Value(150)).current;
  const animatedDong =()=>{
    Animated.timing(
      heghtMoRong,
      {
        toValue: 500,
        duration: 800,
        useNativeDriver:false, 
      }
    ).start(()=>{setMoRong(!morong)});
  };
  const animatedMoRong =()=>{
    
    Animated.timing(
      heghtMoRong,
      {
        toValue: 150,
        duration: 400,
        useNativeDriver:false,
      }
    ).start(()=>setMoRong(true));
  };
  const onpressMoRong =()=>{setMoRong(!morong)}


    const tc1 =abita_amin+'SanPhamDM_CH.php?IdDanhMucCap2=';
    const dieuhuong =(item) => {navigation.navigate("SanPhamDM_CH",{
        apiSP:tc1+item.IDDANHMUCCAP2,
        idDanhMuc:item.IDDANHMUCCAP2,
        tendanhmuc:item.TENDANHMUCCAP2,
        dataAnh:dataAnh,
        MaTinh:MaTinh
        })
      }
      const renderDanhmuc =(item=>
                <RenderDanhMuc navigation={navigation}  
                            item={item} 
                           dataAnh={dataAnh}/>
        
      );
    
    return(
      !data?null:
                   <View
                   style={{
                  flex:1,flexDirection:mobi=='mobi'?'row':'column',flexWrap:mobi=='mobi'?'wrap':null
                   
                    }}
               >
                 
                  {data.map(item=>
                  <View key ={item.IDDANHMUCCAP2}>
                    {renderDanhmuc(item)}
                  </View>
                
                   )}
               </View>        
    )        
}
