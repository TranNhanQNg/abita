import React, {useEffect, useState,useRef,useLayoutEffect,useMemo,} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity, Image,Animated,Dimensions,Modal,PermissionsAndroid,Alert,RefreshControl} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { useSelector,useDispatch} from 'react-redux';
import NetInfo from "@react-native-community/netinfo";
import DrawerMenNu from '../dungchung/drawermenu';
import HeaderA from '../header/headerA';
import {AnhNen} from '../dungchung/anhnen';
import styles from './stylesHome';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {fadeIn,fadeInCT} from '../dungchung/anima';
import {MD5,fechDaTa_Axios} from '../dungchung/fech_data';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {LenDauTrang} from '../sanpham/dautrang';
import {ADD_WIFI} from '../../redux/cartAction';
import BaNe from '../dungchung/bane';
import {RenderSanPham} from '../sanpham/renderSanPham';
import DanhMucListFooter from '../sanpham/danhmucListFooter'
import {Activity} from '../dungchung/activityIndicator';
import {GoiY_HomNay,DanhMuc, TinhThanhHome,BaneHome,DanhMuc1,GetFont,SanPhamDanhMucHome,LoiChao} from './component/index'

export default function Home ({navigation}) {
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const TenTinh = useSelector(state => state.cart.TenTinh);
  const AddFont = useSelector(state => state.cart.AddFont);
  const refechMaTinh = useSelector(state => state.cart.refechMaTinh)
  const Wifi = useSelector(state => state.cart.Wifi);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [isloading,setLoading]=useState(false);
  const [isloaddata,setLoadDaTa]=useState(false);
  const [loichao,setLoiChao]=useState(true);

  const [dataAll, setDataAll] = useState([]);
  const [trang,setTrang] =useState(2)
  const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
  const [soluongdata,setSoLuongDaTa] =useState(0);
  const [dataProvider, setDataProvider] = React.useState([1]);
  const [activityCT,setActivityCT]= useState(true);

  const [cao,setY]=useState(1000);
  let { width,height } = Dimensions.get("window");
  
  // const [backgroundColor,setbackgroundColor]=useState('rgba(0,175,175,0.8)')
  useEffect(()=>{
    const setStringValue = async () => {
      try {
        await AsyncStorage.setItem('@key_load_push',JSON.stringify('123'))
      } catch(e) {
        console.log('Done.')
      }
    }
  return setStringValue
 
  },[]);
  // const isFocused = useIsFocused();
  // useEffect(() => {
  //   isFocused&&!loichao?
  //   fadeAnim.setValue(0.5):
  //   !loichao?fadeInCT(fadeAnim):null
  // },[isFocused]);

  const chuyenDauTrang = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
 
  const {abita_sanpham,abita_chung,abita_amin} = diachiDaTa; 
  
  const dispatch = useDispatch()
  const addWifi = (state) =>{
    const infohobby = {
	    Wifi:state.isConnected,
    };
    const actioninfo = ADD_WIFI(infohobby);
    dispatch(actioninfo);
  };

  const unsubscribe =()=> NetInfo.addEventListener(state => {
        if(Wifi!==state.isConnected){
        addWifi(state)}
        });

  useEffect(() => {
   setLoiChao(true)
   if(isloading&&soluongdata>0){
    const id = setInterval(() => {setLoiChao(false),fadeIn(fadeAnim)},1000);
    return () => clearInterval(id);
   }
  }, [refechMaTinh,isloading,soluongdata]); 

  //animated



  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY,-30,90);

  const translateY = diffClamp.interpolate({
    inputRange:[25,65],
    outputRange:[1,0],
    extrapolate: 'clamp',
  });
  const backgroundColor = scrollY.interpolate({
    inputRange: [200, 500],
    outputRange: ['rgba(255, 255,255, 1)','rgba(255, 255,255, 0)'],
    extrapolate: 'clamp',
  });
  const backgroundColor1 = scrollY.interpolate({
    inputRange: [cao, cao],
    outputRange: ['rgba(255, 255,255, 0)','rgba(255, 255,255, 1)'],
    extrapolate: 'clamp',
  });
  const translateTop = diffClamp.interpolate({
    inputRange:[45,90],
    outputRange:[45,0],
    extrapolate: 'clamp',
  });


