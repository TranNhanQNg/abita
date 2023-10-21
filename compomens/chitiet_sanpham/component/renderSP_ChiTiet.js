import React,{useState,useMemo} from 'react';
import { Text, View,TouchableOpacity,Pressable, Image,Dimensions,StyleSheet} from 'react-native';
import axios from 'axios';
import api from '../../api/api';
// import styles from './stylesSanPham';



const width = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

   const {hinhanhsanpham,hinhanh,abita_dungchung,hinhanhdanhmuc} = api; 

  

   const RenderSanPhamDeXuat =({navigation, item, MaTinh}) =>{ 
    const {giatext} = styles;
    const [sao,setSao]=useState(0)
    const dispatch = useDispatch()
    const addItemToHistory = (item) =>{
      const action = ADD_TO_HISTORY(item);
      dispatch(action);
    };
    const fechluotxem =(item)=>{
          axios.post(abita_dungchung+'luotxem.php?MaTinh='+MaTinh, 
                  JSON.stringify({
                      tendieukien:'IdChiTietSp',
                      dieukien:item.IDCHITIETSP,
                      tencsdl:'sanpham',
                      tengiatri:'LuotXem',
                      giatri:item.LUOTXEM+1
                  })
              )
              .catch(function (error) {
                console.error(error);
              });   
  }
    const time_hientai = new Date().getTime()/1000
    return(
      <TouchableOpacity
      onPress={() => {navigaPush(item,navigation,MaTinh),addItemToHistory(item),fechluotxem(item)}}
      style={{marginLeft:5,marginVertical:5, borderRadius:5,backgroundColor:'#FFF',flex:1,alignItems:'center'}}
  >
          
            <View style ={{ width: width*0.32, height: width*0.32,backgroundColor:'#FFFFFF',borderRadius:3}}>
           
            <FastImage
                            style={{flex:1,margin:2}}
                            source={{
                                uri: hinhanhsanpham+item.ANHDAIDIEN,
                                priority: FastImage.priority.normal,
                              
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
           
          </View>
          <View style={{flex:1,justifyContent:'space-between', marginHorizontal:5}}>
          <Text numberOfLines ={2} style={[aotext,{width: width*0.30}]}>{item.TENSANPHAM} {item.QUYCACHSP}</Text>
          <Sao idquycach={item.IDQUYCACH}
                            MaTinh={MaTinh}
                            dienthoaincc={item.DIENTHOAINCC}
                           
                            />
          {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                            JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                          <View style={{}}>
                              <Text style={[giatext]}>
                              {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                              </Text>
                              <Text style={[aotext,{fontSize:13,marginLeft:5,textDecorationLine:'line-through'}]}>
                              {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                              </Text>
                          </View>:
                          <View style={{}}>
                              <Text style={[giatext]}>
                              {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                              </Text>
                             
                          </View>:
                          <View style={{flexDirection:'row'}}>
                              <Text style={[giatext]}>
                              {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                              </Text>
                          
                          </View>
                          }
                    </View>
                      { giamgia(item,time_hientai)
                      }
  </TouchableOpacity>
    )}
  const RenderSanPhamKhac =({navigation,item,soluong}) =>{ 
    const {viewTong,aoflatlist,aoimage,viewImage,aotext,imagelistHeader,textlistHeader,viewlistHeader,viewlistHeader1,
      viewText,giatext} = styles;
    const dispatch = useDispatch()
    const addItemToHistory = (item) =>{
      const action = ADD_TO_HISTORY(item);
      dispatch(action);
    };
    const fechluotxem =(item)=>{
      axios.post(abita_dungchung+'luotxem.php', 
              JSON.stringify({
                  tendieukien:'IdChiTietSp',
                  dieukien:item.IDCHITIETSP,
                  tencsdl:'sanpham',
                  tengiatri:'LuotXem',
                  giatri:item.LUOTXEM+1
              })
          )
          .catch(function (error) {
            console.error(error);
          });   
}
    const time_hientai = new Date().getTime()/1000
    return(
      <View >
      <TouchableOpacity onPress={() => {navigaPush(item,navigation,MaTinh=item.MATINH),addItemToHistory(item),fechluotxem(item)}}
      style={{
              marginLeft:10,
              flexDirection:'row',
              marginVertical:8,
              width:width-120
              }}
      >
            <View style ={{ width:100, height: 100}}>
             
            
            <View style ={{width:width/4,height:width/4,justifyContent:'center'}}>
      <Text style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:20,fontWeight:'bold',color:'#C8C8C8'}}>Abita</Text>
     
        <FastImage
                          style={{flex:1,margin:2}}
                          source={{
                              uri: hinhanhsanpham+item.ANHDAIDIEN,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
      </View>
            </View>
         
          <View style={{marginHorizontal:5,flex:1,justifyContent:'space-between'}}>

          <View>
              <Text numberOfLines ={2}  style={{fontSize:13,color:'#303030'}}>
                {item.TENSANPHAM} {item.QUYCACHSP} {item.MAUSACSP=='no'?null:' màu: '+ item.MAUSACSP}
              </Text>
              <Sao idquycach={item.IDQUYCACH}
                          MaTinh={item.MATINH}
                          dienthoaincc={item.DIENTHOAINCC}
                         />
             </View>  

            {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                      <View>
                      {JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                    <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                        <Text style={[giatext]}>
                        {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </Text>
                        <View style={{backgroundColor:'red', marginLeft:5,borderRadius:3}}>
                          <Text style={{color:'#FFF', marginHorizontal:3,fontWeight:'bold',fontSize:13}}>-{item.GIAKHUYENMAI}</Text>
                        </View>
                    </View>:
                    <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                        <Text style={[giatext]}>
                        {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </Text>
                       
                        <View style={{flexDirection:'row', marginLeft:5,transform: [{skewX: "160deg"}]}}>
                          <Text style={{color:'#FFF',fontSize:13,textAlign:'center',fontWeight:'bold',backgroundColor:'rgba(0, 83, 171,0.7)'}}> mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
                        </View>
                    </View>}
                    
                    </View>
                    :
                    <View style={{flexDirection:'row'}}>
                        <Text style={[giatext]}>
                        {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                    </Text>
                    </View>}
          </View>
  </TouchableOpacity>
    
  </View>
    )}

   
    
module.exports = {RenderSanPhamDeXuat,RenderSanPhamKhac};







const styles = StyleSheet.create({
  //  sản phẩm 
  viewTong:{
    flex:1,
     justifyContent: 'center',
     backgroundColor:'#FFFFFF', 
    margin:2,
    borderColor:'#F2F2F2',
    alignItems:'center',
    borderRadius:5
     
    
      },
  aoflatlist:{
    flex:1,
   
   borderWidth:1,
   borderColor:'#F2F2F2',
   alignItems:'center',
   
  },
  viewanimater:{
    
  },
  aoimage:{
   resizeMode:"contain",
   flex: 1,
   margin:3,
   borderRadius:2,
  
 },
 viewText:{
        flex:1,
        marginLeft:5,
        marginVertical:5
        },
   aotext:{
   lineHeight:23,
   fontFamily: 'OpenSans-Regular',
   fontSize:13
   },
   giatext:{
    fontSize:16,
    color:'red'
    },
    viewImage:{
   width: width/2-4, 
   height:width/2-4,
   alignContent:'center',
   justifyContent:'center',
   borderTopLeftRadius:5,
   borderTopRightRadius:5
   
   
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
     fontSize:12,
     fontFamily: 'OpenSans-Regular',
     
 
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