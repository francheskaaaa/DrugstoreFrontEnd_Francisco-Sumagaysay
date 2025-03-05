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

    static loggedIn(){
        if(reactLocalStorage.get("token") && reactLocalStorage.get("refresh")){
            return true;
        } else {
            return false;
        }
    }

    static getLoginToken(){
        return reactLocalStorage.get("token");
    }
    static getRefreshToken(){
        return reactLocalStorage.get("refresh");
    }

    static logout(){
        reactLocalStorage.remove("token");
        reactLocalStorage.remove("refresh");
    }
    
    static checkTokenExpiration(){
        let expire = false;
        const token = this.getLoginToken();
        const tokenArray = token.split(".");
        const jwt =JSON.parse(atob(tokenArray[1]));
        if(jwt && jwt.exp && Number.isInteger(jwt.exp)){
            expire = jwt.exp*1000;
        }
        else {
            expire = false;
        }
        if(!expire) {
            return false;
        }

        return Date.now() > expire;

    }
}

export default AuthHandler;