
import React,{useState,useRef} from 'react';
import { Text, View,ActivityIndicator,FlatList,Image, SafeAreaView,TouchableOpacity,Animated,useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import diachiDaTa from '../../diachiDaTa/diachiDaTa';
import HeaderB from '../header/headerB';
import {RenderItemTimKiem} from './renderSanPham';
import {AnhNen} from '../dungchung/anhnen';

import { useDispatch,useSelector } from 'react-redux';
import {REMOVE_TO_HISTORY,REMOVE_ADD_HISTORY} from '../../redux/cartAction';

const{ abita_sanpham,hinhanh}=diachiDaTa;

export default function SanPhamDaXem ({navigation}) {

  const w = useWindowDimensions().width;
  const h = useWindowDimensions().height;
  const Wifi = useSelector(state => state.cart.Wifi);
  const dataHistory = useSelector(state => state.cart.dataHistory);
  const [trang,setTrang]=useState(1);

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

  const onEndReached=()=>{
      setTrang(trang+1)
      
    };

  const renderItem=({ item }) => (
    <View>
    <View style={{    
               backgroundColor:'#FFF',
               flexDirection:'row'
               }}>
       <RenderItemTimKiem item={item} navigation={navigation}/>
       <TouchableOpacity onPress={()=>removeToHistory(item)}
                                    style={{position:'absolute',right:5}}>
                                  <Ionicons name="close-outline" size={18} color="red" style={{margin:5}}/>
        </TouchableOpacity>
        
       </View>
       </View>
   );

   const listHeader = ()=>{
    return(
      <View>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,alignItems:'center',height:40}}>
        <View style={{flexDirection:'row',alignItems:'center',height:40}}>
      <Image source={{uri:hinhanh+'icon/icon/history.png'}} style={{height:25,width:25}}/>
       <Text style={{color:'#696969'}}> Sản phẩm đã xem</Text>
      </View>
        <TouchableOpacity onPress={()=>{delelToHistory()}} >
          <Text style={{color:'red',fontSize:13,textAlign:'center'}}> Xoá tất cả</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#50C7C7',height:0.5}}/>   
    </View>
    )}
  const ListFooter =()=>{
    return(
      <View style={{height:550}}/>
    )
  }
     return (
       <View>
          <AnhNen 
       backgroundColor={'#20B2AA'}
       backgroundColor1={'rgba(0,175,175,0.8)'}/>
            <SafeAreaView >
                       <HeaderB navigation={navigation}/>
                <View style={{backgroundColor:'#FFF'}}>   
                    <FlatList 
                      data={dataHistory.slice(0,trang*15)}
                      renderItem={renderItem} 
                     
                      keyExtractor={(item) => item.IDCHITIETSP}
                      ListHeaderComponent={listHeader}
                      ListFooterComponent={ListFooter}
                      onEndReached={onEndReached}
                      onEndReachedThreshold={0.5}
                      showsVerticalScrollIndicator={false}
                      />
                </View>
                <View style={{height:150}}/>
            </SafeAreaView>
            </View>
           
     
     
    );
  }