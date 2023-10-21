import { Dimensions,StyleSheet } from 'react-native';
import color from '../dungchung/color';
import b from '../dungchung/dimensions';


const {width} = Dimensions.get('window');


const {colorToolBar,colorNen,colorFatlist,color2} = color;

const h = b;
const w=width;

const styles = StyleSheet.create({
  //  sản phẩm 
  viewTong:{
    flex:1,
     justifyContent: 'center',
     backgroundColor:'#FFFFFF', 
    alignItems:'center',
     
    
      },
  aoflatlist:{
    flex:1,
   backgroundColor:'#FFFFFF', 
   borderWidth:1,
   borderColor:'#F2F2F2',
   alignItems:'center',
   
  },
  viewanimater:{
   
  },
  aoimage:{
   resizeMode:"contain",
   flex: 1,
   margin:1
  
 },
 viewText:{
        marginLeft:5,
        justifyContent:'space-between'
        },
   aotext:{
   fontSize:13,
   fontWeight: '300',
   marginHorizontal:10
   },
   giatext:{
    fontSize:16,
    fontWeight: '300',
    color:'red',
    
    },
    viewImage:{
   width: w*0.48, 
   height: w*0.48,
   
 },

  
   
// style listHeader danh mục
viewNen:{
 marginLeft:5,
 marginTop:5
  },
 
    
  viewlistHeader:{

    alignItems: 'center',
    width:w*0.2,
    marginRight: 10,
    height:110,
    
     
 }, 
 viewlistHeader1:{
    width:60,
    height:60,
  
 }, 
 imagelistHeader:{
  flex:1, 
    resizeMode:"contain",
    borderRadius:10
 },
 textlistHeader:{
    textAlign: 'center',
    marginTop: 5,
    fontSize:13,
    

  },
  linearGradientSanPham:{
    height:h*0.06,
    width:w,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
},
 lendautrang:{
   backgroundColor:'rgba(200,200,200,0.5)',
   width:30,
   height:30,
   top:h*0.85,
   right:5,
   borderRadius:8,
   position:'absolute',
   alignItems:'center',
   justifyContent:'center'
}, 
 
   
  
})
export default styles;