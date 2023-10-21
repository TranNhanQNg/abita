import React, { useState,useRef,useEffect,useLayoutEffect } from 'react';
import { Text, View, Animated,Image,TouchableOpacity,Dimensions,StyleSheet,ActivityIndicator} from 'react-native';

import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import fadeIn from '../../../dungchung/anima';

export default function DanhMucCon ({navigation, idDanhMuc,setModalVisible,setDanhMuc}) {
  const {hinhanh,abita_chung} = diachiDaTa;  
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
    //animated
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {fadeIn(fadeAnim)},[idDanhMuc]);
  useLayoutEffect(() => {
    fetch(abita_chung+'DanhMucCap3.php?IdDanhMucCap2='+idDanhMuc)
      .then((response) => response.json())
      .then((json) => {setData(json),setLoading(idDanhMuc)})
      .catch((error) => console.error(error))
    },[idDanhMuc]);
  return (
      <Animated.View style={{flexDirection: 'row',flexWrap:'wrap',opacity:fadeAnim}}>
          {isLoading!==idDanhMuc?
          <ActivityIndicator size="large" color="#00ff00" />:
          data.map(item=>
            <TouchableOpacity key = {item.IDDANHMUCCAP3} 
                onPress={() =>{setModalVisible(false), setDanhMuc(item)}}
            >
              <View style={styles.view}>
                <View style={styles.viewImage}>
                  <Image source={{uri:hinhanh +'LoaiDanhMuc/'+item.TENHINHANH}}  style={styles.image}/>
                </View>
                <Text numberOfLines ={2} style={styles.aotext}>{item.TENDANHMUCCAP3}</Text>
              </View>
            </TouchableOpacity>
          )}
      </Animated.View>
    );
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  view:{
      width:width*0.75*0.32,
      justifyContent: 'space-between',
    },
  viewImage:{
    width: width*0.25, 
    height: width*0.25,

  },
  image:{
    flex:1,
    resizeMode:"contain",
    borderRadius: 8,
    margin: 10,
    
  },
  aotext:{
    fontSize: 13,
    textAlign: 'center',
    },
});