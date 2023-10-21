import React,{useState,useMemo} from 'react';
import { Text, View,TouchableOpacity,Pressable, Image,Dimensions,StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';




const width = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const colorNen ='#E8E8E8'
   const {hinhanhsanpham,hinhanh,abita_dungchung,hinhanhdanhmuc} = diachiDaTa; 


const RenderDanhMucAnUong =({ item,dieuhuong,tenhinhanh,tendanhmuc,soluong}) =>{ 
   
    const {imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
      viewText,giatext} = styles;
      const [index,setindex]=useState(null)
    return(
   
                <TouchableOpacity onPress={() => dieuhuong(item)}
                style={ viewlistHeader}>
                            <View style={viewlistHeader1}>
                            <FastImage 
                              source={{uri:hinhanhdanhmuc+tenhinhanh,
                              headers: { Authorization: 'someAuthToken' },
                              priority: FastImage.priority.high,}} 
                              style={imagelistHeader}
                              resizeMode={FastImage.resizeMode.contain}
                                />   
                            </View>
                            <Text numberOfLines ={2} style={textlistHeader}>{tendanhmuc}</Text>
                </TouchableOpacity>
    )
             
}

 
module.exports = {RenderDanhMucAnUong};


const styles = StyleSheet.create({
  //  sản phẩm 
  viewTong:{
    flex:1,
     backgroundColor:'#F8F8F8',
  
      },
 
  aoimage:{
   resizeMode:"contain",
   flex: 1,
   margin:2,
   borderRadius:2,
  
 },
 viewText:{
        width: width*0.43
        },
   aotext:{
    fontFamily: 'OpenSans-Medium',
   fontSize:13,
   color:'#000',
   marginTop:5
   },
   giatext:{
    fontSize:17,
    color:'red',
    fontFamily: 'OpenSans-SemiBold',
    marginVertical:3
    },
    viewImage:{
   width: width*0.476, 
   height:width*0.476,
  margin:width*0.0001,
  justifyContent:'center'
   
   
 },
// style listHeader danh mục
viewNen:{
  marginLeft:5,
  marginTop:5
   },
  
     
   viewlistHeader:{
 
     alignItems: 'center',
     width:width*0.21,
     marginHorizontal:5 
      
  }, 
  viewlistHeader1:{
     width:width*0.19,
     height:width*0.18,
   
  }, 
  imagelistHeader:{
   flex:1, 
     resizeMode:"contain",
     borderRadius:6
  },
  textlistHeader:{
     textAlign: 'center',
     marginVertical:10,
     color:'#000',
     fontSize:12,
     fontFamily: 'OpenSans-Medium'
     
 
   },
   linearGradientSanPham:{
     height:h*0.06,
     width:width,
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