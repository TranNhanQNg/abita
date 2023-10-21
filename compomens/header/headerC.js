import React from 'react';
import {Text, View,Image,StyleSheet,Platform,TouchableOpacity,Dimensions } from 'react-native';

import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import b from '../dungchung/dimensions';
import thongbaogiohang from './iconCart';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default HeaderC = ({navigation}) => {
	
	
	const giohang = () => navigation.navigate("Giohang");
	
	const {back,menu,cart,home} = diachiDaTa;

	return(
		
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:30}]}>
		<TouchableOpacity onPress={() => navigation.goBack()}>
		<SimpleLineIcons name="arrow-left" size={30} color="#FFFFFF" />
		 </TouchableOpacity>
					
			<TouchableOpacity onPress={giohang}>
			{thongbaogiohang()}			
		 	</TouchableOpacity>
		</View>
		
		);
  
}

const {colorToolBar,colorNen} = color;

const h = b;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 50,
		backgroundColor:colorToolBar,
		alignItems: 'center',
		},
		
	
	boxicon:{
	height: 35,
	width: 35,
		
	}
})