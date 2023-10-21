import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AminQuanLy from '../components/amin/quanlydonhang/aminQuanLy';
import AddSanPham from '../components/amin/nhapsanpham/addSanPham';

import CuaHang from '../components/amin/cuahang/cuahang';
import AminHome from '../components/amin/canhanAmin/aminHome';


const Tab = createBottomTabNavigator();
 const TabAmin = ()=> {
  return (
        <Tab.Navigator initialRouteName="Đơn hàng"
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Thêm') {
              return (
                <Ionicons
                name="add-circle-outline"
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Đơn hàng') {
              return (
                <Ionicons
                  name="mail-outline"
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'Cá nhân') {
              return (
                <Ionicons
                name="person-outline"
                  size={size}
                  color={color}
                />
              );
            }else if (route.name === 'Cửa hàng') {
              return (
                <Ionicons
                name="logo-amplify"
                  size={size}
                  color={color}
                />
              );
            }
            
          },
          tabBarActiveTintColor: "#008000",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              "display": "flex"
            },
            null
          ]
        
        })
      }
        
        >
          <Tab.Screen  name="Đơn hàng" options={{headerShown: false}} component={AminQuanLy} />
          <Tab.Screen  name="Thêm" options={{headerShown: false}} component={AddSanPham} />
          <Tab.Screen  name="Cửa hàng" options={{headerShown: false}} component={CuaHang} />
          <Tab.Screen  name="Cá nhân" options={{headerShown: false}} component={AminHome} />
          
         
          
          
        </Tab.Navigator>
     );
}
export default TabAmin;