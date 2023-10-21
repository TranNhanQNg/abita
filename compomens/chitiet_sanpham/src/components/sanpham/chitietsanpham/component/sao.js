import React, { useState,useEffect } from "react";
import {ActivityIndicator,View,Image,StyleSheet,Text } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Sao = ({count}) => {
const data=[1,2,3,4,5];

  return (
    <View>
      {
        count==0||!count?null:
        <View style={{flexDirection:'row',alignItems: 'center',margin:1}}>
        { data.map(item=>
        <MaterialCommunityIcons name={(item-0.5==count)?"star-half-full":"star"}
                                size={12} 
                                color={(item<count+1||count<item<count)?'#FFCC00':'#D8D8D8'} 
                                key={item}/>
        )  
        }
        <Text style={{marginLeft:5,fontSize:11,}}>{count}</Text>
      </View>}
    </View>
  )
}
export default Sao;
const kichthuocsao =10;
const styles= StyleSheet.create({
	
  imagesao:{
    width:kichthuocsao,
    height:kichthuocsao
    },
  
  
  })

