import React, {useEffect, useState,} from 'react';
import { Text, View,TouchableOpacity, Image,ScrollView
 } from 'react-native';
  import { useSelector} from 'react-redux';
  import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
  import Icon from 'react-native-vector-icons/dist/FontAwesome5';

 


  const {abita_sanpham,hinhanh}=diachiDaTa;

  export default CuaHang_GiamGia =({navigation})=>{
    const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
    const Wifi = useSelector(state => state.cart.Wifi);
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const [mau,setMau] = useState(1);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(abita_sanpham+'GoiY_HomNay/CuaHang_GiamGiaSoc.php?MaTinh='+MaTinh)
          .then((response) => response.json())
          .then((json) => {setData(json)})
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => setLoading(false));
        },[SoDienThoai]);
   
    useEffect(() => {
        const id = setInterval(() => {setMau(c=>c+1)},500);
        return () => clearInterval(id);
      }, []); 

    return(
      <View>
       {data.length==0?null:
        <View style={{ backgroundColor:'#FFF',borderColor:'#DCDCDC',borderTopWidth:8}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{marginLeft:10,marginVertical:13,color:'#D2691E',fontSize:16}}>
                Cửa hàng giảm giá </Text>
                <Icon name={'bolt'} size={20} color={mau%2==1?'red':'#D2691E'} />
                <Text style={{marginLeft:3,marginVertical:10,color:'#D2691E',fontSize:16}}>sốc</Text>
                
              </View>
            <View style={{}}>
            <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{marginVertical:5}}>
                {data.map(item=>
                    <TouchableOpacity key={item.DIENTHOAINCC}
                    style={{alignItems:'center',backgroundColor:'#FFF',marginLeft:2}}
                    onPress={()=>navigation.navigate("CuaHang",{dienthoaincc:item.DIENTHOAINCC, tencuahang:item.TENCUAHANG})}
          >
              <View
              style={{borderRadius:50,margin:5,alignItems:'center',justifyContent:'center',width:61,height:61,borderRadius:90,borderWidth:1,borderColor:'#FF00FF'}}>
                <Image source={{uri:hinhanh+'slileApp/'+item.ANHDAIDIENCH}} 
                 style={{borderRadius:90,width:60,height:60}} />  
              </View>
              <Text numberOfLines ={2} style={{fontSize:14, color:'#404040',width:90,textAlign:'center',margin:5}}>{item.TENCUAHANG}</Text>
                  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:3,margin:5,position:'absolute',right:0}}>
                    <Text style={{fontSize:12, color:'#FFF'}}>{Math.round(item.KHUYENMAI)}%</Text>
               
               </View>
                </TouchableOpacity>
                )}
                {data.length>10?
                <TouchableOpacity style={{justifyContent:'center',flex:1,backgroundColor:'#FFF',marginLeft:3}}
                    onPress={()=>navigation.navigate("KhuyenMai",{loai:{id:1}})}
                >
                    <Text style={{color:'blue',margin:8,textAlign:'center'}}>XEM {"\n"} TẤT CẢ</Text>
              </TouchableOpacity>:null
              }
            </ScrollView>
            </View>
        </View>}
        </View>
    )
  }