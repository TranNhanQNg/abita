import React, { useState,useEffect } from "react";
import {  Text,
  TouchableOpacity,ActivityIndicator,View,Dimensions,Modal,TextInput,useWindowDimensions,Alert } from "react-native";
import {useSelector } from 'react-redux';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import SaoDanhGia from './saodanhgia';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import XemThem_NhanXet from './xemthem_nhanxet'
import {renderItem} from './renderItem_nhanxet'
import NotificationService from '../../../cart/notification';
import {MD5,fechDaTa_Axios} from '../../../dungchung/fech_data';


const{abita_quanly,hinhanh}=diachiDaTa

const height = Dimensions.get('window').height;
export default NhanXet = ({MaTinh, chitiet}) => {
  
  
  const DienThoaiKH = useSelector(state => state.cart.SoDienThoai);
  const MaUid = useSelector(state => state.cart.MaUid);
  const [saodanhgia, setSaoDanhGia] = useState(0);
  const [ten, setTen] = useState("");
  const [nhanxet, setNhanXet] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [kiemtrasanpham,setkientranhanxet]= useState(false);
  const [modalVisible,setModalVisible]=useState(false)
  const [modalxemthem,setModalXemThem]=useState(false)
  const [thongbao,setThongBao]=useState('')
const w = useWindowDimensions().width;
const h = useWindowDimensions().height;
const moNhanXet =()=>{setModalVisible(!modalVisible)}
const xoanhanxet =()=>{setTen(""),setNhanXet("")};

const onRefresh=()=>setRefreshing(!refreshing)
const time_hientai = new Date().getTime()
const refechTexInput =(response)=>{
   switch (response.data.kq) {
      case true:{
        xoanhanxet(),moNhanXet(),sendMultiNotification()
      };
      break;
      case false:{
       setThongBao("Kết nối chưa thành công!")
      };
       break;
}};

 const [sosao, setSoSao] = useState({});

 useEffect(() => {
  var api_fech = abita_quanly+'TongNhanXet.php?&MaTinh='+MaTinh
  var set_then =(res)=>{setSoSao(res.data)}
  var set_catch =()=>{console.log(error)}
  var set_finally =()=>{null}
  var data_fech = JSON.stringify({KiemTra:MD5.home,IdSanPham:chitiet.IDSANPHAM,DienThoaiNCC:chitiet.DIENTHOAINCC})
  fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  },[refreshing]);

   const {count, count1, count2, count3, count4, count5} = sosao;
   const sum =count1*1+count2*1+count3*1+count4*1+count5*1;

useEffect(() => {
  Fecht()
  },[refreshing]);

  useEffect(() => {
    fechNhanXet()
    },[refreshing]);

  const fechNhanXet =()=>{
    var api_fech = abita_quanly+'DanhGia.php?MaTinh='+MaTinh+'&sotrang=5&Trang=1'
    var set_then =(res)=>{setData(res.data)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,IdSanPham:chitiet.IDSANPHAM,DienThoaiNCC:chitiet.DIENTHOAINCC})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }

  const Fecht =()=>{
        if(MaUid){
          var api_fech = abita_quanly+'kiemtranhanxet.php?MaTinh='+MaTinh
          var set_then =(res)=>{setkientranhanxet(res.data.kq)}
          var set_catch =()=>{console.log(error)}
          var set_finally =()=>{null}
          var data_fech = JSON.stringify({KiemTra:MD5.home,IdSanPham:chitiet.IDSANPHAM,MaUid:MaUid})
          fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
          }
};

const sendMultiNotification = async () => {
  let notificationData = {
            token:chitiet.TOKEN,
            data:
                {
                  Mapush:'nhanxet',
                  body: 'Đơn hàng mới',
                  IdChiTietSp:chitiet.IDCHITIETSP,
                  IdSanPham:chitiet.IDSANPHAM,
                  Ngay:Math.floor(time_hientai),
                },
            priority: "high",
            contentAvailable:true
        };
    await NotificationService.sendSingleDeviceNotification(notificationData);
};

const fomNhanXet = ()=>{
  
    return(
      <View style={{margin:15}}>
    <View style={{flexDirection:'row',alignItems: 'center'}}>
    <Text> Sao đánh giá:  </Text>
    { [1,2,3,4,5].map(item=>
        <TouchableOpacity onPress={() => setSaoDanhGia(item)} key={item}>
          <MaterialCommunityIcons name={"star"}
                                          size={20} 
                                          color={(item<saodanhgia+1)?'#FFCC00':'#D8D8D8'} 
                                          />
        </TouchableOpacity>)}
        </View>
    <View style={{ backgroundColor:'#FFFFFF', margin:10}}>
    <View style ={{ flexDirection:'row', alignItems:'center'}}>
    <Icon name="user" size={15} color="blue" style={{marginLeft:10}} />
    <TextInput style={{flex:1,height:40, marginHorizontal:20,}}
      placeholder = {'Tiêu đề'}
      returnKeyType ='done'
      onChangeText={text => {setTen(text),setThongBao('')}}
    />
    </View>
    <View style={{height:0.5,backgroundColor:'blue', marginHorizontal:20}}/>

     <View style ={{ flexDirection:'row', alignItems:'center'}}>
    <Icon name="pencil" size={15} color="blue" style={{marginLeft:10}} />
   <TextInput style={{flex:1,maxHeight:200,minHeight:40, marginHorizontal:20,}}
      placeholder = {'Nội dung đánh giá'}
      returnKeyType ='done'
      onChangeText={text => {setNhanXet(text),setThongBao('')}}
      multiline={true}
    />
    </View>
   
    <View style={{height:0.5,backgroundColor:'blue', marginHorizontal:20}}/>
     </View>
   
 <View style={{justifyContent: 'center', margin:10,alignItems:'center'}}>
 <Text style={{color:'red',marginVertical:10}}>{thongbao}</Text>
 <TouchableOpacity onPress={()=>{fetchNhanXet()}}>
 <View style={{ backgroundColor:'#008800',justifyContent: 'center',borderRadius:5}}>
    <Text style={{color:'#FFFFFF',marginHorizontal:10,marginVertical:10}}> <Icon name="action-redo" size={15} color="red" /> GỬI </Text>
    </View>
    </TouchableOpacity>
    </View>
    </View>

      )
}

