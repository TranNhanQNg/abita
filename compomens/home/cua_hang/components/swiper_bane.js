import React, {useState,useMemo} from 'react';
import { Text, View, Image,Dimensions,StyleSheet,useWindowDimensions} from 'react-native';
import api from '../../../api/api';
import Swiper from 'react-native-web-swiper';
const {hinhanh} = api; 

export default Swiper_Bane =({anhch})=>{
  const width = useWindowDimensions().width;
  const _renderItem=(item)=>{
    return(
       <View key={item}
       style={{height:width*0.95/3,width:width/3,marginHorizontal:10,}}
       activeOpacity={1}
     >
      <Image 
       source={{uri:hinhanh+'slileApp/'+item}} 
         style={{resizeMode:'stretch',flex:1,borderRadius:6}}
         />    
     </View>
    )
   }
  const renderSwiper = useMemo(()=>{
      return(
        <Swiper  
       >
        {anhch.map(_renderItem)}
    </Swiper>    
      )
  },[])
    return(
      <View  style={{alignItems:'center',flexDirection:'row',justifyContent:'center',marginVertical:10}}>
        {renderSwiper}
        </View>
    )
  }
  