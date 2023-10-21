import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import QuanLyChung from '../components/quanly/quanly/quanlychung';
import DonHangQL from '../components/quanly/quanly/donhangQL';
import XemDonHangQL from '../components/quanly/quanly/xemdonhangQL';


const options={
  headerShown: false,
  animation:'fade'
};
const Stack = createNativeStackNavigator();

 const QuanLy = ()=> {
  return (

   
        <Stack.Navigator >
          
          <Stack.Screen options={options} name="QuanLyChung" component={QuanLyChung} />
          <Stack.Screen options={options} name="DonHangQL" component={DonHangQL} /> 
          <Stack.Screen options={options} name="XemDonHangQL" component={XemDonHangQL} />
         
            
        </Stack.Navigator>
     );
}
export default QuanLy;