
import React, { useLayoutEffect,useState,useRef,useEffect,useMemo } from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,ActivityIndicator, Image,RefreshControl,
ScrollView,Animated} from 'react-native';
import { useSelector} from 'react-redux';
import HeaderF from '../../header/headerF';
import {AnhNen} from '../../dungchung/anhnen';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {RenderSanPham,RenderDanhMuc} from '../renderSanPham';
import {TieuDeLoc} from '../../dungchung/tieudeChung';
import {Activity} from '../../dungchung/activityIndicator';
import DrawerMenNu from '../../dungchung/drawermenu';
import fadeIn from '../../dungchung/anima';
import {LenDauTrang} from '../dautrang';
import DanhMucListFooter from '../danhmucListFooter';
import axios from 'axios';




export default function SanPhamDM_TH ({navigation, route}) { 

  
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const {abita_amin} = diachiDaTa; 
    const {idDanhMuc,GiaTriMuc} = route.params;
    const [dataLoaiDanhMuc, setDataLoaiDanhMuc] = useState([]);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [trang, setTrang]= useState(2);
    const [morong,setMoRong] =useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [isloading,setLoading]=useState(true);
    const [isloadingdm,setLoadingdm]=useState(true);
    const [soluongdata,setSoLuongDaTa] =useState(1);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(1);
    const [api, setApi]=useState('SanPhamDM_CH.php?');
    const chuyenDauTrang = useRef(null);
    const [mauMuc,setMauMuc]=useState(1);
    const [activityCT,setActivityCT]= useState(true);
    
   
    //animated
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeAnimFlatlist = useRef(new Animated.Value(0)).current;
    
    useLayoutEffect(() => {fadeIn(fadeAnim)},[]);
    useLayoutEffect(() => {fadeIn(fadeAnimFlatlist)},[api]);
    const animations =()=>{fadeAnimFlatlist.setValue(0)};
    const scrollY = useRef(new Animated.Value(0)).current;

      useEffect(() => {
        if(Wifi&&data.length==0){
        fechDaTa()}
        fechDaTa1()
        },[refreshing,api,Wifi,trang]);

       
      const fechDaTa=()=>{
        axios.post(abita_amin+api+"MaTinh="+MaTinh,
            JSON.stringify({
              Trang:1,
              IdDanhMuc:idDanhMuc,
              GiaTriMuc:GiaTriMuc,
              Muc:'ThuongHieu',
              timestamp:timestamp

            })
        )
        .then((response) => {setData(response.data),activityCT?setSoLuongDaTa(response.data.length):null,setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      const fechDaTa1=()=>{
        axios.post(abita_amin+api+"MaTinh="+MaTinh, 
            JSON.stringify({
              Trang:trang,
              IdDanhMuc:idDanhMuc,
              GiaTriMuc:GiaTriMuc,
              Muc:'ThuongHieu',
              timestamp:timestamp
            })
        )
        .then((response) => {setData1(response.data),setSoLuongDaTaCuoi(response.data.length),setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }
      
      const data_muc =[
        {id:1, muc:'Tất cả', icon:'1',api:'SanPhamDM_CH.php?'},
        {id:2,muc:'Giảm giá', icon:'2',api:'SanPhamDM_CH_GG.php?'}
      ];
      const timestamp = Math.round(new Date().getTime()/1000)
      const Api_Muc =(item)=> {
                          setTrang(2),
                          setActivityCT(true)
                          setData([]),
                          setData1([]),
                          setMauMuc(item.id),
                          setApi(item.api)
                          
                          };
     
      const onRefresh = () => {
                            setTrang(2)
                            setData([]),
                            setData1([]),
                            setRefreshing(!refreshing),
                            setActivityCT(true)
                          };
     
    
      
          const cuoiban =() =>{
            return(
              <View style={{backgroundColor:'#FFF',flex:1}}>
              <DanhMucListFooter
                activityCT={activityCT}
                soluongdata={soluongdatacuoi}/>
                <View style={{height:500}}/>
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
        <View style={{marginBottom:1,backgroundColor:'#FFF'}}>

        { _Muc()}
          
        </View>)
     },[isloadingdm,morong,mauMuc,soluongdata,dataLoaiDanhMuc,activityCT]);
  // Hàm cho flatlist
  const renderItemCon=({ item }) => (
    
   <Animated.View style={{opacity:fadeAnimFlatlist,backgroundColor:'#D3D3D3',
                          justifyContent: 'center'
                          }}>
                          
      <RenderSanPham item={item} navigation={navigation}/>
     
      </Animated.View>
  );
  
  const onEndReached=()=>{
                  if(!activityCT&&soluongdatacuoi!==0&&Wifi){
                    setData(data.concat(data1))
                    setTrang(trang+1)
                    setActivityCT(true)
                    setRefreshing(!refreshing)
                    }
                  };
    return(   	
     <View style={{flex:1}}>
       <AnhNen />
       <SafeAreaView>
       <HeaderF navigation={navigation} item={GiaTriMuc}/>
        <View style={{height:'100%',justifyContent:'center',backgroundColor:'#D3D3D3',}}>
        {isloading?<Activity mau={'#FFF'}/> : (
        <Animated.FlatList
        style={{flex:1,opacity:fadeAnim,marginHorizontal:2}}
          data={data}
         renderItem ={renderItemCon}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={isloading}  onRefresh={onRefresh}/>
            }
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y:scrollY}}}],
              {useNativeDriver:false}
            )}
            keyExtractor={(item) => item.IDCHITIETSP}
            ref={chuyenDauTrang}
            numColumns={2}
            ListHeaderComponent={listHeader}
            ListFooterComponent={cuoiban}
            horizontal={false}
            bounces = {false}
           />
       
        )}
          </View>
          <DrawerMenNu 
              navigation={navigation}
          />
          </SafeAreaView>
         <LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={28}/>
      </View>
   );
}
