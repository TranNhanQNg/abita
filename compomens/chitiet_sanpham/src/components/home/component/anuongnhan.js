
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator,Dimensions,RefreshControl,
ScrollView,Animated} from 'react-native';
import { useSelector} from 'react-redux';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import HeaderB from '../../header/headerB';
import {AnhNen} from '../../dungchung/anhnen';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {RenderDanhMucAnUong} from './renderDanhMucAnUong';
import {RenderSanPham,RenderDanhMuc} from '../../sanpham/renderSanPham';
import {TieudeHome,TieuDeLoc,} from '../../dungchung/tieudeChung';
import {Activity} from '../../dungchung/activityIndicator';
import DrawerMenNu from '../../dungchung/drawermenu';
import {fadeIn,fadeInCT} from '../../dungchung/anima';
import {LenDauTrang} from '../../sanpham/dautrang';
import BaNe from '../../dungchung/bane';
import DanhMucListFooter from '../../sanpham/danhmucListFooter'
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';
  import DinhVi from '../../dungchung/dinhvi'
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};
let { width } = Dimensions.get("window");
export default function SanphamAnUongNhanh ({navigation, route}) { 

  
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const AddFont = useSelector(state => state.cart.AddFont);
    const ViTri = useSelector(state => state.cart.DinhVi);
    const {abita_chung,abita_sanpham} = diachiDaTa; 
    const {loai}=route.params;
    const tendanhmuc = loai.ten;
    const [idDanhMuc,setIdDanhMuc]=useState(loai.api);
    const [Muc,setMuc]=useState('IdDanhMuc');
    const [dataLoaiDanhMuc, setDataLoaiDanhMuc] = useState([]);
    const [loadRende, setLoadRende] = useState(true);
    const [cao, setCao] = useState(400);
    const [dataAll, setDataAll] = useState([]);
    const [trang, setTrang]= useState(2);
    const [morong,setMoRong] =useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [isloading,setLoading]=useState(true);
    const [isloadingdm,setLoadingdm]=useState(true);
    const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
    const chuyenDauTrang = useRef(null);
    const [mauMuc,setMauMuc]=useState(1);
    const [activityCT,setActivityCT]= useState(true);
    const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));
   const [load,setLoad]= useState(false)
   const [tenmuc,settenmuc]=useState('Tất cả')
   const [location, setLocation] = useState(null);
   
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
      if(!isloadingdm&&cao!==400){
      fadeIn(fadeAnim),setLoadRende(false)
    }
    },[isloadingdm,cao,]);

    useEffect(() => {fadeInCT(fadeAnimFlatlist)},[idDanhMuc,refreshing]);
    const animations =()=>{fadeAnimFlatlist.setValue(0)};
    
    const scrollY = useRef(new Animated.Value(0)).current;
