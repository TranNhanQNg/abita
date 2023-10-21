import React, { useState,useEffect,useMemo } from "react";
import {  Text, View,ScrollView,Dimensions,Platform } from "react-native";

import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import styles from '../stylesChiTietSP';


const{hinhanhsanpham}=diachiDaTa;

const{viewHinhAnh,viewImage,aoimage,aotext, text} = styles;

export default function Scroll_Anh ({
                                    dataAnh,
                                    setChuyenImage ,
                                 }) {

    
   const [index,setIndex]=useState(0);

    const returnAnh =useMemo(()=>{
        return(
            <View style={{height:width}}>
      
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            ref={(ref)=>setChuyenImage(ref)}
            onScroll={(e)=>{
              setIndex(Math.round(e.nativeEvent.contentOffset.x/width)) }}
              scrollEventThrottle={16}
            >
              {dataAnh.map((item,index) =>
                <View style={viewHinhAnh} key = {index}>    
                  <View style={viewImage} >
                        <FastImage
                              style={aoimage}
                              source={{
                                  uri:hinhanhsanpham + item,
                                  priority: FastImage.priority.normal,
                                
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                          />
        
                    </View>
                </View>
              )}
            </ScrollView>
            <View style={{backgroundColor:'rgba(0,0,0, 0.3)',marginVertical:5, borderRadius:8,position:'absolute',bottom:5,right:5}}>
                  <Text style={{margin:3, color:'#FFFFFF'}}>{index+1}/{dataAnh.length}</Text>
              </View>
            </View>
        )
    },[dataAnh,index])

  return (
    returnAnh
   
      
 )
 
};
const {width} = Dimensions.get('window');