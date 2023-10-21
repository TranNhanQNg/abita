import React, { useState,useEffect,useRef, useMemo} from "react";
import { FlatList, SafeAreaView, Text, Animated,
  TouchableOpacity,ActivityIndicator,View,Image,ScrollView,Modal,Dimensions,Platform } from "react-native";
  import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
  import axios from 'axios';

import {HeaderCT} from '../header/headerCT';
import api from '../api/api'
import {Activity} from './nhom/dungchung/activityIndicator';
import {ModalThongBao} from './nhom/dungchung/modalThongBao';
import {LenDauTrang} from './nhom/dautrang';
import {fadeIn} from './nhom/dungchung/anima';
import DanhMucListFooter from './nhom/danhmucListFooter'
import {ChiTiet_SanPham,Modal_MuaNgay,Modal_Cart,Modal_Tuoi,} from './component/index'


const{abita_sanpham,hinhanhsanpham,abita_dungchung,abita_amin}=api;
const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};

export default function ChitietSanpham ({navigation,idchitietsp,idsanpham,MaTinh}) {
  const [chitiet, setChiTiet] =useState(0);
  const [dataQC, setDataQC] = useState([]);
  const [isLoading, setLoading] = useState(true);
	const [isLoadingQC, setLoadingQC] = useState(true);
  const [currentIndex,setcurrentIndex]=useState(0);
  const [caocard,setcaocard]=useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleSoLuong, setModalVisibleSoLuong] = useState(false);
  const [modalVisibleThongBao, setModalVisibleThongBao] = useState(false);
  const [modalVisibleTuoi, setModalVisibleTuoi] = useState(false);
  const [api, setApi]=useState('SanPham_DanhMuc.php?');
  const [cao, setCao] = useState(1000);
  const [soluongdata,setSoLuongDaTa] =useState(0);
  const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
  const [dataAll, setDataAll] = useState([]);
  const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));
  const chuyenDauTrang = useRef(null);
  const [activityCT,setActivityCT]= useState(true);
  const [trang, setTrang]= useState(2);
  const [luotxem, setLuocxem]= useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
 
  const fechluotxem =()=>{
   
    axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
            JSON.stringify({
                tendieukien:'IdSanPham',
                dieukien:chitiet.IDSANPHAM,
                tencsdl:'sanpham',
                tengiatri:'LuotXem',
                giatri:chitiet.LUOTXEM+1
            })
        )
        .catch(function (error) {
          console.error(error);
        })
  }
  const myTimeout =()=> setTimeout(()=>setLuocxem(2),10000); 
  
  useEffect(()=>{
      if(luotxem==2){
        fechluotxem()
      }
  },[luotxem])

useEffect(()=>{
  setLoading(true)
  fetch(abita_sanpham+'SanPhamChiTiet.php?IdChiTietSp='+idchitietsp+'&MaTinh='+MaTinh)
  .then((response) => response.json())
  .then((json) => {setChiTiet(json[0]),json[0].IDDANHMUCCAP3=='DM_0121'?setModalVisibleTuoi(true):null, myTimeout()})
  .catch((error) => console.error(error))
  .finally(() => {setLoading(false),fadeIn(fadeAnim)});
},[idchitietsp])
useEffect(() => {
  fetch(abita_sanpham+'QuyCach_MauSac.php?IdSanPham='+idsanpham+'&MaTinh='+MaTinh)
    .then((response) => response.json())
    .then((json) => {setdataQuyCach(json)})
    .catch((error) => console.error(error))
    .finally(() => {setLoadingQC(false)});
   
},[idchitietsp]);

const setdataQuyCach =(json)=>{
setDataQC(json)
  const index = json.findIndex((element, index) => {
    if (element.IDCHITIETSP ==idchitietsp) {
    return true
    }})
  setcurrentIndex(index)
}


 
const timestamp = Math.round(new Date().getTime()/1000)



const scrollY = useRef(new Animated.Value(0)).current;
const colorHeder = scrollY.interpolate({
  inputRange: [200, 300],
  outputRange: ['bluergba(192,192,192,0.6)','bluergba(192,192,192,0)'],
  extrapolate: 'clamp',

});
const headerHeight = scrollY.interpolate({
  inputRange: [200, 300],
  outputRange: ['rgba(255,255,255, 0)','rgba(0, 139,139, 1)'],
  extrapolate: 'clamp',
});

const heightCard = scrollY.interpolate({
  inputRange: [caocard,caocard],
  outputRange: [-80,0],
  extrapolate: 'clamp',

});
const CardOpacity = scrollY.interpolate({
  inputRange: [caocard,caocard],
  outputRange: [0,1],
  extrapolate: 'clamp',

});

const header=()=>{
  return(
    <View>
     <ChiTiet_SanPham  chitiet={chitiet}
              dataQC={dataQC}
              isLoading={isLoading}
              isLoadingQC={isLoadingQC}
              navigation={navigation}
              MaTinh={MaTinh}
              setChiTiet={setChiTiet}
              currentIndex={currentIndex}
              setcaocard={setcaocard}
              setModalVisible={setModalVisible}
              setModalVisibleSoLuong={setModalVisibleSoLuong}
              setModalVisibleThongBao={setModalVisibleThongBao}
              idchitietsp={idchitietsp}
        />
  </View>
  )
 
}

return(
  <Animated.View style={{flex:1}}>
     {isLoading?<Activity/>:
         <FlatList style={{width:width}}
            
                data={[1]}
               renderItem={null}
                ref={chuyenDauTrang}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y:scrollY}}}],
                  {useNativeDriver:false}
                  )}
                
               
                  onEndReachedThresholdRelative={0.9}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  ListHeaderComponent={header()}
                
              />
      }
              
        
       <Animated.View style={{backgroundColor:headerHeight,position:'absolute',flexDirection:'row',alignItems:'center', justifyContent:'space-between', width}}>
        <View></View>
       <HeaderCT navigation ={navigation}
							    headerHeight={headerHeight}
							    colorHeder={colorHeder}
							    clearTimeout={clearTimeout}
                    
          />
       </Animated.View>
       
       <Modal_Cart 
                  chitiet={chitiet}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  navigation={navigation}   
      />
      <ModalThongBao
                  ten={'Sản phẩm đã hết'}
                  thongbao={'Mong quý vị chọn sản phẩm cửa hàng khác'}
                  modalVisible={modalVisibleThongBao}
                  dieukhien={()=>{navigation.goBack(),setModalVisibleThongBao(false)}}
                  hanhdong={'Quay lại'}
			/>
      <Modal_MuaNgay
                  setModalVisibleSoLuong={setModalVisibleSoLuong}
                  modalVisibleSoLuong={modalVisibleSoLuong}
                  chitiet={chitiet}
                  MaTinh={MaTinh}
                  navigation={navigation}   
      />
      <Modal_Tuoi
                setModalVisibleTuoi={setModalVisibleTuoi}
                modalVisibleTuoi={modalVisibleTuoi}
                navigation={navigation}
      />
      
      <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={80}/>

 
 </Animated.View>
)

};
const {width,height} = Dimensions.get('window');