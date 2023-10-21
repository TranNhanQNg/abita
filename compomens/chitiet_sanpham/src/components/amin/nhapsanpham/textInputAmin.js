import React,{useState} from 'react';
import {Text, View,TextInput,StyleSheet, TouchableOpacity,Modal,Image,SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const TextInputAmin =({setDaTa,id,ten,data,multiline})=>{
 
  
  
const pushdata =(text)=>{
    const newdata = data.map(e=>{
      if(e.id==id){
        return(
          {...e,value:text}
        )}
        return(
          {...e}
        )
      })
    setDaTa(newdata)
     
};

	return(
		 <View style ={{ }}>
        <View style={{backgroundColor:'#ADD8E6'}}>
            <View style={styles.danhmuc}>
              <View style={{flexDirection:'row'}}>
                <Text> {ten}</Text> 
                <Text style={{color:'red'}}>*</Text>
              </View>
            </View>
        </View>
        <View style={styles.viewtextInput}>
          <TextInput style={styles.textInput}
                      placeholder = {ten}
                      returnKeyType ='done'
                      onChangeText={text => {pushdata(text)}}
                      multiline={multiline}
                      value = {data[id-1].value}
          />
        </View>
      </View>
    );
}
// phần giá sản lượng

const TextInputAminGia =({setDaTaVND,dataVND,ten,
  index,onRefTextInput,mauSP,mamau,tendataImage,dataImage})=>{
    const [anhdaidien,setAnhDaiDien]=useState({TenAnh:'aaaa',anh:'bbbb'});
    const [modalVisible, setModalVisible] = useState(false);
    const dataImageMau =dataImage.filter(e=>  e.TenMau == mauSP);
    const dataAnhDaiDien =dataImage.filter(e=>  e.TenAnh == anhdaidien.TenAnh);
    const id_ct = Math.floor(Math.random() * 100);

    const id = index+ten+mauSP;
    const tenImage=[];
    for (var i = 0; i < tendataImage.length; i++){
      if(tendataImage[i].TenMau==mauSP){
        tenImage.push(tendataImage[i].TenAnh)}};
    //const tenImage =tendataImage.filter(e=>  e.TenMau == mauSP);
    const newdataVND = dataVND.filter(e=>  e.id == id);
    const pushdataVND =(text)=>{
        if(newdataVND.length>0){
        const newdatavnd = dataVND.map(e=>{
                          if(e.id == id){
                            return({...e,GiaBanSP:text})
                          }else{
                            return({...e})
                                }
                          });
          setDaTaVND(newdatavnd)             
        }else{
              setDaTaVND([...dataVND,{
                IdSanPham:index+id_ct,
                id:id,
                TenMau:mauSP,
                MaMau:mamau,
                GiaBanSP:text,
                TenAnh:tenImage,
                AnhDaiDien:null,
                QuyCachSP:ten,
                TonDau:0
              }])
        };
     }; 

    const pushdataSL =(text)=>{
        if(newdataVND.length>0){
        const newdatavnd = dataVND.map(e=>{
                          if(e.id == id){
                            return({...e,TonDau:text})
                          }else{
                            return({...e})
                                }
                          });
          setDaTaVND(newdatavnd)             
        }else{
              setDaTaVND([...dataVND,{
                IdSanPham:index+id_ct,
                id:id,
                TenMau:mauSP,
                MaMau:mamau,
                GiaBanSP:0,
                TenAnh:tenImage,
                AnhDaiDien:null,
                QuyCachSP:ten,
                TonDau:text
              }])
        };
        }
        const pushdataImage =(item)=>{
          if(newdataVND.length>0){
          const newdatavnd = dataVND.map(e=>{
                            if(e.id == id){
                              return({...e, AnhDaiDien:item.TenAnh})
                            }else{
                              return({...e})
                                  }
                            });
            setDaTaVND(newdatavnd)             
          }else{
                setDaTaVND([...dataVND,{
                  IdSanPham:index+id_ct,
                  id:id,
                  TenMau:mauSP,
                  MaMau:mamau,
                  GiaBanSP:0,
                  TenAnh:tenImage,
                  AnhDaiDien:item.TenAnh,
                  QuyCachSP:ten,
                  TonDau:0
                }])
          };
          }
   

	return(
    <View>
      <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center' ,backgroundColor:'#FFFFFF'}}>
        <View style={{flex:0.5}}>
          <View style={{margin:5, alignItems:'center',justifyContent:'center', height:40}}>
          <Text>{ten}</Text>
          </View>
        </View>
        <View style={{flex:0.3}}>
          <View style={[styles.viewtextInput,{borderColor:tenImage.length==0?'#D8D8D8':'#006400'}]}>
            <TextInput style={styles.textInput}
              placeholder = {'0'}
              keyboardType="numeric"
              onChangeText={text => {pushdataSL(text)}}
              editable={tenImage.length==0?false:true}
              value={onRefTextInput}
            />
          </View>
        </View>
        <View style={{flex:0.5,}}>
          <View style={[styles.viewtextInput,{borderColor:tenImage.length==0?'#D8D8D8':'#006400'}]}>
              <TextInput style={styles.textInput}
                placeholder = {'VNĐ'}
                keyboardType="numeric"
                onChangeText={text => {pushdataVND(text)}}
                value={onRefTextInput}
                editable={tenImage.length==0?false:true}
              />
            </View>
      </View>
     
      <TouchableOpacity onPress={()=>{setModalVisible(tenImage.length>0?true:false)}}
          style={{flex:0.4,alignItems:'center'}}
          >
       
      {dataAnhDaiDien.length>0?
      <Image 
            source={{
              uri: 'data:image/jpeg;base64,' + dataAnhDaiDien[0].anh,
            }}
            style={{width:35,height:35, marginHorizontal:5, borderRadius:5}}
            />:(
        <View style={{width:35,height:35, marginHorizontal:5, borderRadius:5,backgroundColor:'#9ACD32',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <Text>Ảnh</Text>
        </View>)}
      </TouchableOpacity>
      
      </View>
      <View style={{height:1,}}/>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{backgroundColor:'#FFFFFF',flex:1}}>
        <Text style={{marginTop:100,marginHorizontal:10}}>Chọn ảnh đại diện cho sản phẩm </Text>
        <View style={{height:1,backgroundColor:'#D0D0D0'}}/>
          <View style={{flexDirection: 'row',flexWrap:'wrap', marginTop:10, backgroundColor:'#FFFFFF',flex:1}}>
        
         {dataImageMau.map((item) =>
        
            <TouchableOpacity style={{flexDirection: "row-reverse",margin:5}}
            key={item.TenAnh}
            onPress={()=>{setModalVisible(false),pushdataImage(item),setAnhDaiDien(item)}}>
            <Image 
            source={{
              uri: 'data:image/jpeg;base64,' + item.anh,
            }}
            style={{width:70,height:70, marginHorizontal:5, borderRadius:5}}
            />
            </TouchableOpacity>
          
            )}
            </View>
       </View>
    </Modal>
    </View>
  );
}
module.exports = {TextInputAmin,TextInputAminGia};

const styles= StyleSheet.create({
  danhmuc:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:10,
        height:35,
        alignItems:'center',
        },
        viewtextInput:{
          margin:5,
          borderRadius:5,
          borderWidth:0.5,
          borderColor:'#D8D8D8'
        },
        textInput:{
          flex:1,
          maxHeight:200,
          minHeight:35,
          marginHorizontal:10
        }
    })