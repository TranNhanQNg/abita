import React, { useState,useEffect } from "react";
import { ScrollView,Text, 
  TouchableOpacity,View,Dimensions } from "react-native";
  import FastImage from 'react-native-fast-image';
  import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';



const{hinhanhsanpham}=diachiDaTa;
 

export default function QuaTang ({ data,setModalVisible}) {
  

const renderQuaTang =(item,index)=>{
  return(
        <View key={index} 
        style={{flexDirection:'row',width:width*0.8,borderBottomWidth:0.5,borderRadius:3,borderBottomColor:'#50C7C7',marginHorizontal:5}}>
         <FastImage
                              style={{height:width*0.2,width:width*0.2}}
                              source={{
                                  uri:hinhanhsanpham + item.HinhAnh,
                                  priority: FastImage.priority.normal,
                                
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                          />
            <Text style={{flex:1,fontSize:12,marginVertical:5}}>{item.Ten}</Text>
        </View>
    )
};
//borderColor:'#50C7C7'
if(data){
  return (
    <TouchableOpacity activeOpacity={1} style={{marginTop:5,backgroundColor:'#FFF',alignItems:'center',borderRadius:8}}>
    <View style={{marginVertical:10}}>
        <Text style={{margin:10}}>{JSON.parse(data).length} Quà tặng</Text>
    </View>
    <View  style={{height:0.5,backgroundColor:'#50C7C7',marginVertical:5,width:width*0.8}}/>
   
    
     {JSON.parse(data).map((item,index)=>renderQuaTang(item,index))}
       
  <TouchableOpacity onPress={()=>setModalVisible(false)} style={{borderWidth:0.5,marginBottom:10,borderRadius:3,borderColor:'#50C7C7',marginTop:5,backgroundColor:'#87CEFA'}}>
    <Text style={{margin:10,marginHorizontal:30,color:'#191970'}}>Đóng</Text>
  </TouchableOpacity>
  </TouchableOpacity>
  )
 }
};
const {width} = Dimensions.get('window');