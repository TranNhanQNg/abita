import React, {useState,useEffect, useRef} from 'react';
import { Text, View,Alert, TouchableOpacity,ActivityIndicator, Platform,PermissionsAndroid,Linking,AppState} from 'react-native';

import { useSelector,useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ADD_DINHVI} from '../../redux/cartAction';
import Geolocation from 'react-native-geolocation-service';
import {ModalThongBao2Chon} from './modalThongBao'


export default DinhVi =({ten,mau1,mau2,size, icon,onpress})=>{
    const DinhVi = useSelector(state => state.cart.DinhVi);
    const [modalVisible,setModalVisible] =useState(false);
    const [thongbao,setThongBao]=useState(null);
    const [location, setLocation] = useState(null);
    const [acti,setActi]=useState(false);
    const [time, setTime] = useState(0);
   
    
    useEffect(() => {
      getPermission()
      
    }, []); 

    const dieukhien1 =()=>setModalVisible(false);
    const dieukhien2 =()=>{Linking.openURL ('app-settings:'),setModalVisible(false)};

    
   
     

    const dispatch = useDispatch()
    const addDinhVi = (position) =>{
      const dinhvihobby = {
       
        DinhVi:position
      };
      const actiondinhvi = ADD_DINHVI(dinhvihobby);
      dispatch(actiondinhvi);
  };


const vitri =()=>{
  Geolocation.getCurrentPosition(
    (position) => {
      setActi(false),
      (DinhVi!==position)?
      onpress(position)&addDinhVi(position):null
    },
    (error) => {
      const position="";
      (DinhVi&&!error)?null:
      addDinhVi(position);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
  );
};

const getPermission = async () => {
  if (Platform.OS === 'android') {
    
      try {
        const granted = await  PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log(granted)
          vitri()
          setActi(false)
         
          
        } else {
          console.log('granted')
          setActi(false)
        }
      } catch (err) {
        console.warn(err);
      
    };
   
  } else {
    try {
      const granted = await Geolocation.requestAuthorization('whenInUse')   
      switch(granted) {
        
        case 'granted':
          console.log(granted)
          vitri()
          setActi(false)
          
          break;
        case 'disabled'://bạn vui lòng bật định vị
          console.log(granted)
          setModalVisible(true)
          setThongBao('Bạn vui lòng bật định vị')
          setActi(false)
          break;
        case 'denied':// bạn vui lòng cấp quyền định vị
          console.log(granted)
          setModalVisible(true)
          setThongBao('Bạn vui lòng cấp quyền định vị')
          setActi(false)
          break;
          default:
            setActi(false)
          break; 
      }
      
      }
      catch (err) {
        console.warn(err);
      
    };
      }

};



  return(
      <View>
    {acti?<ActivityIndicator color="#0000ff"/>:
    <View>
        <TouchableOpacity onPress={()=>{getPermission(),setActi(true)}}
        style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:mau2}}><Icon name={icon} size={size} color={mau2} /> {ten}</Text>
        </TouchableOpacity> 
    </View>
    }
    <ModalThongBao2Chon modalVisible={modalVisible}
    dieukhien1={dieukhien1}
    dieukhien2={dieukhien2}
    ten={'Xin Chào'}
    thongbao={thongbao}
    hanhdong1={'Bỏ qua'}
    hanhdong2={'Thực hiện'}
    />
    </View>
  );
};