import React, {useEffect, useState} from 'react';
import { Text, View,TouchableOpacity, Image,Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
// import styles from './stylesSanPham';
import Sao from '../../../sanpham/chitietsanpham/sao';
import {naviga} from '../../../dungchung/naviga';
import { useDispatch,useSelector } from 'react-redux';
import {ADD_TO_HISTORY} from '../../../../redux/cartAction';
import {MD5,fechDaTa_Axios} from '../../../dungchung/fech_data';



const width = Dimensions.get('window').width;
const heigth = Dimensions.get('window').height;

   const {hinhanhsanpham,hinhanh,abita_dungchung,hinhanhdanhmuc} = diachiDaTa; 




const RenderItemCH=({item,navigation})=>{
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const {abita_sanpham,hinhanhsanpham}=diachiDaTa;  
  const time_hientai = Math.round(new Date().getTime()/1000)
const [data,setData]=useState([])
const [isloading,setLoading]=useState(true);


  useEffect(()=>{
    fechDaTa()
  },[])

  const fechDaTa =()=>{
    var api_fech = abita_sanpham+'GoiY_HomNay/SanPham_CuaHang_GiamGia.php?MaTinh='+MaTinh+'&timestamp='+time_hientai
    var set_then =(res)=>{setData(res.data)}
    var set_catch =(error)=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'MaUidNCC',GiaTriMuc:item.MAUIDNCC})
fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }
  const time = new Date(item.KETTHUC*1000)
  var phut = time.getMinutes().toString();
  var gio = time.getHours().toString();
  var ngay = (time.getDate() + 100).toString().substring(1);
  var thang = (time.getMonth() + 101).toString().substring(1);
  var nam = time.getFullYear().toString();

  const dispatch = useDispatch()
  const addItemToHistory = (item) =>{
    const action = ADD_TO_HISTORY(item);
    dispatch(action);
  };
  
 const renderItem =(e)=>{
      return(
        <TouchableOpacity key = {e.IDCHITIETSP} onPress={() => {naviga(item=e,navigation,MaTinh)
        ,addItemToHistory(item=e)}}
        style={{margin:1,backgroundColor:'#FFF',borderRadius:5}}>
              <View style ={{height:width/3-9,width:width/3-9,justifyContent:'center',alignItems:'center'}}>
                  <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                    {/* <Image source={{uri:hinhanhsanpham+e.ANHDAIDIEN}} style={{flex:1,resizeMode:'contain'}} /> */}
                    <FastImage
                          style={{height:width/3-11,width:width/3-11,}}
                          source={{
                              uri: hinhanhsanpham+e.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />

                    {e.NGAY_KETTHUC>time_hientai&e.NGAY_KHUYENMAI<time_hientai&e.GIAKHUYENMAI>0?
                      JSON.parse(e.HINHTHUC_KHUYENMAI).loai_km==1?
                    <Text style={{position:'absolute',top:3,right:3,textAlign:'center',fontSize:12,color:'#FFF',backgroundColor:'red'}}>{' -'+e.GIAKHUYENMAI+'% '}</Text>
                    :<Text style={{position:'absolute',top:3,right:3,textAlign:'center',fontSize:12,color:'#FFF',backgroundColor:'red'}}> mua {JSON.parse(e.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(e.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
                    :null
                      }
              </View>
              {e.NGAY_KETTHUC>time_hientai&e.NGAY_KHUYENMAI<time_hientai&e.GIAKHUYENMAI>0&JSON.parse(e.HINHTHUC_KHUYENMAI).loai_km==1?
                  <Text style={{color:'red',marginLeft:5,marginVertical:3}}>
                  {(e.GIABANSP-e.GIABANSP*e.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:11}}>đ</Text>
                  </Text>:
                  <Text style={{color:'#191970',marginLeft:5,marginVertical:3}}>
                  {e.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:11}}>đ</Text>
                  </Text>
              }
        </TouchableOpacity>
      )
 } 
return(
  <View style={{backgroundColor:'#E0E0E0'}}>
  <View style={{marginHorizontal:10,borderRadius:5,marginTop:10,}}>
  <TouchableOpacity onPress={()=>navigation.navigate("CuaHang",{MaUidNCC:item.MAUIDNCC, tencuahang:item.TENCUAHANG,MaTinh:MaTinh})}
   style={{flexDirection:'row',backgroundColor:'#FFF',borderRadius:5,marginBottom:1}}>
      <View
          style={{borderRadius:50,margin:5,backgroundColor:'#FFF'}}>
         
            <Image source={{uri:hinhanh+'slileApp/'+item.ANHDAIDIENCH}} 
            style={{borderRadius:90,width:60,height:60,borderWidth:1,borderColor:'#FF00FF'}} />  
        </View>
        <View style={{marginVertical:3,justifyContent:'space-between',flex:1}}>
        <Text style={{fontSize:14, color:'#404040',width:90}}>{item.TENCUAHANG}</Text>
            <View style={{backgroundColor:'red',borderRadius:3,width:50,alignItems:'center'}}>
              <Text style={{fontSize:12, color:'#FFF'}}>{Math.round(item.KHUYENMAI)}% </Text>
            </View>
            <View>
              <Text>Kết thúc: {gio+':'+phut} {ngay}/{thang}/{nam}</Text>
            </View>
        </View>
        <View style={{backgroundColor:'#F0FFF0',justifyContent:'center'}}>
          <Text style={{marginHorizontal:5,color:'#191970'}}>Xem cửa hàng</Text>
        </View>
  </TouchableOpacity>
  <View style={{flexWrap:'wrap',flexDirection:'row',backgroundColor:'#DCDCDC'}}>
  {data.map(e=>renderItem(e)
  )}
  </View>
  </View>
</View>
)
}

    
module.exports = {RenderItemCH};







const styles = StyleSheet.create({
  //  sản phẩm 
  viewTong:{
    flex:1,
     backgroundColor:'#FFFFFF',
     flexDirection:'row',
    borderColor:'#F2F2F2',
    borderRadius:5,
    marginHorizontal:5,
    marginTop:5
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
   margin:2,
   borderRadius:2,
  
 },
 viewText:{
        flex:1,
        marginLeft:5,
        marginVertical:5
        },
   aotext:{
   lineHeight:23,
   fontFamily: 'OpenSans-Regular',
   },
   giatext:{
    fontSize:16,
    color:'red'
    },
    viewImage:{
   width: width/3, 
   height:width/3,
   alignContent:'center',
   justifyContent:'center',
   borderTopLeftRadius:5,
   borderTopRightRadius:5
   
   
 },

  
   

})
export default styles;