const onRefresh = () => {
    setRefreshing(true);

  };

  useEffect(() => {
    if(MaTinh!==''&&Wifi){
    danhmuc()
  }
  },[refreshing,MaTinh,Wifi]);
  const timestamp = Math.round(new Date().getTime()/1000)
  const danhmuc =()=>{
    var api_fech = abita_chung+'DanhMuc.php?MaTinh='+MaTinh
    var set_then =(res)=>{setData(res.data)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(true)}
    var data_fech = JSON.stringify({KiemTra:MD5.home})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech) 
  };
  const createNewDataProvider = () => {
    return new DataProvider((r1, r2) => r1 !== r2);
};

  const fechtdata =()=>{
    var api_fech = abita_sanpham+'SanPhamAll.php?MaTinh='+MaTinh+'&Trang=1'
    var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows(dataProvider.concat(res.data))),activityCT?setSoLuongDaTa(res.data.length):null}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoadDaTa(true),setActivityCT(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,timestamp:timestamp})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }

  const fechtdata1=()=>{
    var api_fech = abita_sanpham+'SanPhamAll.php?MaTinh='+MaTinh+'&Trang='+trang
    var set_then =(res)=>{setDataAll((res.data)),setSoLuongDaTaCuoi(res.data.length)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setActivityCT(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,timestamp:timestamp})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
    };
 
  useEffect(() => {
    if(MaTinh!==''){
    Wifi&&soluongdata==0?
      fechtdata():null
      fechtdata1()
      }
    },[Wifi,trang,MaTinh]);


  

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
    },[cao,MaTinh,refreshing]);
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
  
  const onLayout=(event)=> {
    const {x, y, height, width} = event.nativeEvent.layout;
    setY(height)
  }
 
    const renderList = (type, item, index) => {
      return (
          item ===1?
          <View>
            {listHeader}
            </View>
        :
     <RenderSanPham item={item} navigation={navigation} index={index}/>
      );
    };
   
    const onEndReached=()=>{
      if(!activityCT&&soluongdatacuoi!==0&&Wifi&&soluongdata!==0){
        setActivityCT(true),
        setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
        setTrang(trang+1)
             
        }
      };

const {headerTexInput,texinput} = styles;
const timkiem = () => {navigation.navigate("Search"),{focus:true}};
const newData = data.filter(e=> {return( e.IDDANHMUC !== 'DM_00')});

const sanphamdanhmuc = ()=>{   
    return(
      <View >
        {newData.map(e=>
            <SanPhamDanhMucHome key = {e.IDDANHMUC}
              navigation = {navigation}
              refreshing={refreshing}
              idDanhMuc={e.IDDANHMUC}
              tendanhmuc = {e.TENDANHMUC}
            />
        
        )}
      </View>
    )
};
///////////////////////////

const listHeader =useMemo(()=>{
 
    return(
      <View onLayout={onLayout}> 
            <Animated.View style={[headerTexInput]} >
            <TouchableOpacity onPress={timkiem} style={[texinput]}>
                  <Text style={{fontSize:14, fontStyle:'italic', marginLeft:30, color:'#686868'}}>Tìm sản phẩm</Text>
                  <SimpleLineIcons name="magnifier" size={30} style={{marginHorizontal:10}} color="#008080" />
            </TouchableOpacity>
            
            <TouchableOpacity style={{marginHorizontal:13,flex:0.3,alignItems:'center',borderRadius:50}}
            onPress={() => {navigation.navigate("Danhmuc")}}>
                <Image style ={{width:25,height:25}} source={require('../icon/menu.png')}/>
            </TouchableOpacity>
          </Animated.View>
              <TinhThanhHome navigation = {navigation}/>
              <BaNe navigation={navigation} IdMuc={1} TenMuc={'DM_Chu'} cao={3}/>
              <View style={{height:3,width:'100%',bottom:0, borderTopEndRadius:10,borderTopStartRadius:10}}/> 
              <View style={{}}>
                 <DanhMuc data={data} navigation={navigation}/> 
               
                <GoiY_HomNay navigation={navigation} backgroundColor={backgroundColor}/>
                <View style={{backgroundColor:'#FFF',height:8}}/>
                  {sanphamdanhmuc()}
                  <View style={{backgroundColor:'#FFF', justifyContent:'center'}}>
                   <Text style={{marginLeft:20, fontSize:18, color:'#1E90FF',marginVertical:10,fontFamily: 'OpenSans-SemiBold'}}>Sản phẩm gợi ý</Text>
                </View>
                  <DanhMuc1 data={data} navigation={navigation}/> 
             </View> 
             <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
      </View>  
      
    )
    },[isloading,MaTinh,isloaddata,refreshing])

    const cuoiban =useMemo(() =>{
      return(
        soluongdata==0?null:
        <View style={{}}>
        <DanhMucListFooter
          activityCT={activityCT}
          soluongdata={soluongdatacuoi}
          />
         
        </View>
        
        )
    },[activityCT,soluongdatacuoi,soluongdata,MaTinh]);
     
    return(
      <View style={{flex:1,}}> 
       {SplashScreen.hide()}
      <AnhNen />
        {!MaTinh?
          <View style={{width:'100%', hight:'100%',alignItems:'center'}}>
        <BaneHome navigation={navigation} setLoiChao={setLoiChao}/>
          </View>
          :
          <View style={{flex:1}}>
          <SafeAreaView>
          <HeaderA navigation ={navigation} onRefresh={onRefresh} scrollY={scrollY} />
          </SafeAreaView>
          <View style={{flex:1}}>
          <GetFont backgroundColor1={backgroundColor1}/>
          {soluongdata>0&&isloading?
          <Animated.View style={{flex:1,opacity:fadeAnim}}> 
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
                  onEndReachedThresholdRelative={0.9}
                  showsVerticalScrollIndicator={false}
                  renderFooter={()=>cuoiban}
                  // refreshControl={
                  //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  removeClippedSubviews={true}
                
              />
       </Animated.View> 
       :null}
      
       </View>     
          <DrawerMenNu 
              navigation={navigation} mau={4}
          /> 
        <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
        </View>
        }
        {loichao&&MaTinh?
      <LoiChao TenTinh={TenTinh}/>:null
       }
       </View>
       
    )
  }
