import React ,{useState,useRef ,useEffect,} from 'react';
import { View,SafeAreaView,Image,Dimensions,Text} from 'react-native';
import axios from 'axios';
import { useSelector} from 'react-redux';
import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
const {width} = Dimensions.get('window');
import BanerDinhDanh from '../../dungchung/banerDinhDanh';
import Video from 'react-native-video';


export default HoTro =({navigation})=>{
    const {hinhanh,abita_amin}=diachiDaTa;
    const MaTinh = useSelector(state => state.cart.MaTinh);

    axios.post(abita_amin+'DinhVi_TinhThanh.php',
    {latitude:15,longitude:108.72}
,{headers:{"Content-Type" : "application/json"}}
)  .then((res) =>{console.log(res.data)})
.catch((error) => {console.log(error)})


    return(
        <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
        <View style={{backgroundColor:'#50C7C7'}}>
        <HeaderB navigation={navigation}/>
        </View>
                <Image source={{uri:hinhanh+'icon/hotro.jpg'}}
                    style={{width:'100%', height:200,resizeMode:'contain',marginTop:10}}
                />
            <BanerDinhDanh MaTinh={MaTinh}/>
        </View>
        </SafeAreaView>
    )
}