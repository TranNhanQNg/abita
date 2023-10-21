import React, { useState,useEffect,useRef, useMemo} from "react";
import { FlatList, SafeAreaView, Text, Animated,
  TouchableOpacity,ActivityIndicator,View,Image,ScrollView,Modal,Dimensions,Platform } from "react-native";
  import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
  import { useSelector} from 'react-redux';
  import axios from 'axios';

import {HeaderCT} from '../../header/headerCT';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import {ModalThongBao} from '../../dungchung/modalThongBao';
import {LenDauTrang} from '../dautrang';
import {fadeIn} from '../../dungchung/anima';
import DanhMucListFooter from '../danhmucListFooter'
import {RenderSanPham} from '../renderSanPham';
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';
import {ChiTiet_SanPham,Add_GioHang,Modal_MuaNgay,Modal_Cart,Modal_Tuoi,SanPhamDaXem} from './component/index'


const{abita_sanpham,hinhanhsanpham,abita_dungchung}=diachiDaTa;
const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};

export default function ChitietSanpham ({navigation, route}) {
	const {idchitietsp,idsanpham,MaTinh} = route.params;
  const AddFont = useSelector(state => state.cart.AddFont);
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
useEffect(() => {
  if(!isLoadingQC&&!isLoading){
      if(!soluongdata){
        fechDaTa()
      }
      fechDaTa1()
    }
  },[trang,isLoadingQC,isLoading,idchitietsp]);

 
const timestamp = Math.round(new Date().getTime()/1000)

const fechDaTa=()=>{
  var api_fech = abita_sanpham+api+chitiet.IDDANHMUCCAP3+'&MaTinh='+MaTinh+'&Trang=1'+'&timestamp='+timestamp
  var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows([1].concat(res.data))),setSoLuongDaTa(res.data.length)}
  var set_catch =()=>{console.log(error)}
  var set_finally =()=>{setActivityCT(false),setLoading(false)}
  var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'IdDanhMucCap3',IdDanhMuc:chitiet.IDDANHMUCCAP3})
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}
const fechDaTa1=()=>{
  var api_fech = abita_sanpham+api+chitiet.IDDANHMUCCAP3+'&MaTinh='+MaTinh+'&Trang='+trang+'&timestamp='+timestamp
  var set_then =(res)=>{setDataAll(res.data),setSoLuongDaTaCuoi(res.data.length)}
  var set_catch =()=>{console.log(error)}
  var set_finally =()=>{setActivityCT(false),setLoading(false)}
  var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'IdDanhMucCap3',IdDanhMuc:chitiet.IDDANHMUCCAP3})
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}

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

const ViewTypes = {
  FULL: 0,
  HEDER: 1,
};

useEffect(() => {

setlayoutProvider(new LayoutProvider(
  index => {
      if (index === 0) {
          return ViewTypes.HEDER;
      } else {
          return ViewTypes.FULL;
      }
  },
  (type, dim) => {

      switch (type) {
          case ViewTypes.HEDER:
            dim.width = width;
            dim.height = cao;
              break;
          case ViewTypes.FULL:
            dim.width = width / 2;
            dim.height = width/2+AddFont.fontall+5;
            break;
          default:
              dim.width = 0;
              dim.height = 0;
      }
  }
))
},[cao,MaTinh,idchitietsp]);

const [_layoutProvider, setlayoutProvider] = React.useState( new LayoutProvider(
index => {
  if (index === 0) {
      return ViewTypes.HEDER;
  } else {
      return ViewTypes.FULL;
  }
},
(type, dim) => {

  switch (type) {
      case ViewTypes.HEDER:
        dim.width = width;
        dim.height = cao;
          break;
      case ViewTypes.FULL:
        dim.width = width / 2;
        dim.height =width/2+AddFont.fontall+5;
        break;
      default:
          dim.width = 0;
          dim.height = 0;
  }
}
));


const renderList = (type, item, index) => {
  return (
    item ===1?
    <View onLayout={e => {setCao(e.nativeEvent.layout.height)}}
        
    >
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
    :
       <Animated.View style={{opacity:fadeAnim,flex:1,justifyContent: 'center'
        }}>   
            <RenderSanPham item={item} navigation={navigation} MaTinh={MaTinh} index={index} component={1}/>
      </Animated.View>
            );
          };
    const cuoiban = () =>{
      return(
        <View style={{backgroundColor:'#FFF'}}>
        {soluongdatacuoi?null:<SanPhamDaXem navigation={navigation}/>}
        <DanhMucListFooter
          activityCT={activityCT}
          soluongdata={soluongdatacuoi}/>
        </View>
        )
    }

    const onEndReached=()=>{
      if(!activityCT&&soluongdatacuoi!==0&&soluongdata!==0){
        setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
              setTrang(trang+1)
              setActivityCT(true)
              }
            };
return(
  <Animated.View style={{backgroundColor:headerHeight,flex:1}}>
  <SafeAreaView style={{flex:1}}>
  <View style={{flex:1}}>
  {isLoading?<Activity/>:
  <Animated.View style={{backgroundColor:'#FFFFFF', flex:1,opacity:fadeAnim}}>
         <RecyclerListView style={{flex:1}}
                layoutProvider={_layoutProvider}
                dataProvider={dataProvider}
                rowRenderer={(type, item, index) =>
                  renderList(type, item, index)
                }
                ref={chuyenDauTrang}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y:scrollY}}}],
                  {useNativeDriver:false}
                  )}
                  onEndReached={onEndReached}
                  renderAheadOffset={200}
                  onEndReachedThresholdRelative={0.9}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  renderFooter={cuoiban}
                  bounces={false}
              />
        
                <Animated.View style={{position:'absolute',left:0,right:0,bottom:heightCard, opacity:CardOpacity}}>
                <Add_GioHang chitiet={chitiet}
                        MaTinh={MaTinh}
                        setModalVisible={setModalVisible}
                        setModalVisibleSoLuong={setModalVisibleSoLuong}
                        setModalVisibleThongBao={setModalVisibleThongBao}
                  />
                <View style={{height:2}}/>
              </Animated.View>
       </Animated.View>
        }
       
        <HeaderCT navigation ={navigation}
							    headerHeight={headerHeight}
							    colorHeder={colorHeder}
							    clearTimeout={clearTimeout}
                    
          />
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
</View>
  </SafeAreaView>
 </Animated.View>
)

};
const {width,height} = Dimensions.get('window');