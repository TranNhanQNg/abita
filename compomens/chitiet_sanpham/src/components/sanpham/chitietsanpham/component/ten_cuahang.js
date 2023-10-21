import React, {useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,
   Image,} from 'react-native';
  import axios from 'axios';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';

import { useIsFocused } from '@react-navigation/native';
import {Render_CuaHang} from './render_cuahang'
import TieuDe_CuaHang from './tieude_cuahang'
const { abita_amin }=diachiDaTa;

export default function Ten_CuaHang ({ item, navigation,color,color1,MaTinh }) {
  
    return(
    <View>
            <TieuDe_CuaHang 
                item={item}
                navigation={navigation}
                MaTinh={MaTinh}
                color={color}
              />
             
              <Render_CuaHang 
                item={item}
                navigation={navigation}
                MaTinh={MaTinh}
              />
      </View>
    );
  }

  const styles1 = StyleSheet.create({

  imageSile:{
     flex:1,
    resizeMode:'cover',
    borderRadius:50
    
  },
  })