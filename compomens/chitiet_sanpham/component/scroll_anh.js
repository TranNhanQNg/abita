import React, { useState,useEffect,useMemo } from "react";
import {  Text, View,ScrollView,Dimensions,Platform,Image } from "react-native";
import { Heigth_Width } from "../../api/heigth_width";
import api from "../../api/api";
import styles from '../stylesChiTietSP';
import { TouchableOpacity } from "react-native-web";


const{hinhanhsanpham}=api;
const mobi = Heigth_Width.mobi

const{viewHinhAnh,viewImage,aoimage,aotext, text} = styles;

export default function Scroll_Anh ({
                                    dataAnh,
                                    setChuyenImage ,
                                 }) {

  const [chuyenBane,setChuyenBaNe]=useState(1)
   const [cr_index,setIndex]=useState(0);
   const chuyen_BaNe=(index)=>{
    chuyenBane.scrollTo({ x: mobi=='mobi'?(index)*width:(index)*width/3, y: 0, animated: true })
  };
    const returnAnh =useMemo(()=>{
        return(
            <View style={{width:mobi=='mobi'?width:width/3}} >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            ref={(ref)=>{setChuyenImage(ref),setChuyenBaNe(ref)}}
            onScroll={(e)=>{
              setIndex(mobi=='mobi'?Math.round(e.nativeEvent.contentOffset.x/width):Math.round(e.nativeEvent.contentOffset.x/width*3)) }}
              scrollEventThrottle={16}
            >
              {dataAnh.map((item,index) =>
                        <Image  key = {index}
                              style={{height:mobi=='mobi'?width:width/3,width:mobi=='mobi'?width:width/3,resizeMode:'contain'}}
                              source={{
                                  uri:hinhanhsanpham + item,
                              }}
                            
                          />
              )}
            </ScrollView>
           <View style={{alignItems:'center',marginVertical:20}}>
            <ScrollView horizontal={true} style={{}} showsHorizontalScrollIndicator={false}>
            {dataAnh.map((item,index) =>
             <TouchableOpacity key = {index} onPress={()=>{setIndex(index),chuyen_BaNe(index)}}>
                <View style={{height:Heigth_Width.width/4,width:Heigth_Width.width/4,borderColor:index==cr_index?'red':'#E8E8E8', borderWidth:1,margin:1}} >    
                      
                       <Image
                              style={aoimage}
                              source={{
                                  uri:hinhanhsanpham + item,
                              }}
                            
                          />
                      
                        
                </View>
                </TouchableOpacity>
              )}
            </ScrollView>
            </View>
            <View style={{backgroundColor:'rgba(0,0,0, 0.3)',marginVertical:8, borderRadius:8,position:'absolute',bottom:5,right:5}}>
                  <Text style={{margin:3, color:'#FFFFFF'}}>{cr_index+1}/{dataAnh.length}</Text>
              </View>
            </View>
        )
    },[dataAnh,cr_index])

  return (
    returnAnh
   
      
 )
 
};
const {width} = Dimensions.get('window');