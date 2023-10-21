import React, {useState,useEffect} from 'react';
import {Text, View,StyleSheet,SafeAreaView,FlatList,TouchableOpacity,TextInput,ActivityIndicator,} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector,useDispatch} from 'react-redux';

import diachiDaTa from '../../diachiDaTa/diachiDaTa';
const {abita_chung}=diachiDaTa;

const ModalThon =({setSonha,onPressThon,sonha})=>{
  
  const [thongbao, setThongBao]= useState(null);
return(
  <SafeAreaView style={{flex:1, alignItems:'center',backgroundColor:'#FFF'}}>
 
 <Text style={{marginTop:80, fontSize:20, color:'#1E90FF'}}>Số nhà, thôn, xóm</Text>
  <View style ={{height:100,width:'90%',borderWidth:1,borderColor:'#DAA520',marginTop:10,borderRadius:8}}>
  
  <TextInput style ={{flex:1,backgroundColor:'#FFF',margin:8}} 
      multiline={true}
      placeholderTextColor={'#909090'}
      returnKeyType ='done'
      autoFocus = {true}
      scrollEnabled = {false}
      onChangeText={text => setSonha(text)}
      />
    </View>
      <TouchableOpacity onPress={()=>sonha.length<5?setThongBao('Nhập rõ số nhà, thôn, xóm'):onPressThon()}
      style={{borderWidth:1,marginTop:70,borderRadius:8, backgroundColor:'#87CEFA'}}>
        <Text style={{margin:10,color:'#FFFFE0'}}>Tiếp tục</Text>
      </TouchableOpacity>
      <Text style={{color:'red', marginTop:50}}>{thongbao}</Text>
  </SafeAreaView>
)

}
const MoDalHuyen =({matinh, onPress})=>{
    const [dataQH, setDataQH]= useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      fetch(abita_chung+'QuanHuyen.php?MaTinh='+matinh)
        .then((response) => response.json())
        .then((json) => setDataQH(json))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    },[matinh]);
    return(
      <SafeAreaView style ={styles.safeAreaView}>
       <View style={styles.view}>
       {isLoading? <ActivityIndicator/> :
          <FlatList 
            data={dataQH}
            renderItem={({ item }) => (
            <TouchableOpacity  onPress={() =>{onPress(item)}}
                  style={styles.texmodalQH}
            >
              <Text style={styles.text}>➢</Text>
              <Text> {item.TENHUYEN}</Text>
            </TouchableOpacity>  
            )}
            keyExtractor={( item ) => item.MAHUYEN}
          /> 
          } 
        </View>
      </SafeAreaView> 
    )
};
    
const MoDalXa =({MaHuyen,onPress})=>{
 
  const [dataX, setDataX]= useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(abita_chung+'XaPhuong.php?MaHuyen='+MaHuyen)
      .then((response) => response.json())
      .then((json) => {setDataX(json)})
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  },[MaHuyen]);

    return(
      <SafeAreaView style ={styles.safeAreaView}>
      <View style={styles.view}>
      {isLoading? <ActivityIndicator/> :
        <FlatList 
          data={dataX}
          renderItem={({ item }) => (
          <TouchableOpacity  onPress={() =>{onPress(item)}}
                style={styles.texmodalQH}
          >
            <Text style={styles.text}>➢</Text>
            <Text> {item.TENXA}</Text>
          </TouchableOpacity>  
          )}
          keyExtractor={( item ) => item.MAXA}
          
        /> 
        }
      </View>
    </SafeAreaView> 
    )
  };

  const MoDalTinh =({onPress,close})=>{
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const TenTinh = useSelector(state => state.cart.TenTinh);
    const [dataTinhThanh,setDataTinhThanh]=useState([]);
    const [data,setData]=useState(null);
    const [isLoading, setLoading] = useState(true);
    const [currentIndex,setcurrentIndex]=useState(null);
  const [chuyenQuyCach,setChuyenQuyCach]=useState(0);
    
    useEffect(() => {
      fetch(abita_chung+'DiaChiTinhThanh.php')
        .then((response) => response.json())
        .then((json) => {setDataTinhThanh(json),setInDex(json)})
        .catch((error) => console.log(error))
       .finally(() => setLoading(false));
    },[]);
   
    const scrollToIndex =()=>{chuyenQuyCach.scrollToIndex({animation:true,index:currentIndex})}
    const setInDex=(json)=>{
      const index = json.findIndex((element, index) => {
        if (element.MATINH ==MaTinh) {
        return true
        
        }
      })
        setcurrentIndex(index)
    }

    getItemLayout =(data,index)=>{
      return {length:42, offset:42*index-280, index}
    }
    

    const search = (text) => {
      const filteredData = dataTinhThanh.filter(function (item) {
        return item.TENTINH.includes(text);
      });
    
      setData(filteredData);
    };
    const renderItem =(item,index)=>{
      if(item.MATINH===MaTinh){setcurrentIndex(index)}
      return(<TouchableOpacity  onPress={() =>{onPress(item)}}
                    style={[styles.texmodalQH,{backgroundColor:item.MATINH==MaTinh?'#DDA0DD':'#FFF'}]}
              >
                <Text style={styles.text}>➢</Text>
                <Text> {item.TENTINH}</Text>
              </TouchableOpacity> 
        )
    }
    return(
      <SafeAreaView style ={styles.safeAreaView}>
      <TouchableOpacity onPress={()=>close(false)}>
        <Text style={{fontSize:25, marginHorizontal:30, color:'red'}}>🆇</Text>
      </TouchableOpacity>
        <View style={styles.viewTextInput}>
          <View style={styles.viewTextInput1}>
         
          <TextInput style ={styles.textInput}
        placeholder = {TenTinh}
        onChangeText={text => search(text)}
        autoCapitalize = 'words'
        />
         <SimpleLineIcons name="magnifier" size={25} style={{marginHorizontal:20}} color="#FFF" />
          </View>
         
        </View>
        {isLoading? <ActivityIndicator/> :
        <View style={styles.view}
        onLayout={scrollToIndex}
        >
          <FlatList 
            data={data==null?dataTinhThanh:data}
            renderItem={({item,index})=>renderItem(item,index)}
            keyExtractor={( item ) => item.MATINH}
            horizontal={false}
            scrollEventThrottle={16}
          ref={(ref)=>setChuyenQuyCach(ref)}
          getItemLayout={getItemLayout}
          />  
        </View>}
      </SafeAreaView> 
    )
};
  module.exports ={MoDalHuyen,MoDalXa,MoDalTinh,ModalThon}
const styles= StyleSheet.create({
safeAreaView:{
  flex:1,
  backgroundColor: 'rgba(192,192,192, 1)',
  
},
view:{
  flex:1,
  marginVertical:30,
},
  texmodalQH:{
    flex:1,
    height:40,
    alignItems:'center',
     marginHorizontal:60,
     borderRadius:5,
     borderWidth:0.5,
     margin:1,
   backgroundColor:'#FFFFFF',
   flexDirection:'row',
   borderWidth:1,
  borderColor:'#66CDAA'

   },
   text:{
     marginLeft:20,
    color:'blue',
    fontSize:16
  },
  textInput:{
    width:150,
    height:40,
    marginLeft:20

  },
  viewTextInput1:{
    borderRadius:50,
    backgroundColor:'rgba(0,128,128, 0.8)',
    flexDirection:'row',
    alignItems:'center'
  },
  viewTextInput:{
    alignItems:'center',
    marginTop:20
  }

 
})