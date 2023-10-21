import React,{useEffect,useState} from 'react';
import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector } from 'react-redux';
import diachiDaTa from '../../diachiDaTa/diachiDaTa';

const {abita_chung}=diachiDaTa;
export default TinhThanh =({MaTinh})=>{
    const matinh = useSelector(state => state.cart.MaTinh);
    const [tentinh,settentinh]=useState(null);

    useEffect(()=>{
        if(MaTinh!==matinh){
            fechMaTinh()
        }
    },[MaTinh])
    const fechMaTinh=() => { 
        fetch(abita_chung+'FechTinh.php?MaTinh='+MaTinh)
          .then((response) => response.json())
          .then((json) => {settentinh(json[0].TENTINH)})
          .catch((error) => console.error(error))
          
          };
    return(
        matinh==MaTinh?null:
        <View>
            <Text style={{fontSize:10,fontStyle: "italic"}}><Icon name="map-marker-radius" size={10} color={'#50C7C7'} /> {tentinh}</Text>
        </View>
    )
}