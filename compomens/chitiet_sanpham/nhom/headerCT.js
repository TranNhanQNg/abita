import React,{useState}from 'react';
import {Text, View,Platform,StyleSheet,Animated,TouchableOpacity,SafeAreaView} from 'react-native';
import { Link } from 'expo-router';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import api from '../../api/api';
import thongbaogiohang from './iconCart';



const HeaderCT = ({navigation,headerHeight,colorHeder,clearTimeout}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	
	const {hinhanh} = api;

	return(
		
		<Animated.View style={ {backgroundColor:headerHeight,position:'absolute',width:'100%',alignItems:'flex-end'}}>
				<Link href={'giohang'}>
					<Animated.View style={[styles.boxicon,{backgroundColor:colorHeder}]}>
						{thongbaogiohang()}
					</Animated.View>
				</Link>
         </Animated.View>
		
		);
  
}
const HeaderCH = ({navigation,headerHeight}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	
	const {hinhanh} = diachiDaTa;
	//const [textinput,settextinput] =useState(false);
	return(
		
		<Animated.View style={[styles.header, {backgroundColor:headerHeight}]}>
            <TouchableOpacity onPress={() => navigation.goBack()}
				style={styles.boxicon}
			>
                <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" style={styles.icon}/>
            </TouchableOpacity>
		    <View style={{marginRight:10,flexDirection:'row'}}>
				<TouchableOpacity style={styles.boxicon} >	
					<SimpleLineIcons name="magnifier" size={23} style={{marginRight:5}} color="#FFFFFF" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.boxicon} 
					onPress={() => {navigation.navigate("Danhmuc")}}
				>
					<SimpleLineIcons name="grid" size={22} color="#FFFFFF" />
				</TouchableOpacity>
				<TouchableOpacity onPress={giohang}
				style={styles.boxicon}
				>
					{thongbaogiohang()}
				</TouchableOpacity>
            </View>
         </Animated.View>
		
		);
  
}
module.exports = {HeaderCT,HeaderCH};
const height = 45;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: height,
		alignItems: 'center',
		position:'absolute',
      width:'100%'
		},
		
	
	boxicon:{backgroundColor:'bluergba(192,192,192,0.4)',
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