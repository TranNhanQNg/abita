import { StatusBar } from 'expo-status-bar';
import { Link, Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View, ScrollView,Image,Button} from 'react-native';

const text =' công hoa xa hoi chủ nghĩa viết nam "https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg" nhân dân chúng ta'


function urlify(text) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    //var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url,b,c) {
        var url2 = (c == 'www.') ?  'http://' +url : url;
        return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
    }) 
}
export default function Gioi_Thieu() {

    let arr = text.split('"')
 
    const map =()=>{
        return(
    <View>
       {arr.map(e=> <View>
       {e.slice(-3)=='jpg'?<Image source={{uri:e}} style={{height:50,width:50}}/>:<Text>{e}</Text>}
       </View>)
       }
    </View>
        )}
  
       
    
  return (
    <View style={{flex:1}}>
       <Stack.Screen options={{ header: () => null }} />    
       <View>
      {map()}
       </View>
    </View>
           
  );
}
