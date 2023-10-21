import React from 'react';
import { Text, View, Image,Dimensions,ActivityIndicator} from 'react-native';
import {Activity} from '../dungchung/activityIndicator';
import api from '../api/api';

export default function DanhMucListFooter (props) {
const {
  soluongdata,
  activityCT
  }=props
  const {hinhanh} = api; 
    return(
      <View >
        <View style={{height:width*0.01, backgroundColor:'#F8F8F8'}}/>
        <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
          {!soluongdata?
            <View style={{alignItems:'center',height:300,backgroundColor:'#FFF',marginTop:30}}>
                <View style={{alignItems:'center'}}>
                  <Image source={{uri:hinhanh+'icon/close.png'}} style={{height:50,width:50}}/>
                  <Text style={{marginTop:20, color:'#006400'}}>Sản phẩn đã hết! </Text>
                </View>
            </View>:
            activityCT?
            <View style={{height:100,marginTop:30}}>
           <ActivityIndicator size="large" color="#008000" /> 
          </View>:null
          } 
      </View>          
    )        
}
const {width,height} = Dimensions.get('window');