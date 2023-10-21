import React, { useState,useRef,useEffect } from 'react';
import { Text, View,Dimensions,StyleSheet,Platform,
 Image,Animated,ActivityIndicator, TouchableOpacity, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PhoneNumber from './PhoneNumber';
import VerifyCode from './VerifyCode';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {fechDaTa_Axios,MD5} from '../../dungchung/fech_data'
import {useSelector, useDispatch} from 'react-redux';
import {ADD_INFO_SDT} from '../../../redux/cartAction';
import DonHangDat from '../../quanly/khachhang/donhangdat';
import AminDangNhap from '../aminDangNhap';
import SanPhamYeuThich from '../../sanpham/sanphamyeuthich'

export default function DangNhapNumberPhone ({navigation, route}) {
  const {hinhanh,abita_amin}=diachiDaTa;
  const {loai,xacnhan,tentinhtrang}=route.params;
  const dienthoai = useSelector(state => state.cart.SoDienThoai);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const ToKen = useSelector(state => state.cart.ToKen);
  const [dung, setDung] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [kiemtra, setKiemTra] = useState(false);
  const [loai_dangnhap, setLoai_DangNhan] = useState(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const time_hientai = new Date().getTime()
  const anim =()=>{fadeAnim.setValue(0)};
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:1000,
      useNativeDriver: true,
    }).start();
  };
  const MaUid=time_hientai+Math.random().toString(36).substr(2,3).toUpperCase()
  
  useEffect(()=>{
    dienthoai!=='abita'&&loai==3?
    setTimeout(() =>navigation.goBack(), 2000)
    :null
  },[dienthoai])
 useEffect(() => {anim(),fadeIn()},[]);

  const dispatch = useDispatch();
  const addSdt = (res) =>{
  const infohobby = {
    SoDienThoai:res.data.dt,
    MaUid:res.data.Uid
  };
  const actioninfo = ADD_INFO_SDT(infohobby);
  dispatch(actioninfo);
  };
 
