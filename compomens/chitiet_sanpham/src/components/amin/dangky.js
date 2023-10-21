import React, {Component,useState,useEffect} from 'react';
import { Text, View,StyleSheet,TextInput,SafeAreaView,TouchableOpacity,Modal,Alert,ActivityIndicator,ScrollView,Linking,KeyboardAvoidingView} from 'react-native';
import HeaderG from '../header/headerG';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import { useSelector,useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import TinhThanhHome from '../home/tinhthanhHome';
import {ModalThongBao} from '../dungchung/modalThongBao';
import { ADD_DANGNHAP} from '../../redux/cartAction';
import Geolocation from 'react-native-geolocation-service';
import {MoDalHuyen,MoDalXa} from '../cart/modal';
import {Activity} from '../dungchung/activityIndicator';
const {abita_amin}=diachiDaTa;



export default DangKy =({navigation})=>{
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const TenTinh = useSelector(state => state.cart.TenTinh);
  const Wifi = useSelector(state => state.cart.Wifi);
  const dienthoai = useSelector(state => state.cart.SoDienThoai);
  const [taikhoan, setTaiKhoan] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [hoten, setHoTen] = useState("");
  const [diachi, setDiachi] = useState("");
  const [tencuahang, setTenCuaHang] = useState("");
  const [modalVisible,setModalVisible] =useState(false);
  const [modalVisible1,setModalVisible1] =useState(false);
  const [activity,setActivity]= useState(false);
  const [thongbao, setThongBao] = useState();
  const [location, setLocation] = useState(null);
  const [acti,setActi]=useState(false)
  const [maxa,setMaXa]=useState(null);
  const [tenxa,setTenXa]=useState('');
  const [mahuyen,setmahuyen]=useState('');
  const [tenQuanHuyen,setTenQuanHuyen]=useState('');
  const [modalQuanHuyen,setModalQuanHuyen]=useState('');
  const [modalXaPhuong,setModalXaPhuong]=useState('');

  const dieukhien=()=>{setModalVisible(false)}
  const dieukhienDK=()=>{addDangNhap(),setModalVisible1(false), navigation.goBack()};

  const onPressHuyen=(item) =>{ setmahuyen(item.MAHUYEN),
    setTenQuanHuyen(item.TENHUYEN),
    setModalQuanHuyen(false),
    setModalXaPhuong(true)
  };
  const onPressXa=(item) =>{setTenXa(item.TENXA),
    setMaXa(item.MAXA),
    setModalXaPhuong(false)
    };
  const dataPush ={ TenCuaHang:tencuahang,
                    TaiKhoan:taikhoan,
                    DienThoai:dienthoai,
                    PassWord:password1,
                    HoVaTen:hoten,
                    DiaChi:diachi,
                    Quyen:'NCC',
                    MaXa:maxa,
                    DinhVi:location,
                    Khoa:'true'
                  };
  const dispatch = useDispatch()
    const addDangNhap = () =>{
      const infohobby = {
        TaiKhoan:taikhoan,
        PassWord:password1,
        TenTaiKhoan:hoten,
      };
      const actioninfo = ADD_DANGNHAP(infohobby);
      dispatch(actioninfo);
  };
  
  const vitri =()=>{
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setActi(false)
      },
      (error) => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
        setActi(false)
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const latitude = "15.1022503 ";
const longitude = "108.7959422";
const label = "Tỉnh Quảng Ngãi, Việt Nam";

const url = Platform.select({
  ios: "maps:" + latitude + "," + longitude,
  android: "geo:" + latitude + "," + longitude + "?q=" + label
});

const aaaaa =()=> Linking.canOpenURL(url).then(supported => {
  if (supported) {
    return Linking.openURL(
      Platform.select({
        ios: "maps:" + location.coords.latitude + "," + location.coords.longitude +'zoom=21',
        android: "geo:" + location.coords.latitude + "," + location.coords.longitude + "?z=18"
      })
    );
  } else {
    const browser_url =
      "https://www.google.de/maps/@" +
      latitude +
      "," +
      longitude +
      "?q=" +
      label;
    return Linking.openURL(browser_url);
  }
});



const fetchDangKy =()=>{
      if(tencuahang.length<2){ 
          setModalVisible(true),
          setThongBao("Bạn chưa nhập tên cửa hàng!")
      }
      else if(taikhoan.length<1){
          setModalVisible(true),
          setThongBao("Bạn chưa nhập tài khoản email!")
      }else if(taikhoan.indexOf('@')===-1){
          setModalVisible(true),
          setThongBao("Bạn xem lại địa chỉ email!")
      }
      else if(password1.length<6){
        setModalVisible(true),
        setThongBao("Mật khẩu phải 6 ký tự trở lên")
      } else if(password1!==password2){
        setModalVisible(true),
        setThongBao("Vui lòng kiểm tra lại mật khẩu")
      } 
      else if(hoten.length <4){
        setModalVisible(true),
        setThongBao("Vui lòng kiểm tra lại họ tên")
      } else if(maxa==null){
        setModalVisible(true),
        setThongBao("Vui lòng chọn quận/huyện/thành phố")
      }
      else if(location==null){
        setModalVisible(true),
        setThongBao("Vui lòng định vị cửa hàng")
      }
      else if(diachi.length<3){
        setModalVisible(true),
        setThongBao("Vui lòng kiểm tra lại địa chỉ")
      }  else {
        kiemtradangky();         
          }
    };
  const kiemtradangky =()=>{
    if(Wifi){
      setActivity(true)
          fetch(abita_amin+'KiemTraDangKy.php?MaTinh='+MaTinh, {
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
            .then((json) =>{ 
                if(json.kq =='true'){
                  pushDangKy()
                }else if(json.kq =='dienthoai'){
                  setModalVisible(true),
                  setThongBao("Số điện thoại"+" " + dienthoai +" đã được đăng ký")
                }else if(json.kq =='taikhoan'){
                  setModalVisible(true),
                  setThongBao("Email này đã được đăng ký")
                  }
            })
            .finally(() => setActivity(false));
          }
        }
    const pushDangKy =()=>{
      fetch(abita_amin+'DangKy.php?MaTinh='+MaTinh, {
        method:'POST',
        headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
            },
                body:JSON.stringify(dataPush)
            })
                .then((response) => response.json())
                .then((json) =>{
                  if(json.kq==true){
                    setModalVisible1(true),
                    setThongBao("Đăng ký thành công")
                  }else{
                    setModalVisible(true),
                    setThongBao("Bạn vui lòng kiểm tra kết nối")
                  }
                })
                .catch((error) => {
                  console.error(error);
                })
      };

  return (
    <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}
     style={{flex:1}}>
    <SafeAreaView style ={{flex:1, backgroundColor:'#50C7C7',}}>
      <HeaderG navigation={()=>navigation.goBack()} tentinh={TenTinh}/>
      
      
        
        
      <ScrollView bounces = {false}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}>
        <Text style={{marginTop:10, color:'#FFF', marginHorizontal:20}}>
          Thông tin đăng ký tài khoản
        </Text>
        <View style={{height:1,backgroundColor:'#FFF',marginVertical:15}}/>
        <View style={styles.viewTextInput}>
        <View style={styles.viewtext}>
          <Text style={styles.text}>Tên cửa hàng</Text>
          </View>
          <TextInput style ={styles.textInput}
              autoFocus = {true}
              placeholder = {'Đặt tên cửa hàng ngắn ngọn'}
              returnKeyType ='done'
              onChangeText={text => setTenCuaHang(text)}
            />
        </View>
        <View style={styles.viewTextInput}>
        <View style={styles.viewtext}>
          <Text style={styles.text}> 
            <Icon name="account" size={17} color="#FFC0CB" /> Tài khoản Email
          </Text>
          </View>
          <TextInput style ={styles.textInput}
             
              placeholder = {'Tên Email'}
              returnKeyType ='done'
              onChangeText={text => setTaiKhoan(text)}
            />
        </View>
        <View style={styles.viewTextInput}>
        <View style={styles.viewtext}>
            <Text style={styles.text}>
              <Icon name="key" size={15} color="#DAA520" /> Mật khẩu
            </Text>
            </View>
            <TextInput style ={styles.textInput}
                
                placeholder = {'Nhập 6 ký tự trở lên'}
                returnKeyType ='done'
                onChangeText={text => setPassword1(text)}
            />
        </View>
        <View style={styles.viewTextInput}>
        <View style={styles.viewtext}>
          <Text style={styles.text}>
            <Icon name="key" size={15} color="#DAA520" /> Nhập lại mật khẩu
          </Text>
          </View>
          <TextInput style ={styles.textInput}
              placeholder = {'Nhập 6 ký tự trở lên'}
              returnKeyType ='done'
              onChangeText={text => setPassword2(text)}
            />
        </View>
        <View style={styles.viewTextInput}>
            <View style={styles.viewtext}>
                <Text style={styles.text}>Họ và tên</Text>
            </View>
          <TextInput style ={styles.textInput}
            placeholder = {'Họ và tên'}
            returnKeyType ='done'
            onChangeText={text => setHoTen(text)}
          />
        </View>
        <View style={styles.viewTextInput}>
        <TouchableOpacity style={{flex:1,marginLeft:10, height:45}} onPress={()=>{setModalQuanHuyen(true)}}>
          <View style={{height:29, flex:1, flexDirection: 'row',flexDirection: 'row',alignItems:'center',marginLeft:0}} >
           {maxa!==null?<Text>{tenQuanHuyen}, {tenxa}</Text>:<Text>Chọn quận/huyên/thành phố</Text>}
            <SimpleLineIcons name="arrow-down" size={20} color="blue" style={{margin:10}} />
          </View>
        </TouchableOpacity>
        </View>
        <View style={styles.viewTextInput}>
          <TouchableOpacity style={{height:40,flexDirection:'row', alignItems:'center',marginLeft:10}}
          onPress={()=>{vitri(),setActi(true)}}
          >
             <Icon name="google-maps" size={20} color="red" />
           <Text style={{marginHorizontal:5}} >
          
            Cập nhật định vị</Text>
            {location==null?null:<Icon name="check-bold" size={20} color="#DAA520" />}
           {acti?<ActivityIndicator color="#0000ff"/>:null}
          </TouchableOpacity>
        
         <TouchableOpacity onPress={() => aaaaa()}>
            <Text> xem vị trí</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewTextInput}>
          <View style={styles.viewtext}>
              <Text style={styles.text}>Địa chỉ cửa hàng</Text>
          </View>
          <TextInput style ={styles.textInput}
            placeholder = {'Địa chỉ kinh doanh của bạn'}
            returnKeyType ='done'
            onChangeText={text => setDiachi(text)}
          />
        </View>
       
      </ScrollView>
        <View style={{justifyContent: 'center',flexDirection: 'row',}}>
          <TouchableOpacity onPress={()=>fetchDangKy()} style={styles.dangky}>
              <Text style={{textAlign:'center',color:'#FFFFFF'}}> Đăng ký</Text>
          </TouchableOpacity>
        </View>
          <ModalThongBao thongbao={thongbao}
                modalVisible={modalVisible}
                dieukhien={dieukhien}
                hanhdong="Đóng"
                ten={'THONG BAO'} 
          />
          <ModalThongBao thongbao={thongbao}
                modalVisible={modalVisible1}
                dieukhien={dieukhienDK}
                hanhdong="Quay lại"
                ten={'THÔNG BÁO'} 
          />
          <Modal animationType="fade"
        transparent={true}
        visible={modalQuanHuyen}
    >
      <MoDalHuyen matinh={MaTinh} onPress={onPressHuyen}/>
    </Modal>

    <Modal animationType="fade"
        transparent={true}
        visible={modalXaPhuong}
    >
      <MoDalXa MaHuyen={mahuyen} onPress={onPressXa}/>
    </Modal>
    {activity?
      <View style={{position:'absolute',height:'100%',width:'100%',alignItems:'center',top:'15%'}}> 
        <Activity/>
      </View>:null
      }
     
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
};
const h =50;
const styles= StyleSheet.create({

  scrollView:{
    marginTop:8,
    marginHorizontal:20,
    backgroundColor:'rgba(128,128,128,0.3)',
    borderRadius:10
  },

  viewTextInput:{
    borderWidth:0.5,
    borderRadius:5,
    marginVertical:8,
    borderColor:'#D3D3D3',
    marginHorizontal:10
  },
  textInput:{
    height:h,
    marginHorizontal:10,
    marginTop:3
  },
  viewtext:{
    position: 'absolute',
    borderRadius:5,
    bottom: h-7,
    left: 10,
    backgroundColor: '#FFF',
    alignItems:'center',
    height:19
  },
  text:{
    color:'#006400',
    marginHorizontal:10,
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
})