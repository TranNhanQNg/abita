import React, {useState,useRef,useLayoutEffect ,useEffect,ActivityIndicator,useMemo} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,Dimensions,StyleSheet,ImageBackground,
 Animated, Image,Platform,ScrollView} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector} from 'react-redux';
import HeaderCH from '../../header/headerCH';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import {fadeIn} from '../../dungchung/anima';
import DanhMucListFooter from '../../sanpham/danhmucListFooter';
import {RenderSanPham} from '../renderSanPham';
import {DanhMucCuaHang,Swiper_Bane,TenCuaHang} from './component/index';
import {LenDauTrang} from '../dautrang'
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';


const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};

export default function CuaHang ({ route, navigation }) {
  const Wifi = useSelector(state => state.cart.Wifi);
  const AddFont = useSelector(state => state.cart.AddFont);
  const {abita_sanpham,abita_amin, hinhanh,dienthoaincc,abita_dungchung} = diachiDaTa; 
  const {MaUidNCC,MaTinh} = route.params;
  const [mauid, setmauid] = useState(MaUidNCC);
  const [dataAll, setDataAll] = useState([]);
  const [cao, setCao] = useState(400);

  const [timkiem,setTimKiem]=useState('');
  const [datatimkiem,setDaTaTimKiem]=useState([]);
  
  const [loadRende, setLoadRende] = useState(true);
  const [activityCT,setActivityCT]= useState(true);
  const [soluongdata,setSoLuongDaTa] =useState(0);
  const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
  const [tile_Image,settile_Image]=useState(0);
  const [morong,setMoRong] =useState(true)
  const [dataAnh, setDataAnh] = useState({});
  const [loadAnh, setLoadAnh] = useState(true);
  const [isloading,setLoading]=useState(true);
  const [mauMuc,setMauMuc]=useState(1)
  const [trang,setTrang]=useState(2);
  const [luotxem, setLuocxem]= useState(0);
  const chuyenDauTrang = useRef(null);
  const [api, setApi]=useState('Cua_Hang/CuaHang.php?MaTinh='+MaTinh+'&Trang=');
  const [data_Muc, setDaTa_Muc]=useState({Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home})
  const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));
  //animated
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimScroll = useRef(new Animated.Value(0)).current;
  useEffect(() => {fadeIn(fadeAnimScroll)},[api,mauid]);
  useEffect(() => {
    if(!isloading&&!loadAnh){
    setTimeout(() =>{fadeIn(fadeAnim),setLoadRende(false)}, 100)
  }
  },[isloading,loadAnh,mauid]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const animations =()=>{fadeAnimScroll.setValue(0)};
  const heightAvata = scrollY.interpolate({
    inputRange: [10, 200],
    outputRange: [0,Platform.OS==='ios'?-width*tile_Image/3:-width*tile_Image/3],
    extrapolate: 'clamp',
  });
  const opacitiAvata = scrollY.interpolate({
    inputRange: [10, 200],
    outputRange: [1,0],
    extrapolate: 'clamp',
  });
  
    const FechtAnhCH =()=>{
      var api_fech = abita_amin+'AnhCuaHang.php?MaTinh='+MaTinh
      var set_then =(res)=>{
        setDataAnh(res.data?res.data:{AnhNen:apiAnh}),getAnh(res), myTimeout()}
      var set_catch =()=>{console.log(error),setDataAnh({AnhNen:apiAnh})}
      var set_finally =()=>{setLoadAnh(false)}
      var data_fech = JSON.stringify({
                      KiemTra:MD5.home,
                      IdMuc:MaUidNCC,
                      TenMuc:'MaUidNCC'
                    })
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  };
  const fechluotxem =()=>{
    axios.post(abita_dungchung+'luotxem_CH.php?MaTinh='+MaTinh, 
            JSON.stringify({
                tendieukien:'MaUidNCC',
                dieukien:dataAnh.MaUidNCC,
                tencsdl:'taikhoan',
                tengiatri:'LuotXemCH',
                giatri:dataAnh.LuotXemCH+1
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

  const timestamp = Math.round(new Date().getTime()/1000)
  const data_muc =[
  { id:1, muc:'Tất cả',
    icon:'1',
    api:'Cua_Hang/CuaHang.php?MaTinh='+MaTinh+'&Trang=',
    apitong:'Dem/TongSanPham.php?MaTinh=',
    data:{Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home}
  },
  { id:2,muc:'Giảm giá',
    icon:'2',
    api:'Cua_Hang/CuaHangGG.php?MaTinh='+MaTinh+'&timestamp='+timestamp+'&Trang=',
    apitong:'Dem/TongSanPham.php?MaTinh=',
    data:{Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home}
  },
  { id:3,muc:'Bán chạy',
    icon:'2',
    api:'Cua_Hang/SanPham_BanChay.php?MaTinh='+MaTinh+'&Trang=',
    apitong:'Dem/TongSanPham.php?MaTinh=',
    data:{Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home}
  },
  { id:4,muc:'Hàng mới',
    icon:'2',
    api:'Cua_Hang/SanPham_HangMoi.php?MaTinh='+MaTinh+'&Trang=',
    apitong:'Dem/TongSanPham.php?MaTinh=',
    data:{Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home,Loc:'NgayDangSP'}
  }
  ];

 
useEffect(()=>{
  if(MaUidNCC!==mauid){
          setActivityCT(true)
          setTrang(2),
          setMauMuc(1),
          setmauid(MaUidNCC),
          setApi('Cua_Hang/CuaHang.php?MaTinh='+MaTinh+'&Trang='),
          setDaTa_Muc({Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home}),
          setDataProvider(createNewDataProvider().cloneWithRows([1])),
          setDataAll([]),
          setSoLuongDaTa(0)
          animations()
          updateRecycler({update:!update });
  }
},[MaUidNCC])
  
  useEffect(() => {
    if(Wifi&&soluongdata==0){
    setLoading(true)
    FechtAnhCH()
    }
    }, [Wifi,mauid]);

    const fechtdata =()=>{
      var api_fech = abita_sanpham+api+1
      var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows([1].concat(res.data))),activityCT?setSoLuongDaTa(res.data.length):null}
      var set_catch =(error)=>{console.log(error)}
      var set_finally =()=>{setLoading(false),setActivityCT(false)}
      var data_fech = JSON.stringify(data_Muc)
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
    }

    const fechtdata1=()=>{
      var api_fech = abita_sanpham+api+trang
      var set_then =(res)=>{setDataAll(res.data),setSoLuongDaTaCuoi(res.data.length)}
      var set_catch =(error)=>{console.log(error)}
      var set_finally =()=>{setActivityCT(false)}
      var data_fech = JSON.stringify(data_Muc)
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
};


    useEffect(() => {
      if(Wifi&&soluongdata==0){
        fechtdata()
      }
      fechtdata1()
      }, [trang,api,Wifi,mauid]);
   
      const [update, updateRecycler] = useState({
        update: false
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
      },[cao,MaTinh,morong,tile_Image]);
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
        <View style={{flex:1}} >
        {listHeader()}
        </View>:
           <Animated.View style={{flex:1,opacity:fadeAnimScroll,justifyContent: 'center'
            }}>   
                 <RenderSanPham item={item} navigation={navigation} MaTinh={MaTinh} index={index} component={1}/>
          </Animated.View>
        );
      };
      

const fechTimKiem =()=> {
  var api_fech = abita_sanpham+'TimKiemCuaHang.php?MaTinh='+MaTinh+'&trang=1'
  var set_then =(res)=>{setDaTaTimKiem(res.data),console.log(res.data)}
  var set_catch =()=>{console.log(error)}
  var set_finally =()=>{null}
  var data_fech = JSON.stringify({MaUidNCC:MaUidNCC,TimKiem:timkiem})
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)

  // fetch(abita_sanpham+'TimKiemCuaHang.php?MaTinh='+MaTinh+'&MaUidNCC='+MaUidNCC+'&TimKiem='+timkiem+'&trang=1')
  //  .then((response) => response.json())
  //   .then((json) => setDaTaTimKiem(res.data))
  //   .catch((error) => console.error(error))
    
};
const apiAnh='https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952_1280.jpg'
const getAnh=(response)=>{
  if(response.data.AnhNen==''||response.data.AnhNen==null){
  Image.getSize(apiAnh, (w, h) => {
    settile_Image(h/w)
  }, (error) => {
    console.error(error);
  })}
else{
  Image.getSize(hinhanh+'slileApp/'+response.data.AnhNen, (w, h) => {
    settile_Image(h/w)
  }, (error) => {
    console.error(error);
  })
}
};