const fechDangNhap =(dt)=>{
  var api_fech = abita_amin+'DangNhap_KhachHang.php?MaTinh='+MaTinh
  var set_then =(res)=>{res.data.Uid?addSdt(res):null}
  var set_catch =()=>{console.log(error)}
  var set_finally =()=>{setDung(false)}
  var data_fech = JSON.stringify({
                  MaUid:MaUid,
                  DienThoai_KhachHang:dt,
                  Ngay:time_hientai,
                  ToKen:ToKen,
                  KiemTra:MD5.home,
                  KiemTra_XoaTaiKhoan:time_hientai,
                  ThoiGian_XoaTaiKhoan:time_hientai+3*12*30*24*60*60*1000,
                  TinhTrang:'dangnhap'
                })
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}
  async function signIn(phoneNumber) {
    try {
          setDung(true)
          const confirmation = await auth().signInWithPhoneNumber('+84'+phoneNumber);
          setConfirm(confirmation);
          setDung(false)
        } catch (error) {
          alert(error);
          setDung(false)
      }
    };
    
  async function confirmVerificationCode(code) {
    try {
          setDung(true)
          await confirm.confirm(code);
          setKiemTra(true)
          
        } catch (error) {
          setModalVisible(true)
          setDung(false)
        }
      };

      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
        
      }, []);

      function onAuthStateChanged(user) {
        if(user) {
          setAuthenticated(true);
          var data = auth().currentUser.phoneNumber;
          var dt= '0'+data.slice(3,data.length);
        
          fechDangNhap(dt)
        } else {
          setAuthenticated(false);
          setDung(false)
        }
      };
  const screen =()=>{
            if(confirm) {return <VerifyCode onSubmit={confirmVerificationCode} modalVisible={modalVisible} setModalVisible={setModalVisible} setConfirm={setConfirm}/>}
            else{ return <PhoneNumber onSubmit={signIn} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />}
          };
  const loai3 =()=>{
    return(
      <View style={{backgroundColor:'#FFFFFF', alignItems: 'center',flex:1}}>
      <Image
          source={{uri:hinhanh+'AnhNen/nenDangNhap.jpg'}}
          style={{width:'100%',height:'100%',resizeMode: "cover",position:'absolute',}}
          />
          <SafeAreaView style={styles.logo}>
            <TouchableOpacity style={{marginTop:Platform.OS === 'ios'?10:25}}
              onPress={()=> navigation.goBack()}
            >
              <SimpleLineIcons name="arrow-left" size={25} color="#FFF" style={{marginLeft:10}}/>
            </TouchableOpacity>
            <View style={styles.viewlogo}>
              <Image style ={{flex:1,resizeMode:"contain",}} source={require('../../icon/logo.png')}/>
            </View>
            <Text style={styles.text}> Kính chào quý khách! </Text>
         
          </SafeAreaView>
            <View style={{flex:1,opacity:1, marginTop:40}}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View> 
         </View> 
    )
  }
  const phone =()=>{
    return(
    dung?
      <View style={{flex:1,opacity:1, marginTop:40}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View> : (
      <View>
        {screen()}
      </View>
      )
    )
  }
  const loaidangnhap =()=>{
    return(
      <View style={{width:'100%'}}>
      <TouchableOpacity onPress={()=>setLoai_DangNhan(1)}
       style={{marginLeft:20,marginTop:30,}}>
          <Text style={{color:'#191970'}}>Đăng nhập bằng số điện thoại</Text>
          <View style={{height:40,width:'70%', borderRadius:5,backgroundColor:'#FFF',marginVertical:10}}/>
        </TouchableOpacity>
        <View style={{alignItems:'center',marginTop:30}}>
      <Text style={{color:'#FF7F50'}}>-------- Hoặc --------</Text>
      <View style={{flexDirection:'row',marginTop:20}}>
        <TouchableOpacity style={{marginHorizontal:20}}>
        <Image style ={{width:40,height:40}} source={{uri:'https://cetusautomotive.com/Files/Images/google.png'}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal:20}}>
        <Image style ={{width:40,height:40}} source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png'}}/>

        </TouchableOpacity>
      </View>
      </View>
      
    </View>
    )
  }
  if(dienthoai!=='abita') {
    switch(loai){
      case '1': 
        return <DonHangDat tentinhtrang={tentinhtrang}
                    xacnhan={xacnhan}
                    navigation={navigation} 
              />;
        break;
      case '2':
        return <AminDangNhap 
                navigation={navigation}  
                />;
        break;
      case '3':return loai3();
        break;
      case '4': return <CuaHangThich navigation={navigation}/>;
        break;
        case '9': return <SanPhamYeuThich navigation={navigation}/>;
        break;
        default:
          null
         break;
    }

  }else{
    return(
     
      <Animated.View style={{ opacity:fadeAnim,alignItems: 'center',flex:1}}>
        <Image
          source={{uri:hinhanh+'AnhNen/nenDangNhap.jpg'}}
          style={{width:'100%',height:'100%',resizeMode: "cover",position:'absolute',}}
          />
          <SafeAreaView style={styles.logo}>
          <View style={{flexDirection:'row',marginTop:Platform.OS?10:40}}>
            <TouchableOpacity style={{marginTop:Platform.OS === 'ios'?10:25}}
              onPress={()=> !loai_dangnhap?navigation.goBack():(setLoai_DangNhan(null),setPhoneNumber(''))}
            >
              <SimpleLineIcons name="arrow-left" size={25} color="#FFF" style={{marginLeft:10}}/>
            </TouchableOpacity>
            <View style={styles.viewlogo}>
              <Image style ={{flex:1,resizeMode:"contain",}} source={require('../../icon/logo.png')}/>
            </View>
            </View>
          </SafeAreaView>
         
         {!loai_dangnhap?
          loaidangnhap():
          loai_dangnhap==1?
          phone():null}
      </Animated.View> 
      
    );
  }
}
const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color:'#FFFFFF',
    marginLeft:60,
    fontFamily: "Cochin",
    marginTop:20
  },
  viewlogo:{
    height:50,
    width:100,
   marginVertical:10
  },
  logo:{
    width:width,
    backgroundColor: 'rgba(80, 199, 199, 0.7)',
    
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,

    }
  }
);