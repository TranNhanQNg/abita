import React from 'react';
import { View} from 'react-native';
import {useSelector } from 'react-redux';
import Amin from '../../navigatorBar/stackAmin';
import DangNhapAmin from './dangnhapAmin';

export default function AminDangNhap ({navigation}) {
const Khoa = useSelector(state => state.cart.Khoa);

  return (
   <View style={{flex:1}}>
    {(Khoa=='true')? <Amin navigation={navigation}/>:
    <DangNhapAmin navigation={navigation}/>
                      
    }
  </View>
 
    );
};
