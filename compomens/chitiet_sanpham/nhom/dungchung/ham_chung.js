import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorage_app = async (key,value)=>{
        try {
          await AsyncStorage.setItem(key,JSON.stringify(value))
        } catch(e) {
          console.log('Done.')
        }
      
}