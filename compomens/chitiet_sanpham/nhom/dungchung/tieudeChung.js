import React from 'react';
import {Text, View,TouchableOpacity,StyleSheet,Image,ActivityIndicator} from 'react-native';


import Icon from 'react-native-vector-icons/SimpleLineIcons';




const TieudeChung = ({ten1,color,manghinh1,props,coloricon,colortext, icon}) => {
	return(
		<View
          colors={color}
          style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:50}}
        >
        <Text style={{fontSize:16, marginHorizontal:10, color:coloricon,fontFamily: 'OpenSans-SemiBold',}}>
      {icon} <Text style={{color:colortext}}> {props}</Text>
      </Text>
       
        <TouchableOpacity  onPress={() =>{manghinh1()}} style={{flexDirection: 'row',alignItems:'center',height:50}}>
          <Icon name="control-play" size={15} color={'red'} style={{marginLeft:15}} />
		      <Text style={{fontSize: 15,color:'#0693e3',marginRight:15,fontFamily: 'OpenSans-Medium',}}> {ten1} </Text>
		</TouchableOpacity>

</View>
		);
};
const TieudeHome = ({props, color,coloricon,colortext, icon}) => {
  
	return(
		<View
          colors={color}
          style={styles.Viewxemthem}
        > 
      <Text style={{fontSize:16, marginHorizontal:10, color:coloricon,fontWeight:'bold',fontFamily:'OpenSans-Regular'}}>
      {icon} <Text style={{color:colortext}}> {props}</Text>
      </Text>
    </View>
		);
};
const Tieude1Ben= ({ ten,color,manghinh,ten1}) => {
	return(
		<View
          colors={[ '#FFFFFF','#CCCCCC','#FFFFFF'  ]}
          style={styles.Viewxemthem}
        >
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent:'space-between', marginHorizontal:10}}>
        <View>
        <Text style={{fontSize: 14,color:'#0693e3',fontFamily: "Cochin"}}>{ten1} </Text>

        </View>
       
		<TouchableOpacity  onPress={() =>{manghinh()}}>
		<Text style={{fontSize: 15,color:'#0693e3',fontFamily: "Cochin"}}><Icon name="badge" size={15} color={color} /> {ten} </Text>
		</TouchableOpacity>
</View>
</View>
		);
};
const TieuDeLoc =({ morong,
                    soluongmuc,
                    onpressMoRong,
                   })=>{
                        
  return(
   
     
   
    <View style={{flexDirection:'row',alignItems:'center'}}>
    
    {soluongmuc>4?
     <View
      colors={[ '#FFFFFF','#BFE8F5'  ]}
      style={{height:40, borderBottomEndRadius:20,borderBottomStartRadius:20,width:'100%',alignItems:'center',justifyContent:'center'}}
    >
   <TouchableOpacity onPress={()=>onpressMoRong()}
                style={{flex:1,height:'100%',width:'100%'}}      >
          {morong==false?
          <View style={{alignItems:'center'}}>
            <Icon name="arrow-up" size={13} color={'#0693e3'} />
            <Text style={{fontSize: 12, marginHorizontal:10, color:'red'}}>Đóng</Text>
          
          </View>:
          <View style={{alignItems:'center'}}>
                <Text style={{fontSize: 12, marginHorizontal:10,color:'#008080'}}>Mở rộng</Text>
                <Icon name="arrow-down" size={13} color={'#0693e3'} />
          </View>
          }
   </TouchableOpacity>
 </View>:null}
 </View>
 
  
  
 
  )
};
const Tieude2Ben= ({ ten,color,manghinh,ten1,onpressMoRong,morong}) => {
	return(
		<View
          colors={[ '#FFFFFF','#CCCCCC','#FFFFFF'  ]}
          style={styles.Viewxemthem}
        >
        <View style={{flexDirection: 'row',justifyContent:'space-between', marginHorizontal:10,alignItems:'center'}}>
          <View
                    style={{height:h,alignItems:'center', borderBottomEndRadius:20,borderBottomStartRadius:20,width:80}}
                    >
        <View
          colors={[ '#FFFFFF','#FFFFFF','#B0E0E6','#87CEEB'  ]}
          style={{height:h,alignItems:'center', borderBottomEndRadius:20,borderBottomStartRadius:20,width:80}}
        >
       <TouchableOpacity onPress={()=>onpressMoRong()}
       style={{height:h,width:80}}>
       {morong==true?
       <View style={{alignItems:'center'}}>
         <Icon name="arrow-up" size={13} color={'#0693e3'} />
         <Text style={{fontSize: 12, marginHorizontal:10, color:'red'}}>Đóng</Text>
       
       </View>:
       <View style={{alignItems:'center'}}>
            <Text style={{fontSize: 12, marginHorizontal:10,color:'#008080'}}>Mở rộng</Text>
            <Icon name="arrow-down" size={13} color={'#0693e3'} />
       </View>
       
       }
       </TouchableOpacity>
     </View>
     </View>
		<TouchableOpacity  onPress={() =>{manghinh()}}>
		<Text style={{fontSize: 13,color:'#0693e3'}}><Icon name="badge" size={15} color={color} /> {ten} </Text>
		</TouchableOpacity>
</View>
</View>
		);
};


module.exports = {TieudeHome,TieudeChung,Tieude1Ben,Tieude2Ben,TieuDeLoc};
const h =45;
const styles = StyleSheet.create({

Viewxemthem:{
height:h,
justifyContent:'center',
},
})


