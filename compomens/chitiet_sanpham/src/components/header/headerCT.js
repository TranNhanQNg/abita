import React,{useState}from 'react';
import {Text, View,Platform,StyleSheet,Animated,TouchableOpacity,SafeAreaView} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';
import b from '../dungchung/dimensions';



const HeaderCT = ({navigation,headerHeight,colorHeder,clearTimeout}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	
	const {hinhanh} = diachiDaTa;

	return(
		
		<Animated.View style={ {backgroundColor:headerHeight,position:'absolute',width:'100%'}}>
			<View style={{flexDirection:'row',justifyContent: 'space-between',alignItems:'center',marginTop:Platform.OS === 'ios'?0:35}}>
				<TouchableOpacity onPress={() => {navigation.goBack()}}>
					<Animated.View style={[styles.boxicon,{backgroundColor:colorHeder}]}>
						<SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" style={styles.icon}/>
					</Animated.View>
				</TouchableOpacity>
			
		    <View style={{marginRight:10,flexDirection:'row'}}>
				
				<TouchableOpacity onPress={giohang}>
					<Animated.View style={[styles.boxicon,{backgroundColor:colorHeder}]}>
						{thongbaogiohang()}
					</Animated.View>
				</TouchableOpacity>
				
				
            </View>
			</View>
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
const h = b;
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