import React from 'react';
import {Text, View,Image,StyleSheet,TouchableOpacity,Dimensions } from 'react-native';

import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default ChuyenMuc = ({navigation,thongbao}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	const {back,menu,cart,search} = diachiDaTa;

	return(
		<View style={{alignItems:'center',backgroundColor:'#D3D3D3',marginTop:50, borderRadius:10,marginHorizontal:20,height:150,justifyContent:'space-evenly'}}>
            
            <Text style={{color:'#808080'}}>{thongbao}</Text>
           
		<View style={styles.header}>
		
			<TouchableOpacity  onPress={search1}>	
				<SimpleLineIcons name="magnifier" size={35} style={{marginRight:5}} color="#FFF" />
			</TouchableOpacity>
			 <TouchableOpacity  onPress={() => {navigation.navigate("Home")}}>
			 	<Image style ={styles.boxicon} source={require('../icon/home.png')}/>
    		</TouchableOpacity>
    		 <TouchableOpacity  onPress={() => {navigation.navigate("Danhmuc")}}>
			 <Image style ={styles.boxicon} source={require('../icon/menu.png')}/>
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
		justifyContent:'space-evenly',
		height: h,
		alignItems: 'center',
		marginHorizontal:20,
        backgroundColor:'#50C7C7',
        borderRadius:10,
        width:'90%'
       
		
		},
	boxicon:{
		height: 35,
		width: 35,
		
	},
	
	
})