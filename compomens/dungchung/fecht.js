import axios from 'axios';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {
    launchImageLibrary
  } from 'react-native-image-picker';
import { useSelector} from 'react-redux';

const MaTinh = useSelector(state => state.cart.MaTinh); 


const {abita_sanpham}=diachiDaTa;

const Fecht =(data,api)=>{
            axios.post(api, 
                    JSON.stringify(data)
                ).then(function (response) {
                    response.data.kq==true?alert('Thực hiện thành công'):alert('Chưa thành công')
                  })
                  .catch(function (error) {
                    console.log(error);
                    alert('Chưa thành công')
                  });
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
//image picker
const pickerImage = (pushImage) => {
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const s = new Date().getSeconds()
    const tenanhsanpham = JSON.stringify(date)+JSON.stringify(month)+JSON.stringify(year)+JSON.stringify(hours)+JSON.stringify(min)+JSON.stringify(s)+Math.floor(Math.random() * 100);


    let options = {
      mediaType: 'photo',
      width: 300,
      height: 300,
      quality: 1,
      includeBase64: true
    };
   
    
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response.base64);
      if (response.didCancel) {
        alert('Camera not available on device');
        return;
        
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      } else if (response.fileSize > 5242880) {
        Alert.alert(
            "Nilamhut Say\'s",
            "Oops! the photos are too big. Max photo size is 4MB per photo. Please reduce the resolution or file size and retry",
            [
                { text: "OK", onPress: () => console.log('ok Pressed') }
            ],
            { cancelable: false }
        )
      }else{    
        pushImage(response)
      }
          });
    };
module.exports = {Fecht,FechtDM,XoaImage,upImage,pickerImage};