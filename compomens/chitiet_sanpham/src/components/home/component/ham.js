import axios from 'axios';
import React, {useEffect, useState,useRef } from 'react';
import {useSelector} from 'react-redux';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';
const {abita_amin,abita_chung} = diachiDaTa; 

export const Lay_ViTri =(position,lay_tinhthanh,lay_diachi,setModalVisible)=>{
   setModalVisible(true)
   const [data,setdata]= useState('')
const latitude=position.coords.latitude;
const longitude=position.coords.longitude;
axios.post(abita_amin+'DinhVi_TinhThanh.php',
       {latitude:latitude,longitude:longitude}
   ,{headers:{"Content-Type" : "application/json"}}
)  .then((res) =>{console.log(res.data)})
   .catch((error) => {console.log(error),lay_diachi()})
   .finally(() =>{setModalVisible(false)})
   
const timdiachi=(res)=>{
            if(res.data.kq){
               lay_tinhthanh(json=res.data.kq)
               }else
               {
                  lay_diachi()
               }
            }
      }
export const fechDangNhap =({ToKen,MaTinh,abita_amin})=>{
   const time_hientai = new Date().getTime()
   const newdata =JSON.stringify({
         MaUid:null,
         DienThoai_KhachHang:null,
         Ngay:Math.round(time_hientai),
         ToKen:ToKen,
         KiemTra_XoaTaiKhoan:Math.round(time_hientai),
         ThoiGian_XoaTaiKhoan:Math.round(time_hientai+3*12*30*24*60*60*1000),
         TinhTrang:null
        });
   axios.post(abita_amin+'DangNhap_KhachHang.php?MaTinh='+MaTinh,
       newdata
   ,{headers:{"Content-Type" : "application/json"}}
)  .then((res) =>{console.log('Nhân'+res.data.kq)})
   .catch((error) => {console.log(error)})
}