import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  launchImageLibrary
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const AnhSanPham =({dataImage,
                    setDaTaImage,
                    index,
                    mauSP,
                    tendataImage,
                    setTenDaTaImage,
                    setDaTaVND,
                    dataVND,
                  })=>{
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const s = new Date().getSeconds()
    const tenanhsanpham = JSON.stringify(date)+JSON.stringify(month)+JSON.stringify(year)+JSON.stringify(hours)+JSON.stringify(min)+JSON.stringify(s)+Math.floor(Math.random() * 100);
  const chooseFile1 = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
      includeBase64: true,
      cropping:true
    };
    const setAnhMau =(tenanh)=>{
      if(dataVND.length!==0){
      const newtendataImage = [...tendataImage,{TenMau:mauSP,TenAnh:tenanh}];
      //const newdataImageAnh = newtendataImage.filter(e=>  e.TenMau == mauSP);
      const newdataImageAnh =[];
      for (var i = 0; i < newtendataImage.length; i++){
        if(newtendataImage[i].TenMau==mauSP){
          newdataImageAnh.push(newtendataImage[i].TenAnh)}};

      const newdatamau =dataVND.map(e=>{
        if(e.TenMau==mauSP){
          return{...e,TenAnh:newdataImageAnh}
        }
          return{...e} 
      })
      setDaTaVND(newdatamau);
    }}
    
    launchImageLibrary(options, (response) => {
      
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
            const tenanh = tenanhsanpham+index+'.'+response.assets[0].fileName.split('.')[1];
            setDaTaImage([...dataImage,{TenMau:mauSP,TenAnh:tenanh, anh:response.assets[0].base64,uri:response.assets[0].uri}]);
            setTenDaTaImage([...tendataImage,{TenMau:mauSP,TenAnh:tenanh}]);
            setAnhMau(tenanh);
      }
          });
    };
    const setAnhMau =(tenanh)=>{
          if(dataVND.length!==0){
          const newtendataImage = [...tendataImage,{TenMau:mauSP,TenAnh:tenanh}];
          const newdataImageAnh =[];
          for (var i = 0; i < newtendataImage.length; i++){
            if(newtendataImage[i].TenMau==mauSP){
              newdataImageAnh.push(newtendataImage[i].TenAnh)}};

          const newdatamau =dataVND.map(e=>{
            if(e.TenMau==mauSP){
              return{...e,TenAnh:newdataImageAnh}
            }
              return{...e} 
          })
          setDaTaVND(newdatamau);
    }}
    const chooseFile = () => {
     
      ImagePicker . openCropper ( { 
        path : "file:///storage/emulated/0/Android/data/com.abitashopee/files/Pictures/2ab90db8-461f-4cb6-9bc0-df252ca27296.jpg", 
        width : 300 , 
        height : 400 
      } ).then(image => {
      console.log(image);
      const tenanh = tenanhsanpham+index+'.'+image.path.split('.')[1];
      setDaTaImage([...dataImage,{TenMau:mauSP,TenAnh:tenanh, anh:image.data,uri:image.path}]);
      setTenDaTaImage([...tendataImage,{TenMau:mauSP,TenAnh:tenanh}]);
      setAnhMau(tenanh);
    }).catch((err) => {console.log(err)})};
	return(
    <View >
      <TouchableOpacity 
        style={{flexDirection: "row",
            margin:5,
            alignItems:'center'}} 
        onPress={()=>chooseFile('photo')}>
        <Icon name="image" size={20} color={mauSP==false?'blue':mauSP} />
        <Text style={{marginHorizontal:5,color:'blue'}}> 
        Add ảnh
        </Text>
      </TouchableOpacity>
    </View>
		)
	};
  const XemAnh =({dataImage,
                  setDaTaImage,
                  mauSP,
                  tendataImage,
                  setTenDaTaImage,
                  setDaTaVND,
                  dataVND,
                })=>{
    const xoaImage =(item)=>{
        const newdataImage = dataImage.filter(e=>  e.TenAnh !== item.TenAnh);
        const newtendataImage1 = tendataImage.filter(e=>  e.TenAnh !== item.TenAnh);
        const newtendataImage = newtendataImage1.filter(e=> e.TenMau==mauSP);
        setDaTaImage(newdataImage);
        setTenDaTaImage(newtendataImage1);
        const newdatamau = dataVND.map(e=>{
            if(e.TenMau==mauSP){
              return{...e,TenAnh:newtendataImage}
            }
            return{...e} 
          });
          setDaTaVND(newdatamau);
        };
    const dataImageMau =dataImage.filter(e=>  e.TenMau == mauSP)

  return(
    <View >
      <View style={{flexDirection: 'row',flexWrap:'wrap', margin:5}}>
          {dataImageMau.map((item,index) =>
          <View key={index}>
            <TouchableOpacity style={{flexDirection: "row-reverse"}} 
            onPress={()=>{xoaImage(item)}}>
            <Icon name="times-circle" size={12} color="red" style={{margin:3}}/>
            </TouchableOpacity>
            <Image 
            source={{
              uri:item.uri,
            }}
            style={{width:70,height:70, marginHorizontal:5, borderRadius:5}}
            />
            
          </View>
            )}
      </View>
    </View>
    )
  };
  module.exports = {AnhSanPham,XemAnh};
  


