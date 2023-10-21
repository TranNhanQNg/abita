import react,{useState} from "react";
import { View,Pressable,Text,Image } from "react-native";
import { Link } from "expo-router";
import api from "../../../api/api";

export default Render_GoiY = ({item})=>{
  const {hinhanhsanpham}=api
    const [mau, setmau]=useState('400');
    return(
    
        <Pressable onHoverIn={()=>setmau("bold")  } onHoverOut={()=>setmau('400')} key ={item.id}>
          <Link  href={{pathname:'chitietsanpham',params: {idchitietsp:item.IDCHITIETSP,idsanpham:item.IDSANPHAM,MaTinh:item.MATINH}}} key={item.IDCHITIETSP} 
 style={{backgroundColor:'#FFF',marginHorizontal:3,marginTop:3}}>
  <View style={{flexDirection:'row',alignItems:'center'}}>
      <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={{width:50,height:50,resizeMode:'contain',margin:2}}/>
      <Text numberOfLines={2} style={{marginLeft:3,fontSize:11,fontWeight:mau}}>{item.TENSANPHAM}</Text>
    </View>
  </Link>
          </Pressable>
   
    )
  }