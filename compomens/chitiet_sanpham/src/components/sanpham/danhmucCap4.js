import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator, Image,RefreshControl,
ScrollView,Animated,Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import { useSelector} from 'react-redux';
import HeaderB from '../header/headerB';
import {AnhNen} from '../dungchung/anhnen';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {RenderSanPham} from './renderSanPham';
import {Activity} from '../dungchung/activityIndicator';
import {fadeIn,fadeInCT} from '../dungchung/anima';
import {LenDauTrang} from './dautrang';
import DrawerMenNu from '../dungchung/drawermenu';
// import MasonryList from '@react-native-seoul/masonry-list';
import BaNe from '../dungchung/bane';
import DanhMucListFooter from './danhmucListFooter'
import {MD5,fechDaTa_Axios} from '../dungchung/fech_data';

const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};
let { width } = Dimensions.get("window");

export default function SanphamDanhMuc ({navigation, route}) { 

  
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const AddFont = useSelector(state => state.cart.AddFont);
    const {hinhanhsanpham,abita_chung,abita_sanpham, hinhanh} = diachiDaTa; 
    const { tendanhmuc,idDanhMuc} = route.params;
    const [loadRende, setLoadRende] = useState(true);
    const [dataAll, setDataAll] = useState([]);
    const [trang, setTrang]= useState(2);
    const [isloading,setLoading]=useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
    const [api, setApi]=useState('SanPham_DanhMuc.php?');
    const chuyenDauTrang = useRef(null);
    const [mauMuc,setMauMuc]=useState(1);
    const [activityCT,setActivityCT]= useState(true);
    const [cao, setCao] = useState(300);
    const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));
    
   
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      if(cao!==300){
      setTimeout(() =>{fadeIn(fadeAnim),setLoadRende(false)}, 30)
    }
    },[isloading,cao]);
    useLayoutEffect(() => {fadeInCT(fadeAnimFlatlist)},[api]);
    const animations =()=>{fadeAnimFlatlist.setValue(0)};
    const scrollY = useRef(new Animated.Value(0)).current;

   
    useEffect(() => {
      if(!loadRende){
          if(Wifi&&soluongdata==0){
            setTimeout(() =>{ fechDaTa()},200)
              }
        fechDaTa1()       
      }
      },[refreshing,api,Wifi,trang,loadRende]);
       
      const timestamp = Math.round(new Date().getTime()/1000)

      const fechDaTa=()=>{
        var api_fech = abita_sanpham+api+idDanhMuc+'&MaTinh='+MaTinh+'&Trang=1'+'&timestamp='+timestamp
        var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows([1].concat(res.data))),activityCT?setSoLuongDaTa(res.data.length):null}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false),setLoading(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'IdDanhMucCap3',IdDanhMuc:idDanhMuc})
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      }
      const fechDaTa1=()=>{
        var api_fech = abita_sanpham+api+idDanhMuc+'&MaTinh='+MaTinh+'&Trang='+trang+'&timestamp='+timestamp
        var set_then =(res)=>{setDataAll(res.data),setSoLuongDaTaCuoi(res.data.length)}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false),setLoading(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'IdDanhMucCap3',IdDanhMuc:idDanhMuc})
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
      },[MaTinh,cao]);
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
        <View  >
        {listHeader}
       
        </View>:
         
           <Animated.View style={{opacity:fadeAnimFlatlist,flex:1,
            justifyContent: 'center'
            }}>   
                <RenderSanPham item={item} navigation={navigation} index={index}/>
          </Animated.View>
                );
              };
      const data_muc =[
        {id:1, muc:'Tất cả', icon:'1',api:'SanPham_DanhMuc.php?'},
        {id:2,muc:'Giảm giá', icon:'2',api:'SanPham_DanhMucGG.php?'},
        {id:3, muc:'Bán chạy', icon:'1',api:'SanPham_BanChay.php?'},
        {id:4,muc:'Hàng mới', icon:'2',api:'SanPham_HangMoi.php?'}
      ];

      const Api_Muc =(item)=> {
                          setTrang(2),
                          setActivityCT(true)
                          setDataAll([]),
                          setDataProvider(createNewDataProvider().cloneWithRows([1])),
                          setMauMuc(item.id),
                          setApi(item.api),
                          setSoLuongDaTa(0)
                          setSoLuongDaTaCuoi(1)
                          animations()
                          updateRecycler({update:!update });
                          };
     
     
    const cuoiban =useMemo(() =>{
      return(
        <View style={{backgroundColor:'#FFF'}}>
        <DanhMucListFooter
          activityCT={activityCT}
          soluongdata={soluongdatacuoi}/>
          {soluongdata?null:
            <View style={{height:500}}/>
          }
        </View>
        )
    },[activityCT,soluongdatacuoi,soluongdata]);

    const renderBane =useMemo(()=>
              <View >
                <BaNe navigation={navigation} IdMuc={idDanhMuc} TenMuc={'DM_Cap3'} cao={3.5}/>
            </View>
    ,[]);

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
   
    const listHeader = useMemo(()=>{
      return(
        <View style={{backgroundColor:'#FFF'}} onLayout={e => {setCao(e.nativeEvent.layout.height) }}>
          {renderBane}
        {_Muc()}
        </View>
        )
      },[mauMuc]);
  
  // Hàm cho flatlist
 
  const onEndReached=()=>{
            if(!activityCT&&soluongdatacuoi!==0&&Wifi&&soluongdata!==0){
              setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
                    setTrang(trang+1)
                    setActivityCT(true)
                    }
                  };
    return(   	
      <View style={{flex:1}}>
      <AnhNen />
      <SafeAreaView>
       <HeaderB navigation ={navigation}/>
       <View style={{height:'100%',justifyContent:'center',backgroundColor:'#FFF'}}>
      
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
                  onEndReachedThresholdRelative={0.9}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  scrollEventThrottle={16}
                  extendedState={update}
                  renderFooter={()=>cuoiban}
              />
        </Animated.View> 
       {loadRende?
       <View style={{height:'100%',width:'100%',position:'absolute', backgroundColor:'red'}}>
          <Activity mau={'#FFF'}/> 
       </View>:null}
         </View>
         <DrawerMenNu 
             navigation={navigation}
         />
         </SafeAreaView>
        <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
     </View>
   );
}
