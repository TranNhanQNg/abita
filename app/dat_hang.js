import react from "react";
import { View } from "react-native";
import DatHang from '../compomens/cart/datHang'
import { Stack, useRouter } from "expo-router";


export default function Dat_Hang() {
    return(
        <View style={{flex:1}}>
            <Stack.Screen options={{ header: () => null }} />   
                <DatHang/>
        </View>
    )
}