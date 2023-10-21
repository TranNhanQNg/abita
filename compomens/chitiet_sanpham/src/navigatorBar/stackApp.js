
import React,{useEffect,useState} from 'react';
import { Text, View,ActivityIndicator,Image,Platform,TouchableOpacity,Linking} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnhNen} from '../components/dungchung/anhnen';
import { useSelector} from 'react-redux';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import NavigationService from './NavigationService';
import diachiDaTa from '../diachiDaTa/diachiDaTa';
const{ abita_amin}=diachiDaTa;

import Danhmuc from '../components/danhmuc/danhmuc';
import Home from '../components/home/home';
import KhuyenMai from '../components/home/component/goi_Y_hommay/khuyenmai';
import ThongBao from '../components/quanly/chung/thongbao';
import HoTro from '../components/quanly/chung/hotro';
import TinhThanh from '../components/quanly/chung/tinhthanh';
import ThongBaoDichVu from '../components/quanly/chung/thongbaodichvu';
// import TinhThanhHone from '../components/home/tinhthanhHome';
import CaiDat from './component/caidat'
import QuanLy from './stackQuanLy';
import ChitietSanpham from '../components/sanpham/chitietsanpham/chitietsanpham';
import DanhMucCap4 from '../components/sanpham/danhmucCap4';
import SanPhamThuongHieu from '../components/sanpham/thuong_hieu/sanphamthuonghieu';
import DanhMucCap2 from '../components/sanpham/danhmucCap2';
import DanhMucCap3 from '../components/sanpham/danhmucCap3';
import CuaHang from '../components/sanpham/cuahang/cuahang';
import SanPhamDM_CH from '../components/sanpham/cuahang/sanphamDM_CH';
import SanPhamDM_TH from '../components/sanpham/thuong_hieu/sanphamDM_TH';
import Search from '../components/seach/search';
import TimSanPhamCH from '../components/seach/timSanPhamCH';
import Giohang from '../components/cart/giohang';
import DatHang from '../components/cart/datHang';
import MoTaSanPham from '../components/sanpham/chitietsanpham/component/motasanpham';
import NhanXet from '../components/sanpham/chitietsanpham/component/nhanxet';
import DonHangDat from '../components/quanly/khachhang/donhangdat';
import CuaHangThich from '../components/sanpham/cuahang/cuahangthich';
import ChiTietDonHang from '../components/quanly/khachhang/chitietdonhang';
import ThongTinDonHang from '../components/quanly/khachhang/thongtindonhang';
import AminDangNhap from '../components/amin/aminDangNhap';
import Dangky from '../components/amin/dangky';
import Sidebar from './sidebar';
import DangNhapNumberPhone from '../components/amin/dangnhapNbPhone/dangnhapNbPhone';
import SanPhamDaXem from '../components/sanpham/sanphamdaxem';
import SanPhamYeuThich from '../components/sanpham/sanphamyeuthich';
import CuaHang_UuTu from '../components/home/cuahang_uutu/cuahang_uutu';
import SanphamAnUongNhanh from '../components/home/component/anuongnhan';
import {ADD_PUSHTHONGBAO,ADD_THONGBAO_DONHANG,ADD_THONGBAO,ADD_TOKEN} from '../redux/cartAction';
import {useDispatch} from 'react-redux';
import {requestUserPermission,messagingPush,DisplayNotification} from './push_natification'





  const Stack = createNativeStackNavigator();
  const options={
    headerShown: false,
    animation:'fade',
    animationTypeForReplace:'push'
  };
 
export default function StackApp () {
  const PushThongBao = useSelector(state => state.cart.PushThongBao);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const MaUid = useSelector(state => state.cart.MaUid);

const [pushNatification, setPushNatification]=useState(null)
const [api, setApi]=useState(null)
const [url_link, setUrl_link] = useState(null);

const setStringApi = async () => {
  try {
    await AsyncStorage.setItem('@key_Api',JSON.stringify(null))
  } catch(e) {
    console.log('Done.')
  }
}
const getMyStringApi = async () => {
  try {
    const key_api  = await AsyncStorage.getItem('@key_Api')
    setApi(JSON.parse(key_api))
  } catch(e) {
    console.log('e')
  }
}
useEffect(()=>{
  api?
  getMyStringApi():null
},[PushThongBao,SoDienThoai])
useEffect(()=>{
  requestUserPermission(addToKen)
},[SoDienThoai,MaTinh])

  useEffect(()=>{
    requestUserPermission(addToKen)
    messagingPush(setPushNatification,pushThongBao)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    
      pushThongBao(remoteMessage)
      push(remoteMessage)
    });
    return unsubscribe;
  },[SoDienThoai])
