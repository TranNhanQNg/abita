
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,Platform, Image,Dimensions,ImageBackground,
ScrollView,Animated} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import { useSelector} from 'react-redux';
import {Activity} from '../../../dungchung/activityIndicator';
import DrawerMenNu from '../../../dungchung/drawermenu';
import {fadeIn} from '../../../dungchung/anima';
import {LenDauTrang} from '../../../sanpham/dautrang';
import DanhMucListFooter from '../../../sanpham/danhmucListFooter';
import {RenderItemTimKiem} from '../../../sanpham/renderSanPham';
import HeaderF from '../../../header/headerF';
import {RenderItemCH} from './renderItem';
import {MD5,fechDaTa_Axios} from '../../../dungchung/fech_data';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
const {abita_sanpham,hinhanh}=diachiDaTa;  
const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};
let { width } = Dimensions.get("window");

export default function KhuyenMai ({navigation,route}) { 

    const {loai} = route.params;
    const Wifi = useSelector(state => state.cart.Wifi);
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const AddFont=useSelector(state => state.cart.AddFont);
    const [dataAll, setDataAll] = useState([]);
    const [cao, setCao] = useState(150);
    const [loadRende, setLoadRende] = useState(true);
    const [trang, setTrang]= useState(2);
    const [isloading,setLoading]=useState(true);
    const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
    const [activityCT,setActivityCT]= useState(true);
    const [id,setID]=useState(loai);
    const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));

   
    const [chuyenQuyCach,setChuyenQuyCach]=useState(0);
    const [chuyenBane,setChuyenBaNe]=useState(0);
    const chuyenDauTrang = useRef(null);

     //animated
     const fadeAnim = useRef(new Animated.Value(0)).current;
     const fadeAnimFlatlist = useRef(new Animated.Value(90)).current;
     const animations =()=>{fadeAnim.setValue(0)};

     const dataMuc =[
      {   id:1,
          ten:'Giảm trong ngày',
          icon:hinhanh+'icon/trong_ngay.png',
          anhnen:hinhanh+'slileApp/giamgia_trongngay.jpg',
          api:abita_sanpham+'GoiY_HomNay/GiamGia_TrongNgay.php?MaTinh='+MaTinh,
          navigation:'KhuyenMai'
      },
      
      {   id:2,
          ten:'Giá sốc',
          icon:hinhanh+'icon/giamgia.png',
          anhnen:hinhanh+'slileApp/sanpham_giamgia_soc.jpg',
          api:abita_sanpham+'GoiY_HomNay/SanPham_GiamGia.php?MaTinh='+MaTinh,
          navigation:'KhuyenMai'
      },
      {   id:3,
          ten:'Cửa hàng ⇩ giá',
          icon:hinhanh+'icon/shop_sale.png',
          anhnen:hinhanh+'slileApp/cuahang_giamgia.png',
          api:abita_sanpham+'GoiY_HomNay/CuaHang_GiamGiaSoc.php?MaTinh='+MaTinh,
          navigation:'KhuyenMai'
      },
      {   id:4,
          ten:'Mới',
          icon:hinhanh+'icon/sanpham_new.png',
          anhnen:hinhanh+'slileApp/sanpham_moi.jpg',
          api:abita_sanpham+'GoiY_HomNay/SanPham_Moi.php?MaTinh='+MaTinh,
          navigation:'KhuyenMai'
      },
      
      {   id:5,
          ten:'Bán chạy',
          icon:hinhanh+'icon/ban_chay.png',
          anhnen:hinhanh+'slileApp/sanpham_banchay.png',
          api:abita_sanpham+'GoiY_HomNay/Hang_BanChay.php?MaTinh='+MaTinh,
          navigation:'KhuyenMai'
      }
      
  ]

    useEffect(() => {
      if(!isloading&&cao!==400){
      setTimeout(() =>{fadeIn(fadeAnim),setLoadRende(false)}, 100)
    }
    },[isloading,cao,id]);

    const chuyenlendau=() => {
      chuyenDauTrang.current.scrollToOffset({ animated: true, offset: 0 })
    };
   
    const chuyen_QuyCach=(index)=>{
      chuyenQuyCach.scrollTo({ x: (index-1)*105, y: 0, animated: true })
    };
    const chuyen_BaNe=(index)=>{
      chuyenBane.scrollTo({ x: (index)*width, y: 0, animated: true })
    };
    const scrollY = useRef(new Animated.Value(0)).current;
   
    
   
    useLayoutEffect(() => {fadeIn(fadeAnimFlatlist)},[]);
   
    const translateTop = scrollY.interpolate({
      inputRange:[1,cao-50],
      outputRange:[cao-50,0],
      extrapolate: 'clamp',
    });
    const translateOpycity = scrollY.interpolate({
      inputRange:[0,300],
      outputRange:['rgba(80,80,80,0)','rgba(80,80,80,0.9)'],
      extrapolate: 'clamp',
    });
    const translateMauHeder = scrollY.interpolate({
      inputRange:[0,300],
      outputRange:['rgba(80,80,80,0.1)','rgba(80,80,80,0.9)'],
      extrapolate: 'clamp',
    });
    const heightAvata = scrollY.interpolate({
      inputRange: [10, 500],
      outputRange: [0,Platform.OS==='ios'?-width*2/8:-width*2/8],
      extrapolate: 'clamp',
    }); 
