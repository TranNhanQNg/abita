import React, { useState,useEffect,useRef, } from "react";
import {  Text,SafeAreaView,
  TouchableOpacity,View,Image,Modal,Dimensions,StyleSheet} from "react-native";
  import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
  import Dpf from '../../../dungchung/dpf';
  import {REMOVE_FROM_CART,TANGSOLUONG_FROM_CART,GIAMSOLUONG_FROM_CART,DIEUCHINHGIA_FROM_CART} from '../../../../redux/cartAction';
  import { useSelector, useDispatch } from 'react-redux';
  const {hinhanhsanpham,abita_sanpham,hinhanh} = diachiDaTa;
  const time_hientai =  Math.round(new Date().getTime()/1000)

  
  const sanpham =(chitiet)=>{
    return(
        <View style={{alignItems: 'center'}}>
							
							<View style={{flexDirection:'row'}}>
								<View style={{marginHorizontal:10,height:0.5,flex:1,backgroundColor:'#B5B5B5',}}/>
							</View>
							<View style={{flexDirection:'row', marginTop:10, marginHorizontal:10}}>
								<View style={styles.viewImageModal}>
									<Image source={{uri:hinhanhsanpham+chitiet.ANHDAIDIEN}} style={styles.aoimage} />
								</View>
								<View style={{flex:1, marginLeft:10}}>
									<Text >➣ {chitiet.TENSANPHAM}</Text>
									<Text style={{marginVertical:5}}>➣ {chitiet.QUYCACHSP}{chitiet.MAUSACSP=='no'||chitiet.MAUSACSP==''||!chitiet.MAUSACSP?null:', màu: '+chitiet.MAUSACSP}</Text>
								</View>
							</View>
						</View>
    )
  }
const Modal_Cart =({chitiet,modalVisible,setModalVisible,navigation})=>{
const [soluong,setsoluong]= useState(1)
const dispatch = useDispatch()
  const tangsoluongItemToCart =()=>{
    setsoluong(soluong+1)
    const newhobby ={
      IDCHITIETSP:chitiet.IDCHITIETSP,
      SOLUONG_KHUYENMAI:chitiet.NGAY_KETTHUC>time_hientai&chitiet.NGAY_KHUYENMAI<time_hientai&chitiet.GIAKHUYENMAI>0&JSON.parse(chitiet.HINHTHUC_KHUYENMAI).loai_km==2?Math.floor((chitiet.soluong*1+1)/JSON.parse(chitiet.HINHTHUC_KHUYENMAI).soluong_mua)*JSON.parse(chitiet.HINHTHUC_KHUYENMAI).soluong_tang:0,
      soluong:soluong+1
      };
    const action = TANGSOLUONG_FROM_CART(newhobby);
    dispatch(action);
};
 
 

  const giamsoluongchitietToCart =() =>{
    setsoluong(soluong !== 1 ?soluong*1 - 1 : 1)
    const newhobby ={
      IDCHITIETSP:chitiet.IDCHITIETSP,
      SOLUONG_KHUYENMAI:chitiet.NGAY_KETTHUC>time_hientai&chitiet.NGAY_KHUYENMAI<time_hientai&chitiet.GIAKHUYENMAI>0&JSON.parse(chitiet.HINHTHUC_KHUYENMAI).loai_km==2?Math.floor((chitiet.soluong-1)/JSON.parse(chitiet.HINHTHUC_KHUYENMAI).soluong_mua)*JSON.parse(chitiet.HINHTHUC_KHUYENMAI).soluong_tang:0,
      soluong:soluong-1
      };
    const action = TANGSOLUONG_FROM_CART(newhobby);
        dispatch(action);
      }
    return(
    <Modal animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() =>
						setModalVisible(false)
						
						}
			>
				<TouchableOpacity onPress={()=>setModalVisible(false)} style ={{flex:1,justifyContent:'center',backgroundColor: 'rgba(0,0,0, 0.6)'}}>
					<TouchableOpacity activeOpacity={1} style ={styles.modal}>
          <Text style={{fontSize:20, color:'#4169E1',marginVertical:10 }}> Đã thêm vào giỏ hàng </Text>
						{sanpham(chitiet)}
            <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between',marginTop:5}}>
                      <TouchableOpacity onPress={()=> chitiet.SOLUONGTON>soluong?tangsoluongItemToCart():null}
                          style={{ borderWidth:1,
							borderColor:'#C0C0C0',
							borderRadius:2,
							justifyContent:'center',
							flex:1,
							height:25,
							alignItems:'center',}}
						>
                            <Text > + </Text>
                      </TouchableOpacity>
					  <View style={{ marginHorizontal:5,
							borderRadius:2,
							backgroundColor:'#EE82EE',
							justifyContent:'center',
							flex:1,
							height:25,
							alignItems:'center',}}
						>
                            <Text>{soluong}</Text>
						</View>
                      <TouchableOpacity onPress={()=> giamsoluongchitietToCart ()}
                             style={{ borderWidth:1,
								borderColor:'#C0C0C0',
								borderRadius:2,
								justifyContent:'center',
								flex:1,
								height:25,
								alignItems:'center',}}
                            >
                          <Text > - </Text>
                      </TouchableOpacity>
                    
            		</View>
						<View style={{flexDirection:'row'}}>
						<View style={{flex:1,height:30,marginTop:20,flexDirection:'row', justifyContent:'space-between'}}>
							<TouchableOpacity style={{backgroundColor:'#3CCBF4',marginHorizontal:15, height:27,flex:1, alignItems:'center',justifyContent:'center',borderRadius:5}} 
										onPress={() =>{setModalVisible(false),setsoluong(1)}}>
								<Text style={styles.textModal}> ⇦ Quay lại </Text>
							</TouchableOpacity>
							
							<TouchableOpacity style={{backgroundColor:'#3CCBF4',flex:1,marginHorizontal:15, height:27, alignItems:'center',justifyContent:'center',borderRadius:5}}
										onPress={() =>{navigation.navigate("Giohang"); setModalVisible(false),setsoluong(1)}}>
								<Text style={styles.textModal}>  Giỏ hàng ⇨ </Text>
							</TouchableOpacity>
						</View>
						</View>
						<View style={{height:10}}/>
					</TouchableOpacity>
				</TouchableOpacity>
				
			
			</Modal> 
           )
}

