import React, { useState,useEffect,useRef, } from "react";
import { FlatList, SafeAreaView, Text, Animated,
  TouchableOpacity,ActivityIndicator,View,Image,ScrollView,Modal,Dimensions,Platform } from "react-native";

export const Options =()=>{
    return(
        <TouchableOpacity onPress={()=>setoptions(false)}
				 style={{position:'absolute',height:'100%',width:'100%',alignItems:'flex-end'}}>
					<View style={{marginTop:50,backgroundColor:'rgba(96,96,96,0.6)',marginRight:15,width:'50%',borderRadius:5}}>
						<TouchableOpacity onPress={() => {navigation.navigate("Home")}}
						style={{flexDirection:'row',margin:7,alignItems:'center'}}>
							<Image style ={{width:25,height:25}} source={require('../../icon/home.png')}/>
							<Text style={{color:'#FFF'}}> Trang chủ</Text>
						</TouchableOpacity>
						<View style={{height:0.5,backgroundColor:'#FFF'}}/>
						<TouchableOpacity onPress={() => {navigation.navigate("Danhmuc")}}
						style={{flexDirection:'row',margin:7,alignItems:'center'}}>
							<Image style ={{width:25,height:25}} source={require('../../icon/menu.png')}/>
							<Text style={{color:'#FFF'}}> Danh Mục</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
    )
}