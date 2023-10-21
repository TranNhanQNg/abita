import React from 'react';
import {Text, View,Image,StyleSheet,TextInput,TouchableOpacity,Dimensions } from 'react-native';

import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default HeaderB = ({navigation}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");

	return(
		
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:30}]}>
		<TouchableOpacity style={styles.back} onPress={() => { navigation.goBack()}}>
		<SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
		 </TouchableOpacity>
		
			<TouchableOpacity style={{flex:1}} onPress={search1}>	
			<View style={styles.timkiem}> 
				<Text style={{fontStyle: 'italic',color:'#484848'}}>    Tìm sản phẩm </Text>
				<SimpleLineIcons name="magnifier" size={23} style={{marginRight:5}} color="#006400" />
			</View>
			</TouchableOpacity>
			<View style={{flexDirection:'row',alignItems:'center',}}>
			 <TouchableOpacity style={{marginLeft:25}} onPress={() => {navigation.navigate("Home")}}>
			 	<Image style ={{width:25,height:25}} source={require('../icon/home.png')}/>
    		</TouchableOpacity>
    		 <TouchableOpacity style={{marginLeft:25}} onPress={() => {navigation.navigate("Danhmuc")}}>
			 <Image style ={{width:25,height:25}} source={require('../icon/menu.png')}/>
    		</TouchableOpacity>
			
			 <TouchableOpacity style={{marginLeft:25}} onPress={giohang}>
			 	{thongbaogiohang()}
			 </TouchableOpacity>
			 </View>
		</View>
		
  
		);
  
}

const {colorToolBar,colorNen} = color;
const {height,width} = Dimensions.get('window')

const h = 55;
const h_icon = 35;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: h,
		alignItems: 'center',
		marginRight:20,
		
		},
	boxicon:{
		height: h_icon,
		width: h_icon,
		
	},
	back:{height:h,
		width:h,
		justifyContent:'center',
		alignItems:'center',
	},
		
	timkiem:{
		height: h_icon,
		borderRadius: 5,
		backgroundColor:'rgba(255,255,255,0.6)',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		
	},
	
})