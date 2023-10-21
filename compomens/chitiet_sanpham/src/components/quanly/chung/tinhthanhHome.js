import React, {Component,useState,useEffect} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Text, View,
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
import DinhVi from '../../dungchung/dinhvi'

export default TinhThanhHome =({navigation,naviga})=>{
const { abita_chung}=diachiDaTa;
const MaTinh = useSelector(state => state.cart.MaTinh);
const TenTinh = useSelector(state => state.cart.TenTinh);
const Wifi = useSelector(state => state.cart.Wifi);

 const [isLoading, setLoading] = useState(true);
 const [data, setData] = useState(null);
 const [dataTinhThanh, setDataTinhThanh] = useState([]);
  const [currentIndex,setcurrentIndex]=useState(null);
  const [chuyenQuyCach,setChuyenQuyCach]=useState(0);

  const dispatch = useDispatch()
  const addTinhThanh = (item) =>{
          const addtinhthanh = {
                      MaTinh:item.MATINH,
                      TenTinh:item.TENTINH,
                      ThongTin:item.THONGTIN,
                    };
          const actiontinhthanh = ADD_TINHTHANH(addtinhthanh);
          dispatch(actiontinhthanh);
        };

  useEffect(() => {
    if(Wifi){
    fetch(abita_chung+'TinhThanh.php')
      .then((response) => response.json())
      .then((json) => {setDataTinhThanh(json),setInDex(json)})
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
const scrollToIndex =()=>{MaTinh==''?() => chuyenQuyCach.scrollToIndex({animation:true,index:currentIndex}):null}
getItemLayout =(data,index)=>{
  return {length:42, offset:42*index-84, index}
}

  const search = (text) => {
    const filteredData = dataTinhThanh.filter(function (item) {
      return item.TENTINH.includes(text);
    });
  
    setData(filteredData);
  };

  const Item =(item)=> {
    const backgroundColor = item.MATINH === MaTinh ? "#F5A9F2" : '#FFF';
    return(
   
      <TouchableOpacity  onPress={() => {addTinhThanh(item),naviga()}}//naviga==1?navigation.navigate("Home"): navigation.goBack()
        style={[styles.viewflatlis,{backgroundColor:backgroundColor}]}> 
          <Text style={styles.text}>➢ {'   '+item.TENTINH}</Text>
          
       
      </TouchableOpacity>
  )};

  const tatca=()=>{
    return(
          <TouchableOpacity  onPress={() => {navigation.navigate('ThongBaoDichVu')}}
             style={[styles.viewflatlis]}> 
          <Text style={styles.text}>➢ {'   '} Chọn tỉnh khác</Text>
          </TouchableOpacity>
          )
        };

return (
	<View style ={{width:width}} >
    <AnhNen 
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
       <SafeAreaView style ={{alignItems:'center',}}>
          <View style={{marginLeft:50, marginTop:20, width:'100%'}}>
            <Image style ={{height:50,width:100}} source={require('../../icon/logo.png')}/>
            <Text style ={{marginLeft:60,marginTop:10,fontSize:20,fontWeight:'700',fontStyle: 'italic',color:'#FFF'}}> Siêu thị tại nhà</Text>
          </View> 
     <View style={{flexDirection:'row',alignItems:'center'}}>
     <View>
      <Text>nhân</Text>
      <DinhVi/>
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
                          width:'90%',
                          height:'100%',
                          borderTopLeftRadius:20,
                          borderTopRightRadius:20,
                          alignItems:'center'}}
                          onLayout={scrollToIndex()}
                          >
                <FlatList 
                style={{marginTop:20,}}
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