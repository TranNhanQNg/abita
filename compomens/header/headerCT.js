import React,{useState,useEffect}from 'react';
import {Text, View,Platform,StyleSheet,Animated,TouchableOpacity,SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Thongbaogiohang from './iconCart';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HeaderCT = ({headerHeight,colorHeder,soluongdatacart}) => {
	

	return(
		
		<Animated.View style={ {alignItems:'flex-end'}}>
				<Link href={'giohang'}>
					<Animated.View style={[styles.boxicon,{backgroundColor:colorHeder}]}>
						<Thongbaogiohang soluongdatacart={soluongdatacart}/>
					</Animated.View>
				</Link>
         </Animated.View>
		
		);
  
}
const HeaderGH = ({soluongdatacart}) => {
	return(
		
		<Animated.View style={ {position:'absolute',width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgb(80,199,199)'}}>
				<View style={{flex:1,alignItems:'center'}}>
					<Text style={{color:'#FFF'}}>Giỏ hàng</Text>
				</View>
					<Animated.View style={[styles.boxicon]}>
						<Thongbaogiohang soluongdatacart={soluongdatacart}/>
					</Animated.View>
				
         </Animated.View>
		
		);
  
}
module.exports = {HeaderCT,HeaderGH};
const height = 45;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: height,
		alignItems: 'center',
		position:'absolute',
      width:'100%'
		},
		
	
	boxicon:{backgroundColor:'bluergba(192,192,192,0.4)',
	flexDirection: 'row',
	height: height*0.9,
	width: height*0.9,
	alignItems:'center',
	justifyContent: "center",
	marginLeft:10,
	borderRadius:100
	
	
	},
	icon:{
		
	}
})