import React, {useState,useEffect,useRef,useLayoutEffect} from 'react';
import {Text, View,SafeAreaView,Animated,InteractionManager,WebView,
  TouchableOpacity,StyleSheet,ScrollView,Dimensions,Image, FlatList, ActivityIndicator} from 'react-native';

import HeaderB from '../../header/headerB';
import { useSelector,useDispatch} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
import Sao from '../../sanpham/chitietsanpham/sao';
import axios from 'axios';
import fadeIn from '../../dungchung/anima';
import { ADD_DANGNHAP} from '../../../redux/cartAction';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sanPhamMoi from '../duyetsanpham/sanPhamMoi';



const {hinhanhicon,abita_sanpham,abita_quanly,abita_dungchung} = diachiDaTa;


export default QuanLyKhuyenMai =({navigation,item})=>{
    return(
        <View style={{backgroundColor:'#CD853F',flex:1}}>
            <SafeAreaView style={{flex:1}}>
                <HeaderB navigation={navigation}/>
                <WebView source={{ uri: 'https://reactnative.dev/' }}/>
                <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',flex:1,backgroundColor:'#FFF'}}>
                    <View style={{backgroundColor:'#F0FFFF',alignItems:'center'}}>
                        <Image style={{width:50,height:50}} source={{uri:hinhanhicon+'khuyenmai_gia.png',}}/>
                        <Text>Khuyến mãi theo giá</Text>
                    </View>
                    <View style={{backgroundColor:'#F0FFFF',alignItems:'center'}}>
                    <Image style={{width:50,height:50}} source={{uri:hinhanhicon+'boxes.png',}}/>
                        <Text>Khuyến mãi theo sản phẩm mua </Text>
                    </View>
                </View>
                
            </SafeAreaView>
        </View>
    )
}