import react,{useState} from "react";
import { View,TouchableOpacity,Pressable,Text,ScrollView } from "react-native";
import { Heigth_Width } from "../../../api/heigth_width";

export default Muc = ({item,mauMuc,cot,Api_Muc})=>{
    const [mau, setmau]=useState('400');
    return(
    
        <Pressable onHoverIn={()=>setmau("bold")  } onHoverOut={()=>setmau('400')} key ={item.id}>
        <TouchableOpacity 
          onPress={mauMuc==item.id?()=>null:()=>{Api_Muc(item)}}
          
          style={{ width:cot>2?Heigth_Width.width:Heigth_Width.width/cot}}
          >
          <View style={{margin:5,alignItems:'center',justifyContent:'center',borderBottomWidth:2,marginVertical:5,borderBottomColor:mauMuc==item.id?'red':'#FFF'}}>
            <Text style={{color:mauMuc==item.id?'blue':'#000',fontFamily: 'OpenSans-Regular',fontSize:12,marginVertical:15,fontWeight:mau}}>{item.muc}</Text>
          </View>
          </TouchableOpacity>
          </Pressable>
   
    )
  }