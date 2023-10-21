
import React,{useState,useRef} from 'react';
import { Text, View,ActivityIndicator,FlatList,Image, SafeAreaView,TouchableOpacity,Animated,useWindowDimensions} from 'react-native';

import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {RenderSanPhamKhac} from './renderSP_ChiTiet';

import { useDispatch,useSelector } from 'react-redux';

const{ abita_sanpham,hinhanh}=diachiDaTa;

export default function SanPhamDaXem ({navigation,idSP}) {

  const w = useWindowDimensions().width;
  const h = useWindowDimensions().height;
  const Wifi = useSelector(state => state.cart.Wifi);
  const dataHistory = useSelector(state => state.cart.dataHistory);
  
  const renderItem=({ item,index }) => (
    idSP==item.IDCHITIETSP||index>20?null:
   
    <View style={{    
               flexDirection:'row',
               borderWidth:0.5,
               margin:5,
               borderRadius:5
               }}>
       <RenderSanPhamKhac item={item} navigation={navigation} MaTinh={item.MATINH}/>
       </View>
      
   );

   const listHeader = ()=>{
    return(
      <View>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,alignItems:'center',height:40}}>
        <View style={{flexDirection:'row',alignItems:'center',height:40}}>
      <Image source={{uri:hinhanh+'icon/icon/history.png'}} style={{height:25,width:25}}/>
       <Text style={{color:'#FFF'}}> Sản phẩm đã xem</Text>
      </View>
       
      </View>
     
    </View>
    )}
  
     return (
       <View>
            <SafeAreaView >
                       {listHeader()}
                <View style={{backgroundColor:'#FFF'}}>   
                    <FlatList 
                      data={dataHistory}
                      renderItem={renderItem} 
                      horizontal={true}
                      keyExtractor={(item) => item.IDCHITIETSP}
                     
                      />
                </View>
                <View style={{height:150}}/>
            </SafeAreaView>
            </View>
           
     
     
    );
  }