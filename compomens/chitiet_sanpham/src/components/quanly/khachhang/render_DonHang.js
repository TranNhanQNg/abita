import React,{useState,useMemo} from 'react';
import { Text, View,TouchableOpacity,Pressable, Image,Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import Sao from '../../sanpham/chitietsanpham/sao';
import {naviga,navigaPush,navigaCuaHang} from '../../dungchung/naviga';
import { useDispatch,useSelector } from 'react-redux';
import {ADD_TO_HISTORY} from '../../../redux/cartAction';




const width = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const colorNen ='#E8E8E8'
   const {hinhanhsanpham,hinhanh,abita_dungchung,hinhanhdanhmuc} = diachiDaTa; 


    const Render_DonHang =({navigation,item,xemQuaTang}) =>{ 
      const {aotext,giatext} = styles;
    
        const MaTinh = useSelector(state => state.cart.MaTinh);
        const Wifi = useSelector(state => state.cart.Wifi);
        const dispatch = useDispatch()
        const addItemToHistory = (item) =>{
          const action = ADD_TO_HISTORY(item);
          dispatch(action);
        };
        const fechluotxem =(item)=>{
          if(Wifi){
              axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                      JSON.stringify({
                          tendieukien:'IdSanPham',
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
      }
      const time_hientai = new Date().getTime()/1000
      const time = new Date(item.NGAY_KETTHUC*1000)
      var phut = time.getMinutes().toString();
      var gio = time.getHours().toString();
      var ngay = (time.getDate() + 100).toString().substring(1);
      var thang = (time.getMonth() + 101).toString().substring(1);
        return(
          
              <TouchableOpacity onPress={() => {naviga(item,navigation,MaTinh),addItemToHistory(item),fechluotxem(item)}}
              style={{flexDirection:'row',backgroundColor:'#FFF',borderRadius:5}}>
                <View style ={{alignItems:'center',justifyContent:'center'}}>
                <Text style={{position:'absolute',textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                
                  <FastImage
                          style={{height:width/3,width:width/3,margin:2,resizeMode:'contain'}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
                </View>
                      <View style={{ flex:1,
                                      width:width/2-10,
                                      marginLeft:5,
                                      marginVertical:5
                                      }}>
                        <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM}</Text>
                        <Text style={aotext}>{item.QUYCACHSP} {!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                        <Sao idsanpham={item.IDSANPHAM}
                              MaTinh={MaTinh}
                              dienthoaincc={item.DIENTHOAINCC}
                              />
    
                         
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={[giatext]}>
                                  {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                </Text>
                                {item.KHUYENMAI?
                                  JSON.parse(item.KHUYENMAI).loai_km==1?
                                <Text style={{textDecorationLine:'line-through',fontSize:12,marginLeft:12}}>
                                  {(JSON.parse(item.KHUYENMAI).GiaBanSP)} đ
                                </Text>:null:null
                                }
                            </View>
                   <Text style={{marginTop:3,color:'#1E90FF'}}>Số lượng: {item.SOLUONGDH}</Text>
                   {item.KHUYENMAI?
                        JSON.parse(item.KHUYENMAI).loai_km==2?
                    <View style={{backgroundColor:'#87CEFA',justifyContent:'center',flex:1,borderRadius:3,margin:3}}>
                          <Text style={{color:'#00008B',marginHorizontal:10,fontSize:12,marginVertical:2}}>
                              Tặng: {JSON.parse(item.KHUYENMAI).soluong_tang} sản phẩm
                          </Text>
                      </View>:null
                      :null
                    }
                    {item.QUATANGDH?
                JSON.parse(item.QUATANGDH)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANGDH)[0].thoigian_ketthuc>time_hientai&JSON.parse(item.QUATANGDH)[0].soluongmua<item.SOLUONGDH+1?
                    <TouchableOpacity onPress={()=>{xemQuaTang(item)}}
                    style={{backgroundColor:'#87CEFA',justifyContent:'center',flex:1,borderRadius:3,margin:3}}
                    >
                      <Text style={{color:'red',marginLeft:5,fontSize:12,marginVertical:2}}>Tặng {Math.floor(item.SOLUONGDH/JSON.parse(item.QUATANGDH)[0].soluongmua)} phần gồm ➤</Text>
                    </TouchableOpacity>:null
                  :null
                }
                      </View>
              </TouchableOpacity>          
        )
      }

  

    
module.exports = {Render_DonHang};







const styles = StyleSheet.create({
  //  sản phẩm 
  viewTong:{
    flex:1,
     backgroundColor:'#F8F8F8',
  
      },
 
  aoimage:{
   resizeMode:"contain",
   flex: 1,
   margin:2,
   borderRadius:2,
  
 },
 viewText:{
        width: width*0.43
        },
   aotext:{
    fontFamily: 'OpenSans-Regular',
   fontSize:13,
   color:'#000',
   marginTop:5
   },
   giatext:{
    fontSize:17,
    color:'red',
    fontFamily: 'OpenSans-SemiBold',
    marginVertical:3
    },
    viewImage:{
   width: width*0.476, 
   height:width*0.476,
  margin:width*0.0001,
  justifyContent:'center'
   
   
 },
// style listHeader danh mục
viewNen:{
  marginLeft:5,
  marginTop:5
   },
  
     
   viewlistHeader:{
 
     alignItems: 'center',
     width:width*0.21,
     marginHorizontal:5 
      
  }, 
  viewlistHeader1:{
     width:width*0.19,
     height:width*0.18,
   
  }, 
  imagelistHeader:{
   flex:1, 
     resizeMode:"contain",
     borderRadius:6
  },
  textlistHeader:{
     textAlign: 'center',
     marginVertical:10,
     color:'#000',
     fontSize:12,
     fontFamily: 'OpenSans-Medium'
     
 
   },
   linearGradientSanPham:{
     height:h*0.06,
     width:width,
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
export default styles;