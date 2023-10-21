import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useSelector} from 'react-redux';
import { abita_amin } from '../../../diachiDaTa/diachiDaTa';
import {ModalThongBao} from '../../dungchung/modalThongBao';
export default AddDaTa =({data,dataImage, dataVND,navigation,danhmuc,dataDM,refetchDaTa})=>{

    const MaTinh = useSelector(state => state.cart.MaTinh);
    const DienThoaiNCC = useSelector(state => state.cart.SoDienThoai);
    const [modalVisible,setModalVisible] =useState(false);
    const [modalVisible1,setModalVisible1] =useState(false);
    const [thongbao, setThongBao] = useState();
    
    const dieukhien1=()=>{setModalVisible1(false)}
    const dieukhien=()=>{setModalVisible(false),refetchDaTa()}

    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const s = new Date().getSeconds();
    const id_sanpham = JSON.stringify(date)+JSON.stringify(month)+JSON.stringify(year)+JSON.stringify(hours)+JSON.stringify(min)+JSON.stringify(s)+Math.floor(Math.random() * 100);

    var newData = [];
    const upload = ()=>{
      
    for (var i = 0; i < dataVND.length; i++){
      if(dataVND[i].GiaBanSP>0&&dataVND[i].TonDau>0&&dataVND[i].TenAnh.length>0){
      newData.push({
        TenSanPham:data[0].value,// tên sản phẩm
        IdDanhMuc:danhmuc[0],
        IdDanhMucCap2:danhmuc[1],
        IdDanhMucCap3:danhmuc[2],
        IdSanPham:danhmuc[2]+id_sanpham,
        IdChiTietSp:danhmuc[2]+id_sanpham+dataVND[i].IdSanPham+i,
        QuyCachSP:dataVND[i].QuyCachSP,
        MauSacSP:dataVND[i].TenMau,
        MaMau:dataVND[i].MaMau,
        ThuongHieu:data[4].value,
        XuatXu:data[3].value,
        ChiTietSanPham:data[5].value,
        MoTaSanPham:data[1].value,// Mô tả sản phẩm
        AnhDaiDien:dataVND[i].AnhDaiDien,
        TenHinhAnh:JSON.stringify(dataVND[i].TenAnh),
        GiaNhapHang:null,
        GiaKhuyenMai:dataVND[i].GiaBanSP,
        GiaBanSP:dataVND[i].GiaBanSP,
        SoLuongTon:dataVND[i].TonDau,
        DuyetSP:'false',
        DienThoaiNCC:DienThoaiNCC 
        }
      )
      }
    };
        if(data[0].value.length <5){
          setModalVisible1(true),
          setThongBao('Bạn xem lại tên sản phẩm')
        }else if(dataDM.length==0){
          setModalVisible1(true),
          setThongBao('Bạn chưa chọn danh mục cho sản phẩm')
        }else if(data[3].value.length <1){
          setModalVisible1(true),
          setThongBao('Bạn chưa nhập xuất xứ hàng hoá')
        }else if(newData.length==0){
          setModalVisible1(true),
          setThongBao('Bạn xem lại giá, sản lượng tồn và ảnh đại diện')
        }else{
          fetchImage()
        }
      }; 
//       const fetchDaTa =()=>{
//         axios.post(abita_amin+'UpSanPham.php?MaTinh='+MaTinh, 
//         ({
//           'dataimage': JSON.stringify(dataImage), 
//           'datasanpham':JSON.stringify(newData)
//           })
//         )
//       .then((res) =>{if(JSON.parse(res.data).kq=='true'){setModalVisible(true), setThongBao('Bạn đã đăng sản phẩm thành công, vui lòng chờ chúng tôi duyệt sản phẩm của bạn ')}
//       else{setModalVisible(true),setThongBao('Chưa thành công')}
//     })
//     .catch((err) => {
//      alert('lôi')
//     })
// };

    const fetchImage =()=>{
        RNFetchBlob.fetch('POST', 'https://abita.com.vn/Abita/Abita_Amin/UpSanPham.php?MaTinh=51', {
        Authorization : "Bearer access-token",
        otherHeader : "foo",
        'Content-Type' : 'multipart/form-data',
        }, [
            {name : 'dataimage', data: JSON.stringify(dataImage)}, 
            {name : 'datasanpham', data: JSON.stringify(newData)},
           ]
        )
        .then((resp) => {
          if(JSON.parse(resp.data).kq=='true'){setModalVisible(true), setThongBao('Bạn đã đăng sản phẩm thành công, vui lòng chờ chúng tôi duyệt sản phẩm của bạn ')}
          else{setModalVisible(true),setThongBao('Chưa thành công')}
        })
        .catch((err) => {
          setModalLoi(true), setThongBao('ôi')
        })
    };
  return(
    <View>
    <View style={{marginTop:20,justifyContent:'center',flexDirection:'row'}}>
      <TouchableOpacity onPress={()=>upload()}>
        <View style={{backgroundColor:'#006600', height:30, alignItems:'center',flexDirection:'row',borderRadius:5}}>
        <Text style={{margin:5, color:'#FFFFFF'}}>Đăng sản phẩm {year}</Text>
        </View>
      </TouchableOpacity> 
      <ModalThongBao navigation={navigation}
        thongbao ={thongbao}
        modalVisible={modalVisible1}
        dieukhien={dieukhien1}
        hanhdong={'Đóng'}
        ten={'THÔNG BÁO'}
      />
       <ModalThongBao navigation={navigation}
        thongbao ={thongbao}
        modalVisible={modalVisible}
        dieukhien={dieukhien}
        hanhdong={'Đóng'}
        ten={'THÔNG BÁO'}
      />
      
     
    </View>
    </View>
    

  )
}