import React, {Component,useState,useEffect,useRef} from 'react';
import { Text, View,SafeAreaView,Image,TouchableOpacity,FlatList,Dimensions,StyleSheet,Animated,ActivityIndicator} from 'react-native';

import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
const {width} = Dimensions.get('window');
import {ADD_THONGBAO} from '../../../../redux/cartAction';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image'



const ItemFlatList =({item,navigation})=>{
	const {hinhanh}=diachiDaTa;

  const [tile_Iamge, settile_Image] = useState(1);
  
  const time = new Date(item.NGAY*1000)
  var phut = time.getMinutes().toString();
  var gio = time.getHours().toString();
  var ngay = (time.getDate() + 100).toString().substring(1);
  var thang = (time.getMonth() + 101).toString().substring(1);
  var nam = time.getFullYear().toString();
   var ngaythangnam =gio+':'+phut+' '+ngay+'/'+thang+'/'+nam
   if(item.TENANH){ 
    Image.getSize(hinhanh+'AnhThongBao/'+ item.TENANH, (w, h) => {
      settile_Image(h/w)
    }, (error) => {
      console.error(error);
      settile_Image(0)
    })};
    const dispatch = useDispatch()
    const addThongBao = (item) =>{
      const infohobby = {
                      Mapush:item.Mapush,
                      MaDonHang:item.MaDonHang,
                      BoDy:item.BoDy,
                      NGAY:item.NGAY,
                      Noidung:item.NoiDung,
                      Xem:false
                  };
      const actioninfo = ADD_THONGBAO(infohobby);
      dispatch(actioninfo);
    };
    const renderThongbaoDonHang =(item)=>{

      return(
        <View>
          <Text style={{marginHorizontal:width*0.05,marginVertical:6, color:'#FFFFFF',fontSize:11}}>{ngaythangnam}</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("ChiTietDonHang",{MaDonHang:item.MaDonHang,tinhtrangdonhang:item.BoDy,Ngay:ngaythangnam}),addThongBao(item)}}
          style={{marginHorizontal:width*0.05,borderRadius: 10,backgroundColor:item.Xem?'#DDA0DD':'#FFF'}}
          activeOpacity={0.8}
          >
           <FastImage
                          style={{width:width*0.88,height:width*0.25,margin:5,borderRadius:5}}
                          source={{
                              uri:hinhanh+'slileApp/banne0.png',
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.stretch}
                      />
            <View style={{margin:10}}>
            
              <Text style={{color:'blue',textDecorationLine: 'underline',}}>Mã đơn hàng: {item.MaDonHang}</Text>
              <Text style={{color:'blue',textDecorationLine: 'underline',}}>Tình trạng: {item.BoDy}</Text>
              </View>
          </TouchableOpacity>
        </View>
      )
    }
    return(
      item.Mapush?
      renderThongbaoDonHang(item)
      :
    <View >
      <Text style={{marginHorizontal:width*0.05,marginVertical:6, color:'#FFFFFF',fontSize:11}}>{ngaythangnam}</Text>
      <View style={{ marginHorizontal:width*0.05,borderRadius: 10,backgroundColor:'#FFFFFF',alignContent:'center'}}>
        {item.TENANH?
          <Image source={{uri:hinhanh+'AnhThongBao/'+ item.TENANH}} 
          style={{width:width*0.88,height:width*0.88*tile_Iamge,margin:5,borderRadius:5}} 
          
          />:null
        }
          <Text style={{margin:10}} >{item.NOIDUNG}</Text>
          {item.LOAI==2?
            <TouchableOpacity onPress={item.LOAI==2&&item.MAUIDNCC?()=>navigation.navigate("CuaHang",{MaUidNCC:item.MAUIDNCC,MaTinh:item.MATINH}):null}
            style={{marginLeft:10,marginVertical:5}}
            >
              <Text style={{color:'blue',marginVertical:5,textDecorationLine: 'underline',}}>Đến xem cửa hàng ⇨</Text>
            </TouchableOpacity>:null
          }
      </View>
      
    </View>
    )
  

  
};
module.exports = {ItemFlatList}
const styles = StyleSheet.create({
  tabthongbao:{
    flex:1,
    marginHorizontal:5,
    alignItems:'center',
    borderWidth:1,
    borderRadius:8,
    justifyContent:'center',
    borderColor:'#66CDAA'
  },
  text:{
    color:'#FFFFFF',
    textAlign:'center',
    margin:2,
    fontSize:11
  }
})