import React,{useEffect,useState}from 'react';
import {Text, View,Image,StyleSheet,useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../dungchung/color';
import b from '../dungchung/dimensions';

 	

const Thongbaogiohang = (soluongdatacart)=>{
	const [dataCart, setDataCart] =useState([])
	const getData = async () => {
		try {
		  const jsonValue = await AsyncStorage.getItem('my-key-datacart');
		  return Array.isArray(JSON.parse(jsonValue))? setDataCart(JSON.parse(jsonValue)) : null;
		} catch (e) {
		  // error reading value
		}
	  };
	  useEffect(()=>{
		getData()
	},[soluongdatacart])
	 return( 		
		<View style={styles.header3}>
		<Image style ={{width:25,height:25}} source={require('../../assets/icon/giohang.png')}/>
		{dataCart.length>0?
		<View style= {styles.boxicon1}>
			<Text style={styles.textboxicon}>{dataCart.length}</Text>
		</View>:null}
	</View>
			
			 )};

export default Thongbaogiohang;
const {colorToolBar,colorNen} = color;

const h = b;

const styles= StyleSheet.create({
	
header3:{
		justifyContent:'center',
		flexDirection:'row',
		alignItems:"center",
		
		
	},
	boxicon:{
			
				
	},
	boxicon1:{
			height:15,
			minWidth:15,
			right:-5,
			backgroundColor: 'red',
			top:-5,
			position: 'absolute',
			borderRadius:50,
			justifyContent:'center',
			alignItems: 'center',
			
	},
	textboxicon:{
		color:'#FFFFFF',
		fontSize:9,
		fontFamily: 'OpenSans-SemiBold'
	}

})
