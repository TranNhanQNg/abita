import React, {useEffect,useState} from 'react';
import { Text, View, Image,SafeAreaView,FlatList,TouchableOpacity,InteractionManager,ActivityIndicator} from 'react-native';
import { useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import HeaderD from '../../header/headerD';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {TieudeHome} from '../../dungchung/tieudeChung';
import styles from '../stylesAmin';
import {useFocusEffect,} from '@react-navigation/native';
import {Activity} from '../../dungchung/activityIndicator';

const {abita_amin,hinhanhicon}=diachiDaTa;
export default DonHangXuLy =({navigation,route})=>{
  const {quanly1,quanly2,quanly3}=styles;
  const {xacnhan,tentinhtrang,api,uri} = route.params;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const dienthoai = useSelector(state => state.cart.SoDienThoai);
  const Amin = useSelector(state => state.cart.Amin); 
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [xacnhan1, setXacNhan1] = useState('');
  const [tenNaviga, setTenNaviga] = useState('');
  const [maucomponent, setMauComponent] = useState('');
  
    
  useFocusEffect(() => {
    tenNavigation()
    InteractionManager.runAfterInteractions(() => {
      fetch(abita_amin+api)
        .then((response) => response.json())
        .then((json) => {setData(json),setXacNhan1(xacnhan)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })
  });

  const datamuc =[{
                id:1,
                tenmuc:'Đơn mới',
                uri:hinhanhicon+'shopping-cart.png',
                mau:'#F8F8F8',
                navigation:'DonHangXuLy',
                api:'',
                xacnhan:false,
               
                quyen:'AMIN'
              },
              {
                id:2,
                tenmuc:'Đang xử lý',
                uri:hinhanhicon+'delivered.png',
                mau:'#F8F8F8',
                navigation:'DonHangXuLy',
                api:'apiDonHangMoi',
                xacnhan:true,
                
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
            }
  ]
  const tenNavigation =()=>{
    switch (Amin) {
      case 'AMIN':{
        setTenNaviga("DonHangAmin")
    };
    break;
    case 'NCC':{
      setTenNaviga("ChiTietDonHang")
    };
    break;
    case 'NVGH':{
      
    };
  }
  }
  
    const listHeader = ()=>{
    return(
    <View style={{height:30}}/>
    )};

    const renderSeparator = () => {
    return (
      <View
        style={{
          height: 20,
          width: "100%",
          backgroundColor: "#FFFFFF",
         
        }}
      />
    );
  };
return (
  <SafeAreaView style = {{flex:1, backgroundColor:'#FFFFFF'}}>
    <HeaderD navigation ={navigation} ten={tentinhtrang} uri={uri}/>
     {/* <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
       {datamuc.map(item=>
        <TouchableOpacity style={{alignItems:'center'}}>
           <Image style ={{width:30,height:30,resizeMode:'stretch',marginVertical:3}}
            source={{uri:item.uri}}/>
            <View style={{backgroundColor:'#3CB371',borderRadius:50,justifyContent:'center',width:70,alignItems:'center'}}>
          <Text style={{fontSize:12,marginHorizontal:5,color:'#FFF'}}>{item.tenmuc}</Text>
          </View>
        </TouchableOpacity>)}
     </View> */}
    
      {xacnhan1!== xacnhan? <Activity/>  : (
          <FlatList 
            data={data}
            renderItem={({ item, index }) => (
            <TouchableOpacity 
                  onPress={() =>{setMauComponent(index), navigation.navigate(tenNaviga, 
                        {sodonhang:item.SODONHANG,
                        hoten:item.HOTENKH,
                        dienthoai:item.SODIENTHOAIKH,
                        diachi:item.DIACHIKH,
                        tenLoaiHang: tentinhtrang +item.NGAYDATHANG,ghichu:item.GHICHUKH,
                        xacnhan:xacnhan})}
                      }
            >
              <View style = {[quanly1,{backgroundColor:maucomponent==index?'#E8E8E8':'#FFFFFF'}]}>
                <View style={quanly2}>
                  <Text > {index+1} <Icon name="book-open" size={15} color="blue" /></Text>
                </View>
                <Text style={quanly3}>DH {item.SODONHANG}</Text>
              </View>
              <View style={{height:0.5,backgroundColor:"#D3D3D3", marginLeft:60, marginRight:20}}/>
            </TouchableOpacity> 
            )}
            keyExtractor={( item ) => item.SODONHANG}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={listHeader}
          />
        )
      } 
    </SafeAreaView>
  );
};