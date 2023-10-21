import React, {useState,useEffect,useRef} from 'react';
import { Text, View,SafeAreaView,Image,TouchableOpacity,StyleSheet,Animated,ActivityIndicator} from 'react-native';
import { useSelector} from 'react-redux';
import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {fadeIn} from'../../dungchung/anima';
import {AnhNen} from '../../dungchung/anhnen';
import {Render_ThongBao}  from './component/index'

export default ThongBao =({navigation})=>{
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {fadeIn(fadeAnim)},[]);
  const MaTinh = useSelector(state => state.cart.MaTinh);
	const ThongBao=useSelector(state => state.cart.ThongBao);
	const {abita_quanly}=diachiDaTa;
  const [xemthongbao, setXemThongBao] = useState('3');
  const [data, setData] = useState([]);
  const [data_cuahang, setData_cuahang] = useState([]);
  
  	const [isLoading, setLoading] = useState(true);
  	useEffect(() => {
      thongbaoAbita()
      thongbao_cuahang()
  },[]);

const data_all1 =[...ThongBao,...data,...data_cuahang]
const data_all=data_all1.sort((a, b) => (a.NGAY > b.NGAY) ? -1 : 1).slice()

  const thongbaoAbita=()=>{
    fetch(abita_quanly+'ThongBao.php?MaTinh='+MaTinh+'&loai=1')
    .then((response) => response.json())
    .then((json) => {setData(json)})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  const thongbao_cuahang=()=>{
    fetch(abita_quanly+'ThongBao.php?MaTinh='+MaTinh+'&loai=2')
    .then((response) => response.json())
    .then((json) => {setData_cuahang(json)})
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }
  const billThongBao =()=>{
    switch(xemthongbao){
      case '1': return <Render_ThongBao data={data} fadeAnim={fadeAnim} navigation={navigation}/>;
      break;
      case '2': return <Render_ThongBao data={data_cuahang} fadeAnim={fadeAnim} navigation={navigation}/>;
      break;
      case '3': return <Render_ThongBao data={data_all} fadeAnim={fadeAnim} navigation={navigation}/>;
      break;
    }
  };


return(
  <SafeAreaView style={{flex:1,backgroundColor:'#484848',}}>
    <AnhNen api={'../icon/nenhome.jpg'}
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
    <HeaderB navigation={navigation}/>
    
    <View style={{flexDirection:'row',justifyContent:'space-between', marginVertical:10,marginHorizontal:10}}> 
        <TouchableOpacity onPress={()=>{setXemThongBao('3')}}
          style={[styles.tabthongbao, {backgroundColor:xemthongbao=='3'?'#66CDAA':null}]}>
                <Text style={styles.text}>
                    Tất cả
                  </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>setXemThongBao('2')}
        style={[styles.tabthongbao, {backgroundColor:xemthongbao=='2'?'#66CDAA':null}]}>
            <Text style={styles.text}>
                Thông báo cửa hàng
              </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{setXemThongBao('1')}}
        style={[styles.tabthongbao, {backgroundColor:xemthongbao=='1'?'#66CDAA':null}]}>
            <Text style={styles.text}>
                Thông báo Abita
              </Text>
        </TouchableOpacity>
        
        
        
    </View>
    <View style={{flex:1}}>
    {!isLoading?billThongBao():<ActivityIndicator/>}
    </View>
 
  </SafeAreaView>
)
};
const styles = StyleSheet.create({
  tabthongbao:{
    flex:1,
    marginHorizontal:5,
    alignItems:'center',
    borderWidth:1,
    borderRadius:8,
    justifyContent:'center',
    borderColor:'#66CDAA'
  },
  text:{
    color:'#FFFFFF',
    textAlign:'center',
    margin:2,
    fontSize:11
  }
})