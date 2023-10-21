import React, {useState,useEffect,useMemo} from 'react';
import {Text, View,Keyboard,SafeAreaView,FlatList,Platform,TouchableOpacity,StyleSheet,Dimensions,TextInput} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch,useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import {RenderItemTimKiem} from '../sanpham/renderSanPham';
import {Activity} from '../dungchung/activityIndicator';
import LinearGradient from 'react-native-linear-gradient';
import DanhMucListFooter from '../sanpham/danhmucListFooter';
import {ADD_TIMKIEM} from '../../redux/cartAction'



export default Seach =({navigation})=>{
  const MaTinh = useSelector(state => state.cart.MaTinh); 
  const TimKiem = useSelector(state => state.cart.TimKiem); 
  const Wifi = useSelector(state => state.cart.Wifi); 
  const {abita_sanpham,hinhanh} = diachiDaTa;
	const [value, onChangeText] = useState('');
  const [giatri, setGiaTri] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [trang, setTrang]= useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [soluongdata,setSoLuongDaTa] =useState(0);
  const [soluongdatacuoi,setSoLuongDaTaCuoi] =useState(0);
  const [activityCT,setActivityCT]= useState(true);
  const [timkiem,setTimKiem]= useState(true);
  const {textInput,} =styles;

const api = abita_sanpham+'TimKiem.php?MaTinh='+MaTinh+'&TimKiem='+value+'&trang='+trang

const dispatch = useDispatch()
  const addTimKiem = () =>{
   
          const actiontimkiem = ADD_TIMKIEM(value);
          dispatch(actiontimkiem);
        };

  useEffect(() => {
    if(Wifi&&value&&data.length==0){
        fechDaTa()
          }
        fechDaTa1
    }, [trang,refreshing]);

    const fechDaTa=()=>{
        fetch(api)
        .then((response) => response.json())
        .then((json) => {setData(json),setSoLuongDaTa(json.length),setLoading(false),setGiaTri(value)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false),setLoading(false)});
      }
      const fechDaTa1=()=>{
        fetch(api)
        .then((response) => response.json())
        .then((json) => {setData1(json),setSoLuongDaTaCuoi(json.length),setLoading(false)})
        .catch((error) => console.error(error))
        .finally(() => {setActivityCT(false)});
      }

const xoaTexinput =()=>{if(value!==""){
  return(
    <TouchableOpacity onPress={()=>{Api_Muc()}}
    style={{ justifyContent: 'center',marginRight:5}}>
     <Ionicons name="close-outline" size={25} color="red" />
    </TouchableOpacity>
    )
}};

  const cuoiban =useMemo(() =>{
    return(
      <View >
     
      <DanhMucListFooter
        activityCT={activityCT}
        soluongdata={soluongdatacuoi}/>
        <View style={{height:50}}/>
      </View>
      
      )
  },[activityCT,soluongdatacuoi]);

const RenderItem=({item})=>{
  return(
   
     <RenderItemTimKiem item={item} navigation={navigation}/>
  
  )
}
const Api_Muc =()=> {
    setTrang(1),
    setActivityCT(true)
    setData([]),
    setData1([]),
    onChangeText(""),
    setGiaTri(null),
    setSoLuongDaTa(0),
    value?setTimKiem(true):null
    };
const onEndReached=()=>{
    if(!activityCT&&soluongdatacuoi!==0&&Wifi){
      setData(data.concat(data1))
      setTrang(trang+1)
      setActivityCT(true)
      }
    };
const seachSanPham = ()=>{
  return(
  
 <View style ={{flex:1, backgroundColor:'#FFF',}}>
 {timkiem?TimKiem.slice(0, 12).reverse().map(e=>
      <TouchableOpacity key={e}
      onPress={()=>{e?onChangeText(e)&search()&Keyboard.dismiss():null}}
      style={{flexDirection:'row',alignItems:'center',marginHorizontal:8}}
      >
      <SimpleLineIcons name="clock" size={15} color="#000" />
      <Text style={{flex:1,marginHorizontal:8,marginVertical:10}}>{e}</Text>
      <SimpleLineIcons name="note" size={15} color="#000" />
      </TouchableOpacity>
      ):isLoading? <Activity/> : (
    <FlatList style={{flex:1}}
      data={data}
      renderItem={RenderItem}
      horizontal={false}
     keyExtractor={(item) =>item.IDCHITIETSP}
     onEndReachedThreshold={0.5}
     onEndReached={onEndReached}
     ListFooterComponent={cuoiban}
     showsVerticalScrollIndicator={false}
     bounces = {false}
    />
  )} 
  

</View>)
};
const search =()=>{
      setTrang(1),
      setLoading(true),
      setRefreshing(!refreshing),
      setData([]),
      setData1([]),
      addTimKiem(),
      setTimKiem(false)
}
	return(
<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#51BDBD','#107373',]} style={{flex:1}}>
	<SafeAreaView style={{height:'100%'}}>
     <View style={{height:50,flexDirection:'row',alignItems:'center',marginTop:Platform.OS==='ios'?0:40}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:50,alignItems:'center'}}>
        <SimpleLineIcons name="arrow-left" size={25} color="#FFFFFF" />
        </TouchableOpacity>
    <View style={{flex:1,flexDirection: 'row',backgroundColor:'#FFFFFF', borderColor:'#02AEEf',borderRadius: 5,borderWidth:1,marginRight: 20,alignItems:'center'}}>
      <TextInput 
      autoFocus = {timkiem}
      returnKeyType ='search'
      onPressIn={()=>setTimKiem(true)}
      onSubmitEditing ={()=>{value?search()&Keyboard.dismiss():null}}
          style={textInput}
              onChangeText={text => {onChangeText(text)}}//,listViewRef.scrollToIndex({animated: true, index:0})
      value={value}
  
      />

    {xoaTexinput()}

    </View>
      <TouchableOpacity onPress={()=>{value?search()&Keyboard.dismiss():null}}>
        <SimpleLineIcons name="magnifier" size={23} style={{marginRight:15}} color="#FFFFFF" />
      </TouchableOpacity>
      </View>
      <View style={{flex:1,backgroundColor:'#FFF'}}>
      {
        seachSanPham()
     }
      
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
    backgroundColor:'#FFF',
    borderRadius: 3,
    marginRight:20,
    height: 40,
  }, 
      boxicon:{
  height: 35,
  width: 35,
  
    
  } 
  
})


