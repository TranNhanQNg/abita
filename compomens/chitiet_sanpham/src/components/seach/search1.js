import React, {Component,useState,useEffect,useLayoutEffect} from 'react';
import {Text, View, Image,SafeAreaView,FlatList,Platform,TouchableOpacity,StyleSheet,Dimensions,TextInput} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { getDistance } from 'geolib';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import TinhThanhHome from '../home/tinhthanhHome';
import {Activity} from '../dungchung/activityIndicator';
// import styles from './stylesSearch';
import {naviga} from '../dungchung/naviga';
import DinhVi from '../dungchung/dinhvi';
import Sao from '../sanpham/chitietsanpham/sao';


export default Seach =({navigation})=>{
  const ViTri = useSelector(state => state.cart.DinhVi);
  const MaTinh = useSelector(state => state.cart.MaTinh); 
  const Wifi = useSelector(state => state.cart.Wifi); 
  const {abita_sanpham,hinhanhsanpham} = diachiDaTa;
	const [value, onChangeText] = useState('');
  const [giatri, setGiaTri] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [trang, setTrang]= useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [giathap,setgiathap]=useState(false);
  
  const refeht =()=>{setGiaTri(null),onChangeText(null),setData([]),setRefreshing(!refreshing),navigation.goBack(),setLoading(true)}

  const {viewSearch,textInput,boxicon,aoflatlist,aoimage,viewImage,aotext,viewTinhTong } =styles;

  const getkhoancach =(item)=>
    getDistance(
    { latitude:ViTri.coords.latitude, longitude:ViTri.coords.longitude},
    { latitude:item.LATITUDE/10000000, longitude:item.LONGTITUDE/10000000}
    )
const latitude = ViTri==""?null:ViTri.coords.latitude;
const longitude =ViTri==""?null:ViTri.coords.longitude;
const api = ViTri!==""&&giathap?abita_sanpham+'TimKiemKhoanCachSanPham.php?MaTinh='+MaTinh+'&TimKiem='+giatri+'&trang='+trang+'&latitude='+latitude+'&longtitude='+longitude
:abita_sanpham+'TimKiem.php?MaTinh='+MaTinh+'&TimKiem='+giatri+'&trang='+trang

const datafetch ={
  TimKiem:giatri,
  trang:trang,
  latitude:latitude,
  longtitude:longitude
}
  useEffect(() => {
    if(Wifi){
        fetch(api)
        .then((response) => response.json())
          .then((json) => {setData(data.concat(json)), console.log(json)})
          .catch((error) => console.error(error))
          .finally(() => {setLoading(false)});
          }
    }, [giatri,trang,giathap,refreshing]);

    
const time_hientai = new Date().getTime()/1000


const xoaTexinput =()=>{if(value!==""){
  return(
    <TouchableOpacity onPress={()=>{onChangeText(""), setData([]), setGiaTri(null)}}
    style={{ justifyContent: 'center',marginRight:5}}>
     <Ionicons name="close-outline" size={25} color="red" />
    </TouchableOpacity>
    )
}};
const renderItem =({item})=>{
        return(
          <View style ={{ backgroundColor:'#FFFFFF', marginHorizontal:5, marginTop:5,borderRadius:5}}>
          <TouchableOpacity onPress={() => naviga(item,navigation)}>
          <View style = {{flexDirection:'row',marginVertical:5}}>
             <View style={viewImage}>
              <Image source={{uri:hinhanhsanpham+item.ANHDAIDIEN}} style={aoimage} />
             </View>
             <View style={{ flex:1,
                                  width:w/2-10,
                                  marginLeft:5,
                                  marginVertical:5
                                  }}>
                    <Text numberOfLines ={2} style={aotext}>{item.TENSANPHAM}</Text>
                    <Text style={aotext}>{item.QUYCACHSP} {!item.MAUSACSP||item.MAUSACSP==''||item.MAUSACSP==null?null:', màu: '+item.MAUSACSP}</Text>
                    <Sao idquycach={item.IDQUYCACH}
                          MaTinh={MaTinh}
                          dienthoaincc={item.DIENTHOAINCC}
                          />

                      {item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?
                          <View>
                          {JSON.parse(item.HINHTHUC_KHUYENMAI).loai_km==1?
                        <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{color:'red',fontSize:16}}>
                            {(item.GIABANSP-item.GIABANSP*item.GIAKHUYENMAI/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                            <View style={{backgroundColor:'red', marginLeft:5,borderRadius:3}}>
                              <Text style={{color:'#FFF', marginHorizontal:3,fontWeight:'bold'}}>-{item.GIAKHUYENMAI}</Text>
                            </View>
                        </View>:
                        <View style={{flexDirection:'row',alignItems:'flex-start'}}>
                            <Text style={{color:'red',fontSize:16}}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </Text>
                           
                            <View style={{flexDirection:'row', marginLeft:5,transform: [{skewX: "160deg"}]}}>
                              <Text style={{color:'#FFF',fontSize:13,textAlign:'center',fontWeight:'bold',backgroundColor:'rgba(0, 83, 171,0.7)'}}> mua {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_mua} tặng {JSON.parse(item.HINHTHUC_KHUYENMAI).soluong_tang+'  '} </Text>
                            </View>
                        </View>}
                        <View style={{alignItems:'center',flexDirection:'row',marginHorizontal:5,marginVertical:2,transform: [{ skewX: "160deg"},]}}>
                              <Text>{'Kết thúc: ' }</Text>
                              <Text style={{color:'#FFF',backgroundColor:'#FF33CC',fontSize:11}}> {gio+':'+phut} </Text>
                              <Text style={{color:'#FFF',backgroundColor:'#50C7C7',fontSize:11}}> {ngay}/{thang} </Text>
                          </View>
                        </View>
                        :
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'red',fontSize:16}}>
                            {item.GIABANSP.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                        </Text>
                        
                        </View>}
               
                  </View>
            </View>
           </TouchableOpacity>
           </View> 
        )
}
const seachSanPham = ()=>{
  return(
  
 <View style ={{flex:1, backgroundColor:'#F2F2F2',}}>
  {isLoading? <Activity/> : (
    <FlatList style={{flex:1}}
      data={ViTri==""&&giathap?[]:data}
      renderItem={renderItem}
      horizontal={false}
     keyExtractor={(item) =>item.IDCHITIETSP}
     onEndReachedThreshold={data.length>5?0.1:-1}
     onEndReached={()=>{setTrang(trang+1)}}
    //  ref={(ref) => {setListViewRef(ref);}}
    
    />
  )}

</View>)
};



const location =()=>{
  return(
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
       <DinhVi mau1={"#228B22"} mau2={"#20B2AA"} size={120} icon ={"map-marker-radius"}/>
      <Text style={{color:'blue'}}> click</Text>
      <View style={{flexDirection:'row',marginVertical:30,alignItems:'center'}}>
      <Text style={{color:'#FFFF00'}}>✩</Text>
      <Text style={{color:'#3CB371'}}> Bật định vị để tìm sản phẩm gần bạn nhất </Text>
      <Text style={{color:'#FFFF00'}}>✩</Text>
      </View>
  </View>
  )
  
}
const mauSeach =()=>{
  return(
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      <Icon name="map-marker-radius" size={50} color="#00CED1" /> 
      <Text style={{color:'blue'}}> click</Text>
      <View style={{flexDirection:'row',marginVertical:30,alignItems:'center'}}>
      <Text style={{color:'#FFFF00'}}>✩</Text>
      <Text style={{color:'#3CB371'}}> Abita xin kính chào quý khách </Text>
      <Text style={{color:'#FFFF00'}}>✩</Text>
      </View>
  </View>
  )
  
}

	return(
<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#51BDBD','#107373',]} style={{flex:1}}>
	<SafeAreaView style={{flex:1}}>
     <View style={{flexDirection:'row',alignItems:'center',marginTop:Platform.OS==='ios'?0:40}}>
        <TouchableOpacity onPress={()=>refeht()} style={{width:50,alignItems:'center'}}>
        <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
        </TouchableOpacity>
    <View style={{flex:1,flexDirection: 'row',backgroundColor:'#FFFFFF', borderColor:'#02AEEf',borderRadius: 5,borderWidth:1,marginRight: 20,alignItems:'center'}}>
      <TextInput 
      autoFocus = {true}
      returnKeyType ='search'
      onSubmitEditing ={()=>{setGiaTri(value), setLoading(true),setRefreshing(!refreshing)}}
          style={textInput}
              onChangeText={text => {onChangeText(text),setTrang(1),setData([])}}//,listViewRef.scrollToIndex({animated: true, index:0})
      value={value}
  
      />

    {xoaTexinput()}

    </View>
      <TouchableOpacity onPress={()=>{setGiaTri(value), setLoading(true),setRefreshing(!refreshing),setData([])}}>
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
         
          <View style={{flexDirection:'row',flex:1,justifyContent:'space-evenly'}}>
            <TouchableOpacity onPress={giathap?()=>{setgiathap(false),setData([]),setLoading(true)}:()=>null}>
              <Text style={{color:!giathap?'#FFF':'#000'}}> <Icon name="filter-menu-outline" size={20}  />Tất cả</Text>
            </TouchableOpacity>
            
            <DinhVi mau1={giathap==true?"#FFF":"#000"}
                    mau2={giathap==true?"#FFF":"#000"}
                    size={20}
                    icon ={"map-marker-radius"}
                    ten={'Gần nhất'}
                    onpress={!giathap?()=>{setgiathap(true),setData([]),setLoading(true)}:()=>null}
                    onpress1={ViTri==""?()=>setgiathap(false):()=>null}
            />
            
          </View>
         
      </View>
      </View>



      <View style={{flex:1,backgroundColor:'#FFF'}}>
        {(ViTri==""&!value)?location():(value)?seachSanPham():mauSeach()}
      </View>
       
  </SafeAreaView>
  </LinearGradient>
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
   fontSize: 13,
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


