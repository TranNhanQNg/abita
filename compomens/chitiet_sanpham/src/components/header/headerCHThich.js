import React,{useState}from 'react';
import {Text, View,Image,StyleSheet,Platform,TouchableOpacity,TextInput} from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';
import b from '../dungchung/dimensions';


export default HeaderCHThich = ({navigation,onChangeText,onSubmitEditing,saechclose,timkiem,ten}) => {
	
	const giohang = () => navigation.navigate("Giohang");
   
	return(
        
		<View style={[styles.header,{marginTop:Platform.OS === 'ios'?0:30}]}>
            <TouchableOpacity onPress={() => navigation.goBack()}
				style={styles.boxicon}
			>
                <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" style={styles.icon}/>
            </TouchableOpacity>
           
            <View style={{flex:1,flexDirection: 'row', borderColor:'#FFF',borderRadius: 5,borderWidth:1,marginHorizontal:10,height:40}}>
                        <TextInput
                            style={{flex:1,marginLeft:5}}
                            returnKeyType ='search'
                            placeholder={ten}
                            onSubmitEditing ={()=>{onSubmitEditing()}}
                            onChangeText={text => {onChangeText(text)}}//,listViewRef.scrollToIndex({animated: true, index:0})
                            value={timkiem}     
                        />
                    {timkiem!==''?
                    <TouchableOpacity style={styles.boxicon} 
                            onPress={()=>{saechclose()}}>	
                            <Text style={{color:'red',fontSize:16}}>✗</Text> 
                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.boxicon} 
                                    onPress={()=>onSubmitEditing()}>	
                    <SimpleLineIcons name="magnifier" size={23} style={{marginRight:5}} color="#FFF" />
                    </TouchableOpacity>
                    }
                    
            </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                     
                     <TouchableOpacity style={[styles.boxicon, {marginLeft:10}]}
                        onPress={() => {navigation.navigate("Danhmuc")}}>
                        <SimpleLineIcons name="grid" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={giohang}
                        style={[styles.boxicon, {marginLeft:10}]}
                        >
                    {thongbaogiohang()}
                </TouchableOpacity>
                </View>
         </View>
		
		);
  
}


const height = 45;

const styles= StyleSheet.create({
	
	header:{
        marginHorizontal:10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		
		alignItems: 'center',
       
		},
		
	
	boxicon:{
	
	height: height*0.9,
	width: height*0.9,
	alignItems:'center',
	justifyContent: "center",
	
	
	
	},
	icon:{
		
	}
})