
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator,Dimensions,RefreshControl,
ScrollView,Animated} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

import { useSelector} from 'react-redux';
import HeaderF from '../../header/headerF';
import {AnhNen} from '../../dungchung/anhnen';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {RenderSanPham} from '../renderSanPham';
import {Activity} from '../../dungchung/activityIndicator';
import DrawerMenNu from '../../dungchung/drawermenu';
import {fadeIn} from '../../dungchung/anima';
import {LenDauTrang} from '../dautrang';
import DanhMucListFooter from '../../sanpham/danhmucListFooter';
import DanhMuc_ThuongHieu from './component/danhmuc_thuonghieu'
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';


const {width} = Dimensions.get('window')
const createNewDataProvider = () => {
  return new DataProvider((r1, r2) => r1 !== r2);
};

export default function SanPhamThuongHieu ({navigation, route}) { 

  
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const AddFont = useSelector(state => state.cart.AddFont);
    const {abita_chung,abita_sanpham} = diachiDaTa; 
    const {tenthuonghieu} = route.params;
    const [cao, setCao] = useState(100);
    const [dataAll, setDataAll] = useState([]);
    const [morong,setMoRong] =useState(true)
    const [trang, setTrang]= useState(2);
    const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
    const [api, setApi]=useState('CuaHang.php?MaTinh='+MaTinh+'&Trang=');
    const chuyenDauTrang = useRef(null);
    const [mauMuc,setMauMuc]=useState(1);
    const [activityCT,setActivityCT]= useState(true);
    const [dataProvider, setDataProvider] = React.useState(createNewDataProvider().cloneWithRows([1]));

    
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    
    useLayoutEffect(() => {fadeIn(fadeAnim)},[]);
    useLayoutEffect(() => {fadeIn(fadeAnimFlatlist)},[api]);
    const animations =()=>{fadeAnimFlatlist.setValue(0)};
    const scrollY = useRef(new Animated.Value(0)).current;
//Animater cho danh mục
   

      useEffect(() => {
        if(Wifi&&soluongdata==0){
        fechDaTa()
      }
        fechDaTa1()
        },[api,Wifi,trang]);

      const timestamp = Math.round(new Date().getTime()/1000)
      const fechDaTa=()=>{

        var api_fech = abita_sanpham+api+1
        var set_then =(res)=>{setDataProvider(createNewDataProvider().cloneWithRows([1].concat(res.data))),activityCT?setSoLuongDaTa(res.data.length):null}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'ThuongHieu',GiaTriMuc:tenthuonghieu})
        fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      }
      const fechDaTa1=()=>{
        var api_fech = abita_sanpham+api+trang
        var set_then =(res)=>{setDataAll(res.data),setSoLuongDaTaCuoi(res.data.length)}
        var set_catch =()=>{console.log(error)}
        var set_finally =()=>{setActivityCT(false)}
        var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'ThuongHieu',GiaTriMuc:tenthuonghieu})
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
      },[cao,MaTinh]);
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
        <View style={{flex:1, }} >
        {listHeader}
        </View>:
           <Animated.View style={{flex:1,justifyContent: 'center',opacity:fadeAnimFlatlist
            }}>   
                 <RenderSanPham item={item} navigation={navigation} MaTinh={MaTinh} index={index} component={1}/>
          </Animated.View>
                );
              };
      
      const data_muc =[
        {id:1,
          muc:'Tất cả',
          icon:'1',
          api:'Cua_Hang/CuaHang.php?MaTinh='+MaTinh+'&Trang='
        },
        {id:2,
          muc:'Giảm giá',
          icon:'2',
          api:'Cua_Hang/CuaHangGG.php?MaTinh='+MaTinh+'&timestamp='+timestamp+'&Trang='
        },
        {id:3,
          muc:'Bán chạy',
          icon:'3',
          api:'Cua_Hang/SanPham_BanChay.php?MaTinh='+MaTinh+'&Trang='
        },
        {id:4,
          muc:'Hàng mới',
          icon:'4',
          api:'Cua_Hang/SanPham_HangMoi.php?MaTinh='+MaTinh+'&Trang='
        }
      ];

      const Api_Muc =(item)=> {
                          setTrang(2),
                          setActivityCT(true),
                          setDataProvider(createNewDataProvider().cloneWithRows([1])),
                          setDataAll([]),
                          setSoLuongDaTa(0)
                          setSoLuongDaTaCuoi(1)
                          setMauMuc(item.id),
                          setApi(item.api)
                          updateRecycler({update:!update });
                          };
   
      const cuoiban =() =>{
        return(
          <View style={{backgroundColor:'#FFF'}}>
          <DanhMucListFooter
            activityCT={activityCT}
            soluongdata={soluongdatacuoi}/>
            <View style={{height:soluongdata?null:500}}/>
          </View>
          )
      };



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
            onPress={mauMuc==item.id?()=>null:()=>{Api_Muc(item),animations()}}
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
        
          <View onLayout={e => {setCao(e.nativeEvent.layout.height) }}>
            <View style={{alignItems:'center',flexDirection:'row'}}>
            <View style={{height:70,width:70, borderColor:'#FFF', borderWidth:1, borderRadius:100,margin:5}}>

            </View>
              <View style={{backgroundColor:'rgba(105,105,105,.5)', alignItems:'center',marginVertical:5,borderRadius:5,marginLeft:10}}>
                <Text style={{fontSize:20,marginHorizontal:10,marginVertical:5,color:'#FA8072'}}>{tenthuonghieu}</Text>
              </View>
            </View>
            <View style={{backgroundColor:'#FFFFFF'}}>
              {/* <DanhMuc_ThuongHieu navigation={navigation}
                              MaTinh={MaTinh}
                              GiaTriMuc={tenthuonghieu}
                              Muc='ThuongHieu'
                              setMoRong={setMoRong}
                              morong={morong}
                              /> */}
            </View>
              {_Muc()}
         </View>      
        )
      },[mauMuc]);
  
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0&&Wifi){
                    setDataProvider(createNewDataProvider().cloneWithRows(dataProvider._data.concat(dataAll))),
                    setTrang(trang+1)
                    setActivityCT(true)
                    }
                  };
    return(   	
     <View style={{flex:1}}>
       <AnhNen />
       <SafeAreaView>
       <HeaderF navigation={navigation} item={'Thương hiệu'}/>
        <View style={{height:'100%',justifyContent:'center'}}>
        <Animated.View style={{flex:1,opacity:fadeAnim,}}>
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
                  renderFooter={()=>cuoiban()}
              />
          </Animated.View>
          </View>
          <DrawerMenNu 
              navigation={navigation}
          />
          </SafeAreaView>
         <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>

      </View>
   );
}
