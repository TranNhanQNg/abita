import React, {} from 'react';
import { Text, View,FlatList,Animated,ActivityIndicator} from 'react-native';
import {ItemFlatList} from './itemflatlist'

 export default Render_ThongBao =({data,fadeAnim,navigation})=>{  
  
    return (
      <View style={{flex:1}}>
      {data.length==0?
        <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>:
          <Animated.View style={{backgroundColor:'#484848',opacity:fadeAnim,flex:1}}>
            <FlatList 
                    data={data}
                    renderItem={({ item }) => (
                     <ItemFlatList item={item} navigation={navigation}/>
                    )}
                    keyExtractor={( item,index ) => index}
                    // ref={viewRef}
                    // onLayout={() => viewFlatlistRef()}
                    // onContentSizeChange={() => viewFlatlistRef()}
                  />
            </Animated.View>
            
            }
            </View>
          )
    };
