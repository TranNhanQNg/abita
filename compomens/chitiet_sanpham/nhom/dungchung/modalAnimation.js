import React, {Component} from 'react';
import {View,Modal,SafeAreaView} from 'react-native';

export default ModalAnimation=({modalAnimation})=>{
  
  return(
  <View> 
<Modal animationType="none"
        transparent={true}
        visible={modalAnimation}>
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1,marginTop:50,backgroundColor:'#FFFFFF'}}></View>
    </SafeAreaView>
    </Modal>
 </View> 
)};