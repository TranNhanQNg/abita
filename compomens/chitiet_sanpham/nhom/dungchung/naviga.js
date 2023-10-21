
const naviga =(item,navigation,MaTinh)=>{navigation.navigate("ChitietSanpham",{
  idchitietsp:item.IDCHITIETSP,MaTinh:MaTinh,idsanpham:item.IDSANPHAM
})};

const navigaCuaHang =(item,navigation,MaTinh)=>{navigation.navigate(components,{
  idchitietsp:item.IDCHITIETSP,MaTinh:MaTinh,idsanpham:item.IDSANPHAM
})};
const navigaPush =(item,navigation,MaTinh)=>{navigation.push("ChitietSanpham",{
  idchitietsp:item.IDCHITIETSP,MaTinh:MaTinh,idsanpham:item.IDSANPHAM
})};
module.exports = {naviga,navigaCuaHang,navigaPush};