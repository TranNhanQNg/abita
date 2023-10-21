import React, {useState,useMemo} from 'react';
import { Text, View, Image,Dimensions,StyleSheet,useWindowDimensions,TouchableOpacity} from 'react-native';
import api from '../../../../api/api';
import Swiper from "react-native-web-swiper";
const {hinhanh} = api; 
import { Heigth_Width } from '../../../../api/heigth_width';

export default Swiper_Bane =({anhch, cot})=>{
  const width = useWindowDimensions().width;
  const _renderItem=(item)=>{
    return(
      
      <Image key={item}
       source={{uri:hinhanh+'slileApp/'+item}} 
         style={{resizeMode:'stretch',flex:1, borderRadius:6}}
         />    
    
    )
   }
  const renderSwiper = useMemo(()=>{
      return(
        <View style={{height:Heigth_Width.width*cot/4, width:Heigth_Width.width*cot}}>
        
                  <Swiper
                  vertical
                    loop
                    from={1}
                    timeout={-2.5}
                    minDistanceForAction={0.1}
                    controlsProps={{
                      dotsTouchable:false,
                    }}
                  >
                      {anhch.map(_renderItem)}
                  </Swiper>
             
          </View>
      )
  },[])
    return(
      <View  style={{alignItems:'center'}}>
        {renderSwiper}
        </View>
    )
  }
  