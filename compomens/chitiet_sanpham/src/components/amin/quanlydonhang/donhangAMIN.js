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
import {ModalThongBao} from '../../dungchung/modalThongBao';
import {Fecht} from '../dungchung/fecht';
import TangGiamSoLuong from './tanggiam';

const {abita_dathang,abita_sanpham,abita_amin, hinhanhsanpham}=diachiDaTa;
const{viewTongFL,viewFlatlist,aoimage,aotext,viewImage,viewThanhTien, viewText} = styles;

export default DonHangAmin =({navigation, route})=>{
        const infoAdd = useSelector(state => state.cart.SoDienThoai);
        const MaTinh = useSelector(state => state.cart.MaTinh);
        const {tenLoaiHang,sodonhang,xacnhan,hoten,dienthoai,diachi,ghichu}=route.params;
        const [data, setData] = useState([{SODONHANG:'nhân'}]);
        const [dataNCC, setDataNCC] = useState([]);
        const [iddonhang, setIdDonHang] = useState('')
        const [donhang, setDonHang] = useState();
        const [isLoading, setLoading] = useState(true);
        const [maNVGH, setMaNVGH] = useState('');
        const [soluong, setsoluong] = useState(1);
        const [modalTBHuy, setModalTBHuy] = useState(false);
        const [modalTB, setModalTB] = useState(false);
         const [modalTBXacNhan, setModalTBXacNhan] = useState(false);
        const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const id = setInterval(() => {setLoading(c=>c+1)},5000);
    return () => clearInterval(id);
  }, []); 
  const onRefresh = () => {
      setLoading(true);
    };
    //animated
const fadeAnim = useRef(new Animated.Value(0)).current;
useFocusEffect(() => {fadeIn(fadeAnim)});
 
 const Loading =()=>setLoading(true);
  const fetchData= ()=>{setData([])};

  useLayoutEffect(() => {
    fetch(abita_dathang+'DonHang.php?MaTinh='+MaTinh+'&SoDonHang='+sodonhang+'&XacNhan='+xacnhan+'&TenXacNhan=XacNhanAbita')
      .then((response) => response.json())
      .then((json) => {setData(json), setDonHang(sodonhang)})
      .catch((error) => console.error(error))
      .finally(() => {setLoading(false)});
  },[sodonhang,xacnhan,infoAdd, isLoading]);

  const fetchXacNhanNCC = (item)=>{
    Fecht(dieukien={dieukien:item.IDDONHANG,
      tendieukien:'IdDonHang',
      tencsdl:'donhang',
      tengiatri:'XacNhanNCC',
      giatri:'true',
      DienThoaiNCC:infoAdd,
      },MaTinh)};

  const fetchHuyAbita = ()=>{
    Fecht(dieukien={dieukien:iddonhang,
      tendieukien:'IdDonHang',
      tencsdl:'donhang',
      tengiatri:'XacNhanAbita',
      giatri:'huy',
      DienThoaiNCC:infoAdd,
      },MaTinh)};

  const xulynhacungcap =(item)=>{
      fetch(abita_sanpham+'SanPhamCHK.php?IdSanPham='+item.IDSANPHAM+'&MaTinh='+MaTinh)
      .then((response) => response.json())
      .then((json) => setDataNCC(json.filter(e=>e !== item.IDCHITIETSP)))
      .catch((error) => console.error(error));
  };
  
  const fetchTimNCC = (item)=>{

  fetch(abita_amin+'UpNhaCungCap.php?MaTinh='+MaTinh, {
  method:'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify([{  
            IdDonHang:iddonhang,
            IdChiTietSp: item.IDCHITIETSP,
            GiaBanSPDH: (item.GIABANSP>item.GIAKHUYENMAI)?item.GIAKHUYENMAI:item.GIABANSP,
            SoLuongDH: soluong,
            DienThoaiNCC:item.DIENTHOAINCC,
            XacNhanNCC:'false',
    }])
})
  .then((response) => response.json())
  .then((json) =>{null})
  .catch((error) => setModalTB(true))   
};


const xacnhandonhang = ()=>{

  fetch(abita_amin+'UpXacNhan.php?MaTinh='+MaTinh, {
  method:'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify([{
    SoDonHang:sodonhang,
    XacNhan:true,
    TaiKhoanXacNhan:maNVGH,
    TaiKhoanGiaoHang:maNVGH,
    }])
})
  .then((response) => response.json())
  .then((json) =>{setModalTBXacNhan(json.kq)})
  .catch((error) => setModalTB(true))   
};


