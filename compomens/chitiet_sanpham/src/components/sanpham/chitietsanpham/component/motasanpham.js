import React,{useState}from 'react';
import { Text, View,SafeAreaView,Image,ScrollView,Dimensions,TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image'
import TieuDe_CuaHang from './tieude_cuahang';

import HeaderE from '../../../header/headerE';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import styles from '../stylesChiTietSP';

const {width} = Dimensions.get('window');
const { hinhanhsanpham}=diachiDaTa;
const{viewHinhAnh,viewImage,aoimage,viewSwiper,text} = styles;

export default MoTaSanPham =({navigation, route})=>{
  const {data,loai,MaTinh,dataAnh} = route.params;
  const [index1,setIndex]=useState(0);
  const [hienthi,sethienthi]=useState(loai);
  const dieuhuong =() => {navigation.navigate("SanPhamThuongHieu",{
    apiSP:"SanPhamThuongHieu.php?TenThuongHieu=",
    tenthuonghieu:data.THUONGHIEU,
    anhdaidien:data.ANHDAIDIEN
    })
    }
return (
  <SafeAreaView style = {{flex:1,backgroundColor:'#FFFFFF'}}>
 <View>
 
  <ScrollView
    bounces = {false}
    showsVerticalScrollIndicator={false}
  >
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces = {false}
        onScroll={(e)=>{
          setIndex(Math.round(e.nativeEvent.contentOffset.x/width)) }}
          scrollEventThrottle={16}
        >
           {dataAnh.map(item =>
            <View style={viewHinhAnh} key = {item}>    
              <View style={viewImage} >
                   
                    <FastImage
                              style={{flex:1,resizeMode:'contain'}}
                              source={{
                                  uri:hinhanhsanpham + item,
                                  priority: FastImage.priority.normal,
                                
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                          />
                  </View>
            </View>
          )}
         
        </ScrollView>
    
   <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
   {dataAnh.map((item,index )=>
            <View style={{width:5,height:5,backgroundColor:index==index1?'#50C7C7':'#DCDCDC',borderRadius:5,marginHorizontal:2}} key = {item}/>    
          
          )}
   </View>
   <View style={{flexDirection:'row',marginTop:5}}>
      <TouchableOpacity onPress={()=>sethienthi(1)}
      style={{flex:1,height:30,backgroundColor:hienthi==1?'#FFF':'#F0FFF0',alignItems:'center',justifyContent:'space-evenly',}}>
        <Text style={{color:hienthi==1?'#1E90FF':'#808080'}}>Chi tiết sản phẩm</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>sethienthi(2)}
      style={{flex:1,height:30,backgroundColor:hienthi==2?'#FFF':'#F0FFF0',alignItems:'center',justifyContent:'space-evenly',}}>
        <Text style={{color:hienthi==2?'#1E90FF':'#808080'}}>Mô tả sản phẩm</Text>
      </TouchableOpacity>
    </View>
   {hienthi==1?
   <View>
     <View style={{backgroundColor:'#F8F8F8', marginTop:10,}}>
          <Text style={[text,{marginLeft:10,fontWeight:'bold'}]}>Cửa hàng:</Text>
          <View style={{marginHorizontal:10}}>
          <TieuDe_CuaHang item={data} MaTinh={MaTinh} color={'#C6DEA9'} color1={'#F8F8F8'}
                navigation={navigation}/>
      </View>
		</View>
      <View >
      <View style={{backgroundColor:'#FFF', height:30,alignItems:'center',flexDirection:'row'}}>
      <Text style={[text,{marginLeft:10,fontWeight:'bold'}]}>Thương hiệu:</Text>
     
      <TouchableOpacity onPress={()=>dieuhuong()} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
        <Text style={[text,{color:'blue',textDecorationLine:'underline'}]}> {data.THUONGHIEU}</Text>
        <Text style={[text]}> (xem)</Text>
      </TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#F8F8F8', height:30,alignItems:'center',flexDirection:'row'}}>
			<Text style={[text,{marginLeft:10,fontWeight:'bold'}]}>Xuất xứ:</Text>
			<Text style={[text]}> {data.XUATXU}</Text>
			</View>
    </View>
    </View>:null}
      
      <Text style={[text,{marginHorizontal:10,marginVertical:10}]}>{hienthi==1?data.CHITIETSANPHAM:data.MOTASANPHAM} </Text> 
      {dataAnh.map(item =>
          
              <View style={[viewImage,{margin:2}]}  key = {item} >
              <FastImage
                              style={{flex:1,resizeMode:'contain'}}
                              source={{
                                  uri:hinhanhsanpham + item,
                                  priority: FastImage.priority.normal,
                                
                              }}
                              resizeMode={FastImage.resizeMode.contain}
                          />
              </View>
           
          )}   
</ScrollView>

 <HeaderE navigation={navigation}/>
 </View>
</SafeAreaView>
      
      );
};