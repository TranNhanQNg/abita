import React, { useState,useEffect,useRef, } from "react";
import {  Text,SafeAreaView,
  TouchableOpacity,View,Image,Modal,Dimensions,StyleSheet} from "react-native";
  import api from "../../../api/api";
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; 

  
  
const ThongTin_CuaHang =({modalVisible,setModalVisible,dataAnh})=>{
    const {hinhanh,abita_amin} = api;
    const time = new Date(dataAnh.NgayThamGia*1000)
    var ngay = (time.getDate() + 100).toString().substring(1);
    var thang = (time.getMonth() + 101).toString().substring(1);
    var nam = time.getFullYear().toString();
     var ngaythangnam =ngay+'/'+thang+'/'+nam
    return(
            <Modal animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() =>
                                setModalVisible(false)
                                
                                }
                    >
                    <SafeAreaView SafeAreaView style={{backgroundColor:'rgba(0,0,0, 0.6)',flex:1}}>
                    <View style={{backgroundColor:'#FFF',flex:1,marginHorizontal:10,borderRadius:15}}>
                    <View style={{backgroundColor:'#66CDAA',borderRadius:15}}>
                        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                            <Text style={{margin:20,fontSize:18}}>X</Text>
                        </TouchableOpacity>
                        <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                            <View
                            style={{width:70,height:70,borderRadius:70,borderWidth:2,borderColor:'#FFFFFF',marginHorizontal:5}}>
                            <Image source={{uri:hinhanh+'slileApp/'+dataAnh.AnhDaiDienCH}} 
                            style={{borderRadius:50,flex:1,resizeMode:"cover",}} />  
                            </View>
                            <View style={{justifyContent:'space-between'}}>
                            <Text style={{fontSize:16,color:'#FFF',fontWeight:'bold'}}>{dataAnh.TenCuaHang}</Text>
                            <Text style={{fontSize:13, color:'#EE82EE'}}>{dataAnh.LuotThichCH} <Icon name="thumbs-up" size={13}  /> thích  | <Text style={{fontSize:13, color:'#F4A460'}}>{dataAnh.LuotXemCH}  lượt xem </Text></Text>
                            
                            </View>
                        </View>
                        </View>
                        <View style={{marginHorizontal:5,marginTop:10}}>
                            <Text style={{marginTop:10}}>Tham gia: {ngaythangnam}</Text>
                            <Text style={{marginTop:10}}>Giới thiệu cửa hàng: {dataAnh.GioiThieuCH}</Text>
                            
                        </View>
                    </View>
                    </SafeAreaView>
            </Modal>
        )
    }
    export  {ThongTin_CuaHang}