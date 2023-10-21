import React, {useState,} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  SafeAreaView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  launchImageLibrary
} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
const {width,height} = Dimensions.get('window');

const AnhSanPham =({dataImage,
                    setDaTaImage,
                    index,
                    mauSP,
                    tendataImage,
                    setTenDaTaImage,
                    setDaTaVND,
                    dataVND,
                  })=>{
    const [uri, seturi] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const s = new Date().getSeconds()
    const tenanhsanpham = JSON.stringify(date)+JSON.stringify(month)+JSON.stringify(year)+JSON.stringify(hours)+JSON.stringify(min)+JSON.stringify(s)+Math.floor(Math.random() * 100);
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
    const chonanh =()=>{
      setModalVisible(false)
      const tenanh = tenanhsanpham+index+'.'+uri.name.split('.')[1];
            setDaTaImage([...dataImage,{TenMau:mauSP,TenAnh:tenanh, anh:uri.anh,uri:uri.uri}]);
            setTenDaTaImage([...tendataImage,{TenMau:mauSP,TenAnh:tenanh}]);
            setAnhMau(tenanh);

    };
    const catanh=()=>{
    ImagePicker.openCropper ( { 
      path :uri.uri,
      width: 300,
      height: 300,
      quality: 0.5,
      includeBase64: true,
    } ) . then ( image  =>  {
      setModalVisible(true);
      seturi({uri:image.path,
        anh:image.data,
        name:uri.name,
      })
      
    } ).catch(() => {setModalVisible(true)}) };

    const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
     
    };
   
    launchImageLibrary(options, response => {
      
      if (response.didCancel) {
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
      } else if (response.assets[0].fileSize >5000000) {
        Alert.alert(
            "Ảnh không được lớn hơn 1 MB",
            [
                { text: "OK", onPress: () => console.log('ok Pressed') }
            ],
            { cancelable: false }
        )
      }else{
        console.log(response.assets[0].type)
        console.log(response.assets[0].uri)
        console.log(response.assets[0].fileName)
        setModalVisible(true);
        seturi({uri:response.assets[0].uri,
                anh:response.assets[0].base64,
              name:response.assets[0].fileName})
      }
          });
    };
	return(
    <View >
      <TouchableOpacity 
        style={{flexDirection: "row",
            margin:5,
            alignItems:'center'}} 
        onPress={()=>chooseFile()}>
        <Icon name="image" size={20} color={mauSP=='no'?'blue':mauSP} />
        <Text style={{marginHorizontal:5,color:'blue'}}> 
        Add ảnh
        </Text>
      </TouchableOpacity>
      <Modal
          animationType='none'
          transparent={true}
          visible={modalVisible}
      >
        <SafeAreaView style={{flex:1, backgroundColor:'rgba(0, 0, 0, 0.3)'}}>
          <View style={{ backgroundColor:'#FFFFFF'}}>
          <View style={{width:width,minHeight:width,maxHeight:height}}>
            <Image 
              source={{uri:uri.uri}}
              style={{resizeMode:"contain",flex: 1}}
              />
          </View>
          <View style={{flexDirection:'row', backgroundColor:'#D3D3D3', justifyContent:'space-between',alignItems:'center'}}>
          <TouchableOpacity onPress={()=>{setModalVisible(false)}}> 
          <Icon name="close-outline" size={30} color="red" style={{margin:10}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{chonanh()}}> 
              <Text style={{margin:10,color:'#006400'}}> <Icon name="checkmark-outline" size={25} color="#006400"/> Chọn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{catanh()}}> 
              <Text style={{margin:10,color:'red'}}><Icon name="pencil-outline" size={20} color="red"/> Sửa</Text>
            </TouchableOpacity>
          </View>
    
         
          </View>
            </SafeAreaView>
    </Modal>
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
            <Icon name="close-circle-outline" size={12} color="red" style={{margin:3}}/>
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
  


