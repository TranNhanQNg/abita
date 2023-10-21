import React, {useEffect, useState,useRef,useLayoutEffect,useMemo,} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity, Image,Animated,Dimensions,Modal,PermissionsAndroid,Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector,useDispatch} from 'react-redux';
import {ADD_WIFI,ADD_FONT} from '../../../redux/cartAction';


let { width,height } = Dimensions.get("window");

export default GetFont =({backgroundColor1})=>{
    const [fontall,setFontall]= useState(70);
    const [fontTieuDe,settieude]= useState(0);
    const [fontDM,setDM]= useState(0);
    const [fontDM_TD,setDM_TD]= useState(0);
    const dispatch = useDispatch()
    const addFont = () =>{
        const infohobby = {
            AddFont:{fontall:fontall,fontTieuDe:fontTieuDe,fontDM:fontDM,fontDM_TD:fontDM_TD},
        };
        const actioninfo = ADD_FONT(infohobby);
        dispatch(actioninfo);
      };

      const onLayoutFont=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        setFontall(height)
      }

      const onLayoutFontTieuDe=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        settieude(height)
      }
      const onLayoutFontDM=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        setDM(height)
      }
      const onLayoutFontDM_TD=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        setDM_TD(height)
      }

      useEffect(() => {
        addFont()
      },[fontall,fontTieuDe,fontDM,fontDM_TD])
    return(
        <Animated.View
       
        style ={{height:height,width,position:'absolute',backgroundColor:backgroundColor1}}
      > 
      <View style={{width:30,opacity:0,marginTop:width*0.02}} onLayout={onLayoutFont}>
          <View onLayout={onLayoutFontTieuDe}>
              <Text style={{ fontFamily: 'OpenSans-Medium',
                              fontSize:13,
                              color:'#000',
                              marginTop:5
                              }}
                              numberOfLines ={2}
                              mt
                              >
                  cộng hoà xã hội chủ nghĩa việt nam
                  </Text>
            </View>
              <Text style={{ fontFamily: 'OpenSans-Medium',
                          fontSize:13,
                          color:'#000'}}
                          numberOfLines ={1}
                          >
              a
              </Text>
            
                         
              <Text style={{ fontSize:17,
                              color:'red',
                              fontFamily: 'OpenSans-SemiBold',
                              marginVertical:3
                              }}
                              numberOfLines ={1}
                              >
                              1
              </Text>  
              <Text style={{ fontFamily: 'OpenSans-Medium',
                          fontSize:11,
                          color:'#000'}}
                          numberOfLines ={1}
                          >
              aaa
              </Text> 
              <Text style={{ fontFamily: 'OpenSans-Medium',
                          fontSize:12,
                          color:'#000',
                          marginVertical:2
                          }}
                          numberOfLines ={1}
                          
                          >
              aaa
              </Text>    
   

      </View>
      <View style={{width:30,opacity:0,marginTop:width*0.02}} onLayout={onLayoutFontDM}>
          <View onLayout={onLayoutFontDM_TD}>
              <Text style={{ fontFamily: 'OpenSans-Medium',
                              fontSize:11,
                              color:'#000',
                              marginTop:5
                              }}
                              numberOfLines ={2}
                              mt
                              >
                  cộng hoà xã hội chủ nghĩa việt nam
                  </Text>
            </View>
             
            
                         
              <Text style={{ fontSize:14,
                              color:'red',
                              fontFamily: 'OpenSans-SemiBold',
                              marginVertical:3
                              }}
                              numberOfLines ={1}
                              >
                              aaaa
              </Text>  
              <Text style={{ fontFamily: 'OpenSans-Medium',
                          fontSize:9,
                          color:'#000'}}
                          numberOfLines ={1}
                          >
              aaa
              </Text>
              <Text style={{ fontSize:9,
                              color:'red',
                              fontFamily: 'OpenSans-SemiBold',
                              marginVertical:3
                              }}
                              numberOfLines ={1}
                              >
                              aaaa
              </Text>    
              <Text style={{ fontSize:8,
                              color:'red',
                              fontFamily: 'OpenSans-SemiBold',
                              marginVertical:3
                              }}
                              numberOfLines ={1}
                              >
                              aaaa
              </Text>    

      </View>
      </Animated.View>
    )
}