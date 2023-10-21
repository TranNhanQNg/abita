
import React,{useState,useRef} from 'react';
import { Text, View,ActivityIndicator,FlatList,Image, SafeAreaView,TouchableOpacity,Animated,useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import diachiDaTa from '../diachiDaTa/diachiDaTa';
import {naviga} from '../components/dungchung/naviga';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import {REMOVE_TO_HISTORY,REMOVE_ADD_HISTORY} from '../redux/cartAction';

const{ abita_sanpham,hinhanhsanpham}=diachiDaTa;

export default function DrawerDaXem () {

  const w = useWindowDimensions().width;
  const h = useWindowDimensions().height;
  const navigation = useNavigation();
  const Wifi = useSelector(state => state.cart.Wifi);
  const dataHistory = useSelector(state => state.cart.dataHistory);
  const [morong,setMoRong] =useState(false)

  const dispatch = useDispatch();
  const removeToHistory = (item) =>{
    const action = REMOVE_TO_HISTORY(item);
    dispatch(action);
  };
  const delelToHistory = () =>{
    const newhobby = [];
    const action = REMOVE_ADD_HISTORY(newhobby);
    dispatch(action);
  };

  const heghtMoRong = useRef(new Animated.Value(0)).current;

  const animatedDong =()=>{
    Animated.timing(
      heghtMoRong,
      {
        toValue:w,
        duration: 600,
        useNativeDriver:false, 
      }
    ).start(()=>{setMoRong(!morong)});
  };
  const animatedMoRong =()=>{
    
    Animated.timing(
      heghtMoRong,
      {
        toValue: 0,
        duration: 300,
        useNativeDriver:false,
      }
    ).start(()=>setMoRong(false));
  };
  const onpressMoRong =()=>{morong==false?setMoRong(true):null,morong==false?animatedDong():animatedMoRong()}

     return (
      dataHistory.length==0?null:
       <Animated.View style={{height:'100%',
                    // transform: [{ scale:1}],
                    width:heghtMoRong,
                     position:'absolute',
                     bottom:0,
                     alignItems:'center',
                     flexDirection:'row'}}>
             
           
            
            <SafeAreaView style={{
                     alignItems:'center',
                     bottom:0,
                     backgroundColor:'#EE82EE',
                    }}>

                    <Text numberOfLines ={1} style={{height:30, textAlign:'center', marginTop:30, color:'#FFF'}}> Sản phẩm đã xem </Text>
                    <FlatList
                    
                      data={dataHistory}
                      renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {naviga(item,navigation),onpressMoRong()}}
                                    style={{width:150,
                                        alignItems:'center',
                                        marginVertical:2,
                                        backgroundColor:'#FFF',
                                        marginHorizontal:5,
                                        borderRadius:5
                                      }}
                             >
                              <Image source={{uri:hinhanhsanpham + item.TENHINHANH}} 
                                      style={{width:100,height:100, resizeMode: "contain",marginVertical:5}}/>
                              <View style={{width:145,height:50,marginHorizontal:8}}>
                                <Text numberOfLines ={2} style={{fontSize:13}}>{item.TENSANPHAM}</Text>
                                <Text style={{fontSize:13, color:'red'}}>{item.GIABANSP}</Text>
                              </View>
                              <TouchableOpacity onPress={()=>removeToHistory(item)}
                                    style={{position:'absolute',right:0}}>
                                  <Ionicons name="close-outline" size={18} color="red"/>
                              </TouchableOpacity>
                            </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item.IDCHITIETSP}
                      initialNumToRender={5}
                      showsVerticalScrollIndicator={false}
                      />
                
               <TouchableOpacity onPress={()=>{onpressMoRong(),delelToHistory()}}
               style={{height:30}}> 
               <Text>Xoá tất cả</Text>
               </TouchableOpacity>   
            </SafeAreaView>
            <TouchableOpacity style={{flex:1,
                                      justifyContent:'center',
                                      height:'100%',
                                    }}
                      onPress={()=>onpressMoRong()}>
              {morong?
                 <View 
                          style={{height:40,
                              width:30,
                              
                              alignItems:'center',
                              backgroundColor:'rgba(176,176,176,0.5)',
                              justifyContent:'center',
                              borderBottomRightRadius:100,
                              borderTopRightRadius:100
                            }}        
                    >
                      <Icon name="arrow-left" size={18} color="blue"/>
                  </View>:null}
                
            </TouchableOpacity>
            {!morong?
            <TouchableOpacity onPress={()=>onpressMoRong()}
                          style={{height:40,
                              width:30,
                              right:0,
                              alignItems:'center',
                              backgroundColor:'rgba(176,176,176,0.5)',
                              justifyContent:'center',
                              borderBottomRightRadius:100,
                              borderTopRightRadius:100
                            }}        
                    >
                      <Icon name="list" size={18} color="blue"/>
                  </TouchableOpacity>:null}
           
       </Animated.View>
     
    );
  }