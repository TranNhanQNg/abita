import React, {useState,useEffect} from 'react';
import {Text, View,StyleSheet,SafeAreaView,
  TouchableOpacity,TextInput,Modal,ScrollView, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useLocalSearchParams } from 'expo-router';
import HeaderG from '../header/headerG';
import {ModalThongBao,ModalThongBaoDH} from '../dungchung/modalThongBao';
import {MoDalHuyen,MoDalXa,MoDalTinh,ModalThon} from './modal';
import api from '../api/api';
import { Heigth_Width } from '../api/heigth_width';
import {Activity} from '../dungchung/activityIndicator';
import {AnhNen} from '../dungchung/anhnen';

import NotificationService from './notification';
import { fechDaTa_Axios,MD5 } from '../api/fech_data';

const mobi = Heigth_Width.mobi;
  const {abita_dathang,abita_amin}=api; 

export default DatHang =({navigation})=>{
  const params = useLocalSearchParams();
  const {loai,soluong,matinh,Abi} = params;

  const [dienthoai, setDienThoai] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [hotenKH, sethotenKH] = useState("");
  const [ghichu, setGhiChu ]= useState('');
  const [modalVisibleTB, setModalVisibleTB] = useState(false);
  const [thongbaoMoDal, setThongBaoMoDal] = useState(false);
  const [modalVisibleDH, setModalVisibleDH] = useState(false);
  const [modalVisibleDHL, setModalVisibleDHL] = useState(false);
  const [modalLoi, setModalLoi] = useState(false);
  const [dongdangnhap,setDongDangNhap]=useState(true)
  const [modalTinh, setModalTinh] = useState(false);
  const [modalQuanHuyen, setModalQuanHuyen] = useState(false);
  const [modalXaPhuong, setModalXaPhuong] = useState(false);
  const [modalThon, setModalThon] = useState(false);
  const [tenxa, setTenXa] = useState("");
  const [tenquanhuyen, setTenQuanHuyen] = useState("");
  const [mahuyen,setmahuyen] =useState('');
  const [tinhmua,setTinhMua]=useState("");
  const [tentinh,setTenTinh]=useState("");
  const [scanspal,setscanspal]= useState(false);
  const [location, setLocation] = useState(null);
  const [dataToKenAmin,  setDaTaToKenAmin] = useState([]);
  const [sonha,setSonha] =useState('')
  const [maDonHang,setMaDonHang] =useState(null);
  const [dataCart,setDataCart]=useState([]);
  const [dataMN,setDataMN]=useState([])
  
  const getData = async () => {
		try {
		  const jsonValue = await AsyncStorage.getItem('my-key-datacart');
		  return jsonValue != null ? setDataCart(JSON.parse(jsonValue)) : null;
		} catch (e) {
		  // error reading value
		}
  }
  const getDataMuaNgay = async () => {
		try {
		  const jsonValue = await AsyncStorage.getItem('my-key-dataMuaNgay');
		  return jsonValue != null ? setDataMN(JSON.parse(jsonValue)) : null;
		} catch (e) {
		  // error reading value
		}
  }
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify([]);
      await AsyncStorage.setItem('my-key-datacart', jsonValue);
    } catch (e) {
      // saving error
    }
    };

    const storeDiaChi = async () => {
      var diachiKH ={
        HoTenKH:hotenKH,
        DiaChi:diachi,
        DienThoaiMuaHang:dienthoai
      }
      try {
        const jsonValue = JSON.stringify(diachiKH);
        await AsyncStorage.setItem('my-key-diachi', jsonValue);
      } catch (e) {
        // saving error
      }
      };
      const getDiaChi = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('my-key-diachi');
          return jsonValue != null ? (setDiaChi(JSON.parse(jsonValue).DiaChi),setDienThoai(JSON.parse(jsonValue).DienThoaiMuaHang),sethotenKH(JSON.parse(jsonValue).HoTenKH)) : null;
        } catch (e) {
          // error reading value
        }
      }
