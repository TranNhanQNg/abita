import React, {Component,useState,useEffect} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TextInput,TouchableOpacity,Alert,useWindowDimensions, ActivityIndicator} from 'react-native';
import HeaderG from '../header/headerG';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import { useSelector,useDispatch} from 'react-redux';
import { ADD_DANGNHAP} from '../../redux/cartAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ModalThongBao} from '../dungchung/modalThongBao';
import {Activity} from '../dungchung/activityIndicator';
import {AnhNen} from '../dungchung/anhnen';



const {abita_amin}=diachiDaTa;

export default DangNhapAmin =({navigation})=>{
  const w = useWindowDimensions().width;
  const h = useWindowDimensions().height;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const TenTinh = useSelector(state => state.cart.TenTinh);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const Khoa = useSelector(state => state.cart.Khoa);
  const Wifi = useSelector(state => state.cart.Wifi);
  const [use, setUse] = useState("");
  const [password, setPassword] = useState("");
  const [thongbaoMoDal, setThongBaoMoDal] = useState(false);
  const [activity,setActivity]= useState(false);
  const [modalVisibleTB, setModalVisibleTB] = useState(false);
  
  const dieukhien=()=> setModalVisibleTB(false);

  const fetchDangNhap = ()=>{
    if(Wifi){
    setActivity(true),
      fetch(abita_amin+'DangNhap.php?&MaTinh='+MaTinh, {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
                  TaiKhoan:use,
                  PassWord: password,
                  DienThoai:SoDienThoai,
                })
                })
      .then((response) => response.json())
      .then((json) =>{ 
          if(json.kq =='true'){addDangNhap(json),setActivity(false)}

          else if(json.kq =='PW'){
            setThongBaoMoDal('Vui lòng kiểm tra lại mật khẩu'),
            setModalVisibleTB(true)
          }
          else if(json.kq =='TK'){
            setThongBaoMoDal('Vui lòng kiểm tra lại tên đăng nhập'),
            setModalVisibleTB(true)
           }else if(json.kq =='DT'){
            setThongBaoMoDal('Tài khoản này được đăng ký trên số điện thoại khác. Quý vị vui lòng đăng nhập đúng số điện thoại trước khi đăng nhập'),
            setModalVisibleTB(true)
           }else if(json.kq =='K'){
            setThongBaoMoDal('Tài khoản này đã bị khoá, vui lòng liên hệ với chúng tôi'),
            setModalVisibleTB(true)
            }
    })
      .catch((error) => {setModalVisibleTB(true),
                          setThongBaoMoDal('Vui lòng thử lại')})
      .finally(() => setActivity(false));

    }else{setModalVisibleTB(true),
      setThongBaoMoDal('Vui lòng kiểm tra lại kết nối')}
  };
    

  const dispatch = useDispatch()
  const addDangNhap = (json) =>{
    const infohobby = {
      TaiKhoan:use,
      PassWord:password,
      TenTaiKhoan:json.ht,
      Khoa:json.kq,
      Amin:json.amin
    };
    const actioninfo = ADD_DANGNHAP(infohobby);
    dispatch(actioninfo);
  };

  return (
    <View style={{flex:1}}>
       <AnhNen api={'../icon/nenhome.jpg'}
          backgroundColor={'#20B2AA'}
          backgroundColor1={'rgba(0,175,175,0.8)'}/>
    <SafeAreaView style ={{flex:1}}>
      <HeaderG navigation={()=>navigation.goBack()}/>
      <View style={{height:1,backgroundColor:'#FFF'}}/>
      <View style={{marginTop:30,marginRight:w*0.05,marginLeft:w*0.05,alignItems:'center'}}>
        <View style={{borderRadius:50,alignItems:'center', backgroundColor:'#DCDCDC'}}>
          <Icon name="account" size={100} color="#32CD32" />
        </View>
        <View style={{borderWidth:0.5,
                      borderRadius:5,
                      borderColor:'#FFF',
                      width:w*0.7,
                      marginTop:10,
                      flexDirection:'row',
                      backgroundColor:'rgba(255,255,255,0.6)'
                      }}>
          <SimpleLineIcons name="user" size={15} color="blue" style={{margin:10}} />
          <TextInput style ={{height:40,marginHorizontal:10, flex:1}}
              autoFocus = {true}
              placeholder = {'Tên đăng nhập'}
              returnKeyType ='done'
              autoCapitalize='none'
              onChangeText={text => setUse(text)}
          />
        </View>
        <View style={{borderWidth:0.5,
                      borderRadius:5,
                      borderColor:'#FFF',
                      width:w*0.7,
                      marginTop:10,
                      flexDirection:'row',
                      backgroundColor:'rgba(255,255,255,0.6)'
                      }}>
          <Icon name="key" size={15} color="#DAA520" style={{margin:10}} />
            <TextInput style ={{height:40,marginHorizontal:10,flex:1}}
              placeholder = {'Mật khẩu'}
              returnKeyType ='done'
              autoCapitalize='none'
              secureTextEntry={true}     
              onChangeText={text => setPassword(text)}
            />
            
        </View>
        </View>
       
        <View>
        <View style={{alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      }}>
          <TouchableOpacity onPress={fetchDangNhap}>
            <View style={{backgroundColor:'#0E6B3D',
                          height:30,
                          width:w*0.3,
                          marginTop:h*0.02,
                          justifyContent: 'center',
                          borderRadius:5
                          }}> 
              <Text style={{textAlign:'center',color:'#FFFFFF'}}>
                Đăng nhập
              </Text>
            </View>
          </TouchableOpacity>
        </View>
     
     
      <TouchableOpacity 
              onPress={()=>navigation.navigate("DangKy")}
              style={{marginHorizontal:10, marginTop:20}}>
     
        <Text style={{color:'#FFF',textDecorationLine:'underline'}}>  <SimpleLineIcons name="user-follow" size={15} color="#FFF" />  Đăng ký tài khoản</Text>
      </TouchableOpacity>
      </View>
      <ModalThongBao
        thongbao ={thongbaoMoDal}
        modalVisible={modalVisibleTB}
        dieukhien={dieukhien}
        hanhdong={'Đóng'}
        ten={'THÔNG BÁO'}
      />
      {activity?
      <View style={{position:'absolute',height:'100%',width:'100%',alignItems:'center',top:'15%'}}> 
        <Activity/>
      </View>:null
      }
    </SafeAreaView>
    
    </View>
  )
};
