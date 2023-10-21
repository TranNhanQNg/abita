import { Dimensions,StyleSheet } from 'react-native';
import color from '../dungchung/color';
import b from '../dungchung/dimensions';
import { Heigth_Width } from '../api/heigth_width';
const {width} = Dimensions.get('window');
const {colorToolBar,colorNen,colorFatlist,color2,colorXanhDen} = color;

const h = b;
const w=width;

const styles = StyleSheet.create({
  //tinh thanh
   imageTinhThanh:{
    marginLeft: 20,
    marginRight: 10,
    width: 25, 
    height: 25,
   
 },
 viewTinhThanh:{
   height: 45,
   opacity: 1,
   flexDirection: 'row',
   alignItems: 'center',
   
},
  // text mua hàng
  textMua:{
    color:'red',
    marginHorizontal:20,
    fontSize: 14,
    alignItems: 'center',

  },
  
  //  giỏ hàng 
  aoflatlist:{
    flex:1,
    
     marginHorizontal:8,
     marginTop:8,
     backgroundColor:'#FFFFFF',
     borderRadius: 5,
 
    
  },
  aoimage:{
   flex:1, 
    resizeMode:"contain",
 },
 viewImage:{
   marginVertical:5,
   width:Heigth_Width.width/1.2, 
   height:Heigth_Width.width/1.2,
  },
   aotext:{
   fontSize: 14,
   color:'#303030',
   lineHeight:20,
  fontFamily: 'OpenSans-Regular',
  marginBottom:2
   
   },
  viewTinhTong:{
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height:60,
  },
  LinearGradientTinhTong:{
      height:30,
      alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 5,

},

wiewTangGiam:{
  flexDirection:'row',
  marginRight:10,
  justifyContent: 'space-between',
   margin:8,
   alignItems: 'center',
   

},
viewTangGiam:{
   borderWidth:1,
   borderColor:'#C0C0C0',
   borderRadius:2,
   flexDirection:'row',
   justifyContent: 'space-between',
   width:150,
   alignItems:'center',
},

iconTangGiam:{
  alignItems:'center',
  backgroundColor:'#EBEDEF',
  justifyContent:'center',
  borderRadius:2,
  height:30,
  flex:0.35,
  
  
},
iconDelete:{
  width:w*0.06,
  height:w*0.06,
  
},
      

  viewDatHang:{
    alignItems: 'center',
    opacity: 1,
    flexDirection: 'row',
     justifyContent: 'center',

   },

 // component đặt hàng
 //tiêu đề dat hang
  textTieuDe:{
    width:100,
    fontSize: 13,
  },
  viewTieuDe:{
   
   alignItems: 'center',
   flexDirection: 'row',
   marginTop:10,
   borderRadius:5,
   
   
  },
 textinput:{
    flex:1,
    backgroundColor:'#F0F0F0',
    marginLeft:10,
    minHeight:40,
    borderRadius:2,
    borderColor:'#D8D8D8',
    borderWidth:1
 },
 textinputDiaChi:{
  marginHorizontal:20,
    
   backgroundColor:colorFatlist,

 },
  

 viewMuaHang:{
 height:h*0.04,
  backgroundColor:colorXanhDen,
   alignItems: 'center',
   flexDirection: 'row',
   justifyContent: 'center',
   marginLeft: 40,
    marginRight: 40,
    borderRadius: 5,
    marginTop:20
 },
 modal:{
 
  marginLeft:40,
  marginRight:40,
  borderRadius:10,
  marginTop:h*0.35,
backgroundColor:colorFatlist,
alignItems: 'center',

    },
//modal quận huyện
texmodalQH:{
 flex:1,
 height:40,
 textAlign:'center',
  marginHorizontal:60,
  borderRadius:5,
  borderWidth:0.5,
  margin:0.5,
backgroundColor:colorFatlist,

justifyContent:'center',
}
  
})
export default styles;