import React from 'react';
import { Text, View, Image,Dimensions} from 'react-native';
import {Activity} from '../../dungchung/activityIndicator';

let { width,height } = Dimensions.get("window");
export default function LoiChao ({TenTinh}) {
 return(
       <View
           style={{width:'100%',height:'100%',backgroundColor:'rgb(80,199,199)',position:'absolute',alignItems:'center'}}>
             <View style={{justifyContent:'center',marginTop:width*0.5,marginHorizontal:20}}>
                  <Image style ={{height:50,width:100,marginVertical:5,marginLeft:width*0.1}} source={require('../../icon/logo.png')}/>
                  <Text style={{color:'#191970',fontSize:23,fontFamily: 'OpenSans-ExtraBoldItalic',marginVertical:2,marginLeft:width*0.1+50}}>{TenTinh}</Text>
           <View style={{alignItems:'center'}}>
                  <Text style={{color:'blue',alignItems:'center',justifyContent:'center', marginTop:10}}>
                            🎀 ๏ ๏ ❁ ๏ ๏ 🎀      
                  </Text> 
            </View>
            
            <Text style={{color:'#FFF',fontSize:20,marginTop:30,fontFamily: 'OpenSans-ExtraBoldItalic',}}> Chào mừng bạn đến với chúng tôi!</Text>
            <Activity/>
          </View>
        </View>
       
    )
  }
