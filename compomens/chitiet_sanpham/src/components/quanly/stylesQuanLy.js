import { Dimensions,StyleSheet } from 'react-native';
import color from '../dungchung/color';
import b from '../dungchung/dimensions';


const {width} = Dimensions.get('window');


const {colorToolBar,colorNen,colorFatlist,color2,colorXanhDen} = color;

const h = b;
const w=width;

const styles = StyleSheet.create({
	//styles các đơn hàng
	quanly1:{
		justifyContent:'center',
		marginHorizontal:10,
		
		  backgroundColor:'#FFFFFF',
		  borderColor:'#DA1C5D', 
		  flexDirection:'row',
		  alignItems:'center',
		},
	quanly2:{
		width:38,
		height:38,
	  marginLeft:10,
	  borderRadius:50,
	  borderRightWidth: 10,
	  borderColor:'#02AEEf',
	  alignItems:'center',
	  justifyContent:'center',
	  },
	quanly3:{flex:1, 
		marginLeft: 10,
		borderBottomWidth:1,
		borderColor:'#00CED1'
		
	},
	// đơn hàng khách hàng
	viewFlatlist:{
		flex:1, 
		flexDirection: 'row',
		 marginHorizontal:7,
		 marginTop:7,
		 backgroundColor:'#FFFFFF',
		 borderRadius: 5,

	},
aoimage:{
   flex:1, 
    resizeMode:"contain",
    marginLeft:5,
 },
viewImage:{
   width: h*0.15, 
   height: h*0.15,

  },
  viewText:{
justifyContent: 'space-between',
margin:10
  },
aotext:{
   fontSize: 13,
   marginLeft:w*0.01,

   
   },

viewThanhTien:{

   height:60,
    alignItems: 'center',
    backgroundColor:'#F8E0F7',
    flexDirection: 'row',
     justifyContent: 'space-between',
     borderTopRightRadius:20,
     borderTopLeftRadius:20
    
     
   },

})
export default styles;