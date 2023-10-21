import React, { useEffect,useState} from 'react';
import { View, Image,Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image'
import diachiDaTa from '../../diachiDaTa/diachiDaTa';

const {hinhanh}=diachiDaTa;
const {height,width} = Dimensions.get('window');
  const AnhNen =({api})=>{
    const [mau,setmau]=useState(0);
    useEffect(() => {
      setmau(Math.floor(Math.random() * 100)%5)//Math.floor(Math.random() * 100)%5
      },[]);

   
    const backgroundColor= mau==0?'rgba(0,175,175,0.8)'
                          :mau==1?'rgba(189,193,9,0.5)'
                          :mau==2?'rgba(80,199,199,0.7)'
                          :mau==3?'rgba(0, 195, 255,0.8)'
                          :mau==4?'rgba(80,199,199,0.8)':'rgba(0,175,175,0.8)'

    const anh = mau==0?{uri:hinhanh+'AnhNen/nenhome.jpg'}
                :mau==1?{uri:hinhanh+'AnhNen/nendanhmuc.jpg'}
                :mau==2?{uri:hinhanh+'AnhNen/anhnen3.jpeg'}
                :mau==3?{uri:hinhanh+'AnhNen/anhnen1.png'}
                :mau==4?{uri:hinhanh+'AnhNen/anhnen2.png'}:{uri:hinhanh+'AnhNen/nenhome.jpg'}

    return(
    <View style={{ position:'absolute',height:'100%',width:'100%'}}>
       
       <Image style ={{flex:1,resizeMode:'cover'}} source={anh}/>
        <View style={{height:'100%',width:'100%',backgroundColor:backgroundColor,position:'absolute'}}/>
        
    </View>
    )
 }
 const AnhNen1 =({api})=>{
  const [mau,setmau]=useState(0);
    useEffect(() => {
      setmau(Math.floor(Math.random() * 100)%5)
      },[]);
  const backgroundColor= mau==0?'rgba(0,175,175,0.8)'
  :mau==1?'rgba(0,175,175,1)':null
  return(
  <View style={{ position:'absolute'}}>
     
      <FastImage
                          style ={{height:height,width:width}}
                          source={{
                              uri:api,
                              priority: FastImage.priority.normal,
                            
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                      />
      <View style={{height:'100%',width:'100%',backgroundColor:backgroundColor,position:'absolute'}}/>
      
  </View>
  )
}
module.exports = {AnhNen,AnhNen1}