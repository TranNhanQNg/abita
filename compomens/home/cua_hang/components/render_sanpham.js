
import React,{useState,useEffect} from "react";
import { Link } from "expo-router";
import { View,Text,FlatList, Image,Dimensions,Platform,Animated,ImageBackground,StyleSheet} from "react-native";
import { Heigth_Width } from "../../../api/heigth_width";
import api from "../../../api/api";
import {giamgia} from './nhom/giamgia'
const cao = Heigth_Width
const {hinhanhsanpham}=api

export const Render_SanPham = ({item}) => {
    const time_hientai = Math.round(new Date().getTime()/1000)
    const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
        viewText,giatext} = styles;
   
    return(
        <View style={{width:cao.width,backgroundColor:'#B0E0E6',borderRadius:2}}>
       <View style={{flex:1,backgroundColor:'#FFF',margin:cao.width*0.01,borderRadius:3}}>
        <Link  href={{pathname:'chitietsanpham',params: {idchitietsp:item.IDCHITIETSP,idsanpham:item.IDSANPHAM,MaTinh:item.MATINH} }}>
        
          <View style ={{ width: cao.width-cao.width*0.02, height:cao.width-cao.width*0.02,justifyContent:'center'}}>
          <View style={{position:'absolute',left:0,right:0,width:cao.width}}>
          <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
           </View>
           
            <Image
                        style={{flex:1,margin:cao.width*0.01,resizeMode:'contain'}}
                        source={{
                            uri: hinhanhsanpham+item.ANHDAIDIEN,
                          
                          
                        }}
                    
                    />
             
          </View>
                <View style={{margin:5}}>
                  <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM} {item.QUYCACHSP}{!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                 
                 
                  <View>
                  {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                        JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                      <View style={{flexDirection:'row'}}>
                          <Text style={[giatext]}>
                          {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:11}}>đ</Text>
                          </Text>
                          <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through',fontSize:10}]}>
                          {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                          </Text>
                      </View>:
                      <View style={{}}>
                          <Text style={[giatext]}>
                          {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:11}}>đ</Text>
                          </Text>
                         
                      </View>:
                      <View style={{flexDirection:'row'}}>
                      <Text style={[giatext,{color:'#191970'}]}>
                          {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} <Text style={{fontSize:11}}>đ</Text>
                          </Text>
                      
                      </View>
                      }
                    </View>
                    <View style={{minHeight:18,flexDirection:'row',alignItems:'center'}}>
                        {/* <Sao count={item.SAO}
                        /> */}
                        {item.TONGBAN>0?
                        <Text style={{fontSize:11,}}> » Đã bán: {item.TONGBAN}</Text> 
                        :null}
                    </View>
                  <View style={{minHeight:18}}>      
                    <Tang_Pont item={item}/> 
                  </View>
                <View style={{flexDirection:'row'}}>
                {item.QUATANG?
                  JSON.parse(item.QUATANG)[0].thoigian_batdau<time_hientai&JSON.parse(item.QUATANG)[0].thoigian_ketthuc>time_hientai?
                  <View style={{alignItems:'center',borderWidth:0.5,borderRadius:2,borderColor:'red',marginRight:5,flex:0.5,justifyContent:'center'}}>
                  <Text style={{fontSize:10,fontFamily:'OpenSans-Light',margin:1}}>qua tặng</Text>
                  </View>:null
                  :null
                }
               {item.LOAISANPHAM>1?
                  <View style={{alignItems:'center',borderWidth:0.5,borderRadius:2,borderColor:'#50C7C7',flex:0.5,justifyContent:'center'}}>
                    <Text style={{fontSize:10,fontFamily:'OpenSans-Light',margin:1}}>{item.LOAISANPHAM} loại</Text>
                  </View>
               :null
               }
               
               </View>
               
                {/* { giamgia(item,time_hientai)}    */}
          </View>
         
        </Link>
       </View>
    </View>
  )};

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
          width:cao.width
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
     width: cao.width, 
     height:cao.width,
    margin:cao.width,
    justifyContent:'center'
     
     
   },
  // style listHeader danh mục
  viewNen:{
    marginLeft:5,
    marginTop:5
     },
    
       
     viewlistHeader:{
   
       alignItems: 'center',
       width:cao.width*0.21,
       marginHorizontal:5 
        
    }, 
    viewlistHeader1:{
       width:cao.width*0.19,
       height:cao.width*0.18,
     
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
       
   
     }
  
    
    
     
  
   
     
    
  })
  export default styles;