import React, {Component,useEffect,useState,useRef,useLayoutEffect} from 'react';
import { Text, View,Dimensions,StyleSheet,FlatList,TouchableOpacity,Animated,InteractionManager,ActivityIndicator, ScrollView} from 'react-native';
import { useSelector} from 'react-redux';
import axios from 'axios';
import FastImage from 'react-native-fast-image'


import HeaderCHThich from '../../header/headerCHThich';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import {AnhNen} from '../../dungchung/anhnen';
import Render_CuaHangUuTu from './render_cuahanguutu'
import {fadeIn} from '../../dungchung/anima';
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';
import { SafeAreaView } from 'react-native-safe-area-context';


const {abita_sanpham,abita_quanly}=diachiDaTa;



export default CuaHang_UuTu =({ navigation})=>{
  
  const Wifi = useSelector(state => state.cart.Wifi);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [soluongdata, setSoLuongData] = useState(0);
  const [dataTimKiem, setDataTimKiem] = useState('');
  const [kiemtratimkiem, setKiemTraTimKiem] = useState(true);
 
  const [isLoading, setLoading] = useState(true);
  const [timkiem,setTimKiem]=useState('');
  const [trang,setTrang]=useState(2);
  const [acti,setActi]=useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    if(isLoading){
     fadeIn(fadeAnim);
     }
  },[])

const fechDaTa=()=>{
    var api_fech = abita_sanpham+'Cua_Hang/cuahang_uutu.php?MaTinh='+MaTinh+'&Trang=1'
    var set_then =(res)=>{setData(res.data)}
    var set_catch =(error)=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home})
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}
const fechDaTa1=()=>{
  var api_fech = abita_sanpham+'Cua_Hang/cuahang_uutu.php?MaTinh='+MaTinh+'&Trang='+trang
  var set_then =(res)=>{setData1(res.data),setSoLuongData(res.data.length)}
  var set_catch =(error)=>{console.log(error)}
  var set_finally =()=>{setActi(false)}
  var data_fech = JSON.stringify({KiemTra:MD5.home})
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}

  useEffect(() => {
            if(soluongdata==0){
              fechDaTa()
            }
              fechDaTa1()
        },[trang]);

  const fechCuaHang =()=>{
    fadeAnim.setValue(0)
    setLoading(true)
    fetch(abita_quanly+'TimCuaHang.php?MaTinh='+MaTinh+'&TimKiem='+timkiem+'&trang=1')
      .then((response) => response.json())
      .then((json) => {setDataTimKiem(json),fadeIn(fadeAnim)})
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };


        const onEndReached=()=>{
          if(soluongdata<6){
           null
            }else{
              data.concat(data1)
              setTrang(trang+1)
              setActi(true)
            }
          }; 

const saechclose=()=>{setTimKiem(''),setDataTimKiem([],setKiemTraTimKiem(true))}
const onChangeText =(text)=>{setTimKiem(text)
                            }
const onSubmitEditing =()=>{
  fechCuaHang()
  setKiemTraTimKiem(false)
}
const cuoiban =() =>{
  return(
    <View style={{backgroundColor:'#FFF', marginTop:100}}>
        {acti?
            <ActivityIndicator/>
        :null
        }
    </View>
    )
};
const ListHeaderComponent=()=>{
  return(
    <View style={{width:width}}>
       
    </View>
  )
}
return (
<View style = {{flex:1}}>
    
  <SafeAreaView style={{flex:1,backgroundColor:'#FFF',  borderRadius:8}}>
         <View style={{width:width,height:100,position:'absolute'}}>
            <FastImage
                style={{flex:1,margin:2}}
                source={{
                    uri: 'https://thuthuatnhanh.com/wp-content/uploads/2020/05/hoa-bo-cong-anh-840x473.jpg',
                    priority: FastImage.priority.normal,
                  
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
         <View style={{marginBottom:5}}>
            <HeaderCHThich  navigation ={navigation}
                    onChangeText={onChangeText}
                    saechclose={saechclose}
                    onSubmitEditing={onSubmitEditing}
                    timkiem={timkiem}
                    ten={'Tìm cửa hàng'}
              />
              </View>
         
           {isLoading?<Activity netInfo={Wifi}/> :
         <Animated.FlatList 
         style={{opacity:fadeAnim}}
            data={kiemtratimkiem?data:dataTimKiem}
            renderItem={({ item }) => (
              <Render_CuaHangUuTu item={item} navigation={navigation} color={'#87CEEB'} color1={'#FFF'} MaTinh={item.MATINH}/>
            )}
            keyExtractor={(item) => item.MAUIDNCC}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={true}
            onEndReached={onEndReached}
            ListFooterComponent={cuoiban}
           
            />}
         </SafeAreaView>
  </View>
      

      
      );
};
const {width,height} = Dimensions.get('window');