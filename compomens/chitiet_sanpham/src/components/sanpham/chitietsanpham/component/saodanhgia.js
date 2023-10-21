import React from "react";
import { StyleSheet, Text,View,Image,useWindowDimensions} from "react-native";
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default SaoDanhGia = ({sao,count,tong}) => {
  const data=[1,2,3,4,5];
  
	
  const w = useWindowDimensions().width; 
	const hiencount =()=>{if(count>0){ return(
    <View style={{flexDirection:'row',alignItems:'center'}}>
		    <View style={{flexDirection:'row',alignItems: 'center',width:w*0.45,height:5,marginLeft:10,backgroundColor:'#D8D8D8',borderRadius:20}}>
          <View style={{width:w*0.45*count/tong, height:5,backgroundColor:'#2E8B57',borderRadius:20, }}/>
			    {/* <Text style={{marginLeft:10, fontSize:12,color:'#B8860B'}}>{count}/{tong}</Text>       */}
			</View>
      <Text style={{marginLeft:10, fontSize:11,color:'#B8860B'}}>{Math.round(count/tong*100)} %</Text>
    </View>
		)}
  };
	return(	
    <View style={{flexDirection:'row',alignItems: 'center',margin:1}}>
      { data.map(item=>
      <Icon name="star" size={13} color={(item<sao||item==sao)?'#FFCC00':'#D8D8D8'} key={item}/>
      )  
      }
      {hiencount()}
    </View>
  )
};
