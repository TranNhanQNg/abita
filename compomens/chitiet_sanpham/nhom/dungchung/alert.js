import React, {Component} from 'react';
import {Alert} from 'react-native';

export default thongbaoAlert = ({props})=>{

Alert.alert(
      "THÔNG BÁO",
      {props},
      [
        {
          text: "QUAY LẠI",
          onPress: () => console.log("Cancel Pressed"),
          style: "QUAY LẠI"
        }
      ],)};