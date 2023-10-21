import React,{useState,useMemo} from 'react';
import { Text, View,TouchableOpacity,Pressable, Image,Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image'
import Sao from '../../sanpham/chitietsanpham/sao';
import {naviga,navigaPush,navigaCuaHang} from '../../dungchung/naviga';
import {giamgia,giamgia_tang }from '../../dungchung/giamgia';
import { useDispatch,useSelector } from 'react-redux';
import {ADD_TO_HISTORY} from '../../../redux/cartAction';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import Tang_Pont from '../../sanpham/chitietsanpham/component/tang_pont'


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const {hinhanhsanpham,hinhanh,abita_dungchung,hinhanhdanhmuc} = diachiDaTa; 

const RenderDM_Home =({item,navigation}) =>{ 
    const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
      viewText,giatext} = styles;
      const AddFont = useSelector(state => state.cart.AddFont);
      const MaTinh = useSelector(state => state.cart.MaTinh);
      const Wifi = useSelector(state => state.cart.Wifi);
      const [sao,setSao]=useState(0)
      const dispatch = useDispatch()
      const addItemToHistory = (item) =>{
        const action = ADD_TO_HISTORY(item);
        dispatch(action);
      };
     
    const time_hientai = new Date().getTime()/1000
      return(   
            <TouchableOpacity onPress={() => {naviga(item,navigation,MaTinh),addItemToHistory(item)}}
            activeOpacity={1}
            style={viewTong}
            >
              <View style ={viewImage}>
              <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:30,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
                {/* <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} /> */}
                <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
              </View>
              <View style={viewText}>
                <Text numberOfLines ={2} style={[aotext,{ height:AddFont.fontDM_TD}]}>{item.TENSANPHAM} {item.QUYCACHSP}</Text>
              
                {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                        JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={[giatext]}>
                          {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:10}}>đ</Text>
                          </Text>
                          {/* <Text style={[aotext,{fontSize:11,marginLeft:5,backgroundColor:'red',alignItems:'center', color:'#FFF',borderRadius:5}]}>
                          {item.GIAKHUYENMAI.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:10}}>%</Text>
                          </Text> */}
                      </View>:
                      <View >
                          <Text style={[giatext]}>
                          {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:10}}>đ</Text>
                          </Text>
                          
                      </View>:
                      <View style={{flexDirection:'row'}}>
                          <Text style={[giatext,{color:'#191970'}]}>
                          {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<Text style={{fontSize:10}}>đ</Text>
                          </Text>
                      
                      </View>
                      }
                      <View style={{minHeight:15,flexDirection:'row',alignItems:'center'}}>
                          <Sao count={item.SAO}/>
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
                </View>
                {
                   
                 giamgia(item,time_hientai)
      
               }
              
            </TouchableOpacity>
                    
      )
               
  };
  
  
    module.exports = {RenderDM_Home};
    const styles = StyleSheet.create({
        //  sản phẩm 
        viewTong:{
         
              flex:1,
              backgroundColor:'#FFFFFF', 
              borderColor:'#F2F2F2',
              borderRadius:5,
              alignItems:'center'
            },
        aoimage:{
              resizeMode:"contain",
              flex: 1,
        
       },
       viewText:{
        marginTop:3,
              width:w*0.29,
              },
         aotext:{
              fontFamily: 'OpenSans-Medium',
              fontSize:11,
              color:'#000'
         },
         giatext:{
          fontSize:14,
          color:'red'
          },
          viewImage:{
         width: w*0.318666, 
         height:w*0.318666,
         margin:w*0.002,
         justifyContent:'center',
       
         
         
       },
      
        
         
     
      })
      export default styles;