import React, {useEffect, useState,} from 'react';
import { Text, View,TouchableOpacity, Image,ScrollView,Animated
 } from 'react-native';
  import { useSelector} from 'react-redux';
  import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
 


  const {abita_sanpham,hinhanh}=diachiDaTa;

  export default Add_CuaHang_GiamGia =({navigation,item,chuyenDauTrang,scrollY})=>{
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const timestamp = Math.round(new Date().getTime()/1000)
    useEffect(() => {
        fetch(abita_sanpham+'GoiY_HomNay/CuaHang_GiamGia.php?MaTinh='+MaTinh+'&timestamp='+timestamp)
          .then((response) => response.json())
          .then((json) => {setData(json)})
          .catch(function (error) {
            console.log(error);
          })
          .finally(() => setLoading(false));
        },[]);

    const renderItem=(item)=>{
        const time = new Date(item.KETTHUC*1000)
        var phut = time.getMinutes().toString();
        var gio = time.getHours().toString();
        var ngay = (time.getDate() + 100).toString().substring(1);
        var thang = (time.getMonth() + 101).toString().substring(1);
        var nam = time.getFullYear().toString();
        
      return(
        <View style={{flexDirection:'row'}}>
            <View
                style={{borderRadius:50,margin:5}}>
                  <Image source={{uri:hinhanh+'slileApp/'+item.ANHDAIDIENCH}} 
                  style={{borderRadius:90,width:60,height:60,borderWidth:1,borderColor:'#FF00FF'}} />  
              </View>
              <View style={{marginVertical:3,justifyContent:'space-between',flex:1}}>
              <Text style={{fontSize:14, color:'#404040',width:90}}>{item.TENCUAHANG}</Text>
                  <View style={{backgroundColor:'red',borderRadius:3,width:50,alignItems:'center'}}>
                    <Text style={{fontSize:12, color:'#FFF'}}>{Math.round(item.KHUYENMAI)}% </Text>
                  </View>
                  <View>
                    <Text>Kết thúc: {gio+':'+phut} {ngay}/{thang}/{nam}</Text>
                  </View>
              </View>
        </View>
      )
    }

    return(
       data.length==0?null:
        <ScrollView style={{marginVertical:4}}
        onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y:scrollY}}}],
            {useNativeDriver:false}
          )}
          scrollEventThrottle={16}
          ref={chuyenDauTrang}>
          <ListHeadre item={item}/>
         
            <View style={{ backgroundColor:'#FFF',marginTop:50}}>
            <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{}}>
                {data.map(item=>
                    <TouchableOpacity key={item.MAUIDNCC} style={{backgroundColor:'#FFF'}}
                      onPress={()=>navigation.navigate("CuaHang",{MaUidNCC:item.MAUIDNCC, tencuahang:item.TENCUAHANG,MaTinh:MaTinh})}
                  >
                     {renderItem(item)}
                </TouchableOpacity>
                )}
               
            </ScrollView>
            </View>
        </ScrollView>
    )
  }