const Modal_MuaNgay =({setModalVisibleSoLuong,modalVisibleSoLuong,chitiet,MaTinh,navigation})=>{
    const [soluong,setsoluong]=useState(1);
    return(
        <Modal animationType="fade"
						transparent={true}
						visible={modalVisibleSoLuong}
			>
					<TouchableOpacity onPress={()=>setModalVisibleSoLuong(false)}
					 style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'rgba(0,0,0, 0.6)'}}>
           
						<TouchableOpacity activeOpacity ={1} style={{alignItems:'center',justifyContent:'center',backgroundColor:'#FFF',width:'80%',borderRadius:8}}>
            <Text style={{fontSize:20, color:'#4169E1',marginVertical:10 }}> Sản phẩm </Text>
            {sanpham(chitiet)}
            <View style={{backgroundColor:'#50C7C7',height:1,width:'100%',marginTop:5}}/>
            <View style={{marginVertical:15,alignItems:'center'}}>
                  <Text style={{fontSize:14}}>Số lượng bạn muốn mua </Text>
                  <Text style={{fontSize:10, color:'red',marginTop:2}}>{soluong==chitiet.SOLUONGTON?'(Số lượng còn '+soluong+' sản phẩm)':null} </Text>
            </View>
                    <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between'}}>
                      <TouchableOpacity onPress={()=> chitiet.SOLUONGTON>soluong?setsoluong(soluong+1):null}
                          style={{ borderWidth:1,
							borderColor:'#C0C0C0',
							borderRadius:2,
							justifyContent:'center',
							flex:1,
							height:25,
							alignItems:'center',}}
						>
                            <Text > + </Text>
                      </TouchableOpacity>
					  <View style={{ marginHorizontal:5,
							borderRadius:2,
							backgroundColor:'#EE82EE',
							justifyContent:'center',
							flex:1,
							height:25,
							alignItems:'center',}}
						>
                            <Text>{soluong}</Text>
						</View>
                      <TouchableOpacity onPress={()=> soluong==1?null:setsoluong(soluong-1)}
                             style={{ borderWidth:1,
								borderColor:'#C0C0C0',
								borderRadius:2,
								justifyContent:'center',
								flex:1,
								height:25,
								alignItems:'center',}}
                            >
                          <Text > - </Text>
                      </TouchableOpacity>
                    
            		</View>
						<TouchableOpacity onPress={()=>{navigation.navigate("DatHang",{loai:2,dataMN:chitiet,soluong:soluong,matinh:MaTinh}),setModalVisibleSoLuong(false)}}
						style={{borderRadius:8,backgroundColor:'#50C7C7',marginVertical:10}}>
							<Text style={{marginVertical:7,marginHorizontal:20,color:'#FFF'}}>Mua</Text>
						</TouchableOpacity>
						</TouchableOpacity>
					</TouchableOpacity>
			</Modal>
    )
}
const Modal_Tuoi =({setModalVisibleTuoi,modalVisibleTuoi,navigation})=>{

  return(
      <Modal animationType="fade"
          transparent={true}
          visible={modalVisibleTuoi}
    >
        <View
         style={{alignItems:'center',justifyContent:'center',flex:1,backgroundColor:'rgba(0,0,0, 0.6)'}}>
         
          <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#FFF',width:'80%',borderRadius:8}}>
          <Text style={{fontSize:20, color:'#4169E1',marginVertical:10,color:'red' }}> Cảnh báo </Text>
         
          <View style={{backgroundColor:'#50C7C7',height:1,width:'100%',marginTop:5}}/>
          <View style={{marginVertical:15,alignItems:'center'}}>
                <Text style={{fontSize:14,marginHorizontal:20}}>Mua đồ uống có cồn bạn phải đủ 18 tuổi trở lên? </Text>
               
          </View>
              <View style={{flexDirection:'row',marginHorizontal:20}}>
                  <TouchableOpacity style={{backgroundColor:'red', height:27, alignItems:'center',justifyContent:'center',borderRadius:5,flex:1}} 
                     onPress={()=>setModalVisibleTuoi(false)}
                >
                    <Text style={styles.textModal}> Đã đủ </Text>
                  </TouchableOpacity>
                  <View style={{width:50}}/>
                  <TouchableOpacity style={{backgroundColor:'#3CCBF4', height:27, alignItems:'center',justifyContent:'center',borderRadius:5,flex:1}}
                        onPress={() =>{setModalVisibleTuoi(false),navigation.goBack() }}>
                    <Text style={styles.textModal}> Chưa đủ </Text>
                  </TouchableOpacity>   
              </View>
              <View style={{flex:1,height:30,marginTop:20,marginHorizontal:30,flexDirection:'row', justifyContent:'space-between'}}>
                 
              </View>
          </View>
        </View>
    </Modal>
  )
}

