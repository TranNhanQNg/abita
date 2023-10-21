import React, { useState,useEffect,useRef, } from "react";
import {  Text, View,Dimensions} from "react-native";

import QuyCach_SanPham from "./quycach_sanpham";
import {NhanXet} from './index'


export default function ChiTiet_SanPham ({
                                          dataQC,
                                          chitiet,
                                          MaTinh,
                                          setChiTiet,
                                          currentIndex,
                                          setcaocard,
                                          setModalVisible,
                                          setModalVisibleSoLuong,
                                          setModalVisibleThongBao,
                                         
                                        }) {

const onLayout=(event)=> {
  const {x, y, height, width} = event.nativeEvent.layout;
setcaocard(height)
}
 

  onpress_render = (item,index)=>{
    setChiTiet(item)
   }
  


  return (
    <View style={{backgroundColor:'#E8E8E8',flex:1}}>
     
       
        <QuyCach_SanPham
            dataQC={dataQC}
            chitiet={chitiet}
            setChiTiet={setChiTiet}
            currentIndex={currentIndex}
            onpress_render={onpress_render}
            MaTinh={MaTinh}
            setModalVisible={setModalVisible}
            setModalVisibleSoLuong={setModalVisibleSoLuong}
            setModalVisibleThongBao={setModalVisibleThongBao}
            setcaocard={setcaocard}
        />
        

   
    {/* <NhanXet 
          chitiet={chitiet}
          MaTinh={MaTinh}
         
      /> */}
    <View style={{alignItems:'center'}}>
      <Text style={{marginVertical:15,fontFamily: 'OpenSans-SemiBold',fontSize:14, color:'#191970'}}> --------- Gơi ý thêm --------</Text>
      <View style={{height:1,width,backgroundColor:'#DCDCDC'}}/>
    </View>
      
  </View>)
 
};
const {width} = Dimensions.get('window');