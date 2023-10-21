import React from 'react';
import { Text, View, Image} from 'react-native';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';

export default ListHeadre=({item})=>{
    const {abita_amin,hinhanh}=diachiDaTa;  
    const Return =()=>{
        switch(item.id) {
            case 1:return(
                <View style={{flexDirection:'row',height:195,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:30, color:'#FFF',flex:1,marginHorizontal:10}}>𝔹𝕒̣𝕟 𝕙𝕒̃𝕪 𝕔𝕙𝕠̣𝕟 𝕔𝕙𝕠 𝕞𝕚̀𝕟𝕙 𝕤𝕒̉𝕟 𝕡𝕙𝕒̂̉𝕞 𝕦̛𝕟𝕘 𝕪́ 𝕟𝕙𝕒̂́𝕥</Text>
                </View>
                    )
            
              break;
            case 2:return(
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:30, color:'#FFF',flex:1,marginHorizontal:10}}>𝔹𝕒̣𝕟 𝕙𝕒̃𝕪 𝕔𝕙𝕠̣𝕟 𝕔𝕙𝕠 𝕞𝕚̀𝕟𝕙 𝕤𝕒̉𝕟 𝕡𝕙𝕒̂̉𝕞 𝕦̛𝕟𝕘 𝕪́ 𝕟𝕙𝕒̂́𝕥</Text>
                </View>
                )
            
              break;
            case 3:return(
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:30, color:'#FFF',flex:1,marginHorizontal:10}}>𝔹𝕒̣𝕟 𝕙𝕒̃𝕪 𝕔𝕙𝕠̣𝕟 𝕔𝕙𝕠 𝕞𝕚̀𝕟𝕙 𝕤𝕒̉𝕟 𝕡𝕙𝕒̂̉𝕞 𝕦̛𝕟𝕘 𝕪́ 𝕟𝕙𝕒̂́𝕥</Text>
                </View>
                )
            break;
            case 4:return(
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:30, color:'#FFF',flex:1,marginHorizontal:10}}>𝔹𝕒̣𝕟 𝕙𝕒̃𝕪 𝕔𝕙𝕠̣𝕟 𝕔𝕙𝕠 𝕞𝕚̀𝕟𝕙 𝕤𝕒̉𝕟 𝕡𝕙𝕒̂̉𝕞 𝕦̛𝕟𝕘 𝕪́ 𝕟𝕙𝕒̂́𝕥</Text>
                </View>
                )
            break;
            case 5:return(
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:30, color:'#FFF',flex:1,marginHorizontal:10}}>𝔹𝕒̣𝕟 𝕙𝕒̃𝕪 𝕔𝕙𝕠̣𝕟 𝕔𝕙𝕠 𝕞𝕚̀𝕟𝕙 𝕤𝕒̉𝕟 𝕡𝕙𝕒̂̉𝕞 𝕦̛𝕟𝕘 𝕪́ 𝕟𝕙𝕒̂́𝕥</Text>
                </View>
                )
            break;
            case 6:return(
                <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
                   <Text style={{fontSize:30, color:'#FFF',flex:1,marginHorizontal:10}}>𝔹𝕒̣𝕟 𝕙𝕒̃𝕪 𝕔𝕙𝕠̣𝕟 𝕔𝕙𝕠 𝕞𝕚̀𝕟𝕙 𝕤𝕒̉𝕟 𝕡𝕙𝕒̂̉𝕞 𝕦̛𝕟𝕘 𝕪́ 𝕟𝕙𝕒̂́𝕥</Text>
                </View>
                )
            break;
            case 7:return(
                <View>
                   <Image source={{uri:item.icon}} style={{height:200,width:200}}/> 
                </View>
                )
            break;
            default:
          }
    }
    return(
         <View style={{}}>
            {Return()}
                           
            </View>
           
          
       
    )
}