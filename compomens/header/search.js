import React from 'react';
import {Text, View,Image,StyleSheet,Platform,TouchableOpacity,Dimensions } from 'react-native';
import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import b from '../dungchung/dimensions';


export default Search = ({navigation}) => {
	
const timkiem = () => {navigation.navigate("Search"),{focus:true}};
const {search} = diachiDaTa;


	return(
		<View style={[styles.viewTong,{marginTop:Platform.OS === 'ios'?0:20}]}>
			
				<TouchableOpacity  style={styles.headerTexInput}  onPress={timkiem}>
					<Image style ={styles.boxicon} source = {require('../icon/search.png')}/>
					<Text style={styles.text}>  Hôm nay bạn mua gì</Text>	
				</TouchableOpacity>
			
		</View>
    	
     
		);
  
}

const {colorToolBar,colorNen} = color;
const {height, width} = Dimensions.get('window')
const h = b;
const w = width;

const styles= StyleSheet.create({
	viewTong:{
		height:50,
		backgroundColor: '#FFFFFF',
		
	},
	header1:{
		borderBottomRightRadius: 50,
		borderBottomLeftRadius:50,
		height: 35,
		backgroundColor:colorToolBar,
		},
	
		
	headerTexInput:{
		
		flexDirection: 'row',
		
		height: 35,
		backgroundColor:'#FFFFFF',
		marginLeft: 25,
  		marginRight: 25,
  		borderRadius: 20,
  		borderWidth: 1,
  		elevation: 2,
		borderColor: '#A9A9A9',
		alignItems: 'center',
		position:'relative',
		top: 15,




		},
	texinput:{
	height: 35,
	borderColor: 'gray',
	flex: 1,
	alignItems: 'center',
	fontSize: 12



	},
	boxicon:{
	height: 30,
	width: 30,
	marginLeft: 10,
  	marginRight: 30,	
	},
	text:{
		fontFamily: "Cochin",
		fontSize:16
	  },
})
