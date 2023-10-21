import React, {useEffect, useState,useRef } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity, Image,ScrollView,Animated,Modal,ActivityIndicator,
  Dimensions,Platform,PermissionsAndroid} from 'react-native';
  import { useDispatch } from 'react-redux';
  import {ADD_TINHTHANH,ADD_DIACHI} from '../../../redux/cartAction';
  import Geocoder from 'react-native-geocoding'
  import Geolocation from 'react-native-geolocation-service';
  import axios from 'axios';
  import {Lay_ViTri} from './ham'
  import TinhThanh from '../../quanly/chung/tinhthanh';
  import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
  const {width,height} = Dimensions.get('window');


  export default function BaneHome ({navigation}) {
    const {hinhanh,abita_chung,abita_amin} = diachiDaTa; 
    const [index,setIndex]=useState(0)
    const [chuyenBane,setChuyenBaNe]=useState(0);
    const [position,setposition]=useState(null);
    const [modalVisible,setModalVisible] =useState(false);
    const time_hientai = new Date().getTime()
   

    const chuyen_BaNe=()=>{
      chuyenBane.scrollTo({ x: (index+1)*width, y: 0, animated: true })
    };
    const chuyen_BaNe1=()=>{
      chuyenBane.scrollTo({ x:(index-1)*width, y: 0, animated: true })
    };
    const addTinhThanh = (json) =>{
      const addtinhthanh = {
                  MaTinh:json.kq.MaTinh,
                  TenTinh:json.kq.TenTinh,
                  ThongTin:json.kq.ThongTin,
                };
      const actiontinhthanh = ADD_TINHTHANH(addtinhthanh);
      dispatch(actiontinhthanh);
    };
    

      useEffect(() => {
        getPermission()
      }, []); 

     
      const kiemtra_dinhvi =()=>{
        const latitude=position.coords.latitude;
        const longitude=position.coords.longitude;
        setModalVisible(true)
        const timdiachi=(res)=>{
          if(res.data.kq.TenTinh){
            console.log(res.data)
             lay_tinhthanh(json=res.data)
             }else
             {
                lay_diachi()
             }
          }
       
          axios.post(abita_amin+'DinhVi_TinhThanh.php',
                {latitude:latitude,longitude:longitude}
            ,{headers:{"Content-Type" : "application/json"}}
          )  .then((res) =>{timdiachi(res)})
            .catch((error) => {console.log(error),lay_diachi()})
            .finally(() =>{setModalVisible(false)})
      }

const lay_diachi =()=>{
 setModalVisible(true),
        fetch(abita_chung+'KiemTra_DinhVi.php', {
          method:'POST',
          headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
              },
                  body:JSON.stringify({ToaDo:position.coords.latitude+','+position.coords.longitude})
              })
              .then((response) => response.json())
              .then((json) =>{ console.log(json)
                  if(json.kq =='false'){
                    laydiachi(position)
                  }
                  else{
                    let diachi=json.kq
                    tinhthanh(diachi)
                  }
              })
              .finally(() => {setModalVisible(false)});
}
      const lay_tinhthanh = (json) => {
      addTinhThanh(json),setLoiChao(true)
        };

      const laydiachi =()=>{
        Geocoder.init("AIzaSyBgM2jLSvy9lp97fgsmrusv0WOdb68CHeg");
        Geocoder.from(position.coords.latitude,position.coords.longitude)
      .then(json => {
              var diachi = json.results[0].formatted_address;
              if(diachi){
                push_DiaChi(diachi)
              }     
      })
      .catch(error => {console.log(error),chuyen_BaNe()})
      }

      const push_DiaChi =(diachi)=>{
        fetch(abita_chung+'DinhVi_DiaChi.php', {
          method:'POST',
          headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
              },
                  body:JSON.stringify({ ToaDo:position.coords.latitude+','+position.coords.longitude,
                                        DiaChi:diachi,
                                        Ngay:time_hientai
                                      })
              })
              .then(json=>{
                tinhthanh(diachi)
              })
              .catch(error => {console.log(error),chuyen_BaNe()})
        };
        const tinhthanh = (diachi) => {
            let mangdiachi =diachi.split(',')
            let tinh =mangdiachi[mangdiachi.length-2].trim()
          fetch(abita_chung+'TimTinh.php?TenTinh='+tinh)
            .then((response) => response.json())
            .then((json) => {json.kq=='false'?chuyen_BaNe():(addTinhThanh(json),allDiaChi(diachi),setLoiChao(true))})
            .catch(function (error) {
              console.log(error),chuyen_BaNe() ;
            })
          };
    const dispatch = useDispatch()
  const allDiaChi = (diachi) =>{
    const infohobby = {
      DiaChi:diachi,
      ThoiGian:1
    };
    const actioninfo = ADD_DIACHI(infohobby);
    dispatch(actioninfo);
  };

    const vitri =()=>{
      Geolocation.getCurrentPosition(
        (position) => {
          setposition(position)
        },
        (error) => {
        console.log(error)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    };

   

    const getPermission = async () => {
      if (Platform.OS === 'android') {   
          try {
            // await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
            const granted = await  PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              vitri() 
            } 
          } catch (err) {
            console.log('1'+ err);
           
        };
       
      } else {
        try {
          const granted = await Geolocation.requestAuthorization('whenInUse')
          console.log('1'+granted)
      switch(granted) {
        case 'granted':
          console.log('1'+granted)
          vitri()
          break;
        case 'disabled'://bạn vui lòng bật định vị
        console.log('1'+granted)
          break;
        case 'denied':// bạn vui lòng cấp quyền định vị
        console.log('1'+granted)
          break;
          default:
            console.log('1'+granted)
          break; 
      }
          
          }
          catch (err) {
            console.log(err);
          
        };
          }
    };
   
   const chuyenTiep_Bane =()=>{
    if(index==0){
          chuyen_BaNe()
        } else if(index==2){
            null
        }else if(index==1){
          position?
          kiemtra_dinhvi():chuyen_BaNe()
        }else{
          chuyen_BaNe()
        }
    }

    return(
        <View style={{alignItems:'center'}}>
        <ScrollView horizontal={true} 
        pagingEnabled={true}
        bounces={false} 
        showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          ref={(ref)=>setChuyenBaNe(ref)}
          onScroll={(e)=>{
          setIndex(Math.round(e.nativeEvent.contentOffset.x/width)) }}
        >
        <View style={{alignItems:'center',width,justifyContent:'center'}}>
            <Text style={{fontSize:25, color:'#FFFFFF', fontWeight:'700',fontStyle: 'italic'}}>Sản phẩm nội tỉnh</Text>
            <Image source={{uri:hinhanh+'AnhNen/bia1.png'}}
             style={{height:width,width:width-50,resizeMode:'contain'}}/>
            <Text style={{fontSize:25, color:'#FFFFFF', fontWeight:'700',fontStyle: 'italic'}}>Đa dạng mặt hàng</Text>
            
        </View>
        <View style={{alignItems:'center',width:width,justifyContent:'center'}}>
        <Text style={{fontSize:25, color:'#FFFFFF',fontWeight:'700',fontStyle: 'italic',}}>Đổi trả dễ dàng</Text>
            <Image source={{uri:hinhanh+'AnhNen/bia2.png'}}
             style={{height:width,width:width-30,resizeMode:'contain'}}/>
            <Text style={{fontSize:25, color:'#FFFFFF', fontWeight:'700',fontStyle: 'italic'}}>Giao hàng cực nhanh</Text>
        </View>
        <TinhThanh navigation={navigation}/>
        </ScrollView>
        
        <SafeAreaView style={{position:'absolute',marginHorizontal:10,alignItems:'center',justifyContent:'flex-end',width:width-20,bottom:20,}}>
        <View style={{flexDirection:'row',marginHorizontal:10,justifyContent:'center',marginBottom:20}}>
         <TouchableOpacity onPress={()=>{index==0||index==2?null:chuyen_BaNe1()}}
         style={{height:40,width:80,justifyContent:'center',borderRadius:6,borderWidth:index==0||index==2?null:1,alignItems:'center'}}>
           {index==0||index==2?null:
              <Text>Quay lại</Text>
              }
            </TouchableOpacity>
         {index!==2?
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              {[0,1,2].map(item=> 
                <View key={item} style={{width:10,height:10, backgroundColor:index==item?'#F0F0F0':'#4682B4',marginHorizontal:5,borderRadius:50}}>

                </View>)}
            </View>:
            null}
            <TouchableOpacity onPress={()=>{chuyenTiep_Bane()}}
            style={{height:40,width:80,justifyContent:'center',borderRadius:6,borderWidth:index==2?null:1,alignItems:'center'}}>
             {index==2?null:
              <Text>Tiếp tục</Text>
              }
            </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
              >
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator size="large" color="#00ff00" />
              </View>
            </Modal>
          </SafeAreaView>
         
        </View>
    )}