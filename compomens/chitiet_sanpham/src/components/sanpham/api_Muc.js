import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator,Dimensions,RefreshControl,
ScrollView,Animated} from 'react-native';

let { width } = Dimensions.get("window");
const data_muc =[
    {id:1, muc:'Tất cả', icon:'1',api:'SanPhamDanhMucCap2.php?IdDanhMuc='},
    {id:2,muc:'Giảm giá', icon:'2',api:'SanPhamDanhMucCap2GG.php?IdDanhMuc='},
    {id:3, muc:'Bán chạy', icon:'1',api:'SanPham_BanChay.php?Muc=IdDanhMuc&IdDanhMuc='},
    {id:4,muc:'Hàng mới', icon:'2',api:'SanPham_HangMoi.php?Loc=NgayDangSP&Muc=IdDanhMuc&IdDanhMuc='}
  ];
export default Chon_Muc = (api_Muc,animations,mauMuc)=>{
    return(
      <View style={{width:'100%',backgroundColor:'#FFF'}} >
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
      >
        {data_muc.map(item=>
        <TouchableOpacity 
          onPress={mauMuc==item.id?()=>null:()=>{api_Muc(item)}}
          key ={item.id}
        style={{ width:width/4}}
        >
        <View style={{margin:5,alignItems:'center',justifyContent:'center',borderBottomWidth:2,marginVertical:5,borderBottomColor:mauMuc==item.id?'red':'#FFF'}}>
          <Text style={{color:mauMuc==item.id?'blue':'#000',fontFamily: 'OpenSans-Regular',fontSize:12,marginVertical:15}}>{item.muc}</Text>
        </View>
        </TouchableOpacity>)}
      </ScrollView>
      <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
    </View>
    )
  }