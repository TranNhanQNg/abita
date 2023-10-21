import React, {useState,useEffect} from 'react';
import { Text, View, TouchableOpacity,ActivityIndicator, Platform,PermissionsAndroid,Linking,AppState} from 'react-native';

import { useSelector,useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ADD_DINHVI,ADD_INFO,ADD_DIACHI} from '../../redux/cartAction';
import Geolocation from 'react-native-geolocation-service';
import {ModalThongBao2Chon} from './modalThongBao';
import Geocoder from 'react-native-geocoding'


export default DinhVi_DatHang =({ten,mau1,mau2,size, icon,onpress,location, setLocation})=>{
    const ThoiGian = useSelector(state => state.cart.ThoiGian);
    const [modalVisible,setModalVisible] =useState(false);
    const [thongbao,setThongBao]=useState(null);
   
    const [acti,setActi]=useState(false);

useEffect(() => {
  location=='granted'?vitri():null
},[location])

const allDiaChi = (addressComponent) =>{
  const infohobby = {
    DiaChi:addressComponent,
    ThoiGian:time_hientai
  };
  const actioninfo = ADD_DIACHI(infohobby);
  dispatch(actioninfo);
};

const time_hientai = new Date().getTime()


const laydiachi =(position)=>{
  Geocoder.init("AIzaSyBgM2jLSvy9lp97fgsmrusv0WOdb68CHeg");
  Geocoder.from(15.1206994,108.8027754)
.then(json => {
        var addressComponent = json.results[0].formatted_address;
        allDiaChi(addressComponent)
})
.catch(error => console.warn(error));
}

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
      setActi(false)
      // if(time_hientai>ThoiGian+10*60*1000||!ThoiGian){
      //   laydiachi(position)
      // }
      addDinhVi(position)
    },
    (error) => {
      console.log('lỗi')
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
          setLocation(granted)
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
          setLocation(granted)
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

        {location=='granted'?
        <TouchableOpacity onPress={()=>{ onpress()}}>
             <Text style={{color:mau2}}><Icon name="map-marker-radius" size={size} color={mau1} /></Text>
        </TouchableOpacity>
       
        :
        <TouchableOpacity onPress={()=>{getPermission(),setActi(true),onpress()}}
        style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:mau2}}><Icon name={icon} size={size} color={mau2} />Bật định vị</Text>
        </TouchableOpacity> 
        }
   
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