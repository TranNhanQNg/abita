import React,{useState,useEffect,useRef} from 'react';
import { Text, View,SafeAreaView,Image,TouchableOpacity,ScrollView,Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { ADD_DANGNHAP} from '../../redux/cartAction';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {ModalThongBao2Chon} from '../../components/dungchung/modalThongBao';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const {hinhanh,abita_quanly,abita_amin}=diachiDaTa
const time_hientai = new Date().getTime()

function CaiDat ({navigation}){
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const MaUid = useSelector(state => state.cart.MaUid);
    const ToKen = useSelector(state => state.cart.ToKen);
    const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
    const [modalVisibleXoa,setModalVisibleXoa] =useState(false);
    const dispatch = useDispatch()
    const addDangXuat = () =>{
        const infohobby = {
            SoDienThoai:'abita',
            refreshToken:'',
            TaiKhoan:'abita',
            PassWord:'abita',
            TenTaiKhoan:'abita',
            Khoa:'false',
            Amin:'',
            ThoiGianXoa_TaiKhoan:null
        };
        const actionTK = ADD_DANGNHAP(infohobby);
        dispatch(actionTK);
      };
      const fechXoa =()=>{
        const newdata =JSON.stringify({
              MaUid:MaUid,
              DienThoai_KhachHang:SoDienThoai,
              Ngay:time_hientai,
              ToKen:ToKen,
              KiemTra_XoaTaiKhoan:Math.round(time_hientai),
              ThoiGian_XoaTaiKhoan:Math.round(time_hientai+15*24*60*60),
              TinhTrang:'xoa'
             });
        axios.post(abita_amin+'DangNhap_KhachHang.php?MaTinh='+MaTinh,
            newdata
        ,{headers:{"Content-Type" : "application/json"}}
      )   .then((res) =>{res.data.kq?(addDangXuat(),auth().signOut(),setModalVisibleXoa(false)):null,console.log('Nhân'+res.data.kq)})
        .catch((error) => {console.log(error)})
      }
    const dieukhien1 =()=>{fechXoa(),navigation.goBack()}
    const dieukhien2 =()=>{setModalVisibleXoa(false)}
    return(
        <SafeAreaView style={{backgroundColor:'#66CDAA',flex:1}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}
                style={{marginLeft:10}}>
                <SimpleLineIcons name="arrow-left" size={25} color="#FFF" style={{marginVertical:10,marginTop:Platform.OS==='ios'?10:50}}/>
            </TouchableOpacity>
            <View style={{backgroundColor:'#FFF',flex:1}}>
            <ScrollView style={{marginHorizontal:20}}>
                <TouchableOpacity onPress={() => {auth().signOut(),addDangXuat(),navigation.goBack()}}
                style={{flexDirection:'row',alignItems:'center',marginTop:20}}
                >
                        <Image source={{uri:hinhanh+'icon/icon/logout.png'}} style={{height:30,width:30,marginHorizontal:10}}/>
                    <Text style={{fontSize:13, color:'#4c4c4c',flex:1}}> Đăng xuất </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setModalVisibleXoa(true)}
                style={{flexDirection:'row',alignItems:'center',marginTop:20}}
                >
                        <Image source={{uri:hinhanh+'icon/xoataikhoan.png'}} style={{height:30,width:30,marginHorizontal:10}}/>
                    <Text style={{fontSize:13, color:'#4c4c4c',flex:1}}> Xoá tài khoản </Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
            <ModalThongBao2Chon
        ten={'Cảnh báo'}
        thongbao ={'Bạn xoá tài khoản bạn sẽ không còn nhận được các chường trình khuyến mãi từ điểm tích luỹ của bạn trong thời gian qua. Tài khoản của bạn sẽ được xoá trong vòng 15 ngày nếu bạn không đăng nhập lại'}
        modalVisible={modalVisibleXoa}
        dieukhien2={dieukhien1}
        dieukhien1={dieukhien2}
        hanhdong2={'Xoá'}
        hanhdong1={'Huỷ'}

      />
        </SafeAreaView>
    )
 }
 export default CaiDat;