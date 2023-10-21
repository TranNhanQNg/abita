import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  launchImageLibrary
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {XoaImage,upImage} from './fecht';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
const {hinhanhsanpham} = diachiDaTa; 
const AnhSanPham =({dataImage,
                    dienthoaincc,
                    load,
                    mauSP,
                    setDaTaAnh,
                    dataanh,
                   
                  })=>{
    
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const s = new Date().getSeconds()
    const tenanhsanpham = JSON.stringify(date)+JSON.stringify(month)+JSON.stringify(year)+JSON.stringify(hours)+JSON.stringify(min)+JSON.stringify(s)+Math.floor(Math.random() * 100);
    
    const upanh =(response)=>{
     
      const tenanh = tenanhsanpham+'.'+response.assets[0].fileName.split('.')[1];
      const dataimage = dataImage.concat(tenanh.split());
      setDaTaAnh(dataimage);
      
      upImage(dieukien={ TenHinhAnhMoi:JSON.stringify(dataImage.concat(tenanh.split())),
        TenHinhAnh:JSON.stringify(dataImage),
        TenAnh:tenanh,
        Anh:response.assets[0].base64,
        DienThoaiNCC:dienthoaincc
       },MaTinh,load)
                 }
    
    const pushImage =(response)=>{upanh(response),load()}
   

  const chooseFile = (type) => {
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

    const viewadd =()=>{if(dataImage.length<8){
      return(
        <TouchableOpacity 
      style={{flexDirection: "row",
          margin:5,
          alignItems:'center'}} 
      onPress={()=>{chooseFile('photo'),setDaTaAnh(dataImage)}}>
      <Icon name="image" size={20} color={mauSP==false?'blue':mauSP} />
      <Text style={{marginHorizontal:5,color:'blue'}}> 
      Add ảnh
      </Text>
    </TouchableOpacity>
      )
      
    }
  };
	return(
    <View >
     {viewadd()}
    </View>
		)
	};
  // xem ảnh 
  const XemAnh =({dataImage,load,
    dienthoaincc,
    setDaTaAnh,
    dataanh,
    navigation
   
                })=>{
  
   const MaTinh = useSelector(state => state.cart.MaTinh);
  
        const xoaImage1 =(item)=>{
          const newdataImage = dataImage.filter(e=>  e !== item);
          setDaTaAnh(newdataImage)
          XoaImage(dieukien={ TenHinhAnhMoi:JSON.stringify(newdataImage),
                              TenHinhAnh:JSON.stringify(dataImage),
                              TenAnh:item,
                              DienThoaiNCC:dienthoaincc
                             },MaTinh)
        };
  

  return(
    <View >
      <View style={{flexDirection: 'row',flexWrap:'wrap', margin:5}}>
          {dataImage.map((item) =>
          <View key={item}>
            <TouchableOpacity style={{flexDirection: "row-reverse"}} 
            onPress={()=>{xoaImage1(item), load(true)}}>
            <Icon name="times-circle" size={12} color="red" style={{margin:3}}/>
           
            </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("XemAnh",{tenanh:item})}>
          <Image 
            source={{
              uri:hinhanhsanpham+item,
            }}
            style={{width:70,height:70, marginHorizontal:5, borderRadius:5}}
            />
          </TouchableOpacity>
            
          
          </View>
            )}
           
       
      </View>
    </View>
    )
  };
  module.exports = {AnhSanPham,XemAnh};
  


