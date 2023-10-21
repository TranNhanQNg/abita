import React, { useEffect, useState,useLayoutEffect,useRef } from 'react';
import { ActivityIndicator, SafeAreaView, Text, View, Image,TouchableOpacity,ScrollView,
  Animated,InteractionManager,Dimensions,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import HeaderD from '../../../header/headerD';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';
import DanhMucCon from './danhmuccon';
import fadeIn from '../../../dungchung/anima';
import {dataDM} from './dataDanhMuc';

export default ChonDanhMuc = ({navigation,setModalVisible,setDanhMuc}) => {
  const {hinhanhdanhmuc,hinhanh,abita_chung} = diachiDaTa;  
  const [idDanhMuc, setIdDanhMuc] = useState('DM_01');
  const [tenDanhMuc, settenDanhMuc] = useState('Bách hoá tổng hợp');
  const [data, setData] = useState([]);
  const [dataDanhMuc2, setDataDanhMuc2] = useState([]);
  const [isloading, setLoading] = useState([]);
//animated
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {fadeIn(fadeAnim)});
  useLayoutEffect(() => {
      InteractionManager.runAfterInteractions(() => {  
      fetch(abita_chung+'DanhMuc.php')
        .then((response) => response.json())
        .then((json) => {setData(json)})
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    })}, []);
  useLayoutEffect(() => {
    fetch(abita_chung+'DanhMucCap2.php?DanhMuc='+idDanhMuc)
      .then((response) => response.json())
      .then((json) => setDataDanhMuc2(json))
      .catch((error) => console.error(error))
      },[idDanhMuc]);
const newData = data.filter(e=> {return( e.IDDANHMUC !== 'DM_00')});


  return (        
    <SafeAreaView>
      <View style={{height:30,backgroundColor:'red'}}/>
     
      <Animated.View style={{flexDirection:'row',opacity:fadeAnim}}>
        <View>
          <ScrollView showsVerticalScrollIndicator={false}
                style={styles.scrolview1}
          >
            <View>
            {newData.map(item=>
              <View style={[styles.viewTong], {backgroundColor:idDanhMuc==item.IDDANHMUC?'#FFF0F5':'#FFFFFF'}} key ={item.IDDANHMUC}>
                <TouchableOpacity  onPress={() => {setIdDanhMuc(item.IDDANHMUC),settenDanhMuc(item.TENDANHMUC)}}>
                  <View style={styles.viewDanhMuc}  >
                    <View style={styles.viewImage}>
                      <Image source={{uri:hinhanhdanhmuc+item.TENHINHANH}} style={styles.aoimage} />
                    </View>
                    <Text style={styles.aotext}> {item.TENDANHMUC} </Text>
                  </View>
                </TouchableOpacity>
                <View style={{height:1, backgroundColor:'#EBEDEF'}}/>
              </View>
              )}
              </View>
          </ScrollView> 
        </View>
        
          <ScrollView 
                    style={ styles.scrolview2}
                    showsVerticalScrollIndicator={false}
          >
            <View style={{backgroundColor:'#FFFFFF',marginTop:5, marginHorizontal:5, borderRadius:4 }}>
             
                <View style={{height:30,alignItems:'center', flexDirection:'row',justifyContent:'space-between',marginHorizontal:5}}>
                  <Text>{tenDanhMuc}</Text>
                </View>
             
            </View>
            {dataDanhMuc2.length==0? <ActivityIndicator size="large" color="#00ff00" />:
            dataDanhMuc2.map(item=>
              <View key = {item.IDDANHMUCCAP2}
                style={{backgroundColor:'#FFFFFF',marginTop:5, marginHorizontal:5, borderRadius:4 }}>
                {item.CAPDANHMUC==0?
                  <View>
                    <View style={{height:30,alignItems:'center', flexDirection:'row',justifyContent:'space-between', marginHorizontal:5}}>
                      <Text>{item.TENDANHMUCCAP2}</Text>
                     
                    </View>
                    
                      <View style={styles.viewImageC}>
                        <Image source={{uri:hinhanh +'LoaiDanhMuc/'+item.TENHINHANH}}  style={styles.aoimage}/>
                      </View>
                    
                  </View>:(
                  <View>
                    <View style={{height:30,alignItems:'center', flexDirection:'row',justifyContent:'space-between', marginHorizontal:5}}>
                      <Text>{item.TENDANHMUCCAP2}</Text>
                     
                    </View>
                    <DanhMucCon navigation={navigation} idDanhMuc={item.IDDANHMUCCAP2} setModalVisible={setModalVisible} setDanhMuc={setDanhMuc}/>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
      </Animated.View>
    </SafeAreaView>   
  );
}

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  scrolview1:{
   width:width*0.25,
   marginTop:5
  },
  scrolview2:{
   width:width*0.75,
  },
viewTong:{
   flex:1,
   flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  },
viewDanhMuc:{
    flex:1,
    margin: 10,
   alignItems:'center',  
 }, 
 
viewImage:{
   width: width*0.2, 
   height: width*0.2,
 },
viewImageC:{
   width: width*0.25, 
   height: width*0.25,
 },
aoimage:{
    flex:1,
  resizeMode:"contain",
   borderRadius: 8,
  marginTop: 5,
 },
aotext:{
   fontSize: 13,
   textAlign: 'center',
    marginTop:10
   },
});