import React from 'react';
import {Text, View,Image,StyleSheet,Platform,TouchableOpacity,Dimensions } from 'react-native';
import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import b from '../dungchung/dimensions';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default HeaderQuanLy = ({navigation,tenTK}) => {
	const danhmuc = () => navigation.navigate("Danhmuc");
	const homechu = () => navigation.navigate("Home");
	const giohang = () => navigation.navigate("Giohang");
	
	const {back,menu,cart,home} = diachiDaTa;

	return(
		
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:20}]}>
		<TouchableOpacity onPress={() => navigation.goBack()}>
		<SimpleLineIcons name="arrow-left" size={30} color="#FFFFFF" />
		 </TouchableOpacity>
			<Text style ={{marginRight:10, color:'#FFFFFF'}}> Tài khoản:{tenTK}</Text>
			
			
		</View>
		
		);
  
}

const {colorToolBar,colorNen} = color;

const a = b;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: a*0.05,
		backgroundColor:colorToolBar,
		alignItems: 'center',
		},
		
	
	boxicon:{
	height: a*0.03,
	width: a*0.03,
	marginLeft: 10,
  	marginRight: 20,	
	}
})