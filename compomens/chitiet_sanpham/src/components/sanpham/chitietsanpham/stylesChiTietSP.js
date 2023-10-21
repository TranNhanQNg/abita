import { Dimensions,StyleSheet } from 'react-native';
import color from '../../dungchung/color';

import b from '../../dungchung/dimensions';

const {colorToolBar,colorNen,colorFatlist,color2,colorXanhDen} = color;

const h = b;

const {width} = Dimensions.get('window')
const w = width;


const styles = StyleSheet.create({
  viewChung:{
   
  
 
},
tieude:{
        backgroundColor:`#e0ffff`,
        height:h*0.04,
        justifyContent:'center'

},
viewSwiper:{
 height:w*0.8,

},

 viewHinhAnh:{
    width:w,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewImage:{
              width:w,
              height:w,
              justifyContent:'space-between',
              flexDirection:'row',  
  },
  
  aoimage:{
          flex:1, 
          resizeMode:"contain",
 },
 viewSwiper:{
            height:w*0.78,
},
addCart1:{
          marginVertical:10,
          flexDirection:'row',
          backgroundColor:'#FF3333',
          borderRadius:8,
          justifyContent: 'center',
          alignItems: 'center',
 },

 addCart:{
          height:35,
          backgroundColor:'#FF3333',
          justifyContent: 'center',
          borderBottomRightRadius:5,
          borderTopRightRadius:5,
          alignItems: 'center',
          flexDirection:'row',

 },
 iconCart:{
        height:25,
        width:25,
        marginRight:10
  
 },

 viewMotasanpham:{
 marginVertical:w*0.05,
 },
   aotext:{
        color:'#008080',
        lineHeight:20,
        fontSize: 14,
       
       
   
   },
   //modal mua hàng
   modal:{
  marginHorizontal:20,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center',
backgroundColor:colorFatlist,
    },

  viewTong:{
   
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
 

    
  },
 
 viewImageModal:{
   width: w*0.28, 
   height: w*0.28,
   borderRadius: 20,
   
   
 },
  aoimageModal:{
    flex:1,
  resizeMode:"contain",
  borderRadius: 20,
  marginRight:10
 },
 
 textModal:{
      color: '#FFFFFF',
      fontSize:16,
    
   
 },
 // sản phẩm đề xuất

// modo sản phẩm
viewFlatlistmodo:{
    flex:1, 
    flexDirection: 'row',
     marginHorizontal:20,
     marginTop:7,
     backgroundColor:'#FFFFFF',
     borderRadius: 5,
     
  },
aoimagemodo:{
   flex:1, 
    resizeMode:"contain",
 },
viewImagemodo:{
   width: w*0.18, 
   height: w*0.18,
   margin:10

  },
  viewTextmodo:{
justifyContent: 'space-between',
margin:h*0.01
  },
aotextmodo:{
   fontSize: 13,
   marginLeft:10,

   
   },
   // mô tả sản phẩm
   viewMoTa:{
    marginHorizontal:10
   },
   xemthem:{
    height:w*0.8,
    width:w,
     position:'absolute',
      bottom:0,
      opacity: 1, 
   },
   viewImageMoTa:{
      width:w*0.8,
      height:w*0.8,
    position:'absolute', 
    top:150, 
    
  },
  aoimageMoTa:{
    flex:1, 
    resizeMode:"contain",
 
 },
 text:{
  
  lineHeight:27,
  fontFamily: 'OpenSans-Regular',
 },
 

  
})
export default styles;