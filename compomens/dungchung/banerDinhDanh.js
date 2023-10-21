
import React, {useState,useEffect} from 'react';
import { Text, View,SafeAreaView,Image,TouchableOpacity,StyleSheet,Modal,Linking,ScrollView,Dimensions} from 'react-native';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {Activity} from './activityIndicator';
import FastImage from 'react-native-fast-image'

import Dpf from './dpf';
const width = Dimensions.get('window').width;

export default HoTro =({MaTinh})=>{
    const {hinhanh,abita_chung}=diachiDaTa;
   

    const [doitra,setdoitra]=useState(false);
    const [dichvu,setdichvu]=useState(false);
    const [data,setData]=useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fechMaTinh()
    },[MaTinh])
    const fechMaTinh=() => {
        fetch(abita_chung+'FechTinh.php?MaTinh='+MaTinh)
          .then((response) => response.json())
          .then((json) => {setData(json)})
          .catch((error) => console.error(error))
          .finally(() => {setLoading(false)});
          };
const ThongTin = data.length==0?null:JSON.parse(data[0].THONGTIN)
const dinhvi = data.length==0?null:data[0].DINHVI.split(',')
    const handlePress = (url) => {
        const supported = Linking.canOpenURL(url);
    if (supported) {
       Linking.openURL(url);
    } else {
      null
    }
  }
  const xembando = () => {
    const url1 = Platform.select({
        ios: `maps:0,0?q=${dinhvi[0]},${dinhvi[1]}`,
        android: `geo:0,0?q=${dinhvi[0]},${dinhvi[1]}`,
      })
    const url2= 'https://www.google.com/maps/search/?api=1&query=4'+ThongTin.DiaChi
   const url =dinhvi?url1:url2
    Linking.openURL(url);
} 

console.log(dinhvi)
    return(
        !ThongTin?<Activity/>:
        <View style={{flex:1,marginVertical:10}}>
            <View style={{flex:1}}>
            <View style={{backgroundColor:'#F0FFFF',flexDirection:'row',alignItems:'center',justifyContent:'center'}}> 
            <Image source={{uri:hinhanh+'icon/hotro.jpg'}}
                    style={{width:25, height:25,resizeMode:'contain'}}
                /> 
                <Text style={{fontSize:16,fontWeight:'bold',color:'#0000CD',margin:10}}>Tư vấn | đóng góp</Text>
            </View>

             <View style={{alignItems:'center', marginTop:20}}>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>handlePress(url= ("tel:"+ThongTin.LienHe))}
                style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:hinhanh+'icon/phone.jpg'}}
                        style={{width:25, height:25,resizeMode:'contain',marginHorizontal:10}}
                    />
                   
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handlePress(url= "tel:"+ThongTin.Zalo)}
                style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:hinhanh+'icon/icon/zalo.png'}}
                        style={{width:25, height:25,resizeMode:'contain',marginHorizontal:10}}
                    />
                   
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handlePress(url= "mailto:"+ThongTin.Email)}
                style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:hinhanh+'icon/icon/email.png'}}
                        style={{width:25, height:25,resizeMode:'contain',marginHorizontal:10}}
                    />
                   
                </TouchableOpacity>
                </View>
                <View style={{marginVertical:20}}>
                    <Text style={{color:'#808080'}}>Địa chỉ: {ThongTin.DiaChi} </Text>
                    <Text style={{color:'#808080'}}>{ThongTin.ThongTin}</Text>
                </View>
            </View>
           <TouchableOpacity onPress={()=>xembando()}>
           <FastImage
                          style={{height:width*0.35,width}}
                          source={{
                              uri: 'https://googlemapsgmd.com/wp-content/uploads/2022/03/docs-landing-get-started-hero.png',
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
           </TouchableOpacity>
            </View>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>setdichvu(true)}>
                        <Text style={{fontSize:12,color:'#50C7C7'}}>Điều khoản dịch vụ</Text>
                    </TouchableOpacity>
                    <View style={{width:1,height:10, backgroundColor:'#383838', marginHorizontal:10}}/>

                   
                    <TouchableOpacity onPress={()=>setdoitra(true)}>
                    <Text style={{fontSize:12,color:'#50C7C7'}}>Chính sách đổi trả</Text>
                    </TouchableOpacity>
            </View>
                <Modal animationType="fade"
                    transparent={true}
                    visible={doitra}
                >
                <SafeAreaView style={{backgroundColor:'#FFFFFF',}}>
                    <View>
                    <View style={{alignItems:'center'}}>
                   
                        <Dpf uri={'https://abita.com.vn/sieuthi/'+MaTinh+'/chinhsachdoitra.pdf'}/>
                    </View>
                    <TouchableOpacity onPress={()=>setdoitra(false)} 
                    style={{backgroundColor:'rgba(105,105,105,0.5)', borderRadius:100,height:30,width:30,margin:3,alignItems:'center',justifyContent:'center',position:'absolute'}}>
                    <Text style={{fontSize:20,color:'red',}}>X</Text>
                    </TouchableOpacity>  
                    </View>
                </SafeAreaView>
                </Modal>

                <Modal animationType="fade"
                    transparent={true}
                    visible={dichvu}
                >
                <SafeAreaView style={{backgroundColor:'#F0FFFF',flex:1}}>
                    <TouchableOpacity onPress={()=>setdichvu(false)}
                     style={{backgroundColor:'rgba(105,105,105,0.5)', borderRadius:100,height:30,width:30,margin:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'red',}}>X</Text>
                    </TouchableOpacity>
                    <View>
                   
                    <Dpf uri={'https://abita.com.vn/sieuthi/'+MaTinh+'/dieukhoandichvu.pdf'}/>
                    </View>
                    
                </SafeAreaView>
                </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize:15,fontWeight:'bold'
    },
     textmuc:{
        height:40,
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        alignItems:'center'
    },
  })