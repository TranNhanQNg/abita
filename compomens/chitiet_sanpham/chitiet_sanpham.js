import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView,Image} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import ChitietSanpham from './chitietsanpham';
export default function ChiTiet_SanPham() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
    const {idchitietsp,idsanpham,MaTinh} = params;
    const url = window.location.href

function getQueryParams(url) {
  const paramArr = url.slice(url.indexOf('?') + 1).split('&');
  const params = {};
  paramArr.map(param => {
      const [key, val] = param.split('=');
      params[key] = decodeURIComponent(val);
  })
  return params;
}


const matinh =getQueryParams(url).MaTinh?getQueryParams(url).MaTinh:MaTinh;
const id_sanpham =getQueryParams(url).idsanpham?getQueryParams(url).idsanpham:idsanpham
const id_chitiet =getQueryParams(url).idchitietsp?getQueryParams(url).idchitietsp:idchitietsp

  return (

  <View style={{backgroundColor:'#66CDAA',justifyContent:'center',flex:1}}>
  
    <ChitietSanpham
            idchitietsp={id_chitiet}
            idsanpham={id_sanpham}
            MaTinh={matinh}
        />
  
  </View>

       
   
   
  );
}
