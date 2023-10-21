import React, {Component,useState,useEffect,useLayoutEffect} from 'react';
import {Text, View, Image,SafeAreaView,FlatList,ActivityIndicator,TouchableOpacity,StyleSheet,Dimensions,TextInput} from 'react-native';
import { useSelector } from 'react-redux';
import { getDistance } from 'geolib';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {Activity} from '../../dungchung/activityIndicator';
// import styles from './stylesSearch';
import {naviga} from '../../dungchung/naviga';

export default TimDonHang =({navigation})=>{
  const ViTri = useSelector(state => state.cart.DinhVi);
  const MaTinh = useSelector(state => state.cart.MaTinh); 
  const Wifi = useSelector(state => state.cart.Wifi); 
  const {abita_sanpham,hinhanhsanpham,hinhanhicon} = diachiDaTa;
	const [value, onChangeText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [dieukhien, setdieukhien] = useState(false);
  const [data, setData] = useState([]);

  const {viewSearch,textInput,boxicon,aoflatlist,aoimage,viewImage,aotext,viewTinhTong } =styles;


  const timdonhang = () => {
    if(Wifi){
        setLoading(true)
        fetch(abita_sanpham+'TimDonHang.php?MaTinh='+MaTinh+'&SoDonHang='+value+'&XacNhan=true&TenXacNhan=XacNhanNCC')
        .then((response) => response.json())
          .then((json) => {setData(json)})
          .catch((error) => console.error(error))
          .finally(() => {setLoading(false),setdieukhien(true)});
          }
    }

const xoaTexinput =()=>{if(value!==''){
  return(
    <TouchableOpacity onPress={()=>{onChangeText(null), setData([]), setLoading(false),setdieukhien(false)}}
    style={{ justifyContent: 'center',marginRight:5}}>
   <Text style={{color:'red',fontSize:16}}>✗</Text> 
    </TouchableOpacity>
    )
}};

const listHeader = ()=>{
    return(
      <View style={{margin:8, backgroundColor:'#9ACD32', borderRadius:5 }}>
    <View style={{margin:10}}>
    <Text style={{color:'#FFFFFF'}}><Icon name="account" size={15} color="blue" /> {data[0].HOTENKH} <Icon name="phone" size={15} color="blue" /> {data[0].SODIENTHOAIKH}</Text>
    <Text style={{color:'#FFFFFF'}}><Icon name="map" size={15} color="blue" /> {data[0].DIACHIKH}</Text>
    <Text style={{color:'#FFFFFF'}}><Icon name="pencil" size={15} color="blue" /> {data[0].GHICHUKH}</Text>
    <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={{color:'#FFFFFF'}}><Icon name="atlassian" size={15} color="blue" />Tình trạng:</Text>
          <Text style={{color:'blue',fontSize:12}}>{data[0].XACNHANNCC=='false'?' đã đặt':data[0].XACNHANNCC=='true'?' đã giao':' đã huỷ'}</Text>
          </View>
    </View>
    </View>
    )};

const renderDonHang = ()=>{
  return(
  
 <View style ={{flex:1, backgroundColor:'#F2F2F2',}}>
  {isLoading? <Activity/> : (
      data.length==0?
      <View >
        {dieukhien?
          <View style={{alignItems:'center',marginTop:50}}>
            <Image style ={{width:50,height:50,margin:20}} source={{uri:hinhanhicon+'audit.png',}}/>
             <Text style={{color:'#50C7C7'}}>Không tìm thấy đơn hàng</Text>
          </View>:
          <View style={{alignItems:'center',marginTop:50}}>
            <Image style ={{width:50,height:50,margin:20}} source={{uri:hinhanhicon+'import.png',}}/>
            <Text style={{color:'#50C7C7'}}>Nhập mã đơn hàng</Text>
        </View>
         
        }
          
      </View>:
    <FlatList 
      data={data}
      renderItem={({ item }) => (
        <View style ={{flex:1, backgroundColor:'#FFFFFF', marginHorizontal:5, marginTop:5,borderRadius:5}}>
       <View >
       <View style = {aoflatlist}>
          <View style={viewImage}>
           <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} />
          </View>
         <View style={{marginLeft:10}}>
        
          <Text style={aotext}>{item.TENSANPHAM}{','+item.QUYCACHSP} {item.MAUSACSP=='no'?null:','+item.MAUSACSP} </Text>
          <View style={{flexDirection:'row'}}>
         
          
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text style={[aotext]}>Tình trạng:</Text>
          <Text style={{color:'blue',fontSize:12}}>{item.XACNHANNCC=='false'?' đã đặt':item.XACNHANNCC=='true'?' đã giao':' đã huỷ'}</Text>
          </View>
          <Text style={[aotext],{color:'red',fontSize:18}}>{item.GIABANSPDH.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</Text>
          <Text style={[aotext]}>Số lượng: {item.SOLUONGDH}</Text>
          <Text style={[aotext]}>Nhà cung cấp: {item.DIENTHOAINCC}</Text>
          </View>
         </View>
        </View>
        </View> 
      )}
      horizontal={false}
     keyExtractor={(item) =>item.IDDONHANG}
     ListHeaderComponent={listHeader}
   
    />
  )}

</View>)
};
	return(
	<SafeAreaView style={{flex:1,backgroundColor:'#02AEEf'}}>
     <View style={viewSearch}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:50,alignItems:'center'}}>
        <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
        </TouchableOpacity>
    <View style={{flex:1,flexDirection: 'row',backgroundColor:'#FFFFFF', borderColor:'#02AEEf',borderRadius: 5,borderWidth:1,marginRight: 20}}>
      <TextInput 
      autoFocus = {true}
      returnKeyType ='search'
      placeholder='Nhập mã đơn hàng'
      onSubmitEditing ={()=>{timdonhang(), setLoading(true)}}
          style={textInput}
              onChangeText={text => {onChangeText(text),setData([])}}//,listViewRef.scrollToIndex({animated: true, index:0})
      value={value}
  
      />

    {xoaTexinput()}

    </View>
      <TouchableOpacity onPress={()=>{timdonhang()}}>
        <SimpleLineIcons name="magnifier" size={23} style={{marginRight:15}} color="#FFFFFF" />
      </TouchableOpacity>
 
      </View>
    <View style={{backgroundColor:'#909090'}}>
      <View style={{flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    marginRight:10,
                    marginVertical:5
                    }}>
         
          
      </View>
      </View>
      <View style={{flex:1,backgroundColor:'#FFF'}}>
        {renderDonHang()}
        </View>
  </SafeAreaView>
    );
}

const {width,height} = Dimensions.get('window');




const h = height;
const w=width;

const styles = StyleSheet.create({
 
  //  giỏ hàng 
  aoflatlist:{
    padding: 5,
    flexDirection: 'row',
     marginLeft:5,
       
  },
  aoimage:{
   flex:1, 
    resizeMode:"contain",
 },
 viewImage:{
   width: w*0.25, 
   height: w*0.25,
  },
   aotext:{
   fontSize: 12,
   padding: 3,
   
   },
  viewTinhTong:{
    flexDirection: 'row',
   marginHorizontal:10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height:h*0.06,
  },
  viewSearch:{
   backgroundColor:'#02AEEf',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  
   textInput:{
   flex:1,
    marginLeft:10,
    
    backgroundColor:'#FFFFFF',
    borderRadius: 3,
    marginRight:20,
    height: 35,
  }, 
      boxicon:{
  height: 35,
  width: 35,
  
    
  } 
  
})


