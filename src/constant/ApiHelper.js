
import {ApiUrls, Utils} from '../constant'
const ApiHelper = {
    fetchPostWithoutToken:function(url, body){
         console.log("url ==>>",ApiUrls.BASE_URL + url,"  body==",body);
         return fetch(ApiUrls.BASE_URL + url, {
          method: "POST",
          body: body,
          headers:Utils.getHeader() ,
        }).then(response=>response.json()).
          then(responseJson=>{
            return responseJson;
        }).catch((error) => {
          console.log('error=>>>', error);
        });
      },

      fetchGet: function (url) {
        console.log('url ==' + ApiUrls.BASE_URL + url)
       
        return fetch(ApiUrls.BASE_URL + url,
          {
            method: 'GET',
            headers:Utils.getHeader() ,
          }).then((response) => response.json()).then((responseJson) => {
            console.log('response', responseJson)
            return responseJson;
          }).catch((error) => {
            alert("Network error.");
            console.error(error);
          });
      },
}

export default ApiHelper;
