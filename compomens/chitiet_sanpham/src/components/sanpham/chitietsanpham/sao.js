import React, { useState,useEffect } from "react";
import {ActivityIndicator,View,Image,StyleSheet,Text } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
const{abita_quanly}=diachiDaTa

const Sao = ({ count}) => {
const [sosao, setSoSao] = useState({});
const [isLoading, setLoading] = useState(true);


  return (
    <View>
      {
        count==0||!count?null:
        <View style={{flexDirection:'row',alignItems: 'center'}}>
        <Text style={{fontSize:11,}}>{count}</Text>
        <MaterialCommunityIcons name={"star"}
                                size={12} 
                                color={'#FFCC00'} 
                               />  
        
        
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

