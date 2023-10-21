import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView,StyleSheet,Image,View,Dimensions} from 'react-native';


import HeaderD from '../../header/headerD';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';


const {hinhanhsanpham}=diachiDaTa;
const {width,height} = Dimensions.get('window');

export default XemAnh =({navigation,route})=>{ 
    const {tenanh}=route.params;
    return(
<SafeAreaView>
<HeaderD navigation={navigation}/>
<View style={{width:width,minHeight:width,maxHeight:height}}>
<Image 
            source={{
              uri:hinhanhsanpham+tenanh
            }}
            style={{resizeMode:"contain",
            flex: 1,
            margin:4}}
            />
</View>
</SafeAreaView>
    )


}
  
const styles= StyleSheet.create({

 
  viewmucchon:{
    height:30,
    flexDirection:'row',
    justifyContent:'space-between', 
    marginHorizontal:10,
    alignItems:'center',
    backgroundColor:'#E6E6E6',
    borderRadius:15
  },
 
})
  	
   