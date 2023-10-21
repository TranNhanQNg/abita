import React, { useState,useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text,Image,
  TouchableOpacity,ActivityIndicator,View,Dimensions,ScrollView,Modal,Button,TextInput,useWindowDimensions,Alert } from "react-native";
import api from "../../api/api";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import {renderItem} from './renderItem_nhanxet'



const{abita_quanly,hinhanh}=api


export default XemThem_NhanXet = ({MaTinh, dienthoaincc,id_sanpham,MaUidNCC,setModalXemThem}) => {
  
  
  
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isLoading, setLoading] = useState(true);
 
  const [trang,setTrang]=useState(2);





  useEffect(() => {
    if(data.length==0){
        fechNhanXet()
    }
    fechNhanXet1()
    },[trang]);

  const fechNhanXet =()=>{
    axios.post(abita_quanly+'DanhGia.php?MaTinh='+MaTinh+'&sotrang=20&Trang=1',
    JSON.stringify({
      IdSanPham:id_sanpham,
      DienThoaiNCC:dienthoaincc,
    }))
    .then(function (response) {
      setData(response.data)
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  const fechNhanXet1 =()=>{
    axios.post(abita_quanly+'DanhGia.php?MaTinh='+MaTinh+'&sotrang=20&Trang='+trang,
    JSON.stringify({
      IdSanPham:id_sanpham,
      DienThoaiNCC:dienthoaincc,
    }))
    .then(function (response) {
      setData1(response.data)
    })
    .catch((error) => console.error(error))
  }

  
const onEndReached=()=>{
    
    if(data1.length>0){data.concat(data1),setTrang(trang+1)}
  };


  return (
   <View style={{marginTop:40}}>
   <View style={{ backgroundColor:'#008080',alignItems:'center',marginTop:5,flexDirection:'row'}}>
   <TouchableOpacity onPress={()=>setModalXemThem(false)}>
   <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" style={{margin:5}}/>
   </TouchableOpacity>
    <Text style={{color:'#FFFFFF',marginLeft:20}}> Nhận xét đánh giá ({data.length})</Text>
    </View>
    <View>

    {isLoading ? <ActivityIndicator/> : (

        <View style={{}}>
          <FlatList 
            data={data}
            renderItem={({ item }) => (
                renderItem(item)
            )}
            keyExtractor={(item,index) => item.NGAY+index}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            />
        </View>
          
      )}

</View>
  <View style={{backgroundColor:'#50C7C7',width:'100%',height:1}}/>
  
    </View> 
   
    )}
   
