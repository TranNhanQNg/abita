import { Stack } from 'expo-router/stack';
import Header_Home from "../compomens/header/header_home";
import { StyleSheet, Text, View, ScrollView,Image,Button} from 'react-native';
export default function HomeLayout() {
  function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={'https://cdn.pixabay.com/photo/2020/04/30/14/03/mountains-and-hills-5112952_1280.jpg'}
      />
    );
  }
  return (

    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      
          headerTitle: props => <LogoTitle {...props} />,
          headerRight: () => <Button onPress={() => setCount(c => c + 1)} title="Update count" />,
       
      }}
      
    />
  

  );
}