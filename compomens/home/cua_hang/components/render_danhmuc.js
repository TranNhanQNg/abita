import { View, Text,Pressable,Image} from "react-native";
import { Link } from "expo-router";
import react,{useState} from "react";
import { Heigth_Width } from "../../../api/heigth_width";
import api from "../../../api/api";
const {hinhanhdanhmuc}=api
const mobi=Heigth_Width.mobi;

export const RenderDanhMuc =({item, dataAnh}) =>{ 
  const [mau, setmau]=useState('600');
    return(
      mobi=="mobi"?
      <Pressable onHoverIn={()=>setmau("bold")  } onHoverOut={()=>setmau('600')}>
      <Link href={{pathname:'sanpham_danhmuc',params: {iddanhmuc:item.IDDANHMUCCAP2,mauidNCC:dataAnh.MaUidNCC,matinh:51,ten:item.TENDANHMUCCAP2}}} >
            <View style={{marginTop:10,marginLeft:5, alignItems:'center', width:Heigth_Width.width_tong/4-10}}>
              <View style={{height:Heigth_Width.width_tong/6, width:Heigth_Width.width_tong/6}}>
                <Image style={{flex:1,}}
                source={{uri:hinhanhdanhmuc+item.TENHINHANHDMC2}}/>
              </View>
             <Text numberOfLines ={2} style={{color:'#006400',fontSize:12,fontWeight:mau}}>{item.TENDANHMUCCAP2}</Text>
          </View>
      </Link>
    </Pressable>
     
      :

    <Pressable onHoverIn={()=>setmau("bold")  } onHoverOut={()=>setmau('600')}>
      <Link href={{pathname:'sanpham_danhmuc',params: {iddanhmuc:item.IDDANHMUCCAP2,mauidNCC:dataAnh.MaUidNCC,matinh:51,ten:item.TENDANHMUCCAP2}}} >
            <View style={{marginTop:10,marginLeft:5}}>
             <Text numberOfLines ={1} style={{color:'#006400',fontSize:12,fontWeight:mau}}>- {item.TENDANHMUCCAP2}</Text>
          </View>
      </Link>
    </Pressable>
  
  
                
    )
             
}

