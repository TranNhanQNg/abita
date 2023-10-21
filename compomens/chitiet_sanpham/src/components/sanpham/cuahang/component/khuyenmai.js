import React, { useState,useEffect } from "react";
import { View,ScrollView } from "react-native";
import {TieudeHome} from '../../../dungchung/tieudeChung';
import {RenderSanPhamDeXuat} from '../../renderSanPham';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';

export default function CuaHangKM  ({dienthoaincc, navigation}){
  const {hinhanhsanpham,abita_sanpham,abita_amin, hinhanh} = diachiDaTa; 
  const [dataDX,setDataDX]= useState([])
  useEffect(() => {
    fetch(abita_sanpham+'CuaHangKM.php?DienThoaiNCC='+dienthoaincc+'&MaTinh='+MaTinh)
      .then((response) => response.json())
      .then((json) => setDataDX(json))
      .catch((error) => console.error(error))
      },[]); 
  return (
    dataDX.length>0?
    <View style={{backgroundColor:'#FFFFFF'}}>
    <TieudeHome  props={'Giảm giá nổi bật'}
               color={[ '#FFFFFF','#CCCCCC','#FFFFFF']}
               coloricon={'#4682B4'}
               colortext={'#202020'}
               icon={'➣'}
    />
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>   
        <View style = {{flexDirection: 'row',flex:1}}>
          {dataDX.map((item)=>
            <View key ={item.IDCHITIETSP} style={{flex:1}}>
              <RenderSanPhamDeXuat components={"ChitietSanpham"} item={item} navigation={navigation} mau={"#FFCCFF"}/>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  :null)
};

