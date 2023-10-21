import React, {useState,useEffect,useRef,useLayoutEffect} from 'react';
import {Text, View,SafeAreaView,Animated,InteractionManager,
  TouchableOpacity,StyleSheet,ScrollView,Dimensions,Image, FlatList, ActivityIndicator} from 'react-native';

import HeaderB from '../../header/headerB';
import { useSelector,useDispatch} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import Sao from '../../sanpham/chitietsanpham/sao';
import axios from 'axios';
import RenderMenu from './rendermenu';
import fadeIn from '../../dungchung/anima';
import { ADD_DANGNHAP} from '../../../redux/cartAction';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sanPhamMoi from '../duyetsanpham/sanPhamMoi';




export default QuanLySanPham =({navigation})=>{
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const Wifi = useSelector(state => state.cart.Wifi);
    const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 
    const {hinhanhsanpham,abita_sanpham,abita_quanly,abita_dungchung} = diachiDaTa;

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [trang,setTrang]=useState(2);
    const [isloading,setLoading]=useState(true);
    const [refres, setRefres] = useState(false);
    const [chonloaisp, setchonloaisp] = useState('1');

    const [api, setApi]=useState('QuanLySanPham.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=');

    const fechtdata =()=>{
        fetch(abita_quanly+api+1)
        .then((response) => response.json())
        .then((json) => {setData(json),console.log(json)})
        
        .catch((error) => setActivity(false))
        .finally(() => setLoading(false));
      }
      useLayoutEffect(() => {
        if(Wifi){
            setLoading(true)
            fechtdata()
        }
        }, [api,Wifi,refres]);

        const tinhtrangsanpham =()=>{
            switch(chonloaisp){
              case '1': setApi('QuanLySanPham.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=');
              break;
              case '2': setApi('QuanLySanPhamHetHang.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=');
              break;
              case '3': setApi('QuanLySanPhamConHang.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=');
              break;
            }
          };
          const AllSanPham=()=>{ setchonloaisp('1'),setApi('QuanLySanPham.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=')};
          const ConHang=()=>{ setchonloaisp('3'),setApi('QuanLySanPhamConHang.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=')};
          const HetHang=()=>{ setchonloaisp('2'),setApi('QuanLySanPhamHetHang.php?MaTinh='+MaTinh+'&DienThoaiNCC='+SoDienThoai+'&Trang=')};
        const RenderSanPhamQuanLy =({item}) =>{ 
            const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
              viewText,giatext} = styles;
             
             
              return(   
                    <View
                        style={viewTong}>
                        <View style ={viewImage}>
                        <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                            <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} />
                        </View>
                        <View style={viewText}>
                            <Text numberOfLines ={4} style={aotext}>{item.TENSANPHAM} {item.QUYCACHSP}</Text>
                            <Sao idsanpham={item.IDSANPHAM} MaTinh={MaTinh} dienthoaincc={item.DIENTHOAINCC}/>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[giatext]}>
                                {item.GIABANSP>item.GIAKHUYENMAI?item.GIAKHUYENMAI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."):item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </Text>
                                <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through'}]}>
                                {item.GIABANSP>item.GIAKHUYENMAI?item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."):null}
                                </Text>
                                <Text style={[aotext,{fontSize:12}]}>đ</Text>
                            </View>
                        </View>
                        {giamgia(item)}
                        
                        <RenderMenu item={item}/>
                        
                    </View>         
                )
            };
          
      

    
    
    const renderitem =({item})=>{
       return(
            <View >
                <RenderSanPhamQuanLy item={item}/>
            </View>
            )
        };

  return(
      <View style={{flex:1,backgroundColor:'#20B2AA'}}>
        <SafeAreaView style={{flex:1}}>
            <HeaderB navigation={navigation}/>
            <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:10,marginHorizontal:10}}> 
        <TouchableOpacity onPress={()=>{AllSanPham()}}
        style={[styles.tabthongbao, {backgroundColor:chonloaisp=='1'?'#66CDAA':null}]}>
            <Text style={{fontSize:13,marginVertical:2,color:chonloaisp=='1'?'#FFF':'#606060'}}>
                Tất cả
              </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>{HetHang()}}
        style={[styles.tabthongbao, {backgroundColor:chonloaisp=='2'?'#66CDAA':null}]}>
            <Text style={{fontSize:13,marginVertical:2,color:chonloaisp=='2'?'#FFF':'#606060'}}>
                Hết hàng
              </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{ConHang()}}
       style={[styles.tabthongbao, {backgroundColor:chonloaisp=='3'?'#66CDAA':null}]}>
            <Text style={{fontSize:13,marginVertical:2,color:chonloaisp=='3'?'#FFF':'#606060'}}>
               Còn hàng
              </Text>
        </TouchableOpacity>
    </View>
                <View style={{
                            marginHorizontal:1,
                           
                            }}>
                {isloading? <Activity/>:
                    <FlatList
                    data={data}
                    renderItem={renderitem}
                    keyExtractor={item => item.IDCHITIETSP}
                    numColumns={2}
                    
                    />
                }
                </View>
        </SafeAreaView>
      </View>
  )}

  const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;


const styles = StyleSheet.create({
    //  sản phẩm 
    viewTong:{
      flex:1,
       justifyContent: 'center',
       backgroundColor:'#FFFFFF', 
      margin:2,
      
      borderColor:'#F2F2F2',
      alignItems:'center',
      borderRadius:8
       
      
        },
    aoflatlist:{
      flex:1,
     
     borderWidth:1,
     borderColor:'#F2F2F2',
     alignItems:'center',
     
    },
    viewanimater:{
      
    },
    aoimage:{
     resizeMode:"contain",
     flex: 1,
     borderTopLeftRadius:8,
     borderTopRightRadius:8
    
   },
   viewText:{
          flex:1,
          width:w/2-10,
          marginLeft:5,
          justifyContent:'space-between',
          marginVertical:10
          },
     aotext:{
     fontSize:14,
     fontWeight: '300',
     lineHeight:20,
     },
     giatext:{
      fontSize:16,
      fontWeight: '300',
      color:'red'
      },
      viewImage:{
     width: w/2-8, 
     height:w/2-8,
     alignContent:'center',
     justifyContent:'center',
     borderTopLeftRadius:8,
     borderTopRightRadius:8
     
     
   },
  
    
     
  // style listHeader danh mục
  viewNen:{
   marginLeft:5,
   marginTop:5
    },
   
      
    viewlistHeader:{
  
      alignItems: 'center',
      width:w*0.2,
      marginRight: 10,
      height:110,
      
       
   }, 
   viewlistHeader1:{
      width:60,
      height:60,
    
   }, 
   imagelistHeader:{
    flex:1, 
      resizeMode:"contain",
      borderRadius:10
   },
   textlistHeader:{
      textAlign: 'center',
      marginTop: 5,
      fontSize:13,
      fontWeight:'300'
      
  
    },
    linearGradientSanPham:{
      height:h*0.06,
      width:w,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
  },
   lendautrang:{
     backgroundColor:'rgba(200,200,200,0.5)',
     width:30,
     height:30,
     top:h*0.85,
     right:5,
     borderRadius:8,
     position:'absolute',
     alignItems:'center',
     justifyContent:'center'
  }, 
  tabthongbao:{
    flex:1,
    marginHorizontal:5,
    alignItems:'center',
    borderWidth:1,
    borderRadius:8,
    justifyContent:'center',
    borderColor:'#66CDAA'
  },
   
     
    
  })
  