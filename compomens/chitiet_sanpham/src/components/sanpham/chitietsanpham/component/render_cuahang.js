import React, {useEffect, useState} from 'react';
import { Text, View,TouchableOpacity, Image,Dimensions,StyleSheet,ActivityIndicator} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import {naviga,navigaPush} from '../../../dungchung/naviga';
import { useDispatch,useSelector } from 'react-redux';
import {ADD_TO_HISTORY} from '../../../../redux/cartAction';




const width = Dimensions.get('window').width;
const heigth = Dimensions.get('window').height;

   const {abita_dungchung} = diachiDaTa; 


const Render_CuaHang=({item,navigation,MaTinh})=>{
 
  const {abita_sanpham,hinhanhsanpham}=diachiDaTa;  
  const time_hientai = Math.round(new Date().getTime()/1000)
const [data,setData]=useState([])
const [isloading,setLoading]=useState(true);


  useEffect(()=>{
    fechDaTa()
  },[])

  const fechDaTa =()=>{
    fetch(abita_sanpham+'GoiY_HomNay/sanpham_cuahang_like.php?MaTinh='+MaTinh+'&Muc=MaUidNCC&GiaTriMuc='+item.MAUIDNCC+'&timestamp='+time_hientai)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  

  const dispatch = useDispatch()
  const addItemToHistory = (item) =>{
    const newhobby ={
          IDCHITIETSP:item.IDCHITIETSP,
          IDSANPHAM:item.IDSANPHAM,
          TENSANPHAM:item.TENSANPHAM,
          QUYCACHSP:item.QUYCACHSP,
          IDQUYCACH:item.IDQUYCACH,
          MAUSACSP:item.MAUSACSP,
          GIABANSP:item.GIABANSP,
          GIAKHUYENMAI:item.GIAKHUYENMAI,
          ANHDAIDIEN:item.ANHDAIDIEN,
          DIENTHOAINCC:item.DIENTHOAINCC,
          MATINH:MaTinh
      };
    const action = ADD_TO_HISTORY(newhobby);
    dispatch(action);
  };
  const fechluotxem =(item)=>{
        axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                JSON.stringify({
                    tendieukien:'IdChiTietSp',
                    dieukien:item.IDCHITIETSP,
                    tencsdl:'sanpham',
                    tengiatri:'LuotXem',
                    giatri:item.LUOTXEM+1
                })
            )
            .catch(function (error) {
              console.error(error);
            });   
}
 const renderItem =(e)=>{
      return(
        <TouchableOpacity key = {e.IDCHITIETSP} onPress={() => {navigaPush(item=e,navigation,MaTinh)
        ,addItemToHistory(item=e),fechluotxem(item=e)}}
        >
        <View style={{margin:2,backgroundColor:'#FFF'}}>
              <View style ={{height:width/3.5,width:width/3.5,justifyContent:'center',alignItems:'center',}}>
                  <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                    <FastImage
                          style={{height:width/3.5,width:width/3.5}}
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
              </View>
        </TouchableOpacity>
      )
 } 
return(
  
  <View style={{marginTop:10,alignItems:'center',}}>
    {isloading? <ActivityIndicator size="large" color="#008000" />:
      <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'center'}}>
      {data.map(e=>renderItem(e)
      )}
      </View>
    }
    <View style={{height:1,backgroundColor:'#D8D8D8',width:width*0.95,marginTop:10}}/>
  </View>

)
}

    
module.exports = {Render_CuaHang};







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
   width: width/2, 
   height:width/2,
   alignContent:'center',
   justifyContent:'center',
   borderTopLeftRadius:5,
   borderTopRightRadius:5
   
   
 },

  
   

})
export default styles;