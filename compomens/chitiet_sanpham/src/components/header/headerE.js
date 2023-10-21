import React from 'react';
import {Text, View,Platform,StyleSheet,TextInput,TouchableOpacity,Dimensions } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import b from '../dungchung/dimensions';


export default HeaderE = ({navigation}) => {
	
	

	return(
		
		
			<TouchableOpacity onPress={() => navigation.goBack()}
			style={[styles.header,{marginTop:Platform.OS === 'ios'?0:20,marginLeft:10}]}
			>
			<SimpleLineIcons name="arrow-left" size={25} color="blue" />
			</TouchableOpacity>
	
		
		);
  
}


const h = b;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 50,
		alignItems: 'center',
		position:'absolute',
		
		opacity: 1,
		},
		
	
	boxicon:{
	height: 30,
	width: 30,
	marginLeft: 10,
  	marginRight: 20,	
	}
})