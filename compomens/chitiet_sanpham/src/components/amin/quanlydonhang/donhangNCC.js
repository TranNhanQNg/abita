import React, {Component,useEffect,useState, useRef,useLayoutEffect} from 'react';
import { Text, View,Image, SafeAreaView,StyleSheet,Animated, TextInput,Modal,
  FlatList,TouchableOpacity,ActivityIndicator,InteractionManager,Button} from 'react-native';
import {useFocusEffect,} from '@react-navigation/native';
import { useSelector,useDispatch} from 'react-redux';
import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import styles from '../stylesAmin';
import TieudeHome from '../../home/tieudeHome';
import naviga from '../../dungchung/naviga';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import fadeIn from'../../dungchung/anima';
import {ModalThongBao,ModalThongBao2Chon} from '../../dungchung/modalThongBao';
import { set } from 'react-native-reanimated';
import {Fecht} from '../dungchung/fecht';

const {abita_dathang,abita_sanpham,abita_amin, hinhanhsanpham}=diachiDaTa;
const{viewTongFL,viewFlatlist,aoimage,aotext,viewImage,viewThanhTien, viewText} = styles;

export default ChiTietDonHang =({navigation, route})=>{
        const infoAdd = useSelector(state => state.cart.SoDienThoai);
        const MaTinh = useSelector(state => state.cart.MaTinh);
        const {tenLoaiHang,sodonhang,xacnhan,hoten,dienthoai,diachi,ghichu}=route.params;
        const [data, setData] = useState([{SODONHANG:'nhân'}]);
        const [dataNCC, setDataNCC] = useState([]);
        const [iddonhang, setIdDonHang] = useState('')
        const [donhang, setDonHang] = useState();
        const [isLoading, setLoading] = useState(true);
        const [maNVGH, setMaNVGH] = useState('');
        const [refreshing, setRefreshing] = useState(false);
        const [modalTBHuy, setModalTBHuy] = useState(false);
        const [modalTB, setModalTB] = useState(false);
         const [modalTBXacNhan, setModalTBXacNhan] = useState(false);
        const [modalVisible, setModalVisible] = useState(false);

// const wait = (timeout) => {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

    //animated
const fadeAnim = useRef(new Animated.Value(0)).current;
useFocusEffect(() => {fadeIn(fadeAnim)});
 
 const Loading =()=>setLoading(true);
const fetchData= ()=>{setData([])};

  useLayoutEffect(() => {
    
    fetch(abita_dathang+'DonHang.php?MaTinh='+MaTinh+'&SoDonHang='+sodonhang+'&XacNhan='+xacnhan+'&TenXacNhan=XacNhanNCC')
      .then((response) => response.json())
      .then((json) => {setData(json), setDonHang(sodonhang)})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)});
  },[sodonhang,xacnhan,infoAdd,isLoading]);

  
fetchNhaCungCap = (item)=>{

    Fecht(dieukien={dieukien:item.IDDONHANG,
      tendieukien:'IdDonHang',
      tencsdl:'donhang',
      tengiatri:'XacNhanNCC',
      giatri:'true',
      DienThoaiNCC:infoAdd,
      },MaTinh)};
huyNhaCungCap = ()=>{

  Fecht(dieukien={dieukien:iddonhang,
    tendieukien:'IdDonHang',
    tencsdl:'donhang',
    tengiatri:'XacNhanNCC',
    giatri:'huy',
    DienThoaiNCC:infoAdd,
    },MaTinh)};





const dieukhien =()=>{setModalTB(false)};
const dieukhienModalXacNhan =()=>{setModalTBXacNhan(false)};
const dieukhienModalHuy =()=>{setModalTBHuy(false),huyNhaCungCap(),setLoading(!isLoading)};





    const listHeader = ()=>{
    return(
      <View style={{margin:8, backgroundColor:'#9ACD32', borderRadius:5 }}>
    <View style={{margin:10}}>
    <Text style={{color:'#FFFFFF'}}><Icon name="user" size={15} color="blue" /> {hoten} <Icon name="phone" size={15} color="blue" /> {dienthoai}</Text>
    <Text style={{color:'#FFFFFF'}}><Icon name="map" size={15} color="blue" /> {diachi}</Text>
    <Text style={{color:'#FFFFFF'}}><Icon name="pencil" size={15} color="blue" /> {ghichu}</Text>
    </View>
    </View>
    )};

  	
  for (var i = 0, sum = 0; i < data.length;i++){
      sum+= data[i].GIABANSPDH*data[i].SOLUONGDH};
