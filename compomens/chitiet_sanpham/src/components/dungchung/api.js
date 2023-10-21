import React, { useEffect, useState } from 'react';
import {Text, View,ImageBackground,} from 'react-native';

export default giamgia =(item)=>{
    if(item.GIABANSP-item.GIADUKIEN<0){
      const a= Number(item.GIABANSP);
      const b= Number(item.GIADUKIEN);
      return(
      <View style={{position:'absolute',alignSelf:'flex-end'}}>
      <ImageBackground style ={{width:40,height:50,justifyContent: 'center',alignItems: 'center',}} source={require('../icon/sale.png')}>
             <Text style={{color:'#FFFFFF', fontSize:12,marginBottom:18 }}>{Math.ceil(b/a*100-100)}%</Text>
             </ImageBackground>
         </View>
      )
    }
  };
  module.exports = giamgia;