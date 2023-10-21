
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useDispatch} from 'react-redux';
import {ADD_TOKEN} from '../redux/cartAction';


export async function requestUserPermission(addToKen) {
  
  
  const setStringValue = async (token) => {
    try {
      await AsyncStorage.setItem('@key_token',JSON.stringify(token))
    } catch(e) {
      console.log('Done.')
    }
  }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await messaging().getToken()
    console.log('Permission status:', token);
    addToKen(token)
    setStringValue(token)
  }
}

export const messagingPush = (setPushNatification,pushThongBao) => {
  const setStringApi = async (remoteMessage) => {
    try {
      await AsyncStorage.setItem('@key_Api',JSON.stringify(remoteMessage.data.api))
    } catch(e) {
      console.log('Done.')
    }
  }

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('1.Mở app:');
      setStringApi(remoteMessage)
    });
    
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      setPushNatification(remoteMessage.notification)
      pushThongBao(remoteMessage)
      
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
        }
      });
  }
  
  export async function DisplayNotification(remoteMessage){
    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    await notifee.displayNotification({
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }   

