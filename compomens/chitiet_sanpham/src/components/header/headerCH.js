import React,{useState}from 'react';
import {Text, View,Platform,StyleSheet,Animated,TouchableOpacity,TextInput} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';
import b from '../dungchung/dimensions';




export default HeaderCH = ({navigation,dataAnh}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	
	const {hinhanh} = diachiDaTa;
	const [textinput,settextinput] =useState(false);
   
	return(
		
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:30}]}>
            <Animated.View style={[styles.boxicon]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" style={styles.icon}/>
                </TouchableOpacity>
            </Animated.View>
            <View style={{marginRight:10,flexDirection:'row'}}>
				
                <View style={{marginRight:10,flexDirection:'row'}}>
                     <Animated.View style={[styles.boxicon]}>
                        <TouchableOpacity  onPress={()=>navigation.navigate('TimSanPhamCH',{dataAnh:dataAnh})}>	
                            <SimpleLineIcons name="magnifier" size={23} style={{marginRight:5}} color="#FFFFFF" />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.boxicon]}>
                        <TouchableOpacity onPress={() => {navigation.navigate("Danhmuc")}}>
                            <SimpleLineIcons name="grid" size={22} color="#FFFFFF" />
                        </TouchableOpacity>
                    </Animated.View>
                </View>   
                
                     <Animated.View style={[styles.boxicon]}>
                        <TouchableOpacity onPress={giohang}>
                        {thongbaogiohang()}
                        </TouchableOpacity>
                    </Animated.View>
			</View>
           
         </View>
		
		);
  
}

const h = b;
const height = 45;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: height,
		alignItems: 'center',
		
      width:'100%'
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