const dieukhien =()=>{setModalTB(false)};
const dieukhienModalXacNhan =()=>{setModalTBXacNhan(false)};
const dieukhienModalHuy =()=>{setModalTBHuy(false),fetchHuyAbita(),setLoading(!isLoading)};



  const ListFooter =()=>{
   
      return(
        <View style={{backgroundColor:'#FFFFFF', marginTop:5}}>
        
            <View style={{flexDirection:'row', alignItems:'center',marginHorizontal:20, marginTop:5 }}>
            <Text>Mã NVGH:</Text>
            <TextInput
              autoFocus
              style={{ backgroundColor:'rgba(52, 52, 52, 0.2)',borderRadius:8,flex:1,fontSize: 16,padding: 10,marginLeft:10,}}
              placeholder = 'Nhập mã giao hàng'
              returnKeyType ='done'
              scrollEnabled = {false}
              value={maNVGH} 
              onChangeText={setMaNVGH}
            />
            <Icon name="refresh" size={25} color="red" style={{marginLeft:20}} />
            </View>
            <View style={{backgroundColor:'#FFFFFF',height:70,marginTop:5, alignItems:'center', flexDirection:'row', justifyContent:'space-between',}}>
              <TouchableOpacity onRefresh={()=>{xacnhandonhang()}}
              style={{alignItems:'center',}}>
              <View style={{backgroundColor:'#EE82EE',marginLeft:20, height:35,borderRadius:8, justifyContent:'center',flexDirection:'row',alignItems:'center',}}>
              <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:20}}><Icon name="check" size={20} color="#1E90FF" /> Xác nhận</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems:'center',}}>
              <View style={{backgroundColor:'#B0C4DE',marginRight:20, height:35,borderRadius:8, justifyContent:'center',flexDirection:'row',alignItems:'center',}}>
              <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:20}}><Icon name="close" size={20} color="red" /> Huỷ bỏ</Text>
              </View>
              </TouchableOpacity>     
            </View>
        </View>
        );
    };

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
                    <Text style ={{marginHorizontal:5}}>{item.QUYCACHSP}</Text>
                    <Text style ={{marginHorizontal:5}}>{item.MAUSACSP=='no'?null:', Màu: '+item.MAUSACSP} </Text>
                    </View>
                    </View>
                    <View style={{flexDirection: 'row',}}>
                    <Text style={[aotext],{color:'red'}}>{(item.GIABANSPDH).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng</Text>
                    <Text style={{marginLeft:20}}> Số lượng: {item.SOLUONGDH} </Text>
                    </View>
                    </View>
                    </TouchableOpacity>
                    </View>
                    <View>
                
                       <View>
                    <View style={{flexDirection: 'row',margin:5}}>
                    <Text style ={{marginHorizontal:5}}>
                    <Icon name="user" size={15} color="red" /> {item.TENCH}:  
                    <Icon name="phone" size={15} color="blue" /> {item.DIENTHOAINCC}:  
                    <Icon name="map" size={15} color="red" /> {item.DIACHICH} </Text>
                    </View>
                   <View style={{flexDirection: 'row',marginHorizontal:20,marginVertical:5,justifyContent:'space-between'}}>
                      {item.XACNHANNCC=='false'?
                      <TouchableOpacity onPress ={()=> {fetchXacNhanNCC(item),onRefresh()}}
                      style={{backgroundColor:'#FF69B4', height:25,borderRadius:8, justifyContent:'center',flexDirection:'row', alignItems:'center',}}>
                      <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:5}}><Icon name="user-follow" size={15} color="#FFFF00" />Xác nhận</Text>
                      </TouchableOpacity>:
                      <View
                        style={{backgroundColor:item.XACNHANNCC=='huy'?'red':item.XACNHANNCC=='true'?'#228B22':'#FFFFFF', width:25 ,height:25,borderRadius:50, justifyContent:'center',flexDirection:'row', alignItems:'center',}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',}}><Icon name={item.XACNHANNCC=='true'?"check":'close'} size={25} color="#FFFFFF" /></Text>
                        </View>
                        }
                        <TouchableOpacity onPress ={()=> {setModalVisible(true), xulynhacungcap(item),setIdDonHang(item.IDDONHANG),setsoluong(item.SOLUONGDH) }}
                        style={{backgroundColor:'#556B2F', height:25,borderRadius:8, justifyContent:'center',flexDirection:'row', alignItems:'center',}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:5}}><Icon name="user-follow" size={15} color="#FFFF00" /> Cửa hàng</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity onPress ={()=> {setModalTBHuy(true),setIdDonHang(item.IDDONHANG)}}
                        style={{backgroundColor:'#B0C4DE',  height:25,borderRadius:8, flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#FFFFFF',textAlign:'center',marginHorizontal:5}}><Icon name="close" size={15} color="red" /> Huỷ</Text>
                        </TouchableOpacity>
                        
                  </View>
                   </View>
                 
                    </View>
                </View>

                )}
            keyExtractor={( item ) => item.IDDONHANG}

            ListHeaderComponent={listHeader}
            ListFooterComponent={ListFooter}
            />
     </Animated.View>)}
    </View>
       
          <View style={viewThanhTien}>
         
       <Text style={{color:'blue',marginLeft:20,}}> Thành tiền:  </Text> 
       <Text style={{color:'red',marginRight:20,}}> {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đồng </Text> 
       </View>

        <Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
       <SafeAreaView style ={{flex:1,justifyContent:'center',backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
       <View style={{flex:1,marginVertical:20,}}>
         
        <FlatList 
          data={dataNCC}
          renderItem={({ item }) => (
            <View style={{backgroundColor:'#FFFFFF',marginHorizontal:20,marginTop:7,borderRadius: 5,}}>
              <View style = {{flex:1, flexDirection: 'row',}}>
              <TouchableOpacity style = {{flex:1, flexDirection: 'row', marginLeft:5}} onPress={() =>{fetchTimNCC(item), setModalVisible(false),onRefresh()}}>
              <View style={{width: 100, height: 150,}}>
              <Image source={{uri:hinhanhsanpham + item.ANHDAIDIEN}} style={{  flex:1, resizeMode:"contain",}} />
              </View>
              <View style={{justifyContent: 'space-between',margin:5,flex:1}}>
              <View>
              <Text style={{fontSize: 13}}>{item.TENSANPHAM}  </Text>
              <Text style ={{}}>{item.QUYCACHSP} </Text>
              <Text style ={{}}>{item.MAUSACSP=='no'?null:'Màu: '+item.MAUSACSP} </Text>
              
              </View>
              <View style={{flexDirection:'row', marginVertical:5}}>
              <Text style={{color:'red', margin:5}}> Giá: {item.GIABANSP>item.GIAKHUYENMAI?item.GIAKHUYENMAI.toString().replace(/\B(?=(\d{3})+(?!\d))/g,"."):item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              }</Text>
             
              <Text style={{color:'red', margin:5}}> đồng </Text>
              </View>
              </View>
              </TouchableOpacity>  
              </View>
             <TangGiamSoLuong fechSoLuong={setsoluong} SoLuong={soluong}/> 
              </View>
              )}
              keyExtractor={( item ) => item.IDCHITIETSP}
        />
          <View>
           <TouchableOpacity onPress={() => setModalVisible(false)}>
    <View style={{marginVertical:10, height:30, backgroundColor:'#D3D3D3',marginHorizontal:30, alignItems:'center', justifyContent:'center', borderRadius:5}}>
    <Text >Đóng</Text>
    </View>
    </TouchableOpacity>
          
      </View>
      </View>

      </SafeAreaView> 
    </Modal>
    <ModalThongBao navigation={navigation} thongbao='Bạn xem lại mạng wifi' dieukhien={dieukhien} modalVisible={modalTB} hanhdong={'Xác nhận'}/>
    <ModalThongBao navigation={navigation} thongbao='Xác nhận huỷ sản phẩm này' dieukhien={dieukhienModalHuy} modalVisible={modalTBHuy} hanhdong={'Xác nhận'} />
    <ModalThongBao navigation={navigation} thongbao={'Đơn hàng đã được gởi đến'+maNVGH} dieukhien={dieukhienModalXacNhan} modalVisible={modalTBXacNhan} hanhdong={'Đóng'} />
      </SafeAreaView>

      
      );
};

