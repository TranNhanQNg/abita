import React, {useState,useEffect} from 'react';
import { Text, View,TouchableOpacity,StyleSheet,
   Image,} from 'react-native';
  import axios from 'axios';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';



const { abita_amin }=diachiDaTa;
export default function LikeSanPham ({navigation,chitiet }) {
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const MaUid = useSelector(state => state.cart.MaUid);
  const Wifi = useSelector(state => state.cart.Wifi);
  const SoDienThoai = useSelector(state => state.cart.SoDienThoai); 
  const {hinhanh} = diachiDaTa; 
  
  const [count_like, setcount_like] = useState(0);
  const [like, setlike] = useState(false);
  const [reflike, setReflike] = useState(0);

  
  useEffect(() => {
    if(Wifi&&reflike<5){
      kiemtralike()
      diemsolike()
          }
    }, []);

    const diemsolike =()=>{
            fetch(abita_amin+'Like_TheoDoi/LuotThichSanPham.php?MaTinh='+MaTinh+'&IdSanPham='+JSON.stringify(chitiet.IDSANPHAM))
            .then((response) => response.json())
            .then((json) => {setcount_like(json.countDHMoi)})
            .catch(function (error) {console.log(error)})
          };

    const kiemtralike =() => {
      axios.post(abita_amin+'Like_TheoDoi/KiemTraLikeSanPham.php?MaTinh='+MaTinh,
      JSON.stringify(
        {
        DienThoaiKH:SoDienThoai,
        MaUid:MaUid,
        MaUidNCC:chitiet.MAUIDNCC,
        IdSanPham:chitiet.IDSANPHAM
        }
      ))
              .then((response) => {setlike(response.data.kq)})
              .catch(function (error) {console.log(error)})
         };

    const Fecht =()=>{
      axios.post(abita_amin+'/Like_TheoDoi/LikeSanPham.php?MaTinh='+MaTinh, 
              JSON.stringify(
                {
                DienThoaiKH:SoDienThoai,
                MaUidNCC:chitiet.MAUIDNCC,
                MaUid:MaUid,
                IdChiTietSp:chitiet.IDCHITIETSP,
                IdSanPham:chitiet.IDSANPHAM,
                DienThoaiNCC:chitiet.DIENTHOAINCC,
                TenCuaHang:chitiet.TENCUAHANG,
                TheoDoi:false
                }
              )
          ).then(function (response) {
            setReflike(reflike+1)
           
          })
          .catch(function (error) {
            console.log('nhân'+error);
          })
          .finally(() => {kiemtralike(),diemsolike()});      
  };

    return(
        <TouchableOpacity onPress={SoDienThoai=="abita"?()=>navigation.navigate('DangNhapNumberPhone',{loai:'3',components:'ChitietSanpham'}):()=>reflike<5?Fecht():null}
        style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:12,fontStyle: "italic",color:'#606060',marginHorizontal:3}}>{count_like}</Text>
            {!like?
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name="heart" size={20} color="#FF00FF" />
            <Text style={{fontSize:12,fontStyle: "italic",color:'#606060'}}> thích </Text>
            </View>
            :
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialCommunityIcons name="cards-heart" size={20} color="#FF00FF" />
            <Text style={{fontSize:12,fontStyle: "italic",color:'#606060'}}> đã thích </Text>
            </View>
            }
      </TouchableOpacity>
    );
  }

  const styles1 = StyleSheet.create({

  imageSile:{
     flex:1,
    resizeMode:'cover',
    borderRadius:50
    
  },
  })