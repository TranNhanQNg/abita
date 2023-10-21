import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, ScrollView,Image,Button} from 'react-native';
import Home from './home';


export default function Index() {
  const navigation = useRouter();
  return (
    <View style={{flex:1}}>    
        <Home/>
    </View>
           
  );
}

