import React, {Component,useCallback,useEffect,useRef} from 'react';
import { Text, View,SafeAreaView,Image,TouchableOpacity,Dimensions,Alert,Linking} from 'react-native';
import { useSelector} from 'react-redux';
import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
const {width} = Dimensions.get('window');
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BanerDinhDanh from '../../dungchung/banerDinhDanh';


export default HoTro =({navigation})=>{
    const {hinhanh}=diachiDaTa;
    return(
        <SafeAreaView style={{flex:1}}>
        <View style={{flex:1}}>
        <View style={{backgroundColor:'#50C7C7'}}>
        <HeaderB navigation={navigation}/>
        </View>
                <Image source={{uri:hinhanh+'icon/icon/hotro.png'}}
                    style={{width:'100%', height:200,resizeMode:'contain',marginTop:10}}
                />
            <BanerDinhDanh/>
           
        </View>
        </SafeAreaView>
    )
}