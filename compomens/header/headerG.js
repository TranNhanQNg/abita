import React from 'react';
import {Text, Image,View,StyleSheet,TouchableOpacity,Platform } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default HeaderG = ({navigation,tenTK, tentinh}) => {

	return(
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:20}]}>
			<View style={styles.header1}>
			<TouchableOpacity onPress={() => navigation()} style={{flexDirection:'row',alignItems:'center'}}>
				<SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
				
				<Image style ={styles.iconlogo} source={require('../../assets/icon/logo.png')}/>
				<Text style={{color:'#FFF',marginTop:14}}>{tentinh}</Text>
				
			</TouchableOpacity>
			
			<Text style={styles.text}>{tenTK}</Text>	
			</View>	
		</View>
		
  
		);
  
}




const styles= StyleSheet.create({
	
	header:{
		height: 50,
		
		justifyContent: 'center',
		},
	header1:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal:10,
		
		alignItems: 'center',
		},
		
	
	boxicon:{
	height: 35,
	width: 35,
		
	},
	boxicon:{
		height: 27,
		width: 27,
		marginLeft: 10,
		marginRight: 10,	
		},
		iconlogo:{
		height: 30,
		width: 75,
		resizeMode:"contain"
	
	},
	text:{
		color:'#FFFFFF'
	}
})