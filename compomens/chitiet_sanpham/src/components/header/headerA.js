import React, {useEffect,useState} from 'react';
import {Text, View,Image,StyleSheet,Vibration,TouchableOpacity,Dimensions, Animated,Platform} from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import color from '../dungchung/color';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import thongbaogiohang from './iconCart';
import {ADD_THONGBAO_KIEMTRA,ADD_WIFI} from '../../redux/cartAction';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import auth from '@react-native-firebase/auth';


import Sound from 'react-native-sound';

export default HeaderA = ({navigation,onRefresh,scrollY}) => {
	const {abita_quanly} = diachiDaTa;
	const MaTinh = useSelector(state => state.cart.MaTinh);
	const MaUid = useSelector(state => state.cart.MaUid);
	const ThongBao_DonHang=useSelector(state => state.cart.ThongBao_DonHang);
	const ThongBao=useSelector(state => state.cart.ThongBao);
	const PushThongBao = useSelector(state => state.cart.PushThongBao);
	const Wifi = useSelector(state => state.cart.Wifi);
	const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
	const ThongBaoAbita = useSelector(state => state.cart.ThongBaoAbita);
	const [data, setData] = useState(0);
	const [dataThongBao, setDataThongBao] = useState(ThongBaoAbita);
	const [sothongbao,setsothongbao] =useState(0)
	const time_hientai = new Date().getTime()/1000 
	const opacity = scrollY.interpolate({
		inputRange: [35, 60],
		outputRange: [0,1],
		extrapolate: 'clamp',
	  });
	const headerHeight = scrollY.interpolate({
		inputRange: [30,31],
		outputRange: [0,1],
		extrapolate: 'clamp',
	  });

const dispatch = useDispatch()
  const addThongBao = () =>{
    const infohobby = {
	ThongBaoAbita:dataThongBao,
    };
    const actioninfo = ADD_THONGBAO_KIEMTRA(infohobby);
    dispatch(actioninfo);
  };
  useEffect(()=>{
	var thongbao =0
	var count = 0;
		for(var i = 0; i < ThongBao_DonHang.length; ++i){ if(ThongBao_DonHang[i].Xem==true) count++; }
		for(var i = 0; i < ThongBao.length; ++i){ if(ThongBao[i].Xem==true) thongbao++; }
	SoDienThoai!=='abita'?setData(count):setData(0)
	setsothongbao(thongbao)
  },[ThongBao_DonHang,ThongBao,MaUid])
	
    useEffect(() => {
		if(Wifi){
			thongbaoA()
	  }
  },[PushThongBao,MaTinh]);
 
    const thongbaoA =() => {
    fetch(abita_quanly+'demthongbao.php?MaTinh='+MaTinh+'&Ngay='+ThongBaoAbita.MaxNgay)
      .then((response) => response.json())
      .then((json) => {setDataThongBao(json)})
      .catch((error) => console.error(error))
  };
  

const soundInfo =()=>{
	Vibration.vibrate()
	const sound = new Sound('ambao.mp3', Sound.MAIN_BUNDLE, (error) =>{
		if (error) {
		  console.log('failed to load the sound', error);
		  return;
		}
		
		sound.play((success) => {
		  if (success) {
			console.log('end',success);
		  } else {
			console.log('playback failed due to audio decoding errors');
		  }
		});
	  });
};
const thongbao1 =ThongBaoAbita.MaxNgay+1<dataThongBao.MaxNgay?dataThongBao.sothongbao*1:0

const tongthongbao =sothongbao+data+thongbao1
	const thongbao = ()=>{
		if(data>0&&SoDienThoai!=='abita'){
			if(data>0&&ThongBaoAbita.MaxNgay<dataThongBao.MaxNgay&&SoDienThoai!=='abita'){
				return(
					<TouchableOpacity onPress={openDrawer} style={styles.header3}>
								<Image style ={{width:25,height:25}} source={require('../icon/alam.png')}/>
								<View style={styles.boxicon}>
									<Text style={styles.texticon}>{tongthongbao>5?'5+':tongthongbao}</Text>
								</View>
							</TouchableOpacity>
					)
			}else{
					return(
					<TouchableOpacity onPress={thongbaodonhang} style={styles.header3}>
								<Image style ={{width:25,height:25}} source={require('../icon/alam.png')}/>
								<View style={styles.boxicon}>
									<Text style={styles.texticon}>{tongthongbao>5?'5+':tongthongbao}</Text>
								</View>
							</TouchableOpacity>
					)}
		
		}else if(ThongBaoAbita.MaxNgay<dataThongBao.MaxNgay||sothongbao>0){
			return(
				<TouchableOpacity onPress={thongbaoAbita} style={styles.header3}>
					<Image style ={{width:25,height:25}} source={require('../icon/alam.png')}/>
					<View style={styles.boxicon}>
						<Text style={styles.texticon}>{tongthongbao>5?'5+':tongthongbao}</Text>
					</View>
				</TouchableOpacity>
				)
		}
}

const giohang = () => navigation.navigate("Giohang");
const thongbaodonhang = () => navigation.navigate("DangNhapNumberPhone",{tentinhtrang:'Đơn hàng đã xác nhận ',xacnhan:'true',loai:'1'});
const thongbaodonhangNCC = () => navigation.navigate("DangNhapNumberPhone",{tentinhtrang:'Đơn hàng mới ',xacnhan:'true',loai:'2'});
const thongbaoAbita = () =>{navigation.navigate("ThongBao"),addThongBao()};
const openDrawer=() => navigation.navigate("Sidebar");

	return(
		
		<View style={[styles.header1,{marginTop:Platform.OS === 'ios'?0:30}]}>
		
			<View style={styles.header3}>
				<TouchableOpacity onPress={openDrawer}
					style={[styles.back]}>
						<Image style ={{width:25,height:25}} source={require('../icon/user.png')}/>
						
				</TouchableOpacity>
				<TouchableOpacity onPress={onRefresh} style={styles.header2}>
					<Image style ={styles.iconlogo} source={require('../icon/logo.png')}/>
				</TouchableOpacity>
			</View>	
			
			<View style={styles.thongbao_giohang}>
			<Animated.View style={{marginRight:20,opacity:opacity,transform: [{ scale:headerHeight }]}}>
				<TouchableOpacity onPress={()=>navigation.navigate("Search")}>
					<SimpleLineIcons name="magnifier" size={25}  color="#FFF" />
				</TouchableOpacity>

				</Animated.View>
				<Animated.View style={{marginRight:20,opacity:opacity,transform: [{ scale:headerHeight }]}}>
					<TouchableOpacity onPress={()=>navigation.navigate("Danhmuc")}>
						<Image style ={{width:22,height:22}} source={require('../icon/menu.png')}/>
					</TouchableOpacity>
				</Animated.View>
			
				{thongbao()}
				
				<TouchableOpacity style={{marginRight:15}}onPress={giohang} >
					{thongbaogiohang()}
				</TouchableOpacity>
				
			</View>
			
			
		</View>
	
		
	);
 }

