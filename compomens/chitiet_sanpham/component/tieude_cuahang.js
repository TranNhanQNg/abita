import React, {useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,
   Image,} from 'react-native';
  import axios from 'axios';

import api from '../../api/api';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useIsFocused } from '@react-navigation/native';
const { abita_amin,hinhanh }=api;

export default function TieuDe_CuaHang ({ item, navigation,color,color1,MaTinh }) {
  const Wifi = useSelector(state => state.cart.Wifi);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 

  
  const [count_like, setcount_like] = useState(item.LUOTTHICHCH);
  const [like, setlike] = useState(false);
  const [reflike, setReflike] = useState(true);
  const MaUid = useSelector(state => state.cart.MaUid);
  const matinh = useSelector(state => state.cart.MaTinh);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(Wifi){
          
            kiemtralike()
            
          }
    }, [reflike,Wifi,isFocused]);
    const diemsolike =()=>{
            fetch(abita_amin+'Like_TheoDoi/LuotTheoDoi.php?MaTinh='+MaTinh+'&MaUidNCC='+item.MAUIDNCC)
            .then((response) => response.json())
            .then((json) => {setcount_like(json.countDHMoi)})
            .catch(function (error) {console.log(error)})
          };

    const kiemtralike =() => {
      axios.post(abita_amin+'Like_TheoDoi/KiemTraLike.php?MaTinh='+MaTinh,
         JSON.stringify(
                {
                DienThoaiKH:SoDienThoai,
                MaUid:MaUid,
                MaUidNCC:item.MAUIDNCC,
                }
            )
          )
              .then((response) => {setlike(response.data.kq)})
              .catch(function (error) {console.log(error)})
         };

    const Fecht =()=>{
          axios.post(abita_amin+'/Like_TheoDoi/Like.php?MaTinh='+MaTinh, 
              JSON.stringify(
                {
                DienThoaiKH:SoDienThoai,
                MaUid:MaUid,
                MaUidNCC:item.MAUIDNCC,
                TenCuaHang:item.TENCUAHANG,
                MaTinh:matinh,
                TheoDoi:true,
                LuotThichCH:count_like
                }
              )
          ).then(function (response) {
            setReflike(!reflike)
          })
          .catch(function (error) {
            console.log(error);
            alert('Bạn xem lại kết nối')
          });      
  };

  
    return(
    <View>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#50c7f2','#a5def2'  ]}
            style={{backgroundColor:color,borderRadius:8,justifyContent:'center',marginVertical:5,height:70}}>
           
          <View style={{marginVertical:2,flex:1,flexDirection:'row',alignContent:'center'}}>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',flex:1,}}
              onPress={()=>navigation.navigate("CuaHang",{MaUidNCC:item.MAUIDNCC, MaTinh:MaTinh})}
          >
              <View
              style={{width:60,height:60,borderRadius:50, marginLeft:15,backgroundColor:'#a6710f',alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri:hinhanh+'slileApp/'+item.ANHDAIDIENCH}} 
                 style={{borderRadius:60,width:59,height:59,backgroundColor:'#FFF'}} />  
              </View>
             
                  <View style={{justifyContent:'center',marginLeft:10,marginVertical:3}}>
                    <Text style={{fontSize:16,fontWeight:'bold', color:'#2532e6',}}>{item.TENCUAHANG}</Text>
                    <Text style={{fontSize:13, color:'#EE82EE'}}>{count_like>1000?Math.round((count_like/1000)*100)/100+'k':count_like} <Icon name="thumbs-up" size={13}  /> thích </Text>
                   
                 
               </View>
                </TouchableOpacity>
               <View style={{justifyContent:'center',marginRight:10}}>
               
                      {
                        !like?
                        <TouchableOpacity 
                          style={{backgroundColor:!like?'#DDA0DD':'#50c7c7',borderColor:'#EE82EE',borderWidth:1,borderRadius:5,alignItems:'center'}}
                          onPress={SoDienThoai=='abita'? ()=>navigation.navigate('DangNhapNumberPhone',{loai:'3'}):()=>{Fecht(),setcount_like(count_like*1+1)}}
                          >
                            <Text style={{fontSize:10,color:'#FFFFFF',margin:6,fontSize:16}}><Icon name="thumbs-up" size={16}/> Theo dõi</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity 
                          style={{backgroundColor:!like?'#DDA0DD':'#50c7c7',borderColor:'#EE82EE',borderWidth:1,borderRadius:5,alignItems:'center'}}
                          onPress={SoDienThoai=='abita'? ()=>navigation.navigate('DangNhapNumberPhone',{loai:'3'}):()=>{Fecht(),setcount_like(count_like*1-1)}}
                          >
                            <Text style={{fontSize:10,color:'#FFFFFF',margin:6,fontSize:16}}><Icon name="thumbs-down" size={16}/> Đã theo dõi </Text>
                        </TouchableOpacity>
                      }
                     
                  
               </View>
              
               </View>
               </LinearGradient>
      </View>
    );
  }

  const styles1 = StyleSheet.create({

  imageSile:{
     flex:1,
    resizeMode:'cover',
    borderRadius:50
    
  },
  })