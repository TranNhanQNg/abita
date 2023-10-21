import React, {useState,useEffect,useRef,useLayoutEffect} from 'react';
import {Text, View,SafeAreaView,Animated,InteractionManager,
  TouchableOpacity,StyleSheet,ScrollView,Dimensions,Image, FlatList, ActivityIndicator} from 'react-native';

import HeaderB from '../../header/headerB';
import { useSelector,useDispatch} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import Sao from '../../sanpham/chitietsanpham/sao';
import axios from 'axios';
import fadeIn from '../../dungchung/anima';
import { ADD_DANGNHAP} from '../../../redux/cartAction';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sanPhamMoi from '../duyetsanpham/sanPhamMoi';



const {hinhanhsanpham,abita_sanpham,abita_quanly,abita_dungchung} = diachiDaTa;


export default RenderMenu =({navigation,item})=>{
    const Wifi = useSelector(state => state.cart.Wifi);
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 
    const [tinhtrang,settinhtrang] =useState(item.TINHTRANGSANPHAM);
    const [tong,settong]=useState(0);
    const dataxuly =[
        {
            id:1,
            tenmuc:'Còn hàng',
            tinhtranghang:'true'
        },
        {
            id:2,
            tenmuc:'Hết hàng',
            tinhtranghang:'false'
        },
       
    ]
    useEffect(()=>{
        if(Wifi){
            axios.post(abita_dungchung+'TinhTong.php?MaTinh='+MaTinh, 
                    JSON.stringify({
                        tendieukien:'IdChiTietSp',
                        dieukien:item.IDCHITIETSP,
                        tendieukien1:'DienThoaiNCC',
                        dieukien1:SoDienThoai,
                        tendieukien2:'DienThoaiNCC',
                        dieukien2:SoDienThoai,
                        tencsdl:'donhang',
                        tengiatri:'SoLuongDH',
                    })
                ).then(function (response) {
                    settong(response.data.tong), console.log(response.data)
                })
                .catch(function (error) {
                  console.log(error);
                });
            }    

    },[])
    const fechTinhTrangSP =(item)=>{
        if(Wifi){
            axios.post(abita_dungchung+'Update_1DieuKien.php?MaTinh='+MaTinh, 
                    JSON.stringify({
                        tendieukien:'IdChiTietSp',
                        dieukien:item.IDCHITIETSP,
                        tencsdl:'sanpham',
                        tengiatri:'TinhTrangSanPham',
                        giatri:tinhtrang=='true'?'false':'true'
                    })
                ).then(function (response) {
                    settinhtrang(tinhtrang=='true'?'false':'true')
                })
                .catch(function (error) {
                  console.log(error);
                });
            }    
    }
                        return(
                            <View style={{backgroundColor:'#F0FFFF',borderRadius:8}}>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                    <Text style={{fontSize:11,color:'#DAA520'}}> 👁 {item.LUOTXEM} lượt xem</Text>
                                    <Text style={{fontSize:11,color:'#1E90FF'}}> ♥ {tong} đã bán</Text>
                                </View>
                       
                            <View style={{width:w/2-8,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
                            
                            {dataxuly.map(e=>

                            <TouchableOpacity onPress={()=>tinhtrang==e.tinhtranghang?null:fechTinhTrangSP(item) }
                                    key={e.id}
                                     style={{justifyContent:'space-around',
                                            height:35,
                                            width:w/4-10,
                                            margin:3,
                                            backgroundColor:tinhtrang==e.tinhtranghang&&e.id==1?'#00CED1':tinhtrang==e.tinhtranghang&&e.id==2?'red':'#DCDCDC',
                                            alignItems:'center',
                                            borderRadius:5}}>
                            <Text style={{ color:tinhtrang==e.tinhtranghang&&e.id==1?'#FFF':tinhtrang==e.tinhtranghang&&e.id==2?'#FFF':'#000',}}
                            >
                                {e.tenmuc}
                            </Text>
                        </TouchableOpacity>
                            )}
                    </View>
                    </View>
                        )
                    }
                             
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
   
     
    
  })
  