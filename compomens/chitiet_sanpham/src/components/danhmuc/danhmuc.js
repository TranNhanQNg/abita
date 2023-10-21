import React, { useEffect, useState,useLayoutEffect,useRef } from 'react';
import { SafeAreaView, Text, View, Image,TouchableOpacity,ScrollView,
  Animated,InteractionManager,Dimensions,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector} from 'react-redux';
import HeaderB from '../header/headerB';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import DanhMucCon from './danhmuccon';
import {fadeInCT} from '../dungchung/anima';
import {AnhNen} from '../dungchung/anhnen';
import {Activity} from '../dungchung/activityIndicator';
import {MD5,fechDaTa_Axios} from '../dungchung/fech_data';


export default DanhmucHome = ({navigation,}) => {
  const Wifi = useSelector(state => state.cart.Wifi);
  const MaTinh = useSelector(state => state.cart.MaTinh);
  const {hinhanh,abita_chung,hinhanhdanhmuc} = diachiDaTa;  
  const [idDanhMuc, setIdDanhMuc] = useState('DM_00');
  const [tenDanhMuc, settenDanhMuc] = useState('Danh mục');
  const [data, setData] = useState([]);
  const [dataDanhMuc2, setDataDanhMuc2] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [chuyenImage,setChuyenImage]=useState(0);
  const [mau,setmau] =useState(null)
  const [loadRende, setLoadRende] = useState(true);
//animated
useEffect(() => {
  if(!isloading){
    setTimeout(() =>{fadeInCT(fadeAnim),setLoadRende(false)},200)
}
},[isloading]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    var api_fech = abita_chung+'DanhMuc.php?MaTinh='+MaTinh
    var set_then =(res)=>{setData(res.data)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{null}
    var data_fech = JSON.stringify({KiemTra:MD5.home})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
  }, [Wifi]);
  useEffect(() => {
    var api_fech = abita_chung+'DanhMucCap2.php?DanhMuc='+idDanhMuc
    var set_then =(res)=>{setDataDanhMuc2(res.data)}
    var set_catch =()=>{console.log(error)}
    var set_finally =()=>{setLoading(false)}
    var data_fech = JSON.stringify({KiemTra:MD5.home,idDanhMuc:idDanhMuc})
    fechDaTa_Axios(api_fech,set_then,set_catch,set_finally,data_fech)
      },[idDanhMuc,Wifi]);
const newData = data.filter(e=> {return( e.IDDANHMUC !== 'DM_00')});
const chuyendanhmuc=(index)=>{
  chuyenImage.scrollTo({ x: 0, y: width*index*0.25, animated: true })
};
const onpress_DanhMuc =({index,item})=>{
      setLoadRende(true),
      setLoading(true),
      setIdDanhMuc(item.IDDANHMUC),
      setmau(index),
      setDataDanhMuc2([])
}
  return (        
    <SafeAreaView>
      <AnhNen 
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
      <HeaderB navigation ={navigation} />
      <View style={{backgroundColor:'#FFF',marginHorizontal:2,height:'100%'}}>
      <Animated.View style={{flexDirection:'row',opacity:fadeAnim}}>
        <View>
        <View style={{backgroundColor:idDanhMuc=='DM_00'?'#FFF0F5':'#66CDAA'}}>
                <TouchableOpacity  onPress={() => {setIdDanhMuc('DM_00'),settenDanhMuc("Danh mục")}}>
                  <View style={styles.viewDanhMuc}  >
                    <View style={styles.viewImage}>
                      <Image source={{uri:hinhanhdanhmuc +'menu1.png'}} style={styles.aoimage} />
                    </View>
                    <Text style={[styles.aotext,{marginTop:5}]}> Danh mục </Text>
                  </View>
                </TouchableOpacity>
                <View style={{height:1, backgroundColor:'#EBEDEF'}}/>
         </View>
          <ScrollView showsVerticalScrollIndicator={false}
                style={styles.scrolview1}
                ref={(ref)=>setChuyenImage(ref)}
                  scrollEventThrottle={16}
        
          >
            <View>
            {newData.map((item,index)=>
              <View style={[styles.viewTong, {backgroundColor:idDanhMuc==item.IDDANHMUC?'#FFF0F5':'#FFFFFF'}]} key ={item.IDDANHMUC}>
                <TouchableOpacity  onPress={() => {idDanhMuc!==item.IDDANHMUC?onpress_DanhMuc({item,index}):null,settenDanhMuc(item.TENDANHMUC)}}>
                  <View style={styles.viewDanhMuc}  >
                    <View style={styles.viewImage}>
                      <Image source={{uri:hinhanhdanhmuc+item.TENHINHANH}} style={styles.aoimage} />
                    </View>
                    <Text style={[styles.aotext,{marginTop:5,color:mau==index?'#50C7C7':'#000'}]}> {item.TENDANHMUC} </Text>
                  </View>
                </TouchableOpacity>
                <View style={{height:1, backgroundColor:'#EBEDEF'}}/>
              </View>
              )}
              </View>
              <View style={{height:200}}/>
          </ScrollView> 
        </View>
        <View>
        <View style={{backgroundColor:'#FFF0F5', borderRadius:4,justifyContent:'center' }}>
              <TouchableOpacity 
                onPress={idDanhMuc=="DM_00"?null:() => navigation.navigate("DanhMucCap2",{
                                                                  idDanhMuc:idDanhMuc,
                                                                  tendanhmuc:tenDanhMuc,
                                                                  })
                        }>
                <View style={{alignItems:'center', flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,}}>
                  <Text style={{fontSize:15,color:'#20B2AA',fontWeight:'bold',marginVertical:10}}>{tenDanhMuc}</Text>
                  <Icon name="arrow-right" size={20} color="blue" />
                </View>
              </TouchableOpacity>
             
            </View>
          <ScrollView 
                    style={ styles.scrolview2}
                    showsVerticalScrollIndicator={false}
          >
            
            {!isloading? 
            
            idDanhMuc=="DM_00"?
            <View style={{flexWrap:'wrap',flexDirection:'row',marginHorizontal:'2%',backgroundColor:'#FFF',borderRadius:5}}>
              {newData.map((item,index)=>
               
                <TouchableOpacity key ={item.IDDANHMUC}
                style={{width:'30%',marginHorizontal:4,alignItems:'center', marginVertical:10}}
                onPress={()=>{setIdDanhMuc(item.IDDANHMUC),settenDanhMuc(item.TENDANHMUC),chuyendanhmuc(index),setmau(index)}}>
                    
                      <Image source={{uri:hinhanhdanhmuc+item.TENHINHANH}} 
                      style={{resizeMode:"contain",
                                borderRadius: 8,
                                marginTop: 5,
                                width:'80%',height:50,marginBottom:10}} 
                                />
                   
                    <Text style={{ fontSize: 12,
                                  textAlign: 'center',
                                  color:mau==index?'#50C7C7':'#696969',
                                  }}>
                        {item.TENDANHMUC}
                    </Text>
                </TouchableOpacity>
               
              )}
            </View>
            :
            dataDanhMuc2.map(item=>
              <View key = {item.IDDANHMUCCAP2}
                style={{backgroundColor:'#FFFFFF',marginTop:5, marginHorizontal:5, borderRadius:4 }}>
                    <DanhMucCon navigation={navigation} 
                    idDanhMuc={item.IDDANHMUCCAP2} 
                    tenhinhanh={item.TENHINHANH} 
                    tendanhmuc={item.TENDANHMUCCAP2}/>
              </View>
            ): loadRende? 
                  <Activity/>
                  :null
            }
           

            <View style={{height:100}}/>
          </ScrollView>
          </View>
      </Animated.View>
      </View>
    </SafeAreaView>   
  );
}

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrolview1:{
   width:width*0.23,
  },
  scrolview2:{
    flex:1,
   width:width*0.76,
   backgroundColor:'#FFF0F5'
  },
viewTong:{
   flex:1,
  justifyContent: 'center',
  alignItems: 'center',
  },
viewDanhMuc:{
    margin: 10,
   alignItems:'center',  
 }, 
 
viewImage:{
   width: width*0.13, 
   height: width*0.13,
 },
 aoimage:{
  flex:1,
  resizeMode:"contain",
  borderRadius: 8,
  marginTop: 5,
},

aotext:{
   textAlign: 'center',
   fontSize:12,
   fontFamily: 'OpenSans-Medium'
   },
   viewtieude:{
    height:30,
    alignItems:'center',
    borderBottomWidth:0.5,
    borderColor:'#C0C0C0',
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:5
    },
});