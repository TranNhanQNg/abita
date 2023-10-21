import React from 'react';
import {Text, View,Image,StyleSheet,Platform,TouchableOpacity,Dimensions } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';

export default HeaderAmin = ({navigation,tenTK}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	const openDrawer=() => navigation.dispatch(DrawerActions.openDrawer());
	const {back,menu,cart,search} = diachiDaTa;

	return(
		
		<View style={[styles.header1,{marginTop:Platform.OS === 'ios'?0:20}]}>
		
		
		
			
			<View style={styles.timkiem}> 
			
			<Text> Tài khoản: {tenTK}</Text>
			
			</View>
		<TouchableOpacity >
		<View style={{width:50,height:35}}>
		<Image style ={styles.boxicon} source={require('../icon/back.png')}/>
		</View>
		 </TouchableOpacity>
			
		</View>
		
  
		);
  
}

const {colorToolBar,colorNen} = color;
const {height,width} = Dimensions.get('window')

const h = height;
const w = width;

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
		
	},
	timkiem:{
		height: 35,
		borderRadius: 5,
		
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		
	},
	iconTimKiem:{
		height: 30,
		width: 30,
		margin: 10,
	}
})