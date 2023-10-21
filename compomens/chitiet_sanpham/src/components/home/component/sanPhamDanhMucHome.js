import React, { useEffect, useState } from 'react';
import { View,StyleSheet,Dimensions, TouchableOpacity,ActivityIndicator} from 'react-native';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {TieudeChung} from '../../dungchung/tieudeChung';
import {RenderDM_Home} from './renderDM_Home'
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data';
export default SanPhamDanhMucHome = ({navigation,tendanhmuc,idDanhMuc,refreshing,}) => {
  const {abita_sanpham} = diachiDaTa;
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const AddFont = useSelector(state => state.cart.AddFont);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([1,1,1,1,1,1]);
  const refresDaTa =()=>{setData([1,1,1,1,1,1])};

  useEffect(() => {
    refresDaTa(),
    fetch_data()
    },[MaTinh,refreshing]
  );
  const fetch_data =()=>{
    var api_fech = abita_sanpham+'SanPhamDanhMuc.php?IdDanhMuc='+idDanhMuc+'&MaTinh='+MaTinh
    var set_then =(res)=>{setData(res.data)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }
 
  const newData = data.filter(e=> {return( e.IDDANHMUC !== 'DM_00')});
  
  const manghinhC2=()=>{navigation.navigate("DanhMucCap2", {tendanhmuc:tendanhmuc,idDanhMuc:idDanhMuc,apiSP:'SanPhamDanhMucCap2.php?IdDanhMuc='})};
  

  const danhmucsanpham =()=>{
   
      return(
        <View style={{backgroundColor:'rgba(220,220,220,0.9)'}} >
          <View style ={ { justifyContent:'center',
                          flexDirection: 'row',
                          flexWrap:'wrap',
                          marginTop:1,
                          marginBottom:2}}>
            {newData.map((item,index) =>
            <View key={index} style={{height:AddFont.fontDM+width/3,margin:width*0.004,justifyContent:'center',width:width*0.320666,backgroundColor:'#FFF'}} >
            {item==1?<ActivityIndicator />:
              <RenderDM_Home item={item} navigation={navigation}/>
              }
            </View>
          
            )}
          </View>
       <View style={{height:width*0.004}}/>
        </View>
      )
    }


  return(
    <View >
     <View style={{height:1,backgroundColor:'#C0C0C0'}}/>
<TouchableOpacity activeOpacity={0.9} onPress={()=>manghinhC2()}>
<TieudeChung  ten1={'XEM'} navigation={navigation}
          manghinh1 = { manghinhC2}
          color={[ 'rgba(220,220,220,0.9)','rgba(220,220,220,0.9)']}
          coloricon={'#4682B4'}
          colortext={'#383838'}
          icon={'➣'}
          props = {tendanhmuc} 
    />
</TouchableOpacity>
     
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