return (
<SafeAreaView style = {{flex:1,justifyContent: 'space-between',}}>
         <View>
         <HeaderB navigation ={navigation}/>
            <View style={{height:35}}>
         <TieudeHome props ={'Mã DH'+sodonhang}/> 

         </View>
          </View>
          <View style={{flex:1, }}>

         {donhang !== sodonhang?  <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
     <ActivityIndicator size="large" color="#00ff00" />
        </View> : (
       <Animated.View style={{backgroundColor:'#E8E8E8', opacity:fadeAnim}}>
            <FlatList 
            data={data}

            renderItem={({ item }) => (
                <View style={viewTongFL}>
                    <View style = {viewFlatlist}>

                    <TouchableOpacity style = {{flex:1, flexDirection: 'row',}} onPress={() => naviga(item,navigation)}>
                    <View style={viewImage}>
                    <Image source={{uri:hinhanhsanpham + item.ANHDAIDIEN}} style={aoimage} />
                    </View>
                    <View style={viewText}>
                    <View>
                    <Text style={aotext}>{item.TENSANPHAM}</Text>
                    <View style={{borderRadius: 10,flexDirection:'row',}}>
                    <Text style ={{marginHorizontal:5}}>{item.QUYCACHSP},</Text>
                    <Text style ={{marginHorizontal:5}}>{item.MAUSACSP} </Text>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                    <Text style={[aotext],{color:'red'}}>{(item.SOLUONGDH*item.GIABANSPDH).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng</Text>
                    <Text style={{marginLeft:20}}> Số lượng: {item.SOLUONGDH} </Text>
                    </View>
                    </View>
                    </TouchableOpacity>
                    </View>
              
                   
                   <View style={{flexDirection: 'row',margin:5,justifyContent:'space-around'}}>
                  
                        <TouchableOpacity onPress ={()=> {setModalVisible(true),setIdDonHang(item.IDDONHANG),setLoading(!isLoading),fetchNhaCungCap(item) }}
                        style={{backgroundColor:'#BDB76B', height:25,borderRadius:8, justifyContent:'center',flexDirection:'row', alignItems:'center',}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:10}}><Icon name="check" size={15} color="#1E90FF" /> Xác nhận</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity onPress ={()=> {setModalTBHuy(true),setIdDonHang(item.IDDONHANG)}}
                        style={{backgroundColor:'#B0C4DE',  height:25,borderRadius:8, justifyContent:'center',flexDirection:'row',alignItems:'center', marginHorizontal:8}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:10}}><Icon name="close" size={15} color="red" /> Huỷ bỏ</Text>
                        </TouchableOpacity>
                        
                  </View>
                   </View>
                 
                )}
            keyExtractor={( item ) => item.IDDONHANG}

            ListHeaderComponent={listHeader}
         
            />
     </Animated.View>)}
    </View>
       
          <View style={viewThanhTien}>
         
       <Text style={{color:'blue',marginLeft:20,}}> Thành tiền:  </Text> 
       <Text style={{color:'red',marginRight:20,}}> {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng </Text> 
       </View>

       
    <ModalThongBao navigation={navigation} thongbao='Bạn xem lại mạng wifi' dieukhien={dieukhien} modalVisible={modalTB} hanhdong={'Xác nhận'}/>
    <ModalThongBao2Chon navigation={navigation} thongbao='Xác nhận huỷ sản phẩm này' dieukhien={dieukhienModalHuy} modalVisible={modalTBHuy} hanhdong={'Xác nhận'} />
      </SafeAreaView>

      
      );
};