const ToKen = 'null'
const infoAdd ='abita';
const DienThoaiMuaHang ='';
const hotenKHAdd ='';
const MaUid ="";
const MaTinh =""
  useEffect(()=>{
    getData(),
    getDataMuaNgay()
    getDiaChi()
  },[])
  useEffect(()=>{
    dataCart.length>0? fech():null
  },[dataCart])

  const fech =()=>{
    let matinhT = loai==2?matinh:dataCart[0].MATINH
    fetch(abita_amin+'ToKen_Amin.php?MaTinh='+matinhT)
  .then((response) => response.json())
  .then((json) => {setDaTaToKenAmin(json)})
  .catch((error) => console.error(error))
} 

const delelItemToCart = () =>{

  const infohobby = {
    HoTenKH:hotenKH,
    DiaChi:diachi,
    DienThoaiMuaHang:dienthoai
  };
};

const addTen_DiaChi = () =>{
  const infohobby = {
    HoTenKH:hotenKH,
    DiaChi:diachi,
    DienThoaiMuaHang:dienthoai
  };
};
  dieukhien=()=>setModalVisibleTB(false);
  dieukhienDH=()=>{loai==1?storeData():null,storeDiaChi(),storeData(), setModalVisibleDH(false),sendMultiNotification()};
  dieukhienDHL=()=>{setModalVisibleDHL(false)};
  const time_hientai =  Math.round(new Date().getTime()/1000)
  const onPressXa=(item) =>{setTenXa(item.TENXA),
                            setModalXaPhuong(false),
                            setModalThon(true)
                            };
  const onPressHuyen=(item) =>{ setmahuyen(item.MAHUYEN),
                                setTenQuanHuyen(item.TENHUYEN),
                                setModalQuanHuyen(false),
                                setModalXaPhuong(true)
                              };
  const onPressTinh=(item) =>{setModalQuanHuyen(true),
                              setModalTinh(false),
                              setTinhMua(item.MATINH),
                              setTenTinh(item.TENTINH)
                              };
  const onPressThon =()=>{setDiaChi(sonha+', '+tenxa+', ' +tenquanhuyen+', '+tentinh),setModalThon(false)}

  const date = ("0"+new Date().getDate()).slice(-2); //Current Date
  const month = ("0"+(new Date().getMonth() + 1)).slice(-2); //Current Month
  const year = new Date().getFullYear(); //Current Year
  const hours = new Date().getHours(); //Current Hours
  const min = new Date().getMinutes(); //Current Minutes
  
  const modoQuayLai = () => {
          setModalLoi(false);
        };

        var newdataToKen =[];
          for (var i = 0; i < dataCart.length; i++) {
            if (newdataToKen.indexOf(dataCart[i].TOKEN) === -1) {
              newdataToKen.push(dataCart[i].TOKEN)
            }
          }
        
        const dataToKen = 
          [...newdataToKen, ...dataToKenAmin,ToKen]
        useEffect(()=>{
          var thoigian = new Date().getTime();
          var random = Math.random().toString(36).substr(2,3).toUpperCase();
          setMaDonHang(thoigian-1647968864364 + random)
        },[]) 
    
          const thoigian = Math.round(new Date().getTime()/1000)
         
          
        
  var newDataCart = [];
 
  if(loai==1){ 
    for (var i = 0; i < dataCart.length; i++){
      if(dataCart[i].SOLUONGTON>0){
       
      newDataCart.push({
            IdDonHang:maDonHang+i,
            SoDonHang:"DH"+maDonHang,
            IdChiTietSp: dataCart[i].IDCHITIETSP,
            IdSanPham:dataCart[i].IDSANPHAM,
            GiaBanSPDH: dataCart[i].NGAY_KETTHUC>time_hientai&dataCart[i].NGAY_KHUYENMAI<time_hientai&dataCart[i].GIAKHUYENMAI>0?JSON.parse(dataCart[i].HINHTHUC_KHUYENMAI).loai_km==1?dataCart[i].GIABANSP-dataCart[i].GIABANSP*dataCart[i].GIAKHUYENMAI/100:dataCart[i].GIABANSP:dataCart[i].GIABANSP,
            KhuyenMai:dataCart[i].NGAY_KETTHUC>time_hientai&dataCart[i].NGAY_KHUYENMAI<time_hientai&dataCart[i].GIAKHUYENMAI>0?
                      JSON.stringify({loai_km:JSON.parse(dataCart[i].HINHTHUC_KHUYENMAI).loai_km,
                                      soluong_mua:dataCart[i].soluong,
                                      soluong_tang:dataCart[i].SOLUONG_KHUYENMAI,
                                      GiaKhuyenMai:dataCart[i].GIAKHUYENMAI,
                                      GiaBanSP:dataCart[i].GIABANSP,
                                      Ngay_KhuyenMai:dataCart[i].NGAY_KHUYENMAI,
                                      Ngay_KetThuc:dataCart[i].NGAY_KETTHUC,
                                    }):0,
            SoLuongDH: dataCart[i].soluong,
            GhiChuKH:ghichu,
            HoTenKH:hotenKH, 
            SoDienThoaiKH:dienthoai,
            SoDienThoaiTKKH:infoAdd,
            DiaChiKH:diachi,
            MaTinh:MaTinh,
            NgayDatHang:thoigian,
            ThanhToan:false,
            TinhTrangDonHang:'donmoi',
            TaiKhoanXacNhan:JSON.stringify([{NhaCungCap:dataCart[i].MAUIDNCC,NgayDatHang:date+'/'+month+'/'+year+' '+hours+':'+min}]),
            TaiKhoanGiaoHang:false,
            DienThoaiNCC:dataCart[i].DIENTHOAINCC,
            XacNhanNCC:false,
            DinhVi:location=="granted"&&ViTri!==''?ViTri.coords.latitude+','+ViTri.coords.longitude:"",
            GioiThieuSP:123,
            ToKen:ToKen,
            SoLuongTon:dataCart[i].SOLUONGTON-dataCart[i].soluong,
            MaUid:MaUid,
            MaUidNCC:dataCart[i].MAUIDNCC,
            P:Number(dataCart[i].ABINCC)*1+Number(dataCart[i].P),
            CK:Number(dataCart[i].CK)+Number(dataCart[i].CHIETKHAUNCC)+Number(dataCart[i].CKSP),
            KhauTruP:i==0?Abi:0,
            QuaTangDH:dataCart[i].QUATANG?JSON.parse(dataCart[i].QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(dataCart[i].QUATANG)[0].thoigian_ketthuc>time_hientai&JSON.parse(dataCart[i].QUATANG)[0].soluongmua<dataCart[i].soluong+1?dataCart[i].QUATANG:"":"",
            TraGopDH:dataCart[i].TRAGOP,
            KiemTra:MD5.home,
            GhiChu:JSON.stringify({Abi_NCC:dataCart[i].P,Abi_Abita:dataCart[i].ABINCC,CK_Abita:dataCart[i].CK,CK_NCC:dataCart[i].CHIETKHAUNCC,CKSP:dataCart[i].CKSP})
          }
        )
        }
      };
    } else if(loai==2){
      if(dataMN.SOLUONGTON>0){
        const diemP1=Number(dataMN.P)
        const diemP1KM=Number(dataMN.ABINCCKM)
        const diemP = dataMN.NGAY_KETTHUC>time_hientai&dataMN.NGAY_KHUYENMAI<time_hientai&dataMN.GIAKHUYENMAI>0?diemP1KM:diemP1
      newDataCart.push({
        IdDonHang:maDonHang+1,
        SoDonHang:"DH"+maDonHang,
        IdChiTietSp: dataMN.IDCHITIETSP,
        IdSanPham:dataMN.IDSANPHAM,
        GiaBanSPDH: dataMN.NGAY_KETTHUC>time_hientai&dataMN.NGAY_KHUYENMAI<time_hientai&dataMN.GIAKHUYENMAI>0?JSON.parse(dataMN.HINHTHUC_KHUYENMAI).loai_km==1?dataMN.GIABANSP-dataMN.GIABANSP*dataMN.GIAKHUYENMAI/100:dataMN.GIABANSP:dataMN.GIABANSP,
        KhuyenMai:dataMN.NGAY_KETTHUC>time_hientai&dataMN.NGAY_KHUYENMAI<time_hientai&dataMN.GIAKHUYENMAI>0?
                  JSON.stringify({loai_km:JSON.parse(dataMN.HINHTHUC_KHUYENMAI).loai_km,
                                  soluong_mua:dataMN.soluong,
                                  soluong_tang:dataMN.SOLUONG_KHUYENMAI,
                                  GiaKhuyenMai:dataMN.GIAKHUYENMAI,
                                  GiaBanSP:dataMN.GIABANSP,
                                  Ngay_KhuyenMai:dataMN.NGAY_KHUYENMAI,
                                  Ngay_KetThuc:dataMN.NGAY_KETTHUC
                                }):0,
        SoLuongDH:soluong,
        GhiChuKH:ghichu,
        HoTenKH:hotenKH,
        SoDienThoaiKH:dienthoai,
        SoDienThoaiTKKH:infoAdd,
        DiaChiKH:diachi,
        MaTinh:MaTinh,
        NgayDatHang:thoigian,
        ThanhToan:false,
        TinhTrangDonHang:'donmoi',
        TaiKhoanXacNhan:JSON.stringify([{NhaCungCap:dataMN.DIENTHOAINCC,NgayDatHang:date+'/'+month+'/'+year+' '+hours+':'+min}]),
        TaiKhoanGiaoHang:false,
        DienThoaiNCC:dataMN.MAUIDNCC,
        XacNhanNCC:false,
        DinhVi:location=="granted"&&ViTri!==''?ViTri.coords.latitude+','+ViTri.coords.longitude:"",
        GioiThieuSP:123,
        ToKen:ToKen,
        SoLuongTon:dataMN.SOLUONGTON-soluong,
        MaUid:MaUid,
        MaUidNCC:dataMN.MAUIDNCC,
        P:diemP*1+dataMN.ABINCC*1,
        CK:Number(dataMN.CK)+Number(dataMN.CHIETKHAUNCC)+Number(dataMN.CKSP),
        KhauTruP:0,
        QuaTangDH:dataMN.QUATANG?JSON.parse(dataMN.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(dataMN.QUATANG)[0].thoigian_ketthuc>time_hientai&JSON.parse(dataMN.QUATANG)[0].soluongmua<soluong+1?dataMN.QUATANG:"":"",
        TraGopDH:dataMN.TRAGOP,
        KiemTra:MD5.home,
        GhiChu:JSON.stringify({Abi_Abita:diemP,Abi_NCC:dataMN.ABINCC,CK_Abita:dataMN.CK,CK_NCC:dataMN.CHIETKHAUNCC,CKSP:dataMN.CKSP})
    }
  )
  }
    }
   
  
  const sendDatHang =(res)=>{
    
    setModalVisibleDH(res.data.kq),
    setModalVisibleDHL(res.data.kq?false:true)
   }

  const pushaxios = ()=>{
    if(newDataCart.length){
    setscanspal(true);
    var api_fech = abita_dathang+'PostDatHang.php?MaTinh='+MaTinh
    var set_then =(res)=>{sendDatHang(res)}
    var set_catch =()=>{console.log(error), setThongBaoMoDal("Hệ thống quá tải, vui lòng thử lại!"),setModalVisibleTB(true)}
    var set_finally =()=>{setscanspal(false)}
    var data_fech = JSON.stringify(newDataCart)
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }else{setModalVisibleTB(true),setThongBaoMoDal("Sản phẩm đã hết, vui lòng chọn sản phẩm khác")}
  }
const fetchDatHang = ()=>{
   
  if(dienthoai.length!==10){
    setModalVisibleTB(true),setThongBaoMoDal("Vui long kiểm tra lại thông tin số điện thoại!")
    }else if(hotenKH=="Nhập thông tin họ và tên"||!hotenKH){
      setModalVisibleTB(true),setThongBaoMoDal("Vui lòng kiểm tra lại họ và tên!")
    }else if(diachi=="Nhập địa chỉ giao hàng"||!diachi){
      setModalVisibleTB(true),setThongBaoMoDal("Vui lòng nhập rõ địa chỉ giao hàng!")
    }else{
      
      pushaxios();
      }
    };
  
    const sendMultiNotification = async () => {
      let notificationData = {
                token:dataToKen,
                data:
                    {
                      Mapush:'donhang',
                      body: 'Đơn hàng mới',
                      MaDonHang:'DH'+maDonHang,
                      NoiDung:'DH'+maDonHang,
                      DienThoai:infoAdd,
                      Ngay:Math.floor(time_hientai),
                    },
                priority: "high",
                contentAvailable:true
            };
        await NotificationService.sendMultiDeviceNotification(notificationData);
    };

    const ModalDangNhap =()=>{
      return(
        <View  style={{height:'100%',width:'100%',alignItems:'center',backgroundColor:'rgba(0,0,0,0.7)',position:'absolute'}}>
       
        <View
          style={{borderWidth:0.5, borderRadius:8,borderColor:'#9ACD32', backgroundColor:'#B0E0E6',marginHorizontal:30,marginTop:60}}
        >
        <Text style={{margin:10,fontSize:15,color:'#191970'}}>
        Để được nhận chương trình, lợi ích ... đến từ Abita, mời các bạn click vào đăng nhập bên dưới.
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:15}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('DangNhapNumberPhone',{loai:'3',components:'DatHang'}),setDongDangNhap(false)}}
          style={{flex:1,alignItems:'center'}}>
              <Text style={{marginHorizontal:5,marginVertical:10, color:'#008080'}}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>setDongDangNhap(false)}
          style={{flex:1,alignItems:'center'}}>
          <Text style={{marginHorizontal:5,marginVertical:10,color:'red'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </View>
       </View>
      )
    }
