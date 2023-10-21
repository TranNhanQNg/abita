import React, {useState,useMemo} from 'react';
import { Text, View, Image,Dimensions,StyleSheet,useWindowDimensions} from 'react-native';
import api from '../../../../../../api/api';
import Swiper from 'react-native-swiper'
const {hinhanh} = api; 

export default Swiper_Bane =({anhch})=>{
  const width = useWindowDimensions().width;
  const _renderItem=(item)=>{
    return(
       <View key={item}
       style={{height:width*0.95/3,marginHorizontal:10,}}
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
        autoplay={true}
        horizontal={true}
        removeClippedSubviews={false}
        pagingEnabled={true}
        loop={true}
        showPagination={true}
        autoplayDirection={true}
        showHorizontalScrollIndicator={true}
        activeDot={<View style={{backgroundColor:'#50C7C7', width: 6, height: 2,borderRadius: 4,marginHorizontal:3,top:30 }} />}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 2,borderRadius: 4, marginHorizontal:3,top:30 }} />}
        style={{height:width*0.95/3,alignItems:'center',}}>
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
  