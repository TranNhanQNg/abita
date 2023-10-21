import React, {Component,useEffect,useState,useRef,useLayoutEffect} from 'react';
import { Text, View,Image, SafeAreaView,StyleSheet,FlatList,TouchableOpacity,Animated,InteractionManager,ActivityIndicator} from 'react-native';
import { useSelector,useDispatch} from 'react-redux';

import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import styles from '../stylesQuanLy';
import {Activity} from '../../dungchung/activityIndicator';
import {AnhNen} from '../../dungchung/anhnen';
import {REMOVE_THONGBAO_DONHANG} from '../../../redux/cartAction';


const {abita_dathang,hinhanh,abita_quanly}=diachiDaTa;

export default DonHangDat =({xacnhan,tentinhtrang, navigation})=>{
  
  const {quanly1,quanly2,quanly3}=styles;
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const MaUid = useSelector(state => state.cart.MaUid);
  const ThongBao_DonHang=useSelector(state => state.cart.ThongBao_DonHang);
  const Wifi = useSelector(state => state.cart.Wifi);
  const DonHang = useSelector(state => state.cart.DonHang);
  const [data, setData] = useState([]);
  const [dataTK, setDataTK] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [trang, setTrang]= useState(1);
  const [tongdon,settongdon] = useState(0);
  
  const [refreshing, setRefreshing] = useState(true);
  const [id,setid] = useState(xacnhan);
  const [api,setapi] = useState(abita_quanly+'DonHangKH/DonHangKHTheoDoi.php?MaTinh='+MaTinh+'&MaUid='+MaUid+'&TinhTrangDonHang=dagiaoNVGH');
  const [baodat,setBaoDat] = useState(0);
  const [timkiem,setTimKiem]=useState('');
  const [pold, setPold] = useState(0);

   useEffect(() => {
    if(Wifi){
      soluongdonhangdat()
      damua()
      tongdamua()
    }
    },[Wifi,api,trang,refreshing]);

const tongdamua =()=>{
  fetch(abita_quanly+'DonHangKH/TongDHDaMua.php?MaTinh='+MaTinh+'&MaUid='+MaUid)
  .then((response) => response.json())
  .then((json) => settongdon(json.sum))
  .catch((error) => console.error(error))
};
const fechPold =()=>{
  fetch(abita_dathang+'KiemTra_Pold.php?MaUid='+MaUid+'&MaTinh='+MaTinh)
  .then((response) => response.json())
  .then((json) => {setPold(json.tongPold*1-json.tongPoldKhauTru*1)})
  .catch((error) => console.error(error))
}
useEffect(() => {
  fechPold()
},[])
  const damua =()=> {
    data.length==0?setLoading(false):null
  fetch(api+'&trang='+trang)
  .then((response) => response.json())
  .then((json) => {json.length==0?setDataTK(json.length):setData(data.concat(json))})
  .catch((error) => setActivity(false))
  .finally(() => setLoading(true))
};



const soluongdonhangdat =() => {
  fetch(abita_quanly+'DonHangKH/ThongBaoDonHangKH.php?MaTinh='+MaTinh+'&MaUid='+MaUid+'&TinhTrangDonHang=dagiaoNVGH')
    .then((response) => response.json())
    .then((json) => setBaoDat(json.count))
    .catch((error) => console.error(error))
};
  
  const data_muc =[
    {id:'false',muc:'Đơn hàng', icon:'2',api:abita_quanly+'DonHangKH/DonHangKHTheoDoi.php?MaTinh='+MaTinh+'&MaUid='+MaUid},
    {id:'yes', muc:'Điểm Point', icon:'1',api:abita_quanly+'DonHangKH/DonHangKHDaMua.php?MaTinh='+MaTinh+'&MaUid='+MaUid},
   
  ];

const onPressMuc =(item)=>{
  setid(item.id)
  setapi(item.api)
  setTrang(1)
  setData([])
  setDataTK(1)
};

    const listHeader = ()=>{
    return(
    <View>
      <View style={{height:10}}/>
      {id=='yes'?
      <View>
      <View style={{marginHorizontal:10,borderRadius:8, backgroundColor:'#F0FFFF'}}>
        
        <Text style={{margin:7}}>Khách hàng: {SoDienThoai}</Text>
        <Text style={{margin:7}}>Tổng số điểm Point: {pold?pold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") :0} Abi ~ {pold?200*pold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."):0} đồng</Text>
        
      </View>
      <View style={{marginVertical:10,backgroundColor:'#50C7C7'}}>
        <Text style={{margin:5,color:'#FFF'}}>Lịch sử mua hàng</Text>
      </View>
      </View>:null
     }

    </View>
    )};

    const renderSeparator = () => {
    return (
      <View
        style={{
          height: 20,
        }}
      />
    );
  };

  const dispatch = useDispatch()
  const addThongBao_DonHang = (xem) =>{
    const infohobby = {
                  Mapush:xem.Mapush,
                  MaDonHang:xem.MaDonHang,
                  NoiDung:xem.NoiDung,
                  BoDy:xem.BoDy,
                  NGAY:xem.NGAY,
                  Xem:false
                };
    const actioninfo = REMOVE_THONGBAO_DONHANG(infohobby);
    dispatch(actioninfo);
  };
  
  const renderItem =({item})=>{
    const xem = ThongBao_DonHang.find(element => element.MaDonHang ==item.SODONHANG);
    const tinhtrangdonhang = item.TINHTRANGDONHANG=='donggoi'?'đang xếp hàng':
                              item.TINHTRANGDONHANG=='chogiao'?"chờ giao":
                              item.TINHTRANGDONHANG=='xuly'?"đang xử lý":
                              item.TINHTRANGDONHANG=='donmoi'?'đơn mới':
                              item.TINHTRANGDONHANG=='danggiao'?'đang giao':'đã giao'
    return(
      <TouchableOpacity  onPress={() => {navigation.navigate("ChiTietDonHang", 
      {MaDonHang:item.SODONHANG,tinhtrangdonhang:tinhtrangdonhang,Ngay:JSON.parse(item.TAIKHOANXACNHAN)[0].NgayDatHang}),xem?addThongBao_DonHang(xem):null}}
      >
       <View style = {[quanly1,]}>
        <View style={quanly2}>
        {item.TINHTRANGDONHANG=='donmoi'?
        <Image source={{uri:hinhanh+'icon/menuKH.png'}}
                style={{height:25,width:25,}}/>
          :item.TINHTRANGDONHANG=='xuly'?
        <Image source={{uri:hinhanh+'icon/xuly.png'}}
                style={{height:25,width:25,}}/>
         :item.TINHTRANGDONHANG=='donggoi'?
          <Image source={{uri:hinhanh+'icon/donggoi.png'}} 
                style={{height:25,width:25}}/>
          :item.TINHTRANGDONHANG=='chogiao'?
        <Image source={{uri:hinhanh+'icon/delivered.png'}}
                style={{height:25,width:25,}}/>
          :item.TINHTRANGDONHANG=='danggiao'?
          <Image source={{uri:hinhanh+'icon/danggiao.png'}} 
                style={{height:25,width:25}}/>
          :
          <Image source={{uri:hinhanh+'icon/daban.png'}} 
                style={{height:25,width:25}}/>
         
        } 
          </View>
          <View style={[quanly3,{backgroundColor:xem?.Xem?'#FFDEAD':null}]}>
          <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}> 
          <Text  style={{fontWeight:'bold',color:'#606060'}}>Mã đơn hàng: </Text>
          <Text selectable={true} selectionColor='orange' style={{fontWeight:'bold',color:'#606060'}}>{item.SODONHANG} </Text>
        </View>
          <Text style={{marginBottom:10,fontWeight:'bold',color:'#606060'}}>Ngày đặt hàng: <Text style={{fontWeight:'normal'}}>{JSON.parse(item.TAIKHOANXACNHAN)[0].NgayDatHang}</Text></Text>
          <Text style={{marginBottom:10,fontWeight:'bold',color:'#606060'}}>Tình trạng: <Text style={{fontWeight:'normal'}}>{tinhtrangdonhang}</Text></Text>
          {item.TINHTRANGDONHANG=='danggiao'?
            <Text style={{marginBottom:10,fontWeight:'bold',color:'#606060'}}>Người giao hàng: <Text style={{fontWeight:'normal'}}>{item.TAIKHOANXACNHAN[0].TaiKhoanGiaoHang}</Text></Text>
            :null
          }
          </View>
      </View>
      </TouchableOpacity>
    )
  }
