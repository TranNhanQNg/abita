import React, { useLayoutEffect,useState,useRef,StyleSheet} from 'react';
import { Text, View,TouchableOpacity,ActivityIndicator, Image,RefreshControl,
ScrollView,Animated} from 'react-native';
import styles from '../../stylesSanPham';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import {RenderDanhMuc} from '../../renderSanPham';
import {TieudeHome,TieuDeLoc} from '../../../dungchung/tieudeChung';
import axios from 'axios';

const {viewNen,viewanimater} = styles;
const {abita_amin,hinhanh} = diachiDaTa; 

export default function DanhMuc_ThuongHieu ({navigation,MaTinh,GiaTriMuc, Muc,morong,setMoRong}) {
  const [data, setdata]=useState([])
 
  useLayoutEffect(()=>{
    FechDanhMuc()
  },[])
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
  const onpressMoRong =()=>{morong==true?setMoRong(false):null,morong==true?animatedDong():animatedMoRong()}


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
        <RenderDanhMuc navigation={navigation} key ={item.IDDANHMUCCAP2} 
                            item={item} 
                            dieuhuong={dieuhuong}
                            tenhinhanh={item.TENHINHANHDMC2}
                            tendanhmuc={item.TENDANHMUCCAP2}/>
      );
    
    return(
      data.length<3?null:
        <View>
           <TieudeHome  props={'Danh mục'}
                   color={[ '#FFFFFF','#CCCCCC','#FFFFFF']}
                   coloricon={'#4682B4'}
                   colortext={'#202020'}
                   icon={'➣'}
        />
                {morong==true?
                  (<Animated.ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{maxHeight:heghtMoRong,minHeight:0}}
                  >
                    
                     {data.map(renderDanhmuc)}
                  </Animated.ScrollView>):
                   <Animated.View
                   style={{
                    flexDirection: 'row',
                    minHeight:0,
                    flexWrap:'wrap',
                    maxHeight:heghtMoRong}}
               >
                 
                  {data.map(renderDanhmuc)}
               </Animated.View>}
               {data.length>4?
                <TieuDeLoc  
                    morong={morong}
                    soluongmuc={data.length}
                    onpressMoRong={onpressMoRong}
            />:null
        }
          </View>            
    )        
}
