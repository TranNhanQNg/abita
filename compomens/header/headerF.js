import React from 'react';
import {Text, View,Platform,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';

export default HeaderF = ({navigation,item}) => {
	
	
	const giohang = () => navigation.navigate("Giohang");

	return(
		
		<View style={{flexDirection:'row',justifyContent:'space-between',height:50,alignItems:'center',marginTop:Platform.OS === 'ios'?0:20}}>
			<TouchableOpacity onPress={()=>navigation.goBack()} style={{width:60,alignItems:'center'}}>
				<SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
			</TouchableOpacity>
			<View style={{justifyContent:'center'}}>
			<Text style={{fontSize:16,color:'#FFF',fontWeight:'bold'}}>{item}</Text>
			</View>
			
			<TouchableOpacity style={{marginRight:25}} onPress={giohang}>
			 	{thongbaogiohang()}
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
		backgroundColor:colorNen,
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