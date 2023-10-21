import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView,Image} from 'react-native';
import { Stack, useRouter } from "expo-router";

import Cua_Hang from '../compomens/home/cua_hang/cua_hang';


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


const MaTinh =getQueryParams(url).MaTinh?getQueryParams(url).MaTinh:'51';
const MaUidNCC =getQueryParams(url).MaUidNCC?getQueryParams(url).MaUidNCC:'1682497740163HRZ'

export default function Home() {
 
  return (

  <View style={{backgroundColor:'#FFF',justifyContent:'center',flex:1}}>
  <Stack.Screen options={{ header: () => null }} />
   <Cua_Hang
    MaTinh={MaTinh}
    MaUidNCC={MaUidNCC}
   />

    
  </View>

       
   
   
  );
}

const styles = StyleSheet.create({
    hetder: {
        height:40,
        backgroundColor: '#50C7C7',
        flexDirection:'row',
        alignItems:'center'
       },
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});