const Api_Muc =(item)=> {
  setActivityCT(true)
  setTrang(2),
  setDataProvider(createNewDataProvider().cloneWithRows([1])),
  setDataAll([]),
  setSoLuongDaTa(0)
  setMauMuc(item.id),
  setApi(item.api),
  setDaTa_Muc(item.data)
  animations()
  updateRecycler({update:!update });
  };
 
  const cuoiban =useMemo(() =>{
    return(
      <View style={{backgroundColor:'#FFF'}}>
      <DanhMucListFooter
        activityCT={activityCT}
        soluongdata={soluongdatacuoi}/>
         <View style={{height:soluongdata==0?3000:null}}/>
      </View>
      )
  },[activityCT,soluongdatacuoi]);
  
  _Muc = ()=>{
    return(
      <View style={{width:'100%',backgroundColor:'#FFF'}}>
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{}}
      >
        {data_muc.map(item=>
        <TouchableOpacity 
          onPress={mauMuc==item.id?()=>null:()=>{Api_Muc(item)}}
          key ={item.id}
          style={{ width:width/4}}
          >
          <View style={{margin:5,alignItems:'center',justifyContent:'center',borderBottomWidth:2,marginVertical:5,borderBottomColor:mauMuc==item.id?'red':'#FFF'}}>
            <Text style={{color:mauMuc==item.id?'blue':'#000',fontFamily: 'OpenSans-Regular',fontSize:12,marginVertical:15}}>{item.muc}</Text>
          </View>
          </TouchableOpacity>)}
        </ScrollView>
        <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
      </View>
    )
  }
  const listHeader = ()=>{
    return(
      <View onLayout={e => {setCao(e.nativeEvent.layout.height) }}>
          <View style={{width,height:Platform.OS==='ios'?width*tile_Image-95:width*tile_Image-75}}>
            
            <TenCuaHang         
                  tencuahang={dataAnh.TenCuaHang}
                  dataAnh={dataAnh}
                  heightAvata={opacitiAvata}
                  MaUidNCC={MaUidNCC}
                  MaTinh={MaTinh}
                  navigation={navigation}
                  dienthoaincc={dienthoaincc}
                  />   
         
         </View>
          <View style={{backgroundColor:'#FFFFFF'}}>
          {!dataAnh.AnhCH||dataAnh.AnhCH==''||dataAnh.AnhCH==null?null:
          <Swiper_Bane anhch={JSON.parse(dataAnh.AnhCH)}/>
          }
            <DanhMucCuaHang 
                  navigation={navigation}
                  MaTinh={MaTinh}
                  GiaTriMuc={dataAnh.MaUidNCC}
                  Muc='MaUidNCC'
                  dataAnh={dataAnh}
                  morong={morong}
                  setMoRong={setMoRong}
            />

          </View>
            {_Muc()}
       </View>  
      )
    };
    const onEndReached=()=>{
      if(!activityCT&&soluongdatacuoi!==0&&Wifi&&soluongdata!==0){
        setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
        setTrang(trang+1)
        setActivityCT(true)
        }
      };

    return(
    
    <View style={{flex:1,backgroundColor:'#FFF'}}>
       <Animated.View style={{width,height:width*tile_Image,resizeMode:'center',position:'absolute',top:heightAvata}}>
          <ImageBackground source={{uri:!dataAnh.AnhNen||dataAnh.AnhNen==''||dataAnh.AnhNen==null?apiAnh:hinhanh+'slileApp/'+ dataAnh.AnhNen}}
                style={{width,height:width*tile_Image,resizeMode:'center'}}
              >
              <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>
             
              </View>
            </ImageBackground>
        </Animated.View>
    	<SafeAreaView  style={{flex:1}}>
         <HeaderCH navigation ={navigation} 
                  setTimKiem={setTimKiem}
                  setDaTaTimKiem={setDaTaTimKiem}
                  fechTimKiem={fechTimKiem}
                  dataAnh={dataAnh}
            />
      <View style={{flex:1,justifyContent:'center'}}>
    
       {dataAnh.Khoa&&!loadAnh&&!isloading?
        <Animated.View style={{opacity:fadeAnim,flex:1}}>
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
                  keyExtractor={(item,index) => item.IDCHITIETSP+index}
                  onEndReached={onEndReached}
                  onEndReachedThresholdRelative={0.9}
                  showsVerticalScrollIndicator={false}
                  extendedState={update}
                  renderFooter={()=>cuoiban}
                  removeClippedSubviews={true}
                  bounces={false}
              />
        </Animated.View>
       :!dataAnh.Khoa?
       <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
       <Icon name="lock" size={50} color="red" />
         <Text style={{fontSize:18,color:'#000', marginTop:30}}>Cửa hàng đã bị khoá</Text>
        </View>
        : null
        }
        {loadRende?
       <View style={{height:'100%',width:'100%',position:'absolute', backgroundColor:'#FFF',top:cao}}>
              <Activity mau={'#FFF'}/> 
       </View>:null}
        </View>
        <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={70}/>
       
      </SafeAreaView>
      </View>
    );
  }
  const {height,width} = Dimensions.get('window')
const h = height;
const w = width;
  const styles1 = StyleSheet.create({

   //Hình paner
  
     viewImagePaner:{
        height: w/1.5,
      
  },
  imageSile:{
     flex:1,
    resizeMode:"cover",
    
  },
  })