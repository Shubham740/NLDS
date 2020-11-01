
import axios from 'axios'

const BASE_URL='http://ec2-3-15-42-254.us-east-2.compute.amazonaws.com:8080/'
const ApiHelper = {
    fetchPostWithoutToken:function(url, body){
        let  headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            // authorization: AppSingleton.getInstance().appToken
          };
     
         console.log("url ==>>",BASE_URL + url,"  body==",body);
     
         return fetch(BASE_URL + url, {
          method: "POST",
          body: body,
          headers: headers
        }).then(response=>response.json()).
          then(responseJson=>{
            return responseJson;
        }).catch((error) => {
          console.log('error=>>>', error);
        });
    
    
      },
}

export default ApiHelper;
