import { Dimensions,StyleSheet } from 'react-native';
import color from '../dungchung/color';
import b from '../dungchung/dimensions';


const {colorToolBar,colorNen,colorFatlist,color1,colorXanhDen,colorTim,colorXanhlua,color2} = color;
const {height,width} = Dimensions.get('window')
const h = height;
const w = width;

const styles = StyleSheet.create({

  headerA:{
   
    width:'100%',
  },
  

 
 //Hình paner

   viewImagePaner:{
      height: w/2.5,
     alignItems:'center',
    
},
imageSile:{
   width:w*0.96,
   height:w*0.96/2.5,
  opacity:0.9,
  borderRadius:5
  },
  imageSile1:{
    width:w*0.8,
    height:w/3,
   
   
   }, 
    
  
// chung menu danh muc
  textTieudeDanhMuc:{
  fontSize: 14,
  color:'#0693e3',
  marginHorizontal:15,
  
  
},

  // Danh mục
 
  viewDanhMuc:{
      marginBottom:10,
      alignItems:'center',
      marginHorizontal:10,
      flex:1
 }, 
 viewImage:{
      width: 55, 
      height: 55,
     
 },
  aoimage:{
      flex:1,
      resizeMode:"contain",
 },
 
   aotext:{
      width:100,
      textAlign: 'center',
      marginTop:10,
      fontSize:13,
    
   },

    // Danh mục sản phẩm
 
 
//tìm kiếm
viewSeach:{
   width:w,
 
  borderBottomRightRadius: 50,
  borderBottomLeftRadius:50, 
  

    
  },
  header1:{
   borderBottomRightRadius: 50,
    borderBottomLeftRadius:50, 
    backgroundColor:colorToolBar,
    },
  
    
  headerTexInput:{
        flexDirection: 'row',
      
       
        marginHorizontal:15,
        borderRadius: 20,
        borderColor: '#A9A9A9',
        alignItems: 'center',
       

    },
  texinput:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#FFFFFF',
    borderRadius:50, 
    
    flex:1,
   
    justifyContent:'space-between'



  },
  boxicon:{
      height: 30,
      width: 30,
      marginLeft: 10,
      marginRight: 30,  
  }
});
export default styles;