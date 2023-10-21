import React, { useState } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
export default TangGiamSoLuong =({fechSoLuong,SoLuong})=>{
    const [soluong1, setsoluong1] = useState(JSON.parse(SoLuong));
    return(
<View style={{flexDirection:'row',height:20,backgroundColor:'#FFFFFF',marginBottom:10,marginHorizontal:10,justifyContent:'space-between'}}>
              <Text style={{marginHorizontal:10}}>Số lượng đơn hàng:</Text>
              <TouchableOpacity style={{flex:1,alignItems:'center',borderWidth:0.5,backgroundColor:'#E0E0E0'}} 
              onPress={()=>{setsoluong1(soluong1=>soluong1+1),fechSoLuong(soluong1+1)}}>
              <Text>+</Text>
              </TouchableOpacity>
                
                <Text style={{marginHorizontal:20}}>{soluong1}</Text>
                <TouchableOpacity style={{flex:1,alignItems:'center',borderWidth:0.5,backgroundColor:'#E0E0E0'}} 
                onPress={()=>{soluong1==1?null:(setsoluong1(soluong1=>soluong1-1),fechSoLuong(soluong1-1))}}>
                  <Text>-</Text>
              </TouchableOpacity>
              </View> 
              )}