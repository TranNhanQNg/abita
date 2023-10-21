import React, {useState,useEffect,useRef} from 'react';
import {Text, View,SafeAreaView,InteractionManager,Animated,
  TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';
import HeaderG from '../../header/headerG';
import { useSelector,useDispatch} from 'react-redux';
import { ADD_DANGNHAP} from '../../../redux/cartAction';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import fadeIn from '../../dungchung/anima';
import {AnhNen} from '../../dungchung/anhnen';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const iconSize = 20;

export default AminHome =({navigation})=>{
  const {abita_amin}=diachiDaTa;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const taikhoan = useSelector(state => state.cart.TaiKhoan);
  const [dataCXL, setDataCXL] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

const dienthoai = useSelector(state => state.cart.SoDienThoai); 
const Amin = useSelector(state => state.cart.Amin);

useEffect(() => {
  const id = setInterval(() => {setLoading(c=>c+1)},5000);
  return () => clearInterval(id);
}, []); 

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
  //Animated
  const fadeAnim = useRef(new Animated.Value(0.1)).current;
  useFocusEffect(() => {fadeIn(fadeAnim)});

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

  const navigaMennu =(item)=>{
    switch (item.id) {
      case 3:{addDangXuat()}
        break;
        }
      };

  const datamenu=[
    {
      id:1,
      ten:'Thông tin cá nhân',
      icon:'person-outlin',
    },
    {
      id:2,
      ten:'Thay đổi mật khẩu',
      icon:'lock-open-outline',
    },
    {
      id:3,
      ten:'Đăng xuất',
      icon:'log-out-outline',
    }
  ];
  const PhanAmin =()=>{
   
        return(
          <ScrollView style={styles.scrollView}>
            {datamenu.map(item=>
            <TouchableOpacity key={item.id} onPress={()=>navigaMennu(item)}>
              <View style={styles.viewTouc}>
                <View style={styles.view} >
                  <Icon name={item.icon} size={iconSize} color="#0000FF"/>
                  <Text style={styles.text}>{item.ten}</Text>
                </View>
              </View>
             </TouchableOpacity>
            
            )}
           </ScrollView>
        )} 
  return(
        <SafeAreaView style={{backgroundColor:'#FFFFFF', flex:1}}>
           <AnhNen api={'../icon/nenhome.jpg'}
                    backgroundColor={'#20B2AA'}
                    backgroundColor1={'rgba(0,175,175,0.7)'}/>
          <HeaderG navigation={navigation} tenTK={'Tai Khoan: '+taikhoan}/>
          <Animated.View style={{backgroundColor:'#FFFFFF', opacity:fadeAnim,}}>
          {PhanAmin()}
          </Animated.View>
         
        </SafeAreaView>
    );
}

const styles= StyleSheet.create({

  scrollView:{
     marginHorizontal:20, 
  },

  viewTouc:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:10,
    justifyContent:'space-between' 
  },
  
  view:{
    marginLeft:15,
    backgroundColor:'#FFFFFF',
    flexDirection:'row',
    marginLeft:5,
    },
  viewS:{
    height:0.5,
    backgroundColor:"#D3D3D3",
    marginLeft:iconSize+20
  },
  text:{
    marginLeft:10,
    fontFamily: "Cochin",
    fontSize: 16,

  },
 
})
  	
   