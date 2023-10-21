import React from 'react';
import {Text, View,Image,StyleSheet,Platform,TouchableOpacity,Dimensions } from 'react-native';

import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
//import diachiDaTa from '../../diachiDaTa/diachiDaTa';

export default HeaderDM_CH = ({navigation,dataAnh}) => {
	
	const search1 = () => navigation.navigate("Search");
	const giohang = () => navigation.navigate("Giohang");
	const {back,menu,cart,search} = diachiDaTa;

	return(

		 
		
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:30}]}>
				<View style={{flexDirection:'row',alignItems:'center', marginVertical:2, borderRadius:8, borderColor:'#228B22'}}>
                    <TouchableOpacity style={{width:50,height:50,borderRadius:50,borderWidth:2,borderColor:'#FFFFFF',marginLeft:15}}
								onPress={() => { navigation.goBack()}}>
                      <Image source={{uri:'https://abita.com.vn/Abita/HinhAnh/slileApp/'+dataAnh.AnhDaiDienCH}} 
                      style={{flex:1,resizeMode:"cover",borderRadius:100}} />  
                    </TouchableOpacity>
                    <View style={{height:45,justifyContent:'center',marginLeft:5}}>
                      <Text style={{fontSize:20,color:'#FFFFFF'}}>{dataAnh.TenCuaHang}</Text>
                    </View>
                  </View>     

			<View style={{flexDirection:'row',alignItems:'center',}}>
			<TouchableOpacity  onPress={()=>navigation.navigate('TimSanPhamCH',{dataAnh:dataAnh})}>	
                            <SimpleLineIcons name="magnifier" size={23} style={{marginRight:5}} color="#FFFFFF" />
                        </TouchableOpacity>
			 <TouchableOpacity style={{marginLeft:25}} onPress={giohang}>
			 	{thongbaogiohang()}
			 </TouchableOpacity>
			 </View>
		</View>
		
  
		);
  
}

const {colorToolBar,colorNen} = color;
const {height,width} = Dimensions.get('window')

const h = 50;
const h_icon = 35;

const styles= StyleSheet.create({
	
	header:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		
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
		alignItems:'center'},
	timkiem:{
		height: h_icon,
		borderRadius: 5,
		backgroundColor:colorNen,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		
	},
	
})