import React,{useState}from 'react';
import {Text, View,Platform,StyleSheet,Animated,TouchableOpacity,TextInput} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import thongbaogiohang from '../../../../chitiet_sanpham/nhom/iconCart';
import { Heigth_Width } from '../../../../api/heigth_width';




export default HeaderCH = ({navigation,dataAnh}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	

	const [textinput,settextinput] =useState(false);
   
	return(
		
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:30}]}>
           
                
                     <Animated.View style={[styles.boxicon]}>
                        <TouchableOpacity onPress={giohang}>
                        {thongbaogiohang()}
                        </TouchableOpacity>
                    </Animated.View>
			
           
         </View>
		
		);
  
}


const height = 45;

const styles= StyleSheet.create({
	
	header:{
		
		justifyContent: 'space-between',
		height: height,
		
		
     
		},
		
	
	boxicon:{
	flexDirection: 'row',
	height: height*0.9,
	width: height*0.9,
	alignItems:'center',
	justifyContent: "center",
	marginLeft:10,
	borderRadius:100
	
	
	},
	icon:{
		
	}
})