//Animater cho danh mục
      useEffect(() => {
        animations() 
        fadeIn(fadeAnimFlatlist)
      },[id.api])
      
      useEffect(() => {
        if(activityCT){
        if(Wifi&&soluongdata==0){
          fechDaTa()
        }
          fechDaTa1()
          }
        },[id.api,Wifi,trang]);

      const timestamp = Math.round(new Date().getTime()/1000)
      const fechDaTa=()=>{
        var api_fech = id.api+'&Trang=1&timestamp='+timestamp
        var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows([1].concat(res.data))),activityCT?setSoLuongDaTa(res.data.length):null,setLoading(false)}
        var set_catch =(error)=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      }
      const fechDaTa1=()=>{
              var api_fech = id.api+'&Trang='+trang+'&timestamp='+timestamp
              var set_then =(res)=>{setDataAll(res.data),setSoLuongDaTaCuoi(res.data.length),setLoading(false)}
              var set_catch =(error)=>{console.log(error)}
              var set_finally =()=>{setActivityCT(false)}
              var data_fech = JSON.stringify({KiemTra:MD5.home})
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      }
      
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
                  dim.height =cao;
                    break;
                case ViewTypes.FULL:
                  dim.width = width;
                  dim.height = id.id==3?width:AddFont.fontDM*1.25;
                  break;
                default:
                    dim.width = 0;
                    dim.height = 0;
            }
        }
    ))
      },[cao,id]);
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
              dim.height = width/2;
                break;
            case ViewTypes.FULL:
              dim.width = width;
              dim.height = id.id==3?width:width/3+10;
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
       listHeader()
       :
        id.id==3?
        <RenderItemCH item={item} navigation={navigation}/>
        :
          
         <RenderItemTimKiem item={item} navigation={navigation}/>
     
                );
              };
      const onRefresh = () => {
                            setTrang(2)
                            setDataProvider(createNewDataProvider().cloneWithRows([1])),
                            setDataAll([]),
                            setActivityCT(true)
                            setSoLuongDaTa(0)
                          };
  // Hàm cho flatlist
  const cuoiban =useMemo(() =>{
    return(
      <View style={{backgroundColor:'#FFF'}}>
      <DanhMucListFooter
        activityCT={activityCT}
        soluongdata={soluongdatacuoi}/>
       
      </View>
      )
  },[activityCT,soluongdatacuoi]);
  const listHeader =()=>{
      return(
        <View onLayout={e => {setCao(e.nativeEvent.layout.height) }} style={{}}>
       <View style={{height:width/2}}/>
         </View>
      )
  }
 
 
 
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0&&Wifi&&soluongdata!==0){
                    setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
                    setTrang(trang+1)
                    setActivityCT(true)
                    }
                  };

    

    return(
      <View style={{flex:1,backgroundColor:'#ADD8E6'}}> 
      <Animated.View style={{resizeMode:'center',top:heightAvata,position:'absolute',}}>
      <ScrollView 
      horizontal={true}
      pagingEnabled={true}
        bounces={false} 
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>setChuyenBaNe(ref)}
        onLayout={()=>chuyenBane.scrollTo({ x: (id.id-1)*width, y: 0, animated: true })}
        >
      {isloading?null:dataMuc.map((item,index)=>
          <ImageBackground source={{uri:item.anhnen}}
                style={{width,height:width,resizeMode:'center'}}
                key={item.id}
              >
              <Animated.View style={{flex:1,backgroundColor:translateMauHeder}}/>
            </ImageBackground>
      )
            }
      </ScrollView>
          
        </Animated.View> 	
     <SafeAreaView style={{flex:1}}>
     <HeaderF navigation ={navigation} item={''}/>
    
     <View>
     <View style={{height:'100%',width:'100%',position:'absolute', backgroundColor:'#FFF',top:cao}}/>
        <View style={{height:'100%',justifyContent:'center'}}>
        
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
                  keyExtractor={(item,index) => item.IDCHITIETSP+index}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  extendedState={update}
                  renderFooter={()=>cuoiban}
              />
          </Animated.View>
        
       
          
        {loadRende?
       <View style={{height:'100%',width:'100%',position:'absolute', backgroundColor:'#FFF',top:cao}}>
              <Activity mau={'#FFF'}/> 
       </View>:null}
          </View>
         
          <Animated.View style={{backgroundColor:translateOpycity,position:'absolute', top:translateTop}}>
    
    <ScrollView horizontal={true}
        bounces={false} 
        showsHorizontalScrollIndicator={false}
        ref={(ref)=>setChuyenQuyCach(ref)}
        style={{marginVertical:5}}
        onLayout={()=>chuyenQuyCach.scrollTo({ x: (id.id-2)*105, y: 0, animated: true })}
   >
   {isloading?null:dataMuc.map((item,index)=>
   <TouchableOpacity 
       key={item.id}
       onPress={ item.id==id.id?null:()=>{setID(item),
                 scrollY.setValue(0),
                 chuyen_QuyCach(index),
                 chuyen_BaNe(index)
                 onRefresh(),
                 chuyenlendau()}
               }
       activeOpacity={0.7}
       style={{backgroundColor:item.id==id.id?'rgba(199, 171, 80,0.8)':'#FFF',
               alignItems:'center',
               marginLeft:5,
               borderRadius:5,
               borderWidth:1,
               borderColor:'#D2691E',
               flexDirection:'row', 
               height:40
             }}>
       <Image source={{uri:item.icon}} style={{height:30,width:30,margin:3}}/>
       <Text style={{margin:3,width:70,fontSize:12, color:'#0000FF'}}>{item.ten}</Text>
   </TouchableOpacity>)}
   </ScrollView> 
   </Animated.View>
          </View> 
         
            <DrawerMenNu 
              navigation={navigation}
          />
         <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
      </SafeAreaView>
      
      </View>
   );
}