return (
<View style = {{flex:1}}>
    <AnhNen 
          backgroundColor={'#20B2AA'}
          backgroundColor1={'rgba(0,175,175,0.8)'}/>
          <SafeAreaView style={{flex:1}}>
          <HeaderB  navigation ={navigation}
                onChangeText={'onChangeText'}
                saechclose={'saechclose'}
                onSubmitEditing={'onSubmitEditing'}
                timkiem={timkiem}
                ten={'Tìm đơn hàng'}
                />
          <View style={{flexDirection:'row',
                        justifyContent:'space-around',
                       alignItems:'center',
                       height:45,
                       marginTop:10
                        }}>
              {data_muc.map(item=>
              <TouchableOpacity key={item.id}
                    onPress={()=>{onPressMuc(item),setRefreshing(!refreshing)}}
                    style={{height:45,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:item.id==id?'#FFF':'#303030'}}>{item.muc}</Text>
                <View style={{height:2,marginTop:5,width:70,backgroundColor:item.id==id?'#FFF':null}}/>
                {item.id=='true'||item.id=='false'?
                baodat>0?
                <View style={{position:'absolute',top:0,right:0,borderRadius:100, backgroundColor:'red',width:15,height:15,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{backgroundColor:'red', color:'#FFF',fontSize:10}}>{baodat}</Text>
                </View>:null:null
                }
                
              </TouchableOpacity>)}
          </View>
         
          <View style={{backgroundColor:'#FFF',height:'100%',justifyContent:'center'}}>
               
                {!isLoading?  <Activity/>: (
              
                <FlatList
                style={{flex:1,backgroundColor:'#FFF'}}
                data={data}
                renderItem={renderItem}
                keyExtractor={( item,index ) => item.SODONHANG+index}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={listHeader}
                ListFooterComponent={<View style={{height:200}}/>}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.3}
                onEndReached={()=>dataTK==1?setTrang(trang+1):null}
                bounces = {false} 
             
              />)}
             
       </View>  
     </SafeAreaView>  
          
      </View>

      
      );
};