import React, {Component,useEffect,useState,useRef,useLayoutEffect} from 'react';
import { Text, View,Image, SafeAreaView,StyleSheet,FlatList,TouchableOpacity,Animated,InteractionManager,ActivityIndicator, ScrollView} from 'react-native';
import { useSelector} from 'react-redux';
import axios from 'axios';


import HeaderCHThich from '../../header/headerCHThich';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import styles from '../../quanly/stylesQuanLy';
import {AnhNen} from '../../dungchung/anhnen';
import TieuDe_CuaHang from '../../sanpham/chitietsanpham/component/ten_cuahang';


const {abita_amin,abita_quanly}=diachiDaTa;



export default CuaHangThich =({ navigation})=>{
  const {quanly1,quanly2,quanly3}=styles;
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const Wifi = useSelector(state => state.cart.Wifi);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const MaUid = useSelector(state => state.cart.MaUid);
  const [data, setData] = useState([]);
  const [dataTimKiem, setDataTimKiem] = useState('');
  const [dataTK, setDataTK] = useState([]);
  const [like,setLike] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [timkiem,setTimKiem]=useState('');
 
  
  useEffect(() => {
        fetch(abita_amin+'Like_TheoDoi/CuaHangKH_Like.php?&MaUid='+MaUid)
          .then((response) => response.json())
          .then((json) => {setData(json)})
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => setLoading(false));
        },[timkiem]);

  const fechCuaHang =(text)=>{
    setLoading(true)
    fetch(abita_quanly+'TimCuaHang.php?MaTinh='+MaTinh+'&TimKiem='+text+'&trang=1')
      .then((response) => response.json())
      .then((json) => {setDataTimKiem(json)})
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

    const search = (text) => {
          const filteredData = data.filter(function (item) {
            return item.TENCUAHANG.includes(timkiem)||item.DIENTHOAINCC.includes(timkiem);
          });
          fechCuaHang(text)
        };

  
const onSubmitEditing =()=>{search()}
const saechclose=()=>{setTimKiem('')}
const onChangeText =(text)=>{setTimKiem(text),
                              setDataTimKiem([])
                              fechCuaHang(text)}
return (
<SafeAreaView style = {{flex:1, backgroundColor:'#F8F8F8'}}>
<AnhNen api={'../icon/nenhome.jpg'}
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
<HeaderCHThich  navigation ={navigation}
                onChangeText={onChangeText}
                saechclose={saechclose}
                onSubmitEditing={onSubmitEditing}
                timkiem={timkiem}
                ten={'Tìm cửa hàng'}
                />
         <View style={{flex:1,backgroundColor:'#FFF', marginHorizontal:5, borderRadius:8}}>
           
           {isLoading?<Activity netInfo={Wifi}/> :
         <FlatList 
            data={timkiem==''?data:dataTimKiem}
            renderItem={({ item }) => (
              <View style={{marginHorizontal:10,marginVertical:3}} >
              <TieuDe_CuaHang item={item} navigation={navigation} color={'#87CEEB'} color1={'#FFF'} MaTinh={item.MATINH}/>
          </View>
            )}
            keyExtractor={(item) => item.MAUIDNCC}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            />}
         </View>
      </SafeAreaView>

      
      );
};