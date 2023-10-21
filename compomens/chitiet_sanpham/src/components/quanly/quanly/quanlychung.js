import React, {Component,useEffect,useState} from 'react';
import { Text, View,Image, StyleSheet,TouchableOpacity} from 'react-native';
import { useSelector,useDispatch} from 'react-redux';

import HeaderB from '../../header/headerB';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
import styles from '../stylesQuanLy';
import TieudeHome from '../../home/tieudeHome';



export default QuanLyChung =({navigation,route})=>{
  const {tenTK,sdtTK} = route.params;

  const {quanly1,quanly2,quanly3}=styles;
 
  const infoAdd = useSelector(state => state.cart.SoDienThoai);
          return (
          <View style={{ backgroundColor:"#FFFFFF"}}>
          <HeaderB navigation={navigation}/>
            <TieudeHome props = {'Tài khoản của '+tenTK}/>
          <View style={{ marginTop:30}}>
           <TouchableOpacity  onPress={() => navigation.navigate("DonHangQL", {xacnhan: 'flase',tentinhtrang: 'Đơn hàng '})}>
            <View style = {quanly1}>
              <View style={quanly2}>
                <Icon name="pause-circle" size={30} color="#FFFFFF" />
                <Text style={quanly3}> Đơn hàng chờ xử lý</Text>
               </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate("DonHangDat", {xacnhan: 'true',tentinhtrang:'Đơn hàng đã xác nhận '})}>
            <View style = {quanly1}>
              <View style={quanly2}>
               <Icon name="check-circle" size={30} color="#FFFFFF" />
                <Text style={quanly3}> Đơn hàng đã xác nhận</Text>
               </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity  onPress={() => navigation.navigate("DonHangDat", {xacnhan: 'yes',tentinhtrang:'Đơn hàng đã mua '})}>
            <View style = {quanly1}>
              <View style={quanly2}>
                <Icon name="truck" size={30} color="#FFFFFF" />
                <Text style={quanly3}> Đơn đã giao</Text>
               </View>
            </View>
            </TouchableOpacity>

             <TouchableOpacity  onPress={() => navigation.navigate("DonHangDat", {xacnhan: 'no'})}>
            <View style = {quanly1}>
              <View style={quanly2}>
               <Icon name="angle-double-right" size={30} color="#FFFFFF" />
                <Text style={quanly3}> Thông báo đơn hàng</Text>
               </View>
            </View>
            </TouchableOpacity>
            </View>
       
      </View>

      
      );
};