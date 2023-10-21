import React from 'react';
import { Text, View} from 'react-native';

export default Tang_Pont_CTSP =({item,soluong})=>{
    const time_hientai = new Date().getTime()/1000
    const diemP1=Number(item.ABINCC)+Number(item.P)
    const diemP1KM=Number(item.ABINCCKM)+Number(item.ABINCC)
    const diemP = item.NGAY_KETTHUC>time_hientai&item.NGAY_KHUYENMAI<time_hientai&item.GIAKHUYENMAI>0?diemP1KM:diemP1
    return(
        <View>
        {diemP>0?
            <Text numberOfLines ={1} style={{fontSize:11, color:'#4682B4',marginBottom:5}}>Tặng {Math.round(diemP*soluong)} Abi ~ {Math.round(diemP*soluong)*200/1000}k tiền</Text>
            :null}
        </View>
    )
}