
import React from 'react';
import { View,Dimensions,Platform} from 'react-native';


let { width,height } = Dimensions.get("window");

 export default Dpf =({uri})=>{
                return(
                    <View style={{alignItems:'center'}}>
                            <Pdf showVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={true}
                            style={{  width:width-20,height,backgroundColor:"#eee"}}
                            spacing={0}
                            fitWidth={false}
                            trustAllCerts={Platform.OS == 'android' ? false : true}
                            source={{uri:uri,cache: true}}
                        />
                    </View>
                    )
         }