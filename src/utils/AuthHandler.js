import axios from "axios";
import Config from "./Config";
import {reactLocalStorage} from 'reactjs-localstorage';

class AuthHandler {
    static login(username,password,callback){
        axios.post(Config.loginUrl,{username:username,password:password})
            .then(response=>{
                // console.log(response); tests response if goods or nah
                if(response.status===200){
                    reactLocalStorage.set("token",response.data.access);
                    reactLocalStorage.set("refresh",response.data.refresh);
                    callback({error:false, message: "Login Successful"});
                }
            })
            .catch(function (error) {
                // console.log(error);
                callback({error:true, message: "Login Failed. Invalid Credentials"});
                }
            );

    }
}

export default AuthHandler;