//Animater cho danh mục
    const heghtMoRong = useRef(new Animated.Value(150)).current;
    const animatedDong =()=>{
      Animated.timing(
        heghtMoRong,
        {
          toValue: 500,
          duration: 800,
          useNativeDriver:false, 
        }
      ).start(()=>{setMoRong(!morong)});
    };
    const animatedMoRong =()=>{
      
      Animated.timing(
        heghtMoRong,
        {
          toValue: 150,
          duration: 400,
          useNativeDriver:false,
        }
      ).start(()=>setMoRong(true));
    };

    const onpressMoRong =()=>{setMoRong(!morong), updateRecycler({update:!update});}

     // Animation muc
     const translateTop = scrollY.interpolate({
      inputRange:[1,200],
      outputRange:[Platform.OS==='ios'?290:270,Platform.OS==='ios'?90:70],
      extrapolate: 'clamp',
    });
    const translateOpycity = scrollY.interpolate({
      inputRange:[0,210],
      outputRange:['rgba(255,255,255,0)','rgba(80, 199, 199,0.9)'],
      extrapolate: 'clamp',
    });

      useEffect(() => {
        if(Wifi){
          var api_fech = abita_chung+'DanhMucCap2.php?DanhMuc='+idDanhMuc
        var set_then =(res)=>{setDataLoaiDanhMuc(res.data)}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setLoadingdm(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home})
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
          }
          },[Wifi]);

      useEffect(() => {
        if(!loadRende){
            if(Wifi&&soluongdata==0){
              setTimeout(() =>{ fechDaTa()},200)
                }
          fechDaTa1()
          fadeInCT(fadeAnimFlatlist)      
        }
        },[refreshing,Wifi,trang,loadRende,idDanhMuc,ViTri,location]);

      const timestamp = Math.round(new Date().getTime()/1000)
      const fechDaTa=()=>{
        var api =location?'SanPham_AnUong.php?':'SanPham_DanhMuc.php?'
        var api_fech = abita_sanpham+api+'&MaTinh='+MaTinh+'&Trang=1&timestamp='+timestamp
        var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows([1].concat(res.data))),activityCT?setSoLuongDaTa(res.data.length):null}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false),setLoading(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,
                                        Muc:Muc,
                                        IdDanhMuc:idDanhMuc,
                                        latitude:location?location.coords.latitude:null,
                                        longtitude:location?location.coords.longitude:null
                                    })
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      }
      const fechDaTa1=()=>{
        var api =location?'SanPham_AnUong.php?':'SanPham_DanhMuc.php?'
        var api_fech = abita_sanpham+api+'&MaTinh='+MaTinh+'&Trang='+trang+'&timestamp='+timestamp
        var set_then =(res)=>{setDataAll(res.data),setSoLuongDaTaCuoi(res.data.length)}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,
                                        Muc:Muc,
                                        IdDanhMuc:idDanhMuc,
                                        latitude:location?location.coords.latitude:null,
                                        longtitude:location?location.coords.longitude:null
                                    })
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      }

      ///////////
      const [update, updateRecycler] = useState({update: false});
    
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
      },[cao,MaTinh,ViTri]);
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
       load?
           <Animated.View style={{opacity:fadeAnimFlatlist,flex:1,
            }}>   
                <RenderSanPham item={item} navigation={navigation} index={index}/>
                {item.KHOANCACH?
                <View style={{position:'absolute',left:10,top:5,backgroundColor:'rgba(185, 199, 80,0.5)',borderRadius:50}}>
                {item.KHOANCACH<1?
                  <Text numberOfLines ={1} style={{fontSize:11,marginHorizontal:5, fontFamily: 'OpenSans-Italic'}}><Icon name="map-marker-radius" size={12} color={'#50C7C7'} /> {Math.round(item.KHOANCACH*100000)/100} m</Text>:
                  <Text numberOfLines ={1} style={{fontSize:11,marginHorizontal:5, fontFamily: 'OpenSans-Italic'}}><Icon name="map-marker-radius" size={12} color={'#50C7C7'} /> {Math.round(item.KHOANCACH*100)/100} km</Text>
                }
                    
                </View>:null}
          </Animated.View>
        :null
          
                );
              };
      
    

      const Api_Muc =()=> {
                          setTrang(2),
                          setActivityCT(true)
                          setDataProvider(createNewDataProvider().cloneWithRows([1])),
                          setDataAll([]),
                          setSoLuongDaTa(0)
                          setSoLuongDaTaCuoi(1)
                          animations()
                          updateRecycler({update:!update });
                          setRefreshing(!refreshing)
                          
                          };

      const dieuhuong = (item)=>{
                        if(idDanhMuc!==item.IDDANHMUCCAP2){
                          settenmuc(item.TENDANHMUCCAP2)
                          Api_Muc()
                          setMuc('IdDanhMucCap2'),
                          setIdDanhMuc(item.IDDANHMUCCAP2)
                          
                        }
                        }
                  
                        
      const onpressDinhVi=(position)=>{
       if(position!==location){
                          setTrang(2),
                          setActivityCT(true)
                          setDataProvider(createNewDataProvider().cloneWithRows([1])),
                          setDataAll([]),
                          setSoLuongDaTa(0)
                          setSoLuongDaTaCuoi(1)
                          animations()
                          updateRecycler({update:!update });
                          setLocation(position)
                          setRefreshing(!refreshing)
                          setMuc('IdDanhMuc'),
                          setIdDanhMuc(loai.api)
                          settenmuc('Tất cả')
                        }
                     }        
                  
      const soluongmuc =dataLoaiDanhMuc.length;
     
      
      const cuoiban =useMemo(() =>{
        return(
          <View style={{backgroundColor:'#FFF'}}>
          <DanhMucListFooter
            activityCT={activityCT}
            soluongdata={soluongdatacuoi}/>
            <View style={{height:soluongdatacuoi?500:null}}/>
          </View>
          )
      },[activityCT,soluongdatacuoi]);

    const renderDanhmuc =useMemo(()=>dataLoaiDanhMuc.map(item=>
      <View style={{borderWidth:idDanhMuc==item.IDDANHMUCCAP2?1:null,borderRadius:4,borderColor:'#B9C750'}}
      key ={item.IDDANHMUCCAP2} 
      >
      <RenderDanhMucAnUong navigation={navigation} 
                          item={item} 
                          dieuhuong={dieuhuong}
                          tenhinhanh={item.TENHINHANH}
                          tendanhmuc={item.TENDANHMUCCAP2}/>
      </View>
    ),[isloadingdm,dataLoaiDanhMuc,idDanhMuc]);


    const listHeaderDanhMuc = ()=>{
      return(
        <View style={{backgroundColor:'#FFF'}} >
                  {isloadingdm==true?
                    <View style={{flex:1}}>
                      <ActivityIndicator size="large" color="#00ff00" />
                    </View> : 
                    soluongmuc>1?(
                      
                  <ScrollView style={{marginVertical:10,marginLeft:10}}
                      horizontal={morong}
                      showsHorizontalScrollIndicator={false}
                   >
                      <Animated.View
                        style={{
                          flexDirection: 'row',
                          minHeight:0,
                          flexWrap:'wrap',
                         }}
                      >
                        {renderDanhmuc}
                       </Animated.View>
                   </ScrollView>
                    ):<View style={{height:2,backgroundColor:'#C8C8C8'}}/>}
                    
        </View>
        )
     };

    const listHeaderFlatlis = useMemo(()=>{
      return(
        <View style={{marginBottom:2}} >
          <BaNe navigation={navigation} IdMuc={idDanhMuc} TenMuc={'DM'} cao={3.5}/>
        </View>
      )},[])

   
   
    const listHeader = useMemo(()=>{
      
      return(
        <View onLayout={e => {setCao(e.nativeEvent.layout.height)}}
        style={{backgroundColor:'#FFF'}}>
          {listHeaderFlatlis}
        
          {listHeaderDanhMuc()}

        <TieuDeLoc  
                    morong={morong}
                    soluongmuc={soluongmuc}
                    onpressMoRong={onpressMoRong}
                    danhmuc={tendanhmuc}
            />
          <View onLayout= {setLoad(true)}/>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginHorizontal:10}}>
          <Text numberOfLines ={1} style={{flex:1,fontSize:12,marginVertical:20,}}>{tenmuc}</Text>
            <DinhVi mau1={"#228B22"}
                mau2={location?"#50C7C7":'#DC143C'}
                size={18}
                icon ={location?"map-marker-radius":"map-marker-remove"}
                ten={location?null:'Tìm quanh đây'}
                onpress={onpressDinhVi}
                location={location}
                setLocation={setLocation}
            />
       
      </View>
      <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
    </View>)
        
     },[isloadingdm,morong,mauMuc,soluongdata,dataLoaiDanhMuc,activityCT,idDanhMuc,location]);

   
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0&&Wifi&&soluongdata!==0){
                    setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
                    setTrang(trang+1)
                    setActivityCT(true)
                    setRefreshing(!refreshing)
                    }
                  };
    return(   	
     <View style={{flex:1}}>
       <AnhNen />
       <SafeAreaView>
      
    		<HeaderB navigation ={navigation}/>
       
        <View style={{height:'100%',justifyContent:'center',backgroundColor:'#FFF'}}>
        {!isloadingdm?
       
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
                  renderAheadOffset={200}
                  onEndReachedThresholdRelative={0.9}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={true}
                  extendedState={update}
                  renderFooter={()=>cuoiban}
              />
        </Animated.View>:null
       }
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
