
import React, {useState,useRef,useLayoutEffect ,useEffect,ActivityIndicator,useMemo} from 'react';
import api from "../../api/api";
import { Link } from 'expo-router';
import { MD5,fechDaTa_Axios } from "../../api/fech_data";
import { View,Text,FlatList, Image,Dimensions,Platform,Animated,ImageBackground,ScrollView,TouchableOpacity,Pressable} from "react-native";
import {HeaderCT} from '../../header/headerCT';
import { Heigth_Width } from "../../api/heigth_width";
import  {Render_SanPham} from "./components/render_sanpham";
import TenCuaHang from "./components/tencuahang";
import {LenDauTrang} from "../../chitiet_sanpham/nhom/dautrang";
import Render_GoiY from './components/render_goiy';
import Swiper_Bane from './components/nhom/swiper_bane';
import {Activity} from '../../dungchung/activityIndicator'
import DanhMucListFooter from '../../dungchung/danhmucListFooter';
const {abita_sanpham,hinhanh,abita_amin,hinhanhsanpham}=api; 
let { width,height } = Dimensions.get("window");
import DanhMucCuaHang from './components/danhmuccuahang';
import { ThongTin_CuaHang } from './components/thongtincuahang';
import Muc from './components/muc';
const timestamp = Math.round(new Date().getTime()/1000)
const mobi =Heigth_Width.mobi;
export default function Cua_Hang({MaTinh,MaUidNCC}) {

const dienthoaincc ='0935188609'
const [data, setDaTa] = useState([1]);
const [data1, setDaTa1] = useState([]);
const [dataGiamGia, setDaTaGiamGia] = useState([]);
const [trang, setTrang] = useState(2);
const [dataAnh, setDataAnh] = useState({});
const [cao_header, setCao_header] = useState(400);
const [tile_Image,settile_Image]=useState(0);
const [isload,setisload]=useState(false);
const [mauMuc,setMauMuc]=useState(1)
const [api_sp, setApi_sp]=useState('Cua_Hang/CuaHang.php?MaTinh='+MaTinh+'&Trang=');
const [data_Muc, setDaTa_Muc]=useState({Muc:'MaUidNCC',GiaTriMuc:MaUidNCC,KiemTra:MD5.home})
const [soluongdata,setSoLuongDaTa] =useState(0);
const [modalVisible, setModalVisible] = useState(false);
const [isloading,setLoading]=useState(true);
  const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
  const [mau, setmau]=useState('600');
  const [activityCT,setActivityCT]= useState(true);
  const chuyenDauTrang = useRef(null);

const cot = Heigth_Width.width_tong<629?2:6
const cao = Heigth_Width

const time_hientai = Math.round(new Date().getTime()/1000)
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
const apiAnh='https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952_1280.jpg'


const FechtAnhCH =()=>{
  var api_fech = abita_amin+'AnhCuaHang.php?MaTinh='+MaTinh
  var set_then =(res)=>{ setDataAnh(res.data?res.data:{AnhNen:apiAnh}),getAnh(res)}
  var set_catch =(error)=>{console.log(error),setDataAnh({AnhNen:apiAnh})}
  var set_finally =()=>{setisload(true)}
  var data_fech = JSON.stringify({
    KiemTra:MD5.home,
    IdMuc:MaUidNCC,
    TenMuc:'MaUidNCC'
  })
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
};
const fechtdataGiamGia =()=>{
  var api_fech = abita_sanpham+'Cua_Hang/SanPham_BanChay.php?MaTinh='+MaTinh+'&Trang='+timestamp+'&Trang=1'
  var set_then =(res)=>{setDaTaGiamGia(res.data)}
  var set_catch =(error)=>{console.log(error.response.data)}
  var set_finally =()=>{null}
  var data_fech = JSON.stringify({  KiemTra:MD5.home,
                                    GiaTriMuc:MaUidNCC,
                                    Muc:'MaUidNCC'})
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}
const fechtdata =(res)=>{
  var api_fech = abita_sanpham+api_sp+1
  var set_then =(res)=>{setDaTa(res.data),setSoLuongDaTa(res.data.length)}
  var set_catch =(error)=>{console.log(error.response.data)}
  var set_finally =()=>{setActivityCT(false),setLoading(false)}
  var data_fech = JSON.stringify(data_Muc)
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}

const fechtdata1 =()=>{
  var api_fech = abita_sanpham+api_sp+trang
  var set_then =(res)=>{setDaTa1(res.data),setSoLuongDaTaCuoi(res.data.length)}
  var set_catch =(error)=>{console.log(error.response.data)}
  var set_finally =()=>{setActivityCT(false)}
  var data_fech = JSON.stringify(data_Muc)
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}
useEffect(() => {
  FechtAnhCH()
  }, []);
 
  useEffect(() => {
    if(soluongdata==0){
      fechtdata()
      fechtdataGiamGia()
    }
    fechtdata1()
    }, [trang,api_sp]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnimScroll = useRef(new Animated.Value(0)).current;
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

  const getAnh=(res)=>{
    if(res.data.AnhNen==''||res.data.AnhNen==null){
    Image.getSize(apiAnh, (width, heigth) => {
      settile_Image(heigth/width)
    }, (error) => {
      console.error(error);
    })}
  else{
    Image.getSize(hinhanh+'slileApp/'+res.data.AnhNen, (width, heigth) => {
      settile_Image(heigth/width)
    }, (error) => {
      console.error(error);
    })
  }
  };

  const onEndReached=()=>{
    if(!activityCT&&soluongdatacuoi!==0&&soluongdata!==0){
      setDaTa(data.concat(data1)),
      setTrang(trang+1)
      setActivityCT(true)
      }
    };

    const Api_Muc =(item)=> {
      setActivityCT(true)
      setTrang(2),
      setDaTa([]),
      setDaTa1([]),
      setSoLuongDaTa(0)
      setMauMuc(item.id),
      setApi_sp(item.api),
      setDaTa_Muc(item.data)
      animations()
      };

_Muc = ()=>{
  return(
    <View style={{alignItems:'center', backgroundColor:'#E0FFFF'}}>
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    style={{}}
    >
      {data_muc.map(item=>
     <Muc item={item} mauMuc={mauMuc} cot={cot} Api_Muc={Api_Muc} key={item.id}/>)}
      </ScrollView>
      <View style={{height:5,backgroundColor:'#D3D3D3'}}/>
    </View>
  )
}

const anh =()=>{
  return(
    <Swiper_Bane anhch={JSON.parse(dataAnh.AnhCH)} cot={cot}/>
      )
    }

const danhmuc =()=>{
  return(
    <View style={{marginBottom:5}}>
      <View style={{ marginTop:5}}>
        <Text style={{marginVertical:10}}>Danh mục</Text>
      </View>
        <DanhMucCuaHang 
              navigation={navigation}
              MaTinh={MaTinh}
              GiaTriMuc={dataAnh.MaUidNCC}
              Muc='MaUidNCC'
              dataAnh={dataAnh}
        />
    </View>
  ) };
  const listHeader = ()=>{
    return(
      <View  
      style={{backgroundColor:'#FFF',width:Heigth_Width.width*cot*1.001}}>
        {/* <Animated.View style={{alignItems:'center' }}>
          <Image source={{uri:!dataAnh.AnhNen||dataAnh.AnhNen==''||dataAnh.AnhNen==null?apiAnh:hinhanh+'slileApp/'+ dataAnh.AnhNen}}
                style={{width:Heigth_Width.width*cot*1.005-25,height:height/3,resizeMode:'stretch',borderRadius:5,margin:20,}}
              >
            </Image>
         
        </Animated.View> */}
           <View style={{marginTop:3}}>
             {/* {!dataAnh.AnhCH||dataAnh.AnhCH==''||dataAnh.AnhCH==null?null:
          <Swiper_Bane anhch={JSON.parse(dataAnh.AnhCH)}/>
          } */}
        
         </View>
         {
          isload?
          <Swiper_Bane anhch={JSON.parse(dataAnh.AnhCH)} cot={cot}/>
          :null
         }
         

      {mobi=="mobi"? 
         danhmuc()
          :null
          
          }
     
       {_Muc()}   
       </View>  
      )
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
  return (
    <View style={{flex:1}}>    

<View style={{flex:1,flexDirection:'row', justifyContent:'center',marginTop:Heigth_Width.width/4+10}}>
{cot==6?
<ScrollView showsHorizontalScrollIndicator={false}
  style={{flex:1,borderColor:'#E8E8E8',borderWidth:1, borderRadius:6, margin:3, backgroundColor:'#FFF'}}>
 <TouchableOpacity style={{marginTop:10,marginLeft:5}}
 onPress={()=>setModalVisible(true)}>
    <Text>Giới thiệu</Text>
  </TouchableOpacity>
<View style={{backgroundColor:'#F5F5F5', marginTop:10}}>
<Text style={{margin:3,fontWeight:'600'}}>Danh mục sản phẩm</Text>
</View>

<DanhMucCuaHang 
                  navigation={navigation}
                  MaTinh={MaTinh}
                  GiaTriMuc={dataAnh.MaUidNCC}
                  Muc='MaUidNCC'
                  dataAnh={dataAnh}
                  // morong={morong}
                  // setMoRong={setMoRong}
            />
  
</ScrollView>
:null  }
{!isloading?
<View style={{backgroundColor:'#FFF',alignItems:'center'}}>
       <FlatList 
        data={data}
        renderItem={({item}) => <Render_SanPham item={item}/>}
        keyExtractor={item => item.IDCHITIETSP}
        numColumns={cot}
        horizontal={false}
        ListHeaderComponent={listHeader()}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThresholdRelative={0.5}
        ref={chuyenDauTrang}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y:scrollY}}}],
                  {useNativeDriver:false}
                  )}
        ListFooterComponent={()=>cuoiban}
      />
      </View>
      :
      <View style={{width:Heigth_Width.width*cot, backgroundColor:'#FFF',top:cao}}>
              <Activity mau={'#FFF'}/> 
       </View>
    }
{cot==6?
<View style={{flex:1,borderColor:'#E8E8E8',borderWidth:1, marginTop:5, borderRadius:6, margin:3,backgroundColor:'#F5F5F5'}}>
<View style={{backgroundColor:'#F5F5F5', marginTop:10}}>
      <Text style={{margin:3,fontWeight:'600'}}>Gợi ý cho bạn</Text>
      </View>
    <ScrollView showsHorizontalScrollIndicator={false}
    style={{flex:1}}>
         

{dataGiamGia.map(item=>
 <Render_GoiY item={item} key={item.IDCHITIETSP}/>
    )}


   
    
    </ScrollView>
    </View>
:null}
   </View>


<LenDauTrang chuyenDauTrang={chuyenDauTrang} scrollY={scrollY} cao={70}/>
<View style={{flexDirection:'row',justifyContent:'space-between',width,backgroundColor:'#50C7C7',alignItems:'center',position:'absolute'}}>
        <TenCuaHang         
                  tencuahang={dataAnh.TenCuaHang}
                  dataAnh={dataAnh}
                  heightAvata={opacitiAvata}
                  MaUidNCC={MaUidNCC}
                  MaTinh={MaTinh}
                  navigation={navigation}
                  dienthoaincc={dienthoaincc}
                  /> 
    
       <HeaderCT navigation ={navigation} 
                  
                  dataAnh={dataAnh}
            />
        </View>
        <ThongTin_CuaHang modalVisible={modalVisible} setModalVisible={setModalVisible} dataAnh={dataAnh}/>
    </View>
  )}
 