const {colorToolBar,colorNen,color1} = color;
const {width} = Dimensions.get('window')
const w = width;

const h = 55;

const styles= StyleSheet.create({
	
	header1:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: h,
		alignItems: 'center',
	},
	header2:{
		justifyContent:'center',
	},
	header3:{
		justifyContent:'center',
		flexDirection:'row',
		alignItems:'center',
		marginRight:20
	},
	back:{height:h,
		width:h,
		alignItems:'center',
		justifyContent:'center',
	},
	boxicon:{
		height:15,
		minWidth:15,
		backgroundColor:'red',
		borderRadius:50,
		alignItems:'center',
		justifyContent:'center',
		position: 'absolute',
		top:-2,
		right:0
		
		},
	texticon:{
		color:'#FFFFFF',
		fontSize:9,
		marginHorizontal:2,
		fontFamily: 'OpenSans-SemiBold'
	},
	iconlogo:{
		height: 35,
		width: 75,
		marginHorizontal:10
	
	},
	thongbao_giohang:{
		
		flexDirection:'row',
		alignItems: 'center',
		
	},
	headerTexInput:{
        flexDirection: 'row',
        height: 35,
        backgroundColor:'red',
        marginLeft: 25,
        marginRight: 25,
        borderRadius: 20,
        borderWidth: 1,
        elevation: 2,
        borderColor: '#A9A9A9',
        alignItems: 'center',
		position: 'absolute',
		
       

    },
	viewSeach:{
		borderBottomRightRadius: 50,
		borderBottomLeftRadius:50,
		height: 35,
		backgroundColor:colorToolBar,
		
	  },		
})
