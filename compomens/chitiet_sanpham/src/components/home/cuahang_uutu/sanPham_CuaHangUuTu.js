import React, { useEffect, useState } from 'react';
import { View,StyleSheet,Dimensions, TouchableOpacity,ActivityIndicator,Text} from 'react-native';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {TieudeChung} from '../../dungchung/tieudeChung';
import {RenderDM_Home} from '../component/renderDM_Home'
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';

export default SanPham_CuaHangUuTu = ({navigation, item,setxemthem,xemthem}) => {
  const {abita_sanpham} = diachiDaTa;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const AddFont = useSelector(state => state.cart.AddFont);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [soluongdata, setSoLuongDaTa] = useState(0);
  const [data1, setData1] = useState([1,1,1,1,1,1]);
  const [trang, setTrang] = useState(1);
  const time_hientai = Math.round(new Date().getTime()/1000)
  useEffect(() => {
    fetch_data()
    },[trang]
  );
  const fetch_data =()=>{
    var api_fech = abita_sanpham+'Cua_Hang/sanpham_cuahang_uutu.php?MaTinh='+MaTinh+'&Trang='+trang+'&timestamp='+time_hientai
    var set_then =(res)=>{setSoLuongDaTa(res.data.length),setData(data.concat(res.data))}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,Muc:'MaUidNCC',GiaTriMuc:item.MAUIDNCC})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }
 

  const danhmucsanpham =()=>{
   
      return(
        <View style={{backgroundColor:'rgba(220,220,220,0.9)'}} >
          <View style ={ { justifyContent:'center',
                          flexDirection: 'row',
                          flexWrap:'wrap',
                          marginTop:1,
                          marginBottom:2}}>
            {
            
            data.map((item,index) =>
            <View key={index} style={{height:AddFont.fontDM+width/3,margin:width*0.004,justifyContent:'center',width:width*0.320666,backgroundColor:'#FFF'}} >
            {item==1?<ActivityIndicator />:
              <RenderDM_Home item={item} navigation={navigation}/>
              }
            </View>)
              }
            {isLoading? 
            data1.map((item,index) =>
            <View key={index} style={{height:AddFont.fontDM+width/3,margin:width*0.004,justifyContent:'center',width:width*0.320666,backgroundColor:'#FFF'}} >
            {item==1?<ActivityIndicator />:
              <RenderDM_Home item={item} navigation={navigation}/>
              }
            </View>):null
            }
       
          </View>
          <View style={{}}>
                {soluongdata<6?
                <View style={{alignItems:'center'}}>
                    <Text style={{margin:5,color:'#191970'}}>sản phẩm đã hết</Text>
                </View>
                :
                <TouchableOpacity onPress={()=>{setTrang(trang+1),setLoading(true)}}
                style={{alignItems:'center'}}
                >
                  <Text style={{margin:5,color:'#191970'}}>xem thêm</Text>
                </TouchableOpacity>
                }
          </View>
        </View>
      )
    }

  return(
    <View >
     <View style={{height:1,backgroundColor:'#C0C0C0'}}/>
     
      {danhmucsanpham()}
   </View>
  );
};
const {height,width} = Dimensions.get('window')
const h = height;
const w = width;
const styles = StyleSheet.create({
 
  viewTong:{
    flex:1,
   flexDirection: 'row',
   justifyContent: 'center',
   flexWrap:'wrap',
   marginTop:1
  },
  
});