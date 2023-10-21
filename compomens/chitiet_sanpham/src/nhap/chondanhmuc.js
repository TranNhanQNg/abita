import React, {useState,useEffect} from 'react';
import {Text, View,SafeAreaView,
  TouchableOpacity,StyleSheet,ScrollView} from 'react-native';
import diachiDaTa from '../../../diachiDaTa/diachiDaTa';

export default DanhMucSP =({setModalVisible,setDanhMuc})=>{ 

	const [dataDM, setDataDM] = useState([]);
	const {abita_amin}=diachiDaTa;
	const [huong, setHuong] = useState('1');
	const [id, setId] = useState('');
	useEffect(() => {
			fetch(abita_amin+'DanhMuc.php')
			.then((response) => response.json())
			.then((json) => {setDataDM(json)})
			.catch((error) => console.error(error))
  		}, []);
	 const newDM = dataDM
		    .map(v => v['IDDANHMUC'])
		    .map((v, i, array) => array.indexOf(v) === i && i)
		    .filter(v => dataDM[v])
		    .map(v => dataDM[v]
		);
	 const newDM2 = dataDM.filter(e=>  e.IDDANHMUC == id)
			.map(v => v['IDDANHMUCCAP2'])
			.map((v, i, array) => array.indexOf(v) === i && i)
			.filter(v => dataDM.filter(e=>  e.IDDANHMUC == id)[v])
			.map(v => dataDM.filter(e=>  e.IDDANHMUC == id)[v]
		);
	 const newDM3 = dataDM.filter(e=>  e.IDDANHMUCCAP2 == id)
			.map(v => v['IDDANHMUCCAP3'])
			.map((v, i, array) => array.indexOf(v) === i && i)
			.filter(v => dataDM.filter(e=>  e.IDDANHMUCCAP2 == id)[v])
			.map(v => dataDM.filter(e=>  e.IDDANHMUCCAP2 == id)[v]
		);
	  const dieuhuong = ()=>{ 
  switch (huong) {
			case '1': return(<DanhMuc data={newDM} setdanhmuc={setdanhmuc1} ten={huong}/>)
			break;
			case '2': return(<DanhMuc data={newDM2} setdanhmuc={setdanhmuc2} ten={huong}/>)
			break;
			case '3': return(<DanhMuc data={newDM3} setdanhmuc={setdanhmuc3} ten={huong}/>)
			break; 
  		}};
  		const setdanhmuc1 =(e)=>{setHuong('2'), setId(e.IDDANHMUC)};
  		const setdanhmuc2 =(e)=>{setHuong('3'), setId(e.IDDANHMUCCAP2)};
  		const setdanhmuc3 =(e)=>{setModalVisible(false), setDanhMuc(e.IDDANHMUC+','+e.IDDANHMUCCAP2+','+e.IDDANHMUCCAP3+','+e.TENDANHMUCCAP3)};
return(
		<SafeAreaView>
			{dieuhuong()}
			<TouchableOpacity onPress={()=>setModalVisible(false)}>
			</TouchableOpacity>
		</SafeAreaView>	
		)
	};

const DanhMuc =({data,setdanhmuc,ten})=>{
	const kientra =(e)=>{
		if(ten==1){
			return(<Text>{e.TENDANHMUC}</Text>)}
	 	else if(ten==2){
	 		return(<Text>{e.TENDANHMUCCAP2}</Text>)}
	 	else if(ten==3){
	 		return(<Text>{e.TENDANHMUCCAP3}</Text>)}
		};
	 	return(
	 	<ScrollView style={{marginHorizontal:40, backgroundColor:'#FFFFFF'}}>
			{data.map((e, index)=>
				<TouchableOpacity onPress={()=>setdanhmuc(e)} key={index}>
					<View style={{margin:5, height:30, flexDirection:'row',alignItems:'center'}}>
					{kientra(e)}
					</View>
					<View style={{height:1, backgroundColor:'#D8D8D8'}}/>
				</TouchableOpacity>
			)}
	 	</ScrollView>
	 	)
	 };

