import React,{useState,useEffect,useRef} from 'react';
import { Text, View,SafeAreaView,ScrollView,Image,StyleSheet,Dimensions,TouchableOpacity,Linking,Platform,Animated} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import {useDispatch,useSelector} from 'react-redux';
import {ADD_THONGBAO_KIEMTRA} from '../redux/cartAction';
import {AnhNen} from '../components/dungchung/anhnen';
import diachiDaTa from '../diachiDaTa/diachiDaTa';
import { useIsFocused } from '@react-navigation/native';
import {fadeInCT} from '../components/dungchung/anima';

const {hinhanh,abita_quanly,abita_amin}=diachiDaTa

function Sidebar ({navigation}){
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const MaUid = useSelector(state => state.cart.MaUid);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const ThongBao=useSelector(state => state.cart.ThongBao);
  const ThongBao_DonHang=useSelector(state => state.cart.ThongBao_DonHang);
  const ThongBaoAbita = useSelector(state => state.cart.ThongBaoAbita);
  const [id,setid]= useState(1)
  const [dataDH, setData] = useState(0);
	const [dataThongBao, setDataThongBao] = useState(ThongBaoAbita);
  const isFocused = useIsFocused();
  const [sothongbao,setsothongbao] =useState(0)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useFocusEffect(() => {fadeInCT(fadeAnim)});

    useEffect(() => {
        thongbaoA()
    },[isFocused]);

    useEffect(()=>{
      var thongbao =0
      var count = 0;
      if(MaUid){
        for(var i = 0; i < ThongBao_DonHang.length; ++i){ if(ThongBao_DonHang[i].Xem==true&&ThongBao_DonHang[i].MaUid==MaUid) count++; }
        for(var i = 0; i < ThongBao.length; ++i){ if(ThongBao[i].Xem==true&&ThongBao_DonHang[i].MaUid==MaUid) thongbao++; }
      }else{
        for(var i = 0; i < ThongBao_DonHang.length; ++i){ if(ThongBao_DonHang[i].Xem==true) count++; }
        for(var i = 0; i < ThongBao.length; ++i){ if(ThongBao[i].Xem==true) thongbao++; }
      }
      
      setData(count)
      setsothongbao(thongbao)
      },[ThongBao_DonHang,ThongBao])

      const thongbaoA =() => {
      fetch(abita_quanly+'demthongbao.php?MaTinh='+MaTinh+'&Ngay='+ThongBaoAbita.MaxNgay)
        .then((response) => response.json())
        .then((json) => {setDataThongBao(json)})
        .catch((error) => console.error(error))
    };

    const dispatch = useDispatch()
      const addThongBao = () =>{
        const infohobby = {
      ThongBaoAbita:dataThongBao,
        };
        const actioninfo = ADD_THONGBAO_KIEMTRA(infohobby);
        dispatch(actioninfo);
      };

 
  const thongbao1 =ThongBaoAbita.MaxNgay+1<dataThongBao.MaxNgay?dataThongBao.sothongbao*1:0
  const tongthongbao =sothongbao+thongbao1
const data =[
  {id:'1',icon:hinhanh+'icon/icon/homeDW.png',ten:'Trang chủ',thongbao:0},
  {id:'2', icon:hinhanh+'icon/icon/cuahang.png',ten:'Cửa hàng bạn quan tâm',thongbao:0},
  {id:'3', icon:hinhanh+'icon/icon/menuKH.png',ten:'Quản lý đơn hàng',thongbao:SoDienThoai!=='abita'?dataDH:0},
  {id:'4', icon:hinhanh+'icon/icon/history.png',ten:'Sản phẩm đã xem',thongbao:0},
  {id:'9', icon:hinhanh+'icon/icon/heart.png',ten:'Sản phẩm yêu thích',thongbao:0},
  {id:'5', icon:hinhanh+'icon/icon/thongbao.png',ten:'Thông báo',thongbao:tongthongbao},
  {id:'6', icon:hinhanh+'icon/icon/vitri.png',ten:'Tỉnh thành',thongbao:0},
  {id:'10', icon:hinhanh+'icon/icon/hotro.png',ten:'Trung tâm hổ trợ',thongbao:0},
  // {id:'7', icon:hinhanh+'icon/icon/quanly.png',ten:'Đăng ký giang hàng',thongbao:0},
  
]
const dieukhien =(item)=>{
  switch(item.id) {
      case '1':{navigation.navigate("Home"),setid(item.id)};
      break;
      case '2':{navigation.navigate("DangNhapNumberPhone",{loai:'4'}),setid(item.id)};
      break;
      case '3': {navigation.navigate("DangNhapNumberPhone", 
                  {tentinhtrang:'Đơn hàng đã đặt ',xacnhan:'false',
                  loai:'1'}),setid(item.id)};
      break;
      case '4':  {navigation.navigate("SanPhamDaXem"),setid(item.id)};
      break;
      case '5':  {navigation.navigate("ThongBao",{load:true}),setid(item.id),ThongBaoAbita.MaxNgay<dataThongBao.MaxNgay?addThongBao():null};
      break;
      case '6':  {navigation.navigate("TinhThanh"),setid(item.id)};;
      break;
      case '9':  {navigation.navigate("DangNhapNumberPhone",{loai:'9'}),setid(item.id)};;
      break;
      case '10':  {navigation.navigate("HoTro"),setid(item.id)};
      break;
     
  }
}

	
return (
	<View style={{flex:1}}>
     <AnhNen 
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
  <SafeAreaView style={{flex:1}}>
  <View style={{marginHorizontal:30, marginTop:40}}>
    
    <View style={{flexDirection:'row'}}>
   
        <View style={{borderRadius:100, borderWidth:1,borderColor:'#FFF'}}>
          <Image style ={{width:30,height:30, margin:10}} source={require('../components/icon/user.png')}/>
        </View>

       
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
        {!MaUid?
        <TouchableOpacity onPress={()=>navigation.navigate("DangNhapNumberPhone",{loai:'3'})}
        style={{marginLeft:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomColor:'red',borderBottomWidth:1}}>
          <Text style={{marginVertical:10,color:'#191970'}}>Đăng nhập/Đăng ký</Text>
          
        </TouchableOpacity>:
        <View
        style={{marginLeft:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',flex:1}}>
           <View style={{flex:1,borderBottomColor:'red',borderBottomWidth:1}}>
          <Text style ={{marginLeft:5,marginVertical:15,fontSize:15,fontWeight:'700',fontStyle: 'italic',color:'#FFF'}}>{SoDienThoai} </Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate("CaiDat")}>
            <Icon name="cog" size={30} color="#FFF" style={{marginHorizontal:10}}/>
          </TouchableOpacity>
        </View>}
    </View>
    </View>
  </View> 
  <View style={{flex:1,borderRadius:20,marginTop:30,}}>
    <ScrollView style={{ backgroundColor:'#FFF',borderTopLeftRadius:20, borderTopRightRadius:20,marginHorizontal:20}} >
    
  {data.map(item=>
        <View key={item.id}>
        {SoDienThoai=='abita'&&item.id==11?null:
          <TouchableOpacity onPress={() => dieukhien(item)}
          style={{flexDirection:'row',alignItems:'center',marginHorizontal:20}}
          >
           
                <Image source={{uri:item.icon}} style={styles.icon}/>
              <Text style={{fontSize:13, color:id==item.id?'#00BFFF':'#4c4c4c',flex:1}}> {item.ten} </Text>
           
            {item.thongbao==0?null:
            <View style={{backgroundColor:'red', borderRadius:20,height:15,minWidth:15,alignItems:'center',justifyContent:'center'}}>
						<Text style={{color:'#FFF',fontSize:9,textAlign:'center',marginHorizontal:2}}>{item.thongbao>5?'5+':item.thongbao}</Text>
            
					</View>
          }
          </TouchableOpacity>
          }
          <View style={styles.gach}/>
          
    </View>
        )
    }
           
    </ScrollView>
    </View>
   
    </SafeAreaView>
    </View> 
  );

};
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  hetder: {
    width:width,
    height:width*0.7,
   
  },
 
  viewicon:{
    marginLeft:20,
    height:50,
    flexDirection: "row",
    alignItems: 'center',


  },
  
  icon:{
    width:25,
    height:25,
    marginRight:20,
    marginVertical:10

  },
  gach:{
    height:1,
    backgroundColor:"#F5F5F5",
    marginLeft:60,
    marginRight:20
  },
  text:{
    color:'#4c4c4c',
    fontSize:13
  },
});
export default Sidebar;