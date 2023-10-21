import React from 'react';
import { Text, View} from 'react-native';

export default Tang_Pont =({item})=>{
    const time_hientai = new Date().getTime()/1000
    const diemP = item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?Math.round(item.PKM):Math.round(item.P)
    return(
        <View>
        {diemP>0?
            <Text numberOfLines ={1} style={{fontSize:11, color:'#4682B4',marginBottom:5}}>Tặng {diemP} Abi ~ {diemP*200/1000}k tiền</Text>
            :null}
        </View>
    )
}