import React, {useRef,useEffect} from 'react';
import { View,Text,ActivityIndicator,Animated,Image,useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




const Activity =({mau})=>{
 

  useEffect(() => {
    const id = setInterval(() => {animatedXoay()},2000);
    return () => clearInterval(id);
  }, []); 

  const xoay = useRef(new Animated.Value(0)).current;
  const animatedXoay =()=>{
      Animated.timing(
        xoay,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver:false, 
        }
      ).start(()=>{animatedXoay1()});
    };
    const animatedXoay1 =()=>{
      Animated.timing(
        xoay,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver:false, 
        }
      ).start(()=>{xoay.setValue(0)});
    };
    
  return (
  
  <View style={{flex:1, alignItems:'center',backgroundColor:mau}}>
        
          <View style={{marginTop:70}}>
          <ActivityIndicator size="large" color="#008000" />
          </View>
         
          <Animated.View style={{ transform: [{ scaleX: xoay }],width:60,height:60,backgroundColor:'#66CDAA',borderRadius:100,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#20B2AA',marginTop:20}}>
            <Image style ={{height:25,width:50,margin:10}} source={require('../icon/logo.png')}/>
          </Animated.View>
          
          
     
  </View>
          
      );
  };
  module.exports = {Activity};