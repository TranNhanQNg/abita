
import React,{useState,useRef} from 'react';
import { Text, View,ActivityIndicator,FlatList,Image, SafeAreaView,TouchableOpacity,Animated,useWindowDimensions} from 'react-native';

import api from '../../api/api';
import {RenderSanPhamKhac} from './renderSP_ChiTiet';

const{ abita_sanpham,hinhanh}=api;

export default function SanPhamDaXem ({navigation}) {

  
  const renderItem=({ item }) => (
    <View style={{    
               flexDirection:'row',
               borderWidth:0.5,
               margin:5,
               borderRadius:5
               }}>
       <RenderSanPhamKhac item={item} navigation={navigation} MaTinh={item.MATINH}/>
       </View>
      
   );
const cuoiban =()=>{
  return(
    <TouchableOpacity onPress={()=>navigation.navigate("SanPhamDaXem")}>
      <Text>Xem thêm</Text>
    </TouchableOpacity>
  )
}
   const listHeader = ()=>{
    return(
      
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#87CEFA'}}>
      <Image source={{uri:hinhanh+'icon/icon/history.png'}} style={{height:25,width:25}}/>
       <Text style={{color:'#FFF',marginVertical:5}}> Sản phẩm đã xem</Text>
      </View>
    )}
  
     return (
       <View>
          
                       {listHeader()}
                <View style={{backgroundColor:'#FFF'}}>   
                    <FlatList 
                      data={dataHistory}
                      renderItem={renderItem} 
                      horizontal={true}
                      keyExtractor={(item) => item.IDCHITIETSP}
                      showsHorizontalScrollIndicator={false}
                      renderFooter={cuoiban}
                      />
                </View>
          
            </View>
           
     
     
    );
  }