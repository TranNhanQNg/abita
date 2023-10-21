
import { View } from "react-native";
import Giohang from '../compomens/cart/giohang'
import { Stack, useRouter } from "expo-router";


export default function Dat_Hang() {
    return(
        <View style={{flex:1}}>
            <Stack.Screen options={{ header: () => null }} />   
                <Giohang/>
        </View>
    )
}