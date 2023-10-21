import React, { useState,useEffect,useRef, } from "react";
import { FlatList, SafeAreaView, Text, 
  TouchableOpacity,ActivityIndicator,View,Image,ScrollView,Modal,Dimensions,Platform } from "react-native";
  import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
  const{abita_sanpham,hinhanhsanpham}=diachiDaTa;


  // export const fechChiTiet =(idchitietsp,
  //                           MaTinh,
  //                           setChiTiet,
  //                           setLoading,
  //                           setLoadingQC,
  //                           setDataQC,
  //                           chitiet,
  //                           setcurrentIndex

  //                   )=>{
  //   fetch(abita_sanpham+'SanPhamChiTiet1.php?IdChiTietSp='+idchitietsp+'&MaTinh='+MaTinh)
  //   .then((response) => response.json())
  //   .then((json) => {setChiTiet(json[0]),quy_cach(json[0],setDataQC,setLoadingQC,MaTinh,chitiet,setcurrentIndex)})
  //   .catch((error) => console.error(error))
  //   .finally(() => setLoading(false));
  // }
//   .then((json) => {setChiTiet(json[0]),quy_cach(json[0],setDataQC,setLoadingQC,MaTinh,chitiet,setcurrentIndex)})
  export const quy_cach=( json,
                          setDataQC,
                          setLoadingQC,
                          MaTinh,
                          setcurrentIndex,
                          chitiet
                          ) => {
                          
    fetch(abita_sanpham+'QuyCach_MauSac.php?IdSanPham='+json.IDQUYCACH+'&MaTinh='+MaTinh+'&DienThoaiNCC='+json.DIENTHOAINCC)
      .then((response) => response.json())
      .then((json) => {setdataQuyCach(json,setDataQC,setcurrentIndex,chitiet)})
      .catch((error) => console.error(error))
      .finally(() => {setLoadingQC(false)});
     
  };

  const setdataQuyCach =(json,setDataQC,chitiet,setcurrentIndex)=>{
    const datagroupQC =  json.sort(function(a,b){
      if(a.MAMAU< b.MAMAU) return -1;
      if(a.MAMAU >b.MAMAU) return 1;
      if(a.QUYCACHSP< b.QUYCACHSP) return -1;
      if(a.QUYCACHSP >b.QUYCACHSP) return 1;
      return 0;
    });
    setDataQC(datagroupQC)
      const index = datagroupQC.findIndex((element) => {
        if (element.QUYCACHSP ==chitiet.QUYCACHSP&&element.MAUSACSP == chitiet.MAUSACSP) {
        return true
        }})
        setcurrentIndex(index)
    }