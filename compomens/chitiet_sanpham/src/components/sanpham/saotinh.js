import React, { useState,useEffect } from "react";
import {ActivityIndicator,View,Image,StyleSheet,Text } from "react-native";
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SaoTinh = ({count}) => {

const data=[1,2,3,4,5];

  return (
    <View>
        {count==0||!count?null:
        <View style={{flexDirection:'row',alignItems: 'center',margin:1}}>
        <View style={{backgroundColor:'#B8B8B8',width:12*5,height:12}}>
            <View style={{backgroundColor:'#FFD700',flexDirection:'row',width:12*count,position:'absolute'}}>
            { data.map(item=>
              < Image style ={{width:12,height:12}} source={require('../icon/sao.png')} key={item}/>
            )
            }
            </View>
        </View>
        <Text style={{marginLeft:10,fontSize:11,}}>({Math.round(count * 100) / 100})</Text>
      </View>
      }
    </View>
  )
}
export default SaoTinh;
const kichthuocsao =10;
const styles= StyleSheet.create({
	
  imagesao:{
    width:kichthuocsao,
    height:kichthuocsao
    },
  
  
  })

