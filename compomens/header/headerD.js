import React from 'react';
import {Text,Image,Platform, View,StyleSheet,TouchableOpacity } from 'react-native';

import color from '../dungchung/color';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default HeaderD = ({navigation,ten, uri}) => {

	return(
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:20}]}>
			
			<TouchableOpacity onPress={() => navigation.goBack()}
								style={{height:50,
										width:50,
										justifyContent:'center',
										alignItems:'center'
										}}>
			<SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
			</TouchableOpacity>
			<View style={{ flexDirection:'row',
							flex:1,
							alignItems:'center',
							
							}}>
				<Image style ={{width:30,height:30,marginHorizontal:5}} source={{uri:uri}}/>
				<Text style={{color:'#FFF',fontSize:16,fontWeight: "bold",fontStyle: 'italic'}}>{' '+ten}</Text>
				
			</View>
		</View>
		
  
		);
  
}

const {colorToolBar,colorNen} = color;


const styles= StyleSheet.create({
	
	header:{
		height: 50,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems:'center',
		backgroundColor:'#87CEFA'
		},
	
		
	
	boxicon:{
	height: 35,
	width: 35,
		
	},
	boxicon:{
		height: 35,
		width: 35,
		marginLeft: 10,
		marginRight: 10,	
		},
		iconlogo:{
		height: 35,
		width: 75,
	
	},
	text:{
		color:'#FFFFFF'
	}
})