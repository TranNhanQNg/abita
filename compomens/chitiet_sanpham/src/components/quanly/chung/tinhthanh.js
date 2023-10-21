import React, {Component,useState,useEffect} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {  Text,    
          View,
          SafeAreaView,
          StyleSheet,
          FlatList,
          TouchableOpacity,
          ActivityIndicator,
          Image,
          Dimensions,
          TextInput
        } 
        from 'react-native';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import {useDispatch,useSelector} from 'react-redux';
import {ADD_TINHTHANH} from '../../../redux/cartAction';
import {AnhNen} from '../../dungchung/anhnen';
import {Lay_ViTri} from '../../home/component/ham'
import {MD5,fechDaTa_Axios} from '../../dungchung/fech_data'

export default TinhThanh =({navigation})=>{
const { abita_chung,abita_amin}=diachiDaTa;
const MaTinh = useSelector(state => state.cart.MaTinh);
const TenTinh = useSelector(state => state.cart.TenTinh);
const refechMaTinh = useSelector(state => state.cart.refechMaTinh)
const Wifi = useSelector(state => state.cart.Wifi);




 const [isLoading, setLoading] = useState(true);
 const [data, setData] = useState(null);
 const [dataTinhThanh, setDataTinhThanh] = useState([]);
 const ToKen = useSelector(state => state.cart.ToKen);
  const [currentIndex,setcurrentIndex]=useState(null);
  const [chuyenQuyCach,setChuyenQuyCach]=useState(0);
  const time_hientai = new Date().getTime()
  const [dinhvi_ip, setDinhVi_Ip]=useState(false);

  const fetchDinhVi_Ip =()=>{
    fetch("https://ipinfo.io/json")
    .then((response) => response.json())
    .then((json) => setDinhVi_Ip(json))
    };
  const MaUid=time_hientai+Math.random().toString(36).substr(2,3).toUpperCase()
  const fechDangNhap =(item)=>{
    const newdata ={
          KiemTra:MD5.home,
          MaUid: MaUid,
          DienThoai_KhachHang:null,
          Ngay:Math.round(time_hientai),
          ToKen:ToKen,
          KiemTra_XoaTaiKhoan:Math.round(time_hientai),
          ThoiGian_XoaTaiKhoan:Math.round(time_hientai+3*12*30*24*60*60*1000),
          TinhTrang:null
         };
          var api_fech = abita_amin+'DangNhap_KhachHang.php?MaTinh='+item.MATINH
          var set_then =(res)=>{console.log(res.data.kq)}
          var set_catch =()=>{console.log(error)}
          var set_finally =()=>{null}
          var data_fech = JSON.stringify(newdata)
     fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
}
  const dispatch = useDispatch()
  const addTinhThanh = (item) =>{
          const addtinhthanh = {
                      MaTinh:item.MATINH,
                      TenTinh:item.TENTINH,
                      ThongTin:item.THONGTIN,
                      refechMaTinh:!refechMaTinh
                    };
          const actiontinhthanh = ADD_TINHTHANH(addtinhthanh);
          dispatch(actiontinhthanh);
        };
//abita_chung+'TinhThanh.php'
  useEffect(() => {
    fetchDinhVi_Ip()
    if(Wifi){
    fetch(abita_chung+'TinhThanh.php')
      .then((response) => response.json())
      .then((json) => {setDataTinhThanh(json),layInDex(json)})
      .catch((error) => {console.error(error)})
      .finally(() => setLoading(false));
      }
  },[Wifi]);
  const setInDex=(json)=>{
  const index = json.findIndex((element, index) => {
    if (element.MATINH ==MaTinh) {
    return true
    
    }
  })
    setcurrentIndex(index)
}
const setInDexIp=(json)=>{
          const index = json.findIndex((element, index) => {
            if (element.TENTINH ==dinhvi_ip.city||element.TENTINH ==dinhvi_ip.region) {
            return true
            
            }
          })
            setcurrentIndex(index)
        }

const layInDex =(json)=>{
        MaTinh?setInDex(json):setInDexIp(json)
      }

const scrollToIndex =()=>{chuyenQuyCach.scrollToIndex({animation:true,index:currentIndex})}


getItemLayout =(data,index)=>{
        return {length:41, offset:41*index-41*5, index}
      }

 

  const search = (text) => {
          const filteredData = dataTinhThanh.filter(function (item) {
            return item.TENTINH.includes(text);
          });
        
          setData(filteredData);
        };

  const Item =(item)=> {
          const backgroundColor = item.MATINH === MaTinh ||item.TENTINH===dinhvi_ip.city||item.TENTINH===dinhvi_ip.region? "#F5A9F2" : '#FFF';
          return(
        
            <TouchableOpacity  onPress={() => {addTinhThanh(item),fechDangNhap(item),navigation.navigate('Home')}}//naviga==1?navigation.navigate("Home"): navigation.goBack()
                   style={[styles.viewflatlis,{backgroundColor:backgroundColor}]}> 
                <Text style={styles.text}>➢ {'   '+item.TENTINH}</Text>
            </TouchableOpacity>
  )};

  const tatca=()=>{
    return(
      <View>
          <TouchableOpacity  onPress={() => {navigation.navigate('ThongBaoDichVu')}}
             style={[styles.viewflatlis]}> 
          <Text style={styles.text}>➢ {'   '} Chọn tỉnh khác</Text>
          </TouchableOpacity>
          <View style={{height:30}}/>
          </View>
          )
        };
  const onpress=()=>{
    Lay_ViTri(position,lay_tinhthanh,chuyen_BaNe)
  }
  const lay_tinhthanh = (diachi) => {
    fetch(abita_chung+'TimTinh.php?TenTinh='+diachi)
      .then((response) => response.json())
      .then((json) => {json.kq=='false'?chuyen_BaNe():(addTinhThanh(json))})
      .catch(function (error) {
        console.log(error),chuyen_BaNe() ;
      })
    };
return (
	<View style ={{flex:1}} >
    <AnhNen 
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
       <SafeAreaView style ={{alignItems:'center',flex:1}}>
          <View style={{marginLeft:50, marginTop:20, width:'100%'}}>
            <Image style ={{height:50,width:100}} source={require('../../icon/logo.png')}/>
          </View> 
     
     
          <View style={{flexDirection:'row',alignItems:'center'}}>
     <View>
     {/* <DinhVi mau1={"#228B22"} mau2={"#20B2AA"} size={20} icon ={"map-marker-radius"}/> */}
     </View>
        <View style={styles.viewTextInput}>
          <TextInput style ={styles.textInput}
            placeholder = {TenTinh}
            onChangeText={text => search(text)}
            autoCapitalize = 'words'
            
            />
         <SimpleLineIcons name="magnifier" size={20} style={{marginHorizontal:20}} color="#000" />
          </View>
      </View>   
         
      
          
          {isLoading==true? <ActivityIndicator/> : (
            <View style={{backgroundColor:'#FFF',
                          flex:1,
                          width:width,
                          borderTopLeftRadius:20,
                          borderTopRightRadius:20,
                          alignItems:'center'}}
                          onLayout={currentIndex>0?scrollToIndex:null}
                          >
                <FlatList 
                style={{marginTop:20,flex:1}}
            data={data==null?dataTinhThanh:data}
            renderItem={({ item }) => (
            Item(item)
          )}
              keyExtractor={(item) => item.MATINH}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={tatca()}
              getItemLayout={getItemLayout}
              ref={(ref)=>setChuyenQuyCach(ref)}
            />
            </View>
            )}
        
      </SafeAreaView>
      <View style={{width,height:50,backgroundColor:'#FFF'}}> 
      </View>
  </View> 
)
};

const {width,height} = Dimensions.get('window');
const w = width*0.7;
const styles =StyleSheet.create({
      viewflatlis:{
        width:w,
        height:40,
        justifyContent:'center',
        marginTop: 1,
        borderWidth: 1,
        borderColor:'#4c4c4c',
        borderRadius: 20,
      },
        text:{
          fontSize:14,
          color:'#4c4c4c',
          marginLeft:20
        },
       
       textInput:{
         flex:1,
         marginLeft:20,
         height:40,
         fontSize:14,
         
         
       },
       viewTextInput:{
          width:w,
          height:40,
         alignItems:'center',
         marginVertical:10,
         flexDirection:'row',
         backgroundColor:'rgba(255,255,255,0.5)',
         borderRadius: 8,
       }
})