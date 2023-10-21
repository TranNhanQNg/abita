
import React,{useState,useEffect} from "react";

import { View,Text,FlatList, Image,Dimensions,Platform,Animated,ImageBackground } from "react-native";

let { width,height } = Dimensions.get("window");
const body = width<629?2:6
const cot = width<629?2:6
const mobi = width<629?"mobi":"web"
export const Heigth_Width = {
        heigth:height/body-height*0.002*cot,
        width:width/body-width*cot*0.01,
        height_tong:height,
        width_tong:width,
        cot:cot,
        mobi:mobi
      }