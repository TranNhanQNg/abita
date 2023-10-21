import React, {useState,useEffect,useRef,useCallback} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity,Image,ScrollView,Modal,Animated,StyleSheet,Platform,StatusBar} from 'react-native';


import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../stylesChiTietSP';
import {TieudeHome} from '../nhom/dungchung/tieudeChung';
import {Ten_CuaHang,Modal_BaoHanh} from './index';
import { Heigth_Width } from '../../api/heigth_width';
const mobi =Heigth_Width.mobi;


export default function Chitiet_Mota_Mobi ({navigation, chitiet,MaTinh,layindex,dataAnh}) {


const {tieude,text,viewMoTa,} = styles;
const [modalVisibleBaoHanh, setModalVisibleBaoHanh] = useState(false);
const [showMore, setShowMore]= useState(false);
const [NUM_OF_LINE]= useState(8);

const onTextLayout = useCallback(e=>{
setShowMore(e.nativeEvent.lines.length>= NUM_OF_LINE);
},[]);



const dieuhuong =() => {navigation.navigate("SanPhamThuongHieu",{
	apiSP:"SanPhamThuongHieu.php?TenThuongHieu=",
	tenthuonghieu:chitiet.THUONGHIEU,
	anhdaidien:chitiet.ANHDAIDIEN
	})
  }
	return(	
		<View>
		
			<View style ={tieude}>
			<TieudeHome props = {'Thông tin sản phẩm'} 
				color={[ '#FFFFFF','#CCCCCC','#FFFFFF']}
				icon={"❊"}
				coloricon={'blue'}
				colortext={'#008B8B'}
				/>
			
			</View>
			<View style ={{flexDirection:'row',alignItems:'center', flexWrap:'wrap',marginLeft:10,marginVertical:15}}>
				<Text style={[text,{fontWeight:'bold', }]}>Danh mục: </Text>
				<View onPress={()=>{ navigation.navigate("DanhMucCap2",
                        {idDanhMuc:chitiet.IDDANHMUC,tendanhmuc:chitiet.TENDANHMUC})}}>
					<Text style={{color:'blue'}}> ... </Text>
				</View>
				<Text style={{color:'#000'}}> ➤ </Text>
				<View onPress={()=>{ navigation.navigate("DanhMucCap3",
                        {idDanhMuc:chitiet.IDDANHMUCCAP2,tendanhmuc:chitiet.TENDANHMUCCAP2})}}>
					<Text style={[text,{color:'blue'}]}>{chitiet.TENDANHMUCCAP2}</Text>
				</View>
				<Text style={{color:'#000'}}> ➤ </Text>
				<View onPress={()=>{ navigation.navigate("DanhMucCap4",
                        {idDanhMuc:chitiet.IDDANHMUCCAP3,tendanhmuc:chitiet.TENDANHMUCCAP3})}}>
					<Text style={[text,{color:'blue'}]}>{chitiet.TENDANHMUCCAP3}</Text>
				</View>
			</View>

			

			<View style={{flexDirection:'row',borderColor:'#F5F5F5',marginVertical:10}}>
				<View style={styles1.baohanh}>
					<Text style={{color:'#606060', fontSize:13,textAlign:'center'}}>
						<Ionicons name="trail-sign-outline" size={25} color="#003399" />
						{"\n"}Hoàn tiền 150% {"\n"} nếu hàng giả
						</Text>
				</View>
				<View style={styles1.baohanh}
					onPress={()=>setModalVisibleBaoHanh(true)}
				>
					
					<Text style={{color:'#606060', fontSize:13,textAlign:'center'}}>
					<Ionicons name="build-outline" size={25} color="#006600" />	
					{"\n"}Thông tin bảo hành{"\n"}<Text style={{color:'blue'}}>xem thông tin</Text></Text>
				</View>
				<View style={styles1.baohanh}>
					
				<Text style={{color:'#606060', fontSize:13,textAlign:'center'}}>
					<Ionicons name="repeat-outline" size={25} color="#900" />	
					{"\n"}Được đổi trả{"\n"}khi sản phẩm lỗi
					</Text>
					
				</View>
			</View>
			
			{chitiet.THUONGHIEU?
			<View style={{ alignItems:'center',flexDirection:'row', height:40,backgroundColor:'#F8F8F8',}}>
				<Text style={[text,{marginLeft:10,fontWeight:'bold'}]}>Thương hiệu:</Text>
				<View onPress={()=>dieuhuong()} style={{flex:1,alignItems:'center',flexDirection:'row'}}>
					<View style={{ borderRadius:3,borderColor:'#1E90FF',borderWidth:1,marginHorizontal:5}}>
						<Text style={{color:'blue',margin:5,fontWeight:'bold',marginHorizontal:10}}>{chitiet.THUONGHIEU}</Text>
						
					</View>
					<Icon name="arrow-right" size={20} color="blue" />
				</View>
			</View>:null}
			{chitiet.BAOHANH?
			<View style={{ height:40,alignItems:'center',flexDirection:'row'}}>
				<Text style={[text,{marginLeft:10,fontWeight:'bold'}]}>Bảo hành:</Text>
				<Text style={[text]}> {chitiet.BAOHANH}</Text>
			</View>
			:null}
			
			{chitiet.XUATXU?
			<View style={{backgroundColor:'#F8F8F8', height:40,alignItems:'center',flexDirection:'row'}}>
				<Text style={[text,{marginLeft:10,fontWeight:'bold'}]}>Xuất xứ:</Text>
				<Text style={[text]}> {chitiet.XUATXU}</Text>
			</View>:null
			}
			{chitiet.CHITIETSANPHAM==""&&chitiet.MOTASANPHAM==""?null:
			<View>
					<View style={[viewMoTa,{marginVertical:5}]}>
					<Text 	
							onTextLayout={onTextLayout}
							
							style={text}>
						{chitiet.CHITIETSANPHAM==""||chitiet.CHITIETSANPHAM==null?null:
						<Text>
							<Text style={{fontSize:15,fontWeight:'bold'}}>Chi tiết sản phẩm</Text>
						
							{'\n'+chitiet.CHITIETSANPHAM+'\n'}
							</Text>
						}
						{chitiet.MOTASANPHAM==""||chitiet.MOTASANPHAM==null?null:
						<Text>
							<Text style={{fontSize:15,fontWeight:'bold'}}>{'Mô tả sản phẩm'}</Text>

							{'\n'+chitiet.MOTASANPHAM}
						</Text>	
						}
						</Text>
					</View>
					{showMore==false?null:
					<View style={{alignItems:'center'}}>
					<TouchableOpacity onPress={()=>{navigation.navigate("MoTaSanPham",{data:chitiet,loai:1,MaTinh:MaTinh,dataAnh:dataAnh})}}

					>
						<Text style={{margin:5,marginHorizontal:30, color:'#1E90FF',fontSize:11}}>Xem thêm ➢ </Text>
					</TouchableOpacity>
					</View>
					
					}
			</View>
			}
	
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