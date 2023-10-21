import axios from 'axios';
const md5 = require('md5');

export const MD5 = {
  home:md5 ("bellarock@2412")
  
};
export const fechDaTa_Axios =(api_fech, set_then, set_catch, set_finally,data_fech)=>{
    axios.post(api_fech,
      data_fech,
      {headers:{"Content-Type" : "application/json"}}
      )
    .then((res) =>{set_then(res)})
    .catch((error) => {set_catch(error)})
    .finally(() => set_finally());
  };
  