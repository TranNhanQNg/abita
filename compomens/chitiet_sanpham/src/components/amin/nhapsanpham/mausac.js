import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default MauSac =({setMauSac,mausac,dataMauSac,setDaTaMau,refetchSL_G})=>{ 

	const setdatamau =(item, index)=>{
		const newdatamau =dataMauSac.map(e=>{
			if(e.MaMau==item.MaMau){
				return{...e,setmau:!e.setmau}
				}
				return{...e,setmau:e.setmau}
				})
			setDaTaMau(newdatamau);
		const newmau = newdatamau.filter(e=>  e.setmau !== false);
		if(newmau.length!==0){setMauSac(newmau)
			}else{setMauSac([{TenMau:'no', MaMau:''}])}
	}
const mau = '#E6E6E6';
return(
	<View>
		<View style={{flexDirection:'row',flexWrap:'wrap',  backgroundColor:mau,}}>
			{mausac.map((item, index) =>
				<View key={index} style={{flexDirection:'row', margin:10,alignItems:'center'}}>
				<View style={{width:10, height:10, backgroundColor:item.TenMau,marginHorizontal:5}}/>
				<Text>{item.TenMau}</Text>
				</View>
			)}
		</View>
		<View style={{height:1,backgroundColor:'#FFFFFF',}}/>
		<View style={{flexDirection:'row',flexWrap:'wrap',  backgroundColor:mau,}}>
			{dataMauSac.map((item, index) =>
				<TouchableOpacity key={index} onPress={()=>setdatamau(item)}>
					<View style={{flexDirection:'row', margin:10,alignItems:'center'}}>
					<Icon name="check" size={10} color={item.setmau?'blue':mau} />
					<View style={{width:10, height:10, backgroundColor:item.TenMau,marginHorizontal:5}}/>
					<Text>{item.TenMau}</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
		<TouchableOpacity onPress={()=>{refetchSL_G()}}>
			<View style={{flexDirection:'row',
						alignItems:'center',
						justifyContent:'center',
						backgroundColor:'#808000',
						height:30,
						marginTop:2}}>
			<Text>Lưu</Text>
			</View>
		</TouchableOpacity>
	</View>
		
	);
}