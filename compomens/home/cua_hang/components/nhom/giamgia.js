import React from 'react';
import {Text, View,ImageBackground,Animated} from 'react-native';

const giamgia =(item,time_hientai)=>{
   
      return(
        item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
        
      <View style={{position:'absolute',top:0,right:0,alignItems:'center',justifyContent:'center',backgroundColor:'rgba(242, 0, 4,0.7)',borderRadius:2}}>
       <Text style={[{fontSize:11, color:'#FFF',fontWeight:'bold',marginHorizontal:2}]}>
                          -{item.GIAKHUYENMAI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:10}}>%</Text>
                          </Text>
        {/* <ImageBackground style ={{width:25,height:35,justifyContent: 'center',alignItems: 'center',}} source={require('../icon/sale.png')}>
              <Text style={{color:'#FFFFFF', fontSize:9,marginBottom:11,textAlign:'center' }}>{item.GIAKHUYENMAI}%</Text>
        </ImageBackground> */}
      </View>
      : 
      <View style={{position:'absolute',top:2,right:2,}}>
        <View style={{flexDirection:'row',justifyContent:'center',backgroundColor:'rgba(0, 83, 171,0.7)',alignItems:'center', transform: [{skewX: "160deg"}]}}>
          <Text style={{color:'#FFF',fontSize:11,fontWeight:'bold',}}> mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
        </View>
      </View>
      :null
  
      )
   
  };
  module.exports = {giamgia};