import React from 'react';
import {Text, View,Image,StyleSheet,TextInput,TouchableOpacity,Dimensions } from 'react-native';

import color from '../dungchung/color';
import thongbaogiohang from './iconCart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default HeaderGH = ({navigation,setModalVisible_Abi,pold}) => {
	
	const search1 = () => navigation.navigate("Search");

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
			 {pold*200>200000?
    		 <TouchableOpacity style={{marginLeft:25,borderWidth:1,borderRadius:2,borderColor:'#00BFFF'}} onPress={() => {setModalVisible_Abi(true)}}>
			 <Text style={{margin:4}}>Abi</Text>
    		</TouchableOpacity>
			:null}
			
			 <View style={{marginLeft:25}}>
			 	{thongbaogiohang()}
			 </View>
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