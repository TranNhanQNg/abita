import React from 'react';
import { Text, View,SafeAreaView,TouchableOpacity} from 'react-native';

import HeaderG from '../../header/headerG';


export default ThongBaoDichVu =({navigation})=>{
    return(
	<SafeAreaView style={{backgroundColor:'#50C7C7',flex:1}}>
            <HeaderG navigation={()=>navigation.goBack()}/> 
          
                <View style={{marginHorizontal:10,marginTop:30}}>
                    <View style={{alignItems:'center',}}>
                   
                    <Text style={{fontSize:20, color:'#FFF'}}>
                    🎀 Xin kính chào quý khách 🎀
                    </Text> 
                    <Text style={{marginTop:30}}>
                    Hiện tại có một số tỉnh thành chúng tôi đang tìm nhà quản lý cung cấp dịch vụ cho tỉnh bạn, nên hiện tại tỉnh bạn chưa hoạt động mong bạn vui lòng mua hàng ở tỉnh khác. Chúng tôi xin chân thành cảm ơn
                    </Text> 
                    <Text style={{color:'blue',alignItems:'center',justifyContent:'center', marginTop:10}}>
                            🎀 ๏ ๏ ❁ ๏ ๏ 🎀      
                    </Text> 
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Text style={{color:'blue',alignItems:'center',justifyContent:'center', marginTop:10}}>
                                Quay lại      
                        </Text> 
                    </TouchableOpacity>
                    
                    </View>
                
                </View>
          
            

    </SafeAreaView> 
)
};