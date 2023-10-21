import React from 'react';
import {Text, View,Image,StyleSheet,TouchableOpacity,useWindowDimensions } from 'react-native';
import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import b from '../dungchung/dimensions';
import { useSelector } from 'react-redux';


const giohang = () => navigation.navigate("Giohang");
 
// const iconCart = ()=>{
	
// 	const dataCart = useSelector(state => state.cart.dataCart);
// 	const MaTinh = useSelector(state => state.cart.MaTinh);
// 	const cartItems = dataCart.filter(e=> {return( e.MATINH == MaTinh)});

// 	var sum= 0;
//   for(let i = 0; i < cartItems.length; i++){
//     sum+= cartItems[i].soluong};
// 	if(sum >0){ return( 
// 		<View style= {styles.boxicon1}>
// 			<Text style={styles.textboxicon}>{sum}</Text>
// 		</View>
// 		)}
// };	

const thongbaogiohang = ()=>{
	const w = useWindowDimensions().width;
	const h = useWindowDimensions().height;
	const f = useWindowDimensions().fontScale;
	const dataCart = useSelector(state => state.cart.dataCart);
	const MaTinh = useSelector(state => state.cart.MaTinh);

	 return( 		
		<View style={styles.header3}>
		<Image style ={{width:25,height:25}} source={require('../icon/giohang.png')}/>
		{dataCart.length>0?
		<View style= {styles.boxicon1}>
			<Text style={styles.textboxicon}>{dataCart.length}</Text>
		</View>:null}
	</View>
			
			 )};

export default thongbaogiohang;
const {colorToolBar,colorNen} = color;

const h = b;

const styles= StyleSheet.create({
	
header3:{
		justifyContent:'center',
		flexDirection:'row',
		alignItems:"center",
		
		
	},
	boxicon:{
			
				
	},
	boxicon1:{
			height:15,
			minWidth:15,
			right:-5,
			backgroundColor: 'red',
			top:-5,
			position: 'absolute',
			borderRadius:50,
			justifyContent:'center',
			alignItems: 'center',
			
	},
	textboxicon:{
		color:'#FFFFFF',
		fontSize:9,
		fontFamily: 'OpenSans-SemiBold'
	}

})
