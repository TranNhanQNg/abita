
import axios from 'axios';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
const {abita_sanpham}=diachiDaTa;

const Fecht =(dieukien,MaTinh)=>{
            fetch(abita_sanpham+'EditSanPham/EditDuyet.php?MaTinh='+MaTinh, {
            method:'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(dieukien)
                                
          })
            .then((response) => response.json())
            .then((json) =>{})
            .catch((error) => {alert('Xem lại hệ thống mạng')})
    
};
const FechtDM =(dieukien,MaTinh)=>{
  fetch(abita_sanpham+'EditSanPham/EditDanhMuc.php?MaTinh='+MaTinh, {
  method:'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify(dieukien)
                      
})
  .then((response) => response.json())
  .then((json) =>{})
  .catch((error) => {alert('Xem lại hệ thống mạng')})

};
const XoaImage =(dieukien,MaTinh,load)=>{
    axios.post(abita_sanpham+'EditSanPham/XoaImage.php?MaTinh='+MaTinh, 
    JSON.stringify(dieukien)
    )
  .then((res) =>{res.data.kq?load(true):alert('Chưa thành công'),console.log(res.data)})
  .catch((error) => {alert('Xem lại hệ thống mạng')})

};
const upImage =(dieukien,MaTinh,load)=>{
  axios.post(abita_sanpham+'EditSanPham/UpImage.php?MaTinh='+MaTinh, 
        JSON.stringify(dieukien)
    )
  .then((res) =>{res.data.kq?load(true):alert('Chưa thành công'),console.log(res.data)})
  .catch((error) => {alert('Xem lại hệ thống mạng')})

};
module.exports = {Fecht,FechtDM,XoaImage,upImage};