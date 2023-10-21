import React from 'react';
import {TouchableOpacity,Dimensions,StyleSheet,Image,Animated} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


const LenDauTrang = ({chuyenDauTrang,scrollY,cao})=> { 
    
  const headerHeight = scrollY.interpolate({
    inputRange: [300, 400],
    outputRange: [0,1],
    extrapolate: 'clamp',
  });
    const chuyenlendau=() => {
      chuyenDauTrang.current.scrollToOffset({ animated: true, offset: 0 })
    };
      
    return(
      <Animated.View style={[styles.lendautrang,{bottom:cao,transform: [{ scale:headerHeight }]}]}>
        <TouchableOpacity onPress={()=>chuyenlendau()}
        >
          <Image style ={{width:25,height:25,margin:8}} source={require('../icon/up.png')}/>
          
        </TouchableOpacity>
      </Animated.View>
   );
}
const LenDauTrangSroll = ({chuyenDauTrang,scrollY,cao})=>{ 
    
  const headerHeight = scrollY.interpolate({
    inputRange: [200, 250],
    outputRange: [0,1],
    extrapolate: 'clamp',
  });
    const chuyenlendau=() => {
      chuyenDauTrang.current.scrollTo({x: 0, y: 0, animated: true})
    };
      
    return(
      <Animated.View style={[styles.lendautrang,{bottom:cao, transform: [{ scale:headerHeight }]}]}>
        <TouchableOpacity onPress={()=>chuyenlendau()}
        >
           <Image style ={{width:25,height:25,margin:8}} source={require('../icon/up.png')}/>
          
        </TouchableOpacity>
      </Animated.View>
   );
}
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
    
   lendautrang:{
     backgroundColor:'rgba(190,190,200,0.3)',
     right:10,
     borderRadius:100,
     position:'absolute',
     alignItems:'center',
     justifyContent:'center'
  }, 
   text:{
     color:'#006400',
     fontSize:25
   }
     
    
  });
  module.exports = {LenDauTrang,LenDauTrangSroll};