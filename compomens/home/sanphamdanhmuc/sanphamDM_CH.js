
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,Dimensions, Image,RefreshControl,
ScrollView,Animated} from 'react-native';
import { useLocalSearchParams } from 'expo-router';


import {AnhNen} from '../../dungchung/anhnen';
import api from '../../api/api';
import  {Render_SanPham} from "../cua_hang/components/render_sanpham";
import {Activity} from '../../dungchung/activityIndicator';

import {fadeIn} from '../../dungchung/anima';
import {LenDauTrang} from "../../chitiet_sanpham/nhom/dautrang";
// import DanhMucListFooter from '../danhmucListFooter';
import {HeaderCT} from '../../header/headerCT';
import TenCuaHang from "../cua_hang/components/tencuahang";
import { Heigth_Width } from '../../api/heigth_width';
import { MD5,fechDaTa_Axios } from "../../api/fech_data";
import axios from 'axios';
const cot =Heigth_Width.cot



const {abita_amin,abita_sanpham} = api; 
export default function SanPhamDM_CH () { 
  const params = useLocalSearchParams();
  const {mauidNCC,iddanhmuc,matinh,ten} = params;
  const url = window.location.href
  function getQueryParams(url) {
    const paramArr = url.slice(url.indexOf('?') + 1).split('&');
    const params = {};
    paramArr.map(param => {
        const [key, val] = param.split('=');
        params[key] = decodeURIComponent(val);
    })
    return params;
  }
  
  const MaTinh =getQueryParams(url).matinh?getQueryParams(url).matinh:matinh;
  const idDanhMuc =getQueryParams(url).iddanhmuc?getQueryParams(url).iddanhmuc:iddanhmuc
  const MaUidNCC =getQueryParams(url).mauidNCC?getQueryParams(url).mauidNCC:mauidNCC
  const tenmuc=getQueryParams(url).mauidNCC?getQueryParams(url).ten:ten

    const [trang, setTrang]= useState(2);
    const [cao, setCao] = useState(50);
    const [dataAll, setDataAll] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isloading,setLoading]=useState(true);
    const [isloadingdm,setLoadingdm]=useState(true);
    const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
    const [api, setApi]=useState('Cua_Hang/SanPhamDM_CH.php?');
    const chuyenDauTrang = useRef(null);
    const [mauMuc,setMauMuc]=useState(1);
    const [activityCT,setActivityCT]= useState(true);
    const [dataProvider, setDataProvider] = useState([]);
    const [dataAnh, setDataAnh] = useState({});
   
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    
    useLayoutEffect(() => {fadeIn(fadeAnim)},[]);
    useLayoutEffect(() => {fadeIn(fadeAnimFlatlist)},[api]);
    const animations =()=>{fadeAnimFlatlist.setValue(0)};
    const scrollY = useRef(new Animated.Value(0)).current;

    const FechtAnhCH =()=>{
      var api_fech = abita_amin+'AnhCuaHang.php?MaTinh='+MaTinh
      var set_then =(res)=>{ setDataAnh(res.data)}
      var set_catch =(error)=>{console.log(error)}
      var set_finally =()=>{}
      var data_fech = JSON.stringify({
        KiemTra:MD5.home,
        IdMuc:MaUidNCC,
        TenMuc:'MaUidNCC'
      })
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
    };
    useEffect(() => {
      FechtAnhCH()
      },[MaUidNCC]);

      const fechDaTa=()=>{
        axios.post(abita_sanpham+api+"MaTinh="+MaTinh,
            JSON.stringify({
              Trang:1,
              IdDanhMuc:idDanhMuc,
              GiaTriMuc:MaUidNCC,
              Muc:'MaUidNCC',
              timestamp:timestamp

            })
        )
        .then((response) => {setDataProvider(response.data),activityCT?setSoLuongDaTa(response.data.length):null,setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      useEffect(() => {
       
        fechDaTa()
        
        },[refreshing,api,trang,MaTinh,MaUidNCC,idDanhMuc]);

       
   
      const fechDaTa1=()=>{
        axios.post(abita_sanpham+api+"MaTinh="+MaTinh, 
            JSON.stringify({
              Trang:trang,
              IdDanhMuc:idDanhMuc,
              GiaTriMuc:MaUidNCC,
              Muc:'MaUidNCC',
              timestamp:timestamp
            })
        )
        .then((response) => {setDataAll(response.data),setSoLuongDaTaCuoi(response.data.length),setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      


    
  
    // const renderList = (type, item, index) => {
    //   return (
    //     item ===1?
    //     <View style={{flex:1, }} >
    //     {listHeader}
    //     </View>:
    //        <Animated.View style={{flex:1,justifyContent: 'center',opacity:fadeAnimFlatlist
    //         }}>   
    //              <RenderSanPham item={item} navigation={navigation} MaTinh={MaTinh} index={index} component={1}/>
    //       </Animated.View>
    //             );
    //           };
      const data_muc =[
        {id:1, muc:'Tất cả', icon:'1',api:'Cua_Hang/SanPhamDM_CH.php?'},
        {id:2,muc:'Giảm giá', icon:'2',api:'Cua_Hang/SanPhamDM_CH_GG.php?'}
      ];
      const timestamp = Math.round(new Date().getTime()/1000)
      const Api_Muc =(item)=> {
                          setTrang(2),
                          setActivityCT(true)
                          setDataProvider([]),
                          setDataAll([]),
                          setMauMuc(item.id),
                          setApi(item.api),
                          setSoLuongDaTa(0),
                          setSoLuongDaTaCuoi(1)
                          
                          };
     
      const onRefresh = () => {
                            setTrang(2)
                            setDataProvider([]),
                            setDataAll([]),
                            setRefreshing(!refreshing),
                            setActivityCT(true)
                          };
     
    
      
          const cuoiban =() =>{
            return(
              <View style={{backgroundColor:'#FFF',flex:1}}>
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
            style={{marginLeft:10, width:80}}
            >
            <View style={{margin:5, width:80,height:40,alignItems:'center',justifyContent:'center',borderBottomWidth:2,marginVertical:5,borderBottomColor:mauMuc==item.id?'red':'#FFF'}}>
              <Text style={{color:mauMuc==item.id?'blue':'#000',fontFamily: 'OpenSans-Regular'}}>{item.muc}</Text>
            </View>
            </TouchableOpacity>)}
          </ScrollView>
          <View style={{height:1,backgroundColor:'#D3D3D3'}}/>
        </View>
        )
      }
    
    const listHeader = useMemo(()=>{
      return(
        <View style={{marginBottom:1,backgroundColor:'#FFF',}} onLayout={e => {setCao(e.nativeEvent.layout.height) }}>

        {/* { _Muc()} */}
        <View style={{backgroundColor:'#F5F5F5',height:1}}/>
        </View>)
     },[mauMuc,soluongdata,activityCT]);
  // Hàm cho flatlist
  
  
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0){
                    setDataProvider(dataProvider.concat(dataAll)),
                    setTrang(trang+1)
                    setActivityCT(true)
                    setRefreshing(!refreshing)
                    }
                  };
    return(   	
     <View style={{flex:1, backgroundColor:'#FFF'}}>

       <SafeAreaView style={{flex:1}}>
        <View style={{flex:1,justifyContent:'center',marginTop:Heigth_Width.width/3}}>
        {isloading?<Activity mau={'#FFF'}/> : (
          <FlatList contentContainerStyle={{alignItems:'center',flex:1}}
          data={dataProvider}
          renderItem={({item}) => <Render_SanPham item={item}/>}
          keyExtractor={item => item.IDCHITIETSP}
          numColumns={cot}
                ref={chuyenDauTrang}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y:scrollY}}}],
                  {useNativeDriver:false}
                  )}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
              />
       
        )}
          </View>
          </SafeAreaView>
         
         <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
         <View style={{flexDirection:'row',justifyContent:'space-between',width:Heigth_Width.width_tong,backgroundColor:'#50C7C7',alignItems:'center',position:'absolute'}}>
        <TenCuaHang         
                  tencuahang={dataAnh.TenCuaHang}
                  dataAnh={dataAnh}
                  
                  MaUidNCC={MaUidNCC}
                  MaTinh={MaTinh}
                  navigation={navigation}
                  dienthoaincc={'0935188609'}
                  /> 
    <Text style={{color:'#FFF'}}>{tenmuc}</Text>
       <HeaderCT navigation ={navigation} 
                  
                  dataAnh={dataAnh}
            />
        </View>
      </View>
   );
}
