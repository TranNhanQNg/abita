import React, { useState, } from 'react';
import { Text, View,TouchableOpacity, Image,ScrollView,Animated} from 'react-native';
import { useSelector} from 'react-redux';
import diachiDaTa from '../../../../diachiDaTa/diachiDaTa';

export default GoiY_HomNay=({navigation,backgroundColor})=>{
    const MaTinh = useSelector(state => state.cart.MaTinh);
    const {abita_sanpham,hinhanh,hinhanhdanhmuc}=diachiDaTa;  
const data =[
            {   id:1,
                ten:'Giảm giá trong ngày',
                icon:hinhanh+'icon/trong_ngay.png',
                anhnen:hinhanh+'slileApp/giamgia_trongngay.jpg',
                api:abita_sanpham+'GoiY_HomNay/GiamGia_TrongNgay.php?MaTinh='+MaTinh,
                navigation:'KhuyenMai'
            },
            {   id:2,
                ten:'Cửa hàng ưu tú',
                icon:hinhanh+'icon/shop_sale.png',
                anhnen:hinhanh+'slileApp/cuahang_giamgia.png',
                api:abita_sanpham+'GoiY_HomNay/CuaHang_GiamGiaSoc.php?MaTinh='+MaTinh,
                navigation:'CuaHang_UuTu'
            },
            {   id:3,
                ten:'Đi chợ, bách hoá',
                icon:hinhanhdanhmuc+'gia-vi.png',
                anhnen:hinhanh+'slileApp/cuahang_giamgia.png',
                api:'DM_01',
                navigation:'SanphamAnUongNhanh'
            },
            {   id:4,
                ten:'Shiper ăn uống nhanh',
                icon:hinhanhdanhmuc+'doanuong.png',
                anhnen:hinhanh+'slileApp/cuahang_giamgia.png',
                api:'DM_20',
                navigation:'SanphamAnUongNhanh'
            }

            
        ]

    return(
        <Animated.View style={{ borderColor:'#DCDCDC',borderTopWidth:8,backgroundColor:backgroundColor}}>
                <View style={{justifyContent:'center',backgroundColor:'#FFF',}}>
                    <Text style={{marginLeft:10, color:'#50C7C7', fontSize:16, marginVertical:15}}>Gợi Ý Hôm Nay</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    
                    {data.map(item=>
                    <TouchableOpacity 
                    key={item.id}
                    onPress={()=>{navigation.navigate(item.navigation,{loai:item,dataMuc:data})}}
                    activeOpacity={0.7}
                            style={{flex:1,
                            backgroundColor:'#FFF',alignItems:'center',borderRadius:5,marginHorizontal:2, marginVertical:4}}>
                            <View style={{margin:5}}>
                            <Image source={{uri:item.icon}} style={{height:30,width:30}}/>
                           </View>
                            <Text style={{textAlign:'center',fontSize:11,marginHorizontal:3,color:'#383838',marginVertical:2}}>{item.ten}</Text>
                    </TouchableOpacity>)}
                   
                </View>
            </Animated.View>
           
          
       
    )
}