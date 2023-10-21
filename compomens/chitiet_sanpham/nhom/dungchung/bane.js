import React, {useEffect, useState,useMemo,useRef } from 'react';
import {View,TouchableOpacity,Image,useWindowDimensions }from 'react-native';
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'
import axios from 'axios';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {Activity} from './activityIndicator';
import {MD5,fechDaTa_Axios} from './fech_data';




const {quangcao,hinhanhabita,hinhanh} = diachiDaTa; 

export default function BaNe ({IdMuc,TenMuc,navigation,cao}){
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const width = useWindowDimensions().width;
    const [data,setDaTa]=useState([])
    const [isloading,setLoading]=useState(true);
    useEffect(()=>{
        if(Wifi){
        Fecht()
        }
    },[MaTinh])
    const Fecht =()=>{
        var api_fech = quangcao+'quangcao_trangchu.php?MaTinh='+MaTinh
        var set_then =(res)=>{setDaTa(res.data)}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setLoading(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,IdMuc:IdMuc,TenMuc:TenMuc})
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
    };
    // onPress={()=>navigation.navigate("CuaHang",{dienthoaincc:item.DIENTHOAINCC, tencuahang:item.TENCUAHANG, anhch:item.ANHCH,anhdaidiench:item.ANHDAIDIENCH})}
    const onPressMuc =(item)=>{
        switch (item.MA_TH_CH) {
            case '1': navigation.navigate('CuaHang',{MaTinh:MaTinh,MaUidNCC:item.MAUIDNCC,dienthoaincc:item.DIENTHOAINCC, tencuahang:item.CUAHANG_THUONGHIEU, MaTinh:MaTinh})
            break;
            case '2': navigation.navigate('SanPhamThuongHieu',{tenthuonghieu:item.CUAHANG_THUONGHIEU,MaTinh:MaTinh})
            break;
            default:
            navigation.navigate("Danhmuc",{matinh:MaTinh});
            break;
        }
    };

    const _renderItem=(item)=>{
       return(
        <TouchableOpacity key={item.ANHBANE}
          style={{alignItems:'center',}}
          onPress={()=>onPressMuc(item)}
          activeOpacity={1}
        >
            <FastImage
                    style={{height:width*0.95/cao,width:width*0.95,borderRadius:6}}
                    source={{
                        uri: hinhanh+'slileApp/'+item.ANHBANE,
                        priority: FastImage.priority.normal,
                    
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
            />
        </TouchableOpacity>
       )
      }

      const listHeaderFlatlis = ()=>{
        return(
            <Swiper  
                autoplay={true}
                horizontal={true}
                removeClippedSubviews={false}
                pagingEnabled={true}
                loop={true}
                showPagination={true}
                autoplayDirection={true}
                showHorizontalScrollIndicator={true}
                activeDot={<View style={{backgroundColor:'#50C7C7', width: 6, height: 2,borderRadius: 4,marginHorizontal:3,top:30 }} />}
                dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 2,borderRadius: 4, marginHorizontal:3,top:30 }} />}
                style={{height:width*0.95/cao,alignItems:'center',}}>
                {data.map(_renderItem)}
            </Swiper>    
        )}
const baneList =useMemo(()=>listHeaderFlatlis,[isloading,MaTinh,data])
return(
  data.length==0?null:
    <View  style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginVertical:10}}>
    
        {isloading?<Activity/>: 
            baneList()
        }
    </View>
)};