const push =(remoteMessage)=>{
  if(SoDienThoai!=='abita'&&SoDienThoai==remoteMessage.data.DienThoai&&remoteMessage.data.Mapush=='donhang'){
    addThongBao_DonHang(remoteMessage)
  }else{
    addThongBao(remoteMessage)
  }
}
const dispatch = useDispatch()
const pushThongBao = (remoteMessage) =>{
  const infohobby = remoteMessage.messageId
  const actionThongBao = ADD_PUSHTHONGBAO(infohobby);
  dispatch(actionThongBao);
};
  const addToKen = (token) =>{
    const actioninfo = ADD_TOKEN(token);
    dispatch(actioninfo);
  };

  const addThongBao_DonHang = (remoteMessage) =>{
    const infohobby = {
	                Mapush:remoteMessage.data.Mapush,
                  MaDonHang:remoteMessage.data.MaDonHang,
                  BoDy:remoteMessage.data.body,
                  NGAY:remoteMessage.data.Ngay,
                  Noidung:remoteMessage.data.NoiDung,
                  MaUid:MaUid,
                  Xem:true
                };
    const actioninfo = ADD_THONGBAO_DONHANG(infohobby);
    dispatch(actioninfo);
  };

  const addThongBao = (remoteMessage) =>{
    const infohobby = {
                    Mapush:remoteMessage.data.Mapush,
                    MaDonHang:remoteMessage.data.MaDonHang,
                    NGAY:remoteMessage.data.Ngay,
                    BoDy:remoteMessage.data.body,
                    Noidung:remoteMessage.data.NoiDung,
                    MaUid:MaUid,
                    Xem:true
                };
    const actioninfo = ADD_THONGBAO(infohobby);
    dispatch(actioninfo);
  };

  const Wifi = useSelector(state => state.cart.Wifi);
    const[checkVision, setCheckVision] =useState('true')

      useEffect(()=>{
        fechVision()
      },[])
      const fechVision=() => {
        fetch(abita_amin+'vision.php?version=1.0.3')
          .then((response) => response.json())
          .then((json) => {setCheckVision(json.kq)})
          .catch((error) => console.error(error))
         
          };

  useEffect(() => {

    if(checkVision){
      const getUrlAsync = async () => {
        const url = await Linking.getInitialURL();
        handleDynamicLink1(url)
      };
     
      getUrlAsync();
     
      
    dynamicLinks().getInitialLink().then((link) => {
     handleDynamicLink(link)
    }).catch(e=>console.log(e))
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      handleDynamicLink1(url);
    });
    return () => {
      linkingListener();
      linkingSubscription.remove();
    }
    
    }
  }, [checkVision,url_link])

  const handleDynamicLink = (link) => {
    if (!!link?.url) {
      var link=link.url
      let getId = link?.split('=').pop().split(',').pop()
      let tinhthanh = link?.split('=').pop().split(',')[0]
      let component = link?.split('=').pop().split(',')[1]
      let MaUidNCC = link?.split('=').pop().split(',')[2]
      let idsanpham = link?.split('=').pop().split(',')[3]
      
        if(component=='ChitietSanpham'||component=='CuaHang'||component=='CuaHang'){
          setTimeout(() => {
            NavigationService.navigate(component, {idchitietsp:getId,MaTinh:tinhthanh,MaUidNCC:MaUidNCC,idsanpham:idsanpham})
          }, 1000)
        }else{null}
    }
   
  }
  const handleDynamicLink1 = (url) => {
   if(url){
    console.log(url)
      const link =url
      let getId = link?.split('=').pop().split(',').pop()
      let tinhthanh = link?.split('=').pop().split(',')[0]
      let component = link?.split('=').pop().split(',')[1]
      let MaUidNCC = link?.split('=').pop().split(',')[2]
      let idsanpham = link?.split('=').pop().split(',')[3]
      
      if(component=='ChitietSanpham'||component=='CuaHang'||component=='CuaHang'){
        setTimeout(() => {
          NavigationService.navigate(component, {idchitietsp:getId,MaTinh:tinhthanh,MaUidNCC:MaUidNCC,idsanpham:idsanpham})
        }, 1000)
    }else{null}
  }}
  
  useEffect(() => {
    if(checkVision){
    const link =api
    if(api){
      let getId = link?.split('=').pop().split(',').pop()
      let tinhthanh = link?.split('=').pop().split(',')[0]
      let component = link?.split('=').pop().split(',')[1]
      let dienthoaincc = link?.split('=').pop().split(',')[2]
      
      if(component=='ChitietSanpham'||component=='CuaHang'||component=='CuaHang'){
        setTimeout(() => {
          NavigationService.navigate(component, {idchitietsp:getId,MaTinh:tinhthanh,dienthoaincc:dienthoaincc})
          setStringApi()
        }, 1000)
    }else{null}
    }
   }
  }, [api,checkVision])


 

