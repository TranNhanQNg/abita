import { Animated} from 'react-native';



 const fadeIn = (fadeAnim) => {
 	
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration:1000,
      useNativeDriver: true,
    }).start();
  };


 const fadeInCT = (fadeAnim) => {
 	
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration:1000,
    useNativeDriver: true,
  }).start();
};
module.exports = {fadeIn,fadeInCT};



 