return(
  <View style={{flex:1}}>
	<KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}
     style={{flex:1}}>
    <AnhNen api={'../icon/nenhome.jpg'}
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.7)'}/>
    <SafeAreaView style={{flex:1}}>
    {/* <HeaderG navigation={()=>navigation.goBack()} tenTK={'👤 '+ infoAdd} /> */}
  <View style={{marginHorizontal:mobi=="mobi"?2:Heigth_Width.width_tong*0.2, backgroundColor:'#FFF', borderRadius:5,flex:1}}>
  
	  <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal:20, marginTop:20, backgroundColor:'#FFF'}}
          bounces={false}
          contentContainerStyle={{flexGrow:1}}
          keyboardShouldPersistTaps='handled'
      >
	    <View style={styles1.viewTextInput}>
        <Text style={styles1.text}>
        <SimpleLineIcons name="phone" size={15} color="blue" /> Điện thoại
        </Text>
        <TextInput style ={styles1.textInput}
         
          placeholder = {dienthoai==''?'Nhập số điện thoại':dienthoai}
          placeholderTextColor={'#909090'}
          keyboardType = 'number-pad'
          onChangeText={text => setDienThoai(text)}
        />
      </View>
      <View style={styles1.viewTextInput}>
        <Text style={styles1.text}>
          <Icon name="user-alt" size={15} color="#FF69B4" style={{margin:10}} /> Họ và tên
        </Text>
        <TextInput style ={styles1.textInput}
          placeholder = {hotenKH==''?'Nhập họ và tên':hotenKH}
          placeholderTextColor={'#909090'}   
          returnKeyType ='done'     
          onChangeText={text => sethotenKH(text)}
        />
      </View>
     <View>
      <View style={[styles1.viewTextInput,{marginTop:12}]}>
      <TouchableOpacity onPress={()=>{setModalTinh(true)}}>
      <Text style={{marginHorizontal:10,marginTop:15, color:'#1E90FF'}}>{diachi}</Text>
      </TouchableOpacity>
        
        
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} >
          <TouchableOpacity style={{flex:1,marginLeft:10, height:40,flexDirection:'row',alignItems:'center'}} onPress={()=>{setModalTinh(true)}}>
          <SimpleLineIcons name="check" size={20} color="blue" style={{margin:10}} />
          {diachi==''?<Text>Địa chỉ giao hàng</Text>:
            <Text>Chọn địa chỉ khác</Text>
            }
            </TouchableOpacity>
    
            </View>
        </View>
        <Text style={{left:10,backgroundColor:'#FFF',position:'absolute'}}>
            <Icon name="map-marked-alt" size={18} color="#EEE8AA" style={{margin:10}} /> Giao đến địa chỉ
          </Text>
      </View>
      
      
      <View style={[styles1.viewTextInput,]}>
        <View style={{height:10}}>
          <Text style={styles1.textGhiChu}>
              <SimpleLineIcons name="pencil" size={15} color="#000000" style={{margin:10}} />  Ghi chú đơn hàng
            </Text>
        </View>
        <TextInput style ={styles1.textInputGhiChu}  
            placeholder = 'Ghi chú'
            placeholderTextColor={'#909090'}
            returnKeyType ='done'
            scrollEnabled = {false} 
            onChangeText={text => setGhiChu(text)}
            multiline={true}
        />
      </View>

      <TouchableOpacity onPress={fetchDatHang}
            style={{marginHorizontal:30,
                    alignItems:'center',
                    backgroundColor:'red'
                    }}>
           
              <View
                style={{alignItems:'center',width:'100%'}}
              >
                <Text style={{fontWeight:'600', color:'#FFF', margin:10}}>MUA HÀNG</Text>
              </View>
        </TouchableOpacity>
    </ScrollView>
   
	   
          
	   
      <View style={{height:30}}/>
    {scanspal?
      <View style={{position:'absolute',width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
       <Activity/>
      </View>
      :null
      }
   
    <ModalThongBaoDH
        ten={'ĐẶT HÀNG THÀNH CÔNG'} 
        thongbao ={'Chúng tôi cảm ơn sự tin tưởng của quý vị đến với chúng tôi, chúng tôi sẽ hết lòng phục vụ quý vị !'}
        modalVisible={modalVisibleDH}
        dieukhien={dieukhienDH}
        hanhdong={'Đóng'}
        />
     <ModalThongBao
        ten={'ĐẶT HÀNG KHÔNG THÀNH CÔNG'} 
        thongbao ={'Mong quý vị hãy thử lại'}
        modalVisible={modalVisibleDHL}
        dieukhien={dieukhienDHL}
        hanhdong={'Đóng'}
        />
        <ModalThongBao
        ten={'ĐẶT HÀNG KHÔNG THÀNH CÔNG'} 
        thongbao ={'Các bạn xem lại hệ thống mạng wifi'}
        modalVisible={modalLoi}
        dieukhien={modoQuayLai}
        hanhdong={'Đóng'}
        />
   
    
    <Modal animationType="fade"
        transparent={true}
        visible={modalQuanHuyen}
    >
      <MoDalHuyen matinh={tinhmua} onPress={onPressHuyen}/>
    </Modal>

    <Modal animationType="fade"
        transparent={true}
        visible={modalXaPhuong}
    >
      <MoDalXa MaHuyen={mahuyen} onPress={onPressXa}/>
    </Modal>


    <Modal animationType="fade"
        transparent={true}
        visible={modalThon}
    >  
       <ModalThon  setSonha={setSonha} onPressThon={onPressThon} sonha={sonha}/>
    </Modal>
   
    
    <Modal animationType="fade"
        transparent={true}
        visible={modalTinh}
    >
      <MoDalTinh onPress={onPressTinh} close={setModalTinh}/>
    </Modal>

    <ModalThongBao
        thongbao ={thongbaoMoDal}
        modalVisible={modalVisibleTB}
        dieukhien={dieukhien}
        hanhdong={'Đóng'}
        ten={'THÔNG BÁO'}
      />
   
      </View>
     
    </SafeAreaView>
   </KeyboardAvoidingView>
   </View>
  );
}
const h=45;
const styles1= StyleSheet.create({

  scrollView:{
    marginTop:20,
    marginHorizontal:20
    
  },

  viewTextInput:{
    borderWidth:0.5,
    borderRadius:5,
    marginVertical:8,
    borderColor:'#006400'
  },
  textInput:{
    height:h,
    marginHorizontal:10
  },
  text:{
    position: 'absolute',
    bottom:h-7,
    left: 10,
    backgroundColor: '#FFFFFF',
    color:'#006400',
    marginHorizontal:5
  },
  dangky:{
    backgroundColor:'#0E6B3D',
    height:h-15,
    width:100,
    marginVertical:10,
    justifyContent: 'center',
    borderRadius:5,
    alignItems: 'center'
  },
  textInputGhiChu:{
    maxHeight:120,
    minHeight:65,
    marginHorizontal:10
  },
  textGhiChu:{
    position: 'absolute',
    bottom:1,
    left: 15,
    color:'#006400',
    height:h-25,
    backgroundColor: '#FFFFFF'
  },
  viewTinhThanh:{
    height:29,
    flex:1,
    flexDirection: 'row',
    flexDirection: 'row',
    alignItems:'center',
    marginLeft:0}
  
 
})