const fetchNhanXet =()=>{
  if(ten.length<1){
   setThongBao("Vui lòng xem lại tiêu đề")
    } else if(saodanhgia==0){
      setThongBao("Vui lòng đánh giá số sao")
    }else{
      var api_fech = abita_quanly+'PostDanhGia.php?MaTinh='+MaTinh
      var set_then =(res)=>{refechTexInput(res.data)}
      var set_catch =()=>{console.log(error)}
      var set_finally =()=>{null}
      var data_fech = JSON.stringify({KiemTra:MD5.home, 
                                      IdSanPham:chitiet.IDSANPHAM,
                                      HoTen:kiemtrasanpham,
                                      TieuDe:ten,
                                      MaUid:MaUid,
                                      DienThoaiKH:DienThoaiKH,
                                      SoSao:saodanhgia,
                                      DanhGia:nhanxet,
                                      DienThoaiNCC:chitiet.DIENTHOAINCC,
                                      MaUidNCC:chitiet.MAUIDNCC,
                                      Ngay:Math.floor(time_hientai),
                                      Sao:chitiet.SAO>0?Math.floor(((chitiet.SAO*1+saodanhgia*1)/2)*100)/100:saodanhgia
                                    })
      fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
     }
}

 
  return (
   <View>
   
   <View style={{height:30, backgroundColor:'#008080',justifyContent:'center',marginTop:5}}>
    <Text style={{color:'#FFFFFF'}}> Nhận xét đánh giá  ({sum})</Text>
    </View>
  {data.length==0?null:
<View style={{flexDirection:'row', backgroundColor:'#F0F8FF', margin:10, borderRadius:10,}}>
  <View style={{alignItems:'center',justifyContent:'center', margin:7,backgroundColor:'#B0E0E6',borderRadius:10}}>
    <View style={{marginHorizontal:10,alignItems:'center'}}>
    <Text style={{fontSize:12}}>{Math.round(count*100)/100}</Text>
    <MaterialCommunityIcons name="star" size={13} color={'#FFFF00'}/>
    </View>
  </View>
<View style={{margin:7, }}>
  <SaoDanhGia sao={5} count={count5} tong = {sum}/>
  <SaoDanhGia sao={4} count={count4} tong = {sum}/>
  <SaoDanhGia sao={3} count={count3} tong = {sum}/>
  <SaoDanhGia sao={2} count={count2} tong = {sum}/>
  <SaoDanhGia sao={1} count={count1} tong = {sum}/>
  </View>
</View>
}
    {kiemtrasanpham&&MaUid?
      <TouchableOpacity onPress={()=>{setModalVisible(true)}}
      style={{margin:5,flexDirection:'row',justifyContent: 'center',}}>
        <Text style={{color:'blue',marginVertical:10}}> <Icon name={"user"} size={15} />{" Viết đánh giá"} </Text>
    </TouchableOpacity>
    :null}
  
    <View>

    {isLoading ? <ActivityIndicator/> : (

        <View style={{}}>
          {data.map(( item, index ) =>
          <View key={index}>
          {renderItem(item, index)}
            </View>
          )}
          {sum>data.length?
          <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>setModalXemThem(true)} >
              <Text style={{margin:5,color:'blue'}}>Xem thêm</Text>
            </TouchableOpacity>
          </View>
          :null}
        </View>
       
          
      )}

</View>
  <View style={{backgroundColor:'#50C7C7',width:'100%',height:1}}/>
  <Modal animationType="fade"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() =>
						setModalVisible(false)
						
						}
			>
      <TouchableOpacity onPress={()=>setModalVisible(false)}
      style={{backgroundColor:'rgba(0,0,0,0.6)',flex:1,alignItems:'center',justifyContent:'center'}}
      >
      <View style={{backgroundColor:'#FFF',borderRadius:8,width:'85%'}}>
      {fomNhanXet()}
      </View>
      </TouchableOpacity>

  </Modal>
  <Modal 
            animationType="fade"
						transparent={true}
						visible={modalxemthem}
						onRequestClose={() =>
						setModalXemThem(false)
						}>
  <View style={{backgroundColor:'#FFF',flex:1}}>
    <XemThem_NhanXet
        MaTinh={chitiet.MATINH}
        idchitietsp={chitiet.IDSANPHAM}
        dienthoaincc={chitiet.DIENTHOAINCC}
        id_sanpham={chitiet.IDSANPHAM}
        MaUidNCC={chitiet.MAIUDNCC}
        setModalXemThem={setModalXemThem}
    />
    </View>
  </Modal>   
    </View> 
   
    )}
   
