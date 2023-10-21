import { Link } from 'expo-router';
import React from 'react';
import {Text, View,Modal,TouchableOpacity,Linking} from 'react-native';

const ModalThongBao =({ten,thongbao, modalVisible, dieukhien, hanhdong,})=>{
  
  return(
  <View> 
<Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
    >
     <View style ={{flex:1,backgroundColor: 'rgba(52, 52, 52, 0.8)',justifyContent: 'center',alignItems:'center'}}>
      <View style={{ backgroundColor:'#FFFFFF', alignItems:'center', borderRadius:5, marginHorizontal:40}}>
      <Text style={{marginTop:20, fontSize:18, color:'red' }}> {ten} </Text>
      <View style={{flexDirection:'row'}}>
        <View style={{marginHorizontal:10,marginTop:5,height:1,flex:1,backgroundColor:'#B5B5B5',}}/>
      </View>
      <View style={{marginHorizontal:10,marginTop:20,flexDirection: 'row',}}>
        <Text style={{alignItems: 'center',fontSize:13}}>{thongbao} </Text>
      </View> 
     
      <TouchableOpacity onPress={dieukhien}>
        <View style={{marginVertical:15, height:30, backgroundColor:'#D3D3D3', justifyContent:'center', borderRadius:5}}>
          <Text style={{marginHorizontal:10,}}>{hanhdong}</Text>
        </View>
      </TouchableOpacity>
   
      </View>
    </View>
  </Modal>
 </View> 
)};

const ModalThongBaoDH =({ten,thongbao, modalVisible, dieukhien, hanhdong,})=>{
  
  return(
  <View> 
<Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
    >
     <View style ={{flex:1,backgroundColor: 'rgba(52, 52, 52, 0.8)',justifyContent: 'center',alignItems:'center'}}>
      <View style={{ backgroundColor:'#FFFFFF', alignItems:'center', borderRadius:5, marginHorizontal:40}}>
      <Text style={{marginTop:20, fontSize:18, color:'red' }}> {ten} </Text>
      <View style={{flexDirection:'row'}}>
        <View style={{marginHorizontal:10,marginTop:5,height:1,flex:1,backgroundColor:'#B5B5B5',}}/>
      </View>
      <View style={{marginHorizontal:10,marginTop:20,flexDirection: 'row',}}>
        <Text style={{alignItems: 'center',fontSize:13}}>{thongbao} </Text>
      </View> 
     
      <Link href={""} onPress={dieukhien}>
        <View style={{marginVertical:15, height:30, backgroundColor:'#D3D3D3', justifyContent:'center', borderRadius:5}}>
          <Text style={{marginHorizontal:10,}}>{hanhdong}</Text>
        </View>
      </Link>
   
      </View>
    </View>
  </Modal>
 </View> 
)};

const ModalThongBao2Chon =({ten,thongbao, modalVisible, dieukhien1,dieukhien2, hanhdong1,hanhdong2})=>{
  
  return(
  <View> 
<Modal animationType="fade"
        transparent={true}
        visible={modalVisible}
    >
     <View style ={{flex:1,backgroundColor: 'rgba(52, 52, 52, 0.8)',justifyContent: 'center',alignItems:'center'}}>
      <View style={{ backgroundColor:'#FFFFFF', alignItems:'center', borderRadius:5, marginHorizontal:40}}>
      <Text style={{marginTop:20, fontSize:18, color:'red' }}> {ten} </Text>
      <View style={{flexDirection:'row'}}>
      <View style={{marginHorizontal:10,marginTop:5,height:1,flex:1,backgroundColor:'#B5B5B5',}}/>
      </View>
      <View style={{marginHorizontal:10,marginTop:20,flexDirection: 'row',}}>
        <Text style={{alignItems: 'center',fontSize:13, fontFamily: 'OpenSans-Regular'}}>{thongbao} </Text>
      </View> 
      <View style={{flexDirection:'row'}}>
     <View style={{flexDirection:'row', justifyContent:'space-between',flex:1, marginHorizontal:50}}>
      <TouchableOpacity onPress={dieukhien1}>
        <View style={{marginVertical:15, height:30, backgroundColor:'#D3D3D3', justifyContent:'center', borderRadius:5}}>
          <Text style={{marginHorizontal:10,}}>{hanhdong1}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={dieukhien2}>
        <View style={{marginVertical:15, height:30, backgroundColor:'#D3D3D3', justifyContent:'center', borderRadius:5}}>
          <Text style={{marginHorizontal:10,}}>{hanhdong2}</Text>
        </View>
      </TouchableOpacity>
   </View>
   </View>
      </View>
    </View>
  </Modal>
 </View> 
)};
module.exports = {ModalThongBao,ModalThongBao2Chon,ModalThongBaoDH};