const setUpdate =()=>{
  var linkIOS = 'https://apps.apple.com/us/app/reelweb-app/id6443541989'
  var linkAndroid ='http://play.google.com/store/apps/details?id=com.abitashopee'
  Linking.openURL(
    Platform.OS==='android'?linkAndroid
    :linkIOS);
}
const update =()=>{
  return(
    <View style={{flex:1,justifyContent:'center'}}>
    <AnhNen/>
    <View style={{backgroundColor:'rgba(32,32,32,0.3)',alignItems:'center',marginHorizontal:20, borderRadius:10}}>
      <View style={{alignItems:'center',marginVertical:80}}>
        <Text style={{color:'#FFF', fontSize:20}}>CÙNG TẢI NGAY PHIÊN BẢN MỚI</Text>
        <Image style ={{height:40,width:80,margin:5,}} source={require('../components/icon/logo.png')}/>
        <Text style={{color:'#FFF',marginVertical:10}}>để trải nghiệm dịch vụ và tính năng mới nhất</Text>
      
      <TouchableOpacity onPress={()=>setUpdate()} style={{marginTop:100}}>
        <Image source={{uri:Platform.OS==='android'? 'https://res.cloudinary.com/sanvanchuyenmuaho-com/image/upload/v1635582161/android_rob7sp.png'
                            :'https://giaohangtietkiem.vn/wp-content/uploads/2016/12/appstore.png'}} 
        style={{height:60,width:180,resizeMode:'contain'}}/>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}
  const Rounter =()=>{
    return(
      <NavigationContainer ref={ref => NavigationService.setTopLevelNavigator(ref)}>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" options={options} component={Home} />
        <Stack.Screen name="KhuyenMai" options={options} component={KhuyenMai} />
        <Stack.Screen name="ChitietSanpham" options={options} component={ChitietSanpham} />
        <Stack.Screen name="MoTaSanPham" options={options} component={MoTaSanPham} />
        <Stack.Screen name="NhanXet" options={options} component={NhanXet} />
        <Stack.Screen name="Danhmuc" options={options} component={Danhmuc} />
        <Stack.Screen name="TinhThanh" options={options} component={TinhThanh} />
        <Stack.Screen name="ThongBaoDichVu" options={options} component={ThongBaoDichVu} />
        <Stack.Screen name="CaiDat" options={options} component={CaiDat} />
        {/* <Stack.Screen name="TinhThanhHone" options={options} component={TinhThanhHone} /> */}
        <Stack.Screen name="ThongBao" options={options} component={ThongBao} />
        <Stack.Screen name="HoTro" options={options} component={HoTro} />
        <Stack.Screen name="QuanLy" options={options} component={QuanLy} />
        <Stack.Screen name="DanhMucCap4" options={options} component={DanhMucCap4} />
        <Stack.Screen name="SanPhamThuongHieu" options={options} component={SanPhamThuongHieu} />
        <Stack.Screen name="DanhMucCap2" options={options} component={DanhMucCap2} />
        <Stack.Screen name="DanhMucCap3" options={options} component={DanhMucCap3} />
        <Stack.Screen name="Search" options={options} component={Search} />
        <Stack.Screen name="TimSanPhamCH" options={options} component={TimSanPhamCH} />
        <Stack.Screen name="Giohang" options={options} component={Giohang} />
        <Stack.Screen name="DatHang" options={options} component={DatHang} />
        <Stack.Screen name="ThongTinDonHang" options={options} component={ThongTinDonHang}/>
        <Stack.Screen name="DonHangDat" options={options} component={DonHangDat}/>
        <Stack.Screen name="ChiTietDonHang" options={options} component={ChiTietDonHang} />
        <Stack.Screen name="AminDangNhap" options={options} component={AminDangNhap} />
        <Stack.Screen name="DangKy" options={options} component={Dangky} />
        <Stack.Screen name="Sidebar" options={options} component={Sidebar} />
        <Stack.Screen name="DangNhapNumberPhone" options={options} component={DangNhapNumberPhone} />
        <Stack.Screen name="CuaHang" options={options} component={CuaHang} />
        <Stack.Screen name="CuaHangThich" options={options} component={CuaHangThich} />
        <Stack.Screen name="SanPhamDM_CH" options={options} component={SanPhamDM_CH} />
        <Stack.Screen name="SanPhamDM_TH" options={options} component={SanPhamDM_TH} />
        <Stack.Screen name="SanPhamDaXem" options={options} component={SanPhamDaXem} />
        <Stack.Screen name="SanPhamYeuThich" options={options} component={SanPhamYeuThich} />
        <Stack.Screen name="CuaHang_UuTu" options={options} component={CuaHang_UuTu} />
        <Stack.Screen name="SanphamAnUongNhanh" options={options} component={SanphamAnUongNhanh} />
     </Stack.Navigator>
     {Wifi?null:
      <View style={{height:70,width:'100%',
                     position:'absolute',
                     bottom:0,
                     justifyContent:'center',
                     alignItems:'center',
                     backgroundColor:'#FFFACD',
                     flexDirection:'row'}}>
            <Text style={{}}> Vui lòng kiển tra kết nối! </Text>
            <ActivityIndicator size="small" color="#008000" />
       </View>
       }
     </NavigationContainer>
    )
  }

       return (
        checkVision=='true'?
        Rounter()
        :update()
     
      
    );
  }