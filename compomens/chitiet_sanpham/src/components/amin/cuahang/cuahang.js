import React, {useState,useRef,useLayoutEffect} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,FlatList,Dimensions,StyleSheet,
  RefreshControl,Animated, Image,} from 'react-native';
import { useSelector} from 'react-redux';
import HeaderD from '../../header/headerD';
import styles from '../../sanpham/stylesSanPham';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RenderSanPham from '../../sanpham/renderSanPham';
import Activity from '../../dungchung/activityIndicator';
import fadeIn from '../../dungchung/anima';
import {TieudeHome} from '../../dungchung/tieudeChung';
import { useFocusEffect } from '@react-navigation/native';
import CuaHangKM from './khuyenmai';
import Swiper from 'react-native-swiper';

export default function CuaHang ({ navigation }) {
  const MaTinh = useSelector(state => state.cart.MaTinh); 
  const TaiKhoan = useSelector(state => state.cart.TaiKhoan);
  const DienThoaiNCC = useSelector(state => state.cart.SoDienThoai); 
  
  const {hinhanhsanpham,abita_sanpham,abita_amin, hinhanh} = diachiDaTa; 

  const [data, setData] = useState([]);
  const [dataAnh, setDataAnh] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activity,setActivity]= useState(true);

  //animated anhch
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useFocusEffect(() => {fadeIn(fadeAnim)});
  useLayoutEffect(() => {
    fetch(abita_sanpham+'CuaHang.php?MaTinh='+MaTinh+'&DienThoaiNCC='+DienThoaiNCC+'&Trang=1')
      .then((response) => response.json())
      .then((json) => {setData(json)})
      .catch((error) => setActivity(false))
      .finally(() => setRefreshing(false));
    }, [MaTinh,DienThoaiNCC,refreshing]);
    useLayoutEffect(() => {
      fetch(abita_amin+'AnhCuaHang.php?TaiKhoan='+TaiKhoan)
        .then((response) => response.json())
        .then((json) => {setDataAnh(json)})
        .catch((error) => console.error(error))
      }, [MaTinh,DienThoaiNCC,refreshing]);
  const {AnhCH,TenCuaHang}= dataAnh;
  const onRefresh = () => {
      setRefreshing(true);
      setActivity(true)
    };
    naviga =(item,navigation)=>{navigation.navigate("ChitietSanphamDX",{
        idchitietsp:(item.IDCHITIETSP),
        tensanpham:(item.TENSANPHAM),
        quycachsp:(item.QUYCACHSP),
        mausacsp:(item.MAUSACSP),
        giabansp:(item.GIABANSP),
        giakhuyenmai:(item.GIAKHUYENMAI),
        tenhinhanh:(item.TENHINHANH),
      })
    };
    // const bane = ()=>{ 
    //   return( 
    //   dataBN==null?<ActivityIndicator/>:
    //     (
    //      <View>
    //       <Swiper style={{height:200}}
    //       autoplay={true}
    //       autoplayTimeout={5}
    //       autoplayDirection={true}
    //       >
    //       {JSON.parse(dataBN.AnhBane).map(item=>
    //         <Image source={{uri:hinhanh+'slileApp/'+item}} style={{height:200,width:200}} />
    //       )}
    //     </Swiper>
    //     </View>)
    //    )
    // };
  const cuoiban = () =>{
    return(
      <View style={{height:100}}/>
      )
    };
  
  const listHeader = ()=>{
    return(
      <View>
        <View style={{height:40,  marginTop:1, backgroundColor:'#FFFAF0',justifyContent:'center'}}>
            <Text style={{marginHorizontal:10,fontSize:16,fontFamily: "Cochin"}}><Icon name="store" size={20} color="#3CB371" /> {dataAnh.TenCuaHang} xin kính chào quý khách!</Text>
        </View>
        <Text>{AnhCH}</Text>
       
          {/* <Swiper style={styles1.viewImagePaner}
          autoplay={true}
          autoplayTimeout={5}
          autoplayDirection={true}
          >
          {JSON.parse(AnhCH).map(item=>
          <View style={styles1.viewImagePaner} key={item}>
          <Image source={{uri:hinhanh+'slileApp/'+item}} style={styles1.imageSile}  />
         </View> )}
       </Swiper> */}
       
        <CuaHangKM dienthoaincc={DienThoaiNCC} MaTinh={MaTinh} navigation={navigation}/>
        <TieudeHome  props={'Sản phẩm cửa hàng'}
                  color={[ '#FFFFFF','#CCCCCC','#FFFFFF']}
                  icon={"heart"}
                  coloricon={'red'}
                  colortext={'#000000'}
        />
      </View>
      )
    };

  const {viewTong,aoflatlist,aoimage,viewImage,aotext,viewText} = styles;
    return(
    	<SafeAreaView>
        <HeaderD navigation ={navigation}/> 
       
       
        {data.lenght==0?  <Activity onRefresh={onRefresh} activity={activity}/> : (
        <Animated.View style={{backgroundColor:'#FFFFFF', opacity:fadeAnim}}>
          <FlatList 
            data={data}
            renderItem={({ item }) => (
              <RenderSanPham item={item} navigation={navigation}/>
              )}
              keyExtractor={(item) => item.IDCHITIETSP}
              horizontal={false}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={listHeader}
              ListFooterComponent={cuoiban}
              refreshControl={
              <RefreshControl refreshing={refreshing}  onRefresh={onRefresh}/>
              }
            />
        </Animated.View> 
        )}  
      </SafeAreaView>
    );
  }
  const {height,width} = Dimensions.get('window')
const h = height;
const w = width;
  const styles1 = StyleSheet.create({

   //Hình paner
  
     viewImagePaner:{
        height: w/2.5,
      
  },
  imageSile:{
     flex:1,
    resizeMode:"stretch",
    
  },
  })