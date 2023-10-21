import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,Image} from 'react-native';
import { Link } from 'expo-router';


export default function Header_Home() {
    const hetder = [{id:1,ten:'Trang chủ', naviga:""},
                    {id:2,ten:'Danh Mục', naviga:'chitietsanpham'},
                    {id:3,ten:'Giới thiệu', naviga:'danhmuc'},
    
                    ]
  return (
<View >
        <View style={styles.hetder} >
            {hetder.map(e=>
                <View key={e.id} style={{marginHorizontal:20}}>
                    <Link  href={{
                                    pathname: e.naviga,
                                    params: { id: e.id }
                                    }}>{e.ten}
                    </Link>
                </View>)}
        </View> 
                    
</View>
   
   
  );
}

const styles = StyleSheet.create({
    hetder: {
        height:40,
        backgroundColor: '#50C7C7',
        flexDirection:'row',
        alignItems:'center'
       },
  container: { 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});