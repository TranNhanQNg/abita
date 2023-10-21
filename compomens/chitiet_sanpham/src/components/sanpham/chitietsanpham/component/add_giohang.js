import React, {useState,useEffect,useRef,useCallback} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,Image,ScrollView,Modal,Animated,StyleSheet,Platform,StatusBar} from 'react-native';



import { useDispatch,useSelector } from 'react-redux';
import styles from '../stylesChiTietSP';
import {ADD_TO_CART} from '../../../../redux/cartAction';



export default function Add_GioHang ({chitiet,MaTinh,setModalVisible,setModalVisibleSoLuong,setModalVisibleThongBao}) {
 
const {iconCart} = styles;
const time_hientai = new Date().getTime()/1000 
const dispatch = useDispatch()
const addItemToCart = () =>{
	const diemP1=Number(chitiet.P)
    const diemP1KM=Number(chitiet.ABINCCKM)
    const diemP = chitiet.NGAY_KETTHUC>time_hientai&chitiet.NGAY_KHUYENMAI<time_hientai&chitiet.GIAKHUYENMAI>0?diemP1KM:diemP1
	const newhobby ={
		IDCHITIETSP:chitiet.IDCHITIETSP,
		TENSANPHAM:chitiet.TENSANPHAM,
		QUYCACHSP:chitiet.QUYCACHSP,
		IDSANPHAM:chitiet.IDSANPHAM,
		MAUSACSP:chitiet.MAUSACSP,
		MAMAU:chitiet.MAMAU,
		GIABANSP:chitiet.GIABANSP,
		GIAKHUYENMAI:chitiet.GIAKHUYENMAI,
		HINHTHUC_KHUYENMAI:chitiet.HINHTHUC_KHUYENMAI,
		NGAY_KHUYENMAI:chitiet.NGAY_KHUYENMAI,
		NGAY_KETTHUC:chitiet.NGAY_KETTHUC,
		SOLUONG_KHUYENMAI:0,
		TENHINHANH:chitiet.ANHDAIDIEN,
		SAO:5,
		SOLUONGTON:1,
		soluong: 1,
		DIENTHOAINCC:chitiet.DIENTHOAINCC,
		MATINH:MaTinh,
		TOKEN:chitiet.TOKEN,
		MAUIDNCC:chitiet.MAUIDNCC,
		P:diemP,
		ABINCC:chitiet.ABINCC,
		ABINCCKM:chitiet.ABINCCKM,
		CK:chitiet.CK,
		CHIETKHAUNCC:chitiet.CHIETKHAUNCC,
		KHAUTRUP:0,
		CKSP:chitiet.CKSP,
		QUATANG:chitiet.QUATANG,
		TRAGOP:chitiet.TRAGOP
		};
	const action = ADD_TO_CART(newhobby);
	dispatch(action);
};
	
	return(	
		<View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginHorizontal:30,borderWidth:1,borderColor:'#FFF',borderRadius:5,backgroundColor:'#FFF'}}>
		<TouchableOpacity onPress={()=>chitiet.SOLUONGTON>0?setModalVisibleSoLuong(true):setModalVisibleThongBao(true)}
			style={{backgroundColor:'#50C7C7',height:40,flex:0.5,justifyContent:'center',borderBottomLeftRadius:5,borderTopLeftRadius:5,alignItems:'center'}}>
			<Text style={{marginHorizontal:10,color:'#FFF',fontWeight:'bold',fontSize:16,}}>Mua ngay</Text>
		</TouchableOpacity>
		<TouchableOpacity
			onPress={()=>chitiet.SOLUONGTON>0?setModalVisible(true)&addItemToCart():setModalVisibleThongBao(true)}
			style ={{flexDirection:'row',flex:1,height:40,backgroundColor:'#DC143C',alignItems:'center',justifyContent:"center",borderTopRightRadius:5,borderBottomRightRadius:5}}
			>
				<Image style ={iconCart} source = {require('../../../icon/giohang.png')}/>
				<Text style={{ fontWeight:'bold',color:'#FFFFFF', fontSize:16,}}>Thêm vào giỏ hàng</Text>
		</TouchableOpacity>
	</View>
	
		);
	}

	const styles1 = StyleSheet.create({
		baohanh:{
		 	flex:1,
			alignItems:'center',
			marginVertical:10
		},
		viewmuc:{
			height:40,
			justifyContent:'center',
			flexDirection:'row',
			justifyContent:'space-between',
			marginHorizontal:10,
			alignItems:'center'
		},
	  })