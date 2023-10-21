import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const renderItem =(item)=>{
  const time = new Date(item.NGAY*1)
  var phut = time.getMinutes().toString();
  var gio = time.getHours().toString();
  var ngay = (time.getDate() + 100).toString().substring(1);
  var thang = (time.getMonth() + 101).toString().substring(1);
  var nam = time.getFullYear().toString();
   var ngaythangnam =gio+':'+phut+' '+ngay+'/'+thang+'/'+nam
   
    const data=[1,2,3,4,5];
  const a = item.SOSAO;
return(
<View 
          style={{marginHorizontal:10, borderWidth:0.3,backgroundColor:'#FFFFFF', marginVertical:5,borderColor:'#808080', borderRadius:5}}>
        
        <View style={{flexDirection:'row',alignItems: 'center',margin:1}}>
    { data.map(e=>
    <MaterialCommunityIcons name="star" size={13} color={(e<a||e==a)?'#FFCC00':'#D8D8D8'} key={e}/>
    )  
    }
    <Text style={{fontSize:13,lineHeight:25,color:'#191970'}}> {item.TIEUDE}</Text>
  </View>
        <Text style={{fontSize:13,lineHeight:25,color:'#404040'}}> {item.DANHGIA}</Text>
        <View style={{flexDirection:'row',alignItems: 'center',}}>
        <Text style={{color:'#009900', margin:2}}> {item.HOTEN}</Text>
        <Text style={{color:'#A9A9A9', margin:2, fontSize:10}}> {ngaythangnam}</Text>
        </View>
        </View>
)
}