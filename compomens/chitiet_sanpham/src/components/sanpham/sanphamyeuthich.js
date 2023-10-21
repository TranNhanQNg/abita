
import React,{useState,useRef,useLayoutEffect,useEffect} from 'react';
import { Text, View,FlatList, SafeAreaView,Image} from 'react-native';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {Activity} from '../dungchung/activityIndicator';
import HeaderB from '../header/headerB';
import {RenderItemTimKiem} from './renderSanPham';
import {AnhNen} from '../dungchung/anhnen';
import  LikeSanPham from './chitietsanpham/component/likesanpham'
import {useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import DanhMucListFooter from './danhmucListFooter'
import {MD5,fechDaTa_Axios} from '../dungchung/fech_data';

const{ abita_sanpham,hinhanh}=diachiDaTa;

export default function SanPhamYeuThich ({navigation}) {

  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const MaUid = useSelector(state => state.cart.MaUid);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const Wifi = useSelector(state => state.cart.Wifi);
  const [data,setData]=useState([]);
  const [data1, setData1] = useState([]);
  const [trang,setTrang]=useState(2);
  const [isloading,setLoading]=useState(true);
  const [soluongdata,setSoLuongDaTa] =useState(0);
    const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
    const [activityCT,setActivityCT]= useState(true);

  useEffect(() => {
    if(Wifi&&soluongdata==0){
      fechDaTa()
      }
      fechDaTa1()
    },[Wifi,trang]);

  const fechDaTa =()=>{
    var api_fech = abita_sanpham+'SanPhamYeuThich.php?MaTinh='+MaTinh+'&MaUid='+MaUid+'&Trang='+1
    var set_then =(res)=>{setData(res.data),setSoLuongDaTa(res.data.length)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }
  const fechDaTa1=()=>{
    var api_fech = abita_sanpham+'SanPhamYeuThich.php?MaTinh='+MaTinh+'&MaUid='+MaUid+'&Trang='+trang
    var set_then =(res)=>{setData1(res.data),setSoLuongDaTaCuoi(res.data.length)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false),setActivityCT(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }

  const onEndReached=()=>{
    if(!activityCT&&soluongdatacuoi!==0&&Wifi&&soluongdata!==0){
      setData(data.concat(data1))
      setTrang(trang+1)
      setActivityCT(true)
      }
    };
  const renderItem=({ item }) => {
    const ton = item.SOLUONGTON*1-item.TONG*1+item.TONGNHAP*1-item.TONGXUAT*1;
   return(
    <View>
      <View >
        <RenderItemTimKiem item={item} navigation={navigation}/>
        {/* <View style={{position:'absolute',right:5,bottom:15}}>
          <LikeSanPham chitiet={item}/>
        </View> */}
       </View>
       {ton<1?
          <Text style={{marginLeft:10,color:'red',position:'absolute',backgroundColor:'#ADD8E6'}}> Hết hàng</Text>
          :null
       } 
    </View>
   )
   };

   const listHeader = ()=>{
    return(
      <View style={{flexDirection:'row',backgroundColor:'#F0FFF0',alignItems:'center',height:40}}>
      <Image source={{uri:hinhanh+'icon/icon/heart.png'}} style={{height:25,width:25,marginLeft:20}}/>
       <Text style={{color:'#696969'}}> Sản phẩm yêu thích</Text>
      </View>
    )}
  const ListFooter =()=>{
    return(
      <View style={{backgroundColor:'#FFF'}}>
      <DanhMucListFooter
        activityCT={activityCT}
        soluongdata={soluongdatacuoi}/>
      </View>
      )
  }
     return (
       <View>
          <AnhNen 
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
            <SafeAreaView >
                       <HeaderB navigation={navigation}/>
                     {isloading?<Activity/>: 
                     <View style={{backgroundColor:'#FFF'}}>
                    <FlatList 
                    style={{}}
                      data={data}
                      renderItem={renderItem} 
                     
                      keyExtractor={(item) => item.IDCHITIETSP}
                      ListHeaderComponent={listHeader}
                      ListFooterComponent={ListFooter}
                      showsVerticalScrollIndicator={false}
                      removeClippedSubviews={true}
                      onEndReachedThreshold={0.5}
                      onEndReached={onEndReached}
                      />
                      
                </View>
                }
            </SafeAreaView>
            </View>
           
     
     
    );
  }