const Modal_BaoHanh =({setModalVisibleBaoHanh,modalVisibleBaoHanh,MaTinh})=>{

  return(
      <Modal animationType="fade"
          transparent={true}
          visible={modalVisibleBaoHanh}
    >
        
        <SafeAreaView style={{backgroundColor:'#F0FFFF',flex:1}}>
                    <TouchableOpacity onPress={()=>setModalVisibleBaoHanh(false)}
                     style={{backgroundColor:'rgba(105,105,105,0.5)', borderRadius:100,height:30,width:30,margin:3,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'red',}}>X</Text>
                    </TouchableOpacity>
                    <View>
                   
                    <Dpf uri={'https://abita.com.vn/sieuthi/'+MaTinh+'/baohanh.pdf'}/>
                    </View>
                    
                </SafeAreaView>
    </Modal>
  )
}

export  {Modal_MuaNgay,Modal_Cart,Modal_Tuoi,Modal_BaoHanh}

const {width,height} = Dimensions.get('window')



const styles = StyleSheet.create({
 
   //modal mua hàng
   modal:{
  marginHorizontal:20,
  borderRadius:10,
  justifyContent:'center',
  alignItems:'center',
backgroundColor:'#FFF',
    },

  viewTong:{
   
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
 

    
  },
 
 viewImageModal:{
   width: width*0.28, 
   height: width*0.28,
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
    marginHorizontal:20
   
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
   width: width*0.18, 
   height: width*0.18,
   margin:10

  },
  viewTextmodo:{
justifyContent: 'space-between',
margin:height*0.01
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
    height:width*0.8,
    width:width,
     position:'absolute',
      bottom:0,
      opacity: 1, 
   },
   viewImageMoTa:{
      width:width*0.8,
      height:width*0.8,
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
 aoimage:{
    flex:1, 
    resizeMode:"contain",
},
 
})
