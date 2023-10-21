import React, {Component} from 'react';
import {Text, View,StyleSheet,Modal,Button} from 'react-native';

export default ModalWifi =({navigation,tenthongbao, thongbao, modalVisible, dieukhien})=>{
  
  return(
  <View> 
<Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
    >
     <View style ={{flex:1,backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
    <Text style={{marginTop:20, fontSize:18, color:'red' }}> {tenthongbao} </Text>
    <View style={{marginTop:20,marginLeft:10,marginRight:10,flexDirection: 'row',}}>
    <Text style={{alignItems: 'center',fontSize:15}}>{thongbao} </Text>
    </View>   
    <Button
  onPress={dieukhien()}

  title="QUAY LẠI"
  color="#841584"
/> 
    </View>
  </Modal>
 </View> 
)};