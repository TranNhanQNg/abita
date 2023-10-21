import React, {useState,useEffect,useRef} from 'react';
import {Text, View,SafeAreaView,Animated,InteractionManager,
  TouchableOpacity,StyleSheet,ScrollView,Dimensions,Image} from 'react-native';

import HeaderG from '../../header/headerG';
import { useSelector,useDispatch} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import fadeIn from '../../dungchung/anima';
import {AnhNen} from '../../dungchung/anhnen';
import { ADD_DANGNHAP} from '../../../redux/cartAction';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sanPhamMoi from '../duyetsanpham/sanPhamMoi';


const iconSize = 20;

export default AminQuanLy =({navigation})=>{
  const {abita_amin,hinhanhicon,hinhanh}=diachiDaTa;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const taikhoan = useSelector(state => state.cart.TaiKhoan);
  const [apiSanPhamMoi, setApiSanPhamMoi] = useState('');
  const [apiDonHangMoi, setApiDonHangMoi] = useState('');
  const [apiDonHangXacNhan, setApiDonHangXacNhan] = useState('');
  const [data, setData] = useState([]);
  const [countSP, setCountSP] = useState(0);
  const [countDHM, setCountDHM] = useState(0);
  const [countXuLy, setCountXuLy] = useState(0);
  const [isLoading, setLoading] = useState(true);

const dienthoai = useSelector(state => state.cart.SoDienThoai); 
const Amin = useSelector(state => state.cart.Amin);


  const fadeAnim = useRef(new Animated.Value(0.1)).current;
  useFocusEffect(() => {fadeIn(fadeAnim)});
  useEffect(() => {
    fetch(abita_amin+'DangNhapAmin.php?MaTinh='+MaTinh,{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({ TaiKhoan:taikhoan,
                          DienThoai:dienthoai,
                          })
      }
    ) .then((response) => response.json())
      .then((json) =>{json.kq!==true?addDangXuat():null})
      .catch((error) => console.error(error));
      },[isLoading]);
    const dispatch = useDispatch()
    const addDangXuat = () =>{
        const infohobby = {
          TaiKhoan:'abita',
          PassWord:'abita',
          TenTaiKhoan:'abita',
          Khoa:'false',
          Amin:'',
        };
        const actioninfo = ADD_DANGNHAP(infohobby);
        dispatch(actioninfo);
      };
   
    
      
  useEffect(() => {
    const id = setInterval(() => {setLoading(c=>c+1)},5000);
    return () => clearInterval(id);
  }, []); 

  useEffect(() => {
    switch (Amin) {
      case 'AMIN':{
      countSanPham(api =abita_amin+'Dem/DemSanPhamMoi.php?DuyetSP=false&MaTinh='+MaTinh)
      countDonHangMoi(api =abita_amin+'Dem/DemDonHangAmin.php?XacNhan=false&MaTinh='+MaTinh+'&TenXacNhan=XacNhanAbita'),
      countDonHangXuLy(api=abita_amin+'Dem/DemDonHangAmin.php?XacNhan=true&MaTinh='+MaTinh+'&TenXacNhan=XacNhanAbita')
      setApiSanPhamMoi('IdSanPhamMoi.php?DuyetSP=false&MaTinh='+MaTinh)
      setApiDonHangMoi('DonHangAmin.php?MaTinh='+MaTinh+'&XacNhan=false&TenXacNhan=XacNhanAbita')
      setApiDonHangXacNhan('DonHangAmin.php?MaTinh='+MaTinh+'&XacNhan=true&TenXacNhan=XacNhanAbita')
    };
    break;
    case 'NCC':{
      countSanPham(api =abita_amin+'Dem/DemSanPhamMoi.php?DuyetSP=false&MaTinh='+MaTinh)
      countDonHangMoi(api =abita_amin+'Dem/DemDonHang.php?XacNhan=false&MaTinh='+MaTinh+'&DienThoaiNCC='+dienthoai+'&TenXacNhan=XacNhanNCC'),
      countDonHangXuLy(api=abita_amin+'Dem/DemDonHang.php?XacNhan=true&MaTinh='+MaTinh+'&DienThoaiNCC='+dienthoai+'&TenXacNhan=XacNhanNCC')
      setApiSanPhamMoi('IdSanPhamMoi.php?DuyetSP=false&MaTinh='+MaTinh)
      setApiDonHangMoi('DonHangNCC.php?MaTinh='+MaTinh+'&XacNhan=false&DienThoaiNCC='+dienthoai+'&TenXacNhan=XacNhanNCC')
      setApiDonHangXacNhan('DonHangNCC.php?MaTinh='+MaTinh+'&XacNhan=true&DienThoaiNCC='+dienthoai+'&TenXacNhan=XacNhanNCC')
    };
    break;
    case 'NVGH':{
      countSanPham(api =abita_amin+'Dem/DemSanPhamMoi.php?DuyetSP=false&MaTinh='+MaTinh)
      countDonHangMoi(api =abita_amin+'Dem/DemDonHang.php?XacNhanAbita=false&MaTinh='+MaTinh+'&DienThoaiNCC='+dienthoai),
      countDonHangXuLy(api=abita_amin+'Dem/DemDonHang.php?XacNhanAbita=true&MaTinh='+MaTinh+'&DienThoaiNCC='+dienthoai)
    };
  }

  },[isLoading]);

  const countSanPham=()=>{ 
    fetch(api)
    .then((response) => response.json())
    .then((json) => {setCountSP(json.countSP)})
    .catch((error) => console.error(error))
    
  }
  const countDonHangMoi=()=>{
    fetch(api)
    .then((response) => response.json())
    .then((json) => {setCountDHM(json.countDHMoi)})
    .catch((error) => console.error(error))
    
  }
  const countDonHangXuLy=()=>{
    fetch(api)
    .then((response) => response.json())
    .then((json) => {setCountXuLy(json.countDHMoi)})
    .catch((error) => console.error(error))
    
  }
  

  const soThongBao = JSON.stringify(data.length);

const datamuc =[{
                id:1,
                tenmuc:'Đơn mới',
                uri:hinhanhicon+'shopping-cart.png',
                mau:'#F8F8F8',
                navigation:'DonHangXuLy',
                api:apiDonHangMoi,
                xacnhan:false,
                thongbao:countDHM,
                quyen:'AMIN'
              },
              {
                id:2,
                tenmuc:'Đang xử lý',
                uri:hinhanhicon+'delivered.png',
                mau:'#F8F8F8',
                navigation:'DonHangXuLy',
                api:apiDonHangMoi,
                xacnhan:true,
                thongbao:countSP,
                quyen:'AMIN'
              },
              {
                id:3,
                tenmuc:'Chờ giao',
                uri:hinhanhicon+'express-delivery.png',
                mau:'#F8F8F8',
                navigation:'DonHangXuLy',
                api:'LocSoDonHang.php?MaTinh='+MaTinh+'&XacNhan=true&DienThoaiNCC='+dienthoai,
                xacnhan:false,
                quyen:''
            },
            {
              id:4,
              tenmuc:'Đã bán',
              uri:hinhanhicon+'daban.png',
              mau:'#F8F8F8',
              navigation:'DonHangXuLy',
              api:'LocSoDonHang.php?MaTinh='+MaTinh+'&XacNhan=true&DienThoaiNCC='+dienthoai,
              xacnhan:false,
              quyen:''
          },
          {
            id:5,
            tenmuc:'Tìm',
            uri:hinhanhicon+'search.png',
            mau:'#F8F8F8',
            navigation:'TimDonHang',
            api:'LocSoDonHang.php?MaTinh='+MaTinh+'&XacNhan=true&DienThoaiNCC='+dienthoai,
            xacnhan:false,
            quyen:''
        }
  ]
  const datamuc1 =[{
                  id:4,
                  tenmuc:'Thêm sản phẩm',
                  uri:hinhanhicon+'add.png',
                  mau:'#F0F8FF',
                  navigation:'AddSanPham',
                  api:apiDonHangMoi,
                  xacnhan:false,
                  thongbao:0,
                  quyen:'AMIN'
                },
                {
                  id:5,
                  tenmuc:'Quản lý sản phẩm',
                  uri:hinhanhicon+'quanlysanpham.png',
                  mau:'#F0F8FF',
                  navigation:'QuanLySanPham',
                  api:apiDonHangMoi,
                  xacnhan:true,
                  thongbao:0,
                  quyen:'AMIN'
                },
                {
                  id:6,
                  tenmuc:'Quản lý khuyến mãi',
                  uri:hinhanhicon+'khuyenmai.png',
                  mau:'#F0F8FF',
                  navigation:'QuanLyKhuyenMai',
                  api:'LocSoDonHang.php?MaTinh='+MaTinh+'&XacNhan=true&DienThoaiNCC='+dienthoai,
                  xacnhan:false,
                  thongbao:0,
                  quyen:''
              }
          ]
  const renderitem =(item)=>{
    return(
    item.quyen ==Amin||item.quyen==''?
    <TouchableOpacity  onPress={() => navigation.navigate(item.navigation,
                      {tentinhtrang:item.tenmuc,
                      api:item.api,
                      xacnhan:item.xacnhan,
                      uri:item.uri})}
                      key={item.id}
                    style={{  margin:4,borderRadius:5}}
    >
        <View style={{margin:8,
                      alignItems:'center',
                      justifyContent:'center'
                      }} 
                      >
          <View>
              <Image style ={{width:30,height:30,marginVertical:7}} source={{uri:item.uri}}/>
              {item.thongbao>0?
          <View style={styles.viewTB}>
            <Text style={styles.textTB}>{item.thongbao}</Text>
          </View>
          :null
        }
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={{textAlign:'center', fontSize:11,}}>{item.tenmuc}</Text>
          </View>
        </View>
       
    </TouchableOpacity>
    :null
    )
  }
  const tieude=(ten)=>{
    return(
      
        <View style={{alignItems:'center',marginVertical:5,justifyContent:'center'}}>
          <Image style ={{width:width-30,height:40,resizeMode:'stretch',marginVertical:3}} source={{uri:hinhanhicon+'tieude4.png',}}/>
          <Text style={{position:'absolute',color:'#2E8B57',fontWeight:'bold'}}>{ten}</Text>
      </View>
    )
  }
  const PhanAmin =()=>{
    switch (Amin) {
      case 'AMIN':{
        return(
          <ScrollView style={{}}>
           {tieude(ten='Quản lý đơn hàng')}
            <View style={{flexDirection:'row',
                          flexWrap:'wrap',
                          justifyContent:'space-around',
                          marginHorizontal:10}}>
              {datamuc.map(item=>renderitem(item)
              
              )}
            </View>
            {tieude(ten='Quản lý sản phẩm')} 
            <View style={{flexDirection:'row',
                          flexWrap:'wrap',
                          justifyContent:'space-around',
                          marginHorizontal:10}}>
              {datamuc1.map(item=>renderitem(item)
              
              )}
            </View>
          </ScrollView> 

        )
      };
    break;
    case 'DHDH':{
        return(
          <ScrollView style={styles.scrollView}>  
           
      </ScrollView> 
    )
  };
  break;
  case 'NCC':{
    return(
      <ScrollView style={styles.scrollView}>
      
       
        
      </ScrollView> 

    )
  };
  break;
}}
  return(
        <SafeAreaView style={{backgroundColor:'#FFFFFF', flex:1}}>
           <AnhNen api={'../icon/nenhome.jpg'}
                    backgroundColor={'#20B2AA'}
                    backgroundColor1={'rgba(0,175,175,0.7)'}/>
          <HeaderG navigation={()=>navigation.navigate("Sidebar")} tenTK={'👤 '+taikhoan}/>
          <Animated.View style={{backgroundColor:'#FFFFFF',flex:1,opacity:fadeAnim,}}>
          {PhanAmin()}
          <TouchableOpacity onPress={()=>navigation.navigate("AminDanhMuc")}>
          <Text> add danh mục</Text>
          </TouchableOpacity>
          
          </Animated.View>
        </SafeAreaView>
    );
}
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const styles= StyleSheet.create({

  scrollView:{
     marginHorizontal:20,
    flex:1
  },

  viewTouc:{
   
  },
  
  view:{
    marginHorizontal:5,
    backgroundColor:'red',
   
    alignItems:'center',
    width:'100%'
    },
  viewS:{
    height:0.5,
    backgroundColor:"#D3D3D3",
    marginLeft:iconSize+20
  },
  text:{
    marginLeft:10,
    fontFamily: "Cochin",
   
  },
  textTB:{
    color:'#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  viewTB:{
    position:'absolute',
    right:-10,
    top:-4,
    backgroundColor:'red',
    borderRadius:50,
    minHeight:12,
    minWidth:12,
    alignItems:'center',
    justifyContent:'center'
  }
 
})
  	
   