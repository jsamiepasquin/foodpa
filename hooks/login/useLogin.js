import { useState } from "react";

import settings from '../../configs/settings.json'
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";

import mmkvController from "@/store/mmkvController";
export default function useLogin(){

    const {userStorage, setUserStorage, setUserKey} = mmkvController()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const usernameChanged = (text)=>{
        setUsername(text)
    }
    const passwordHanged = (text)=>{
        setPassword(text)
    }

    const handleLogin = async()=>{
        // const loginUrl = settings.server_url+'/users/login'
        // console.log(loginUrl)
        // let res = await axios.post(loginUrl, {
        //     email: username,
        //     password: password
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // });

        setUserKey(username)

        setTimeout(()=>{
            let data = {
                status:200,
                user:userStorage.data
            }
            
            if(userStorage.data.email != username)data.status = 404
            if(userStorage.auth != password)data.status = 403
        //    let data = res.data
           console.log(data)
    
           if(data.status == 404){
            return Alert.alert('Wrong Username')
           }
    
           if(data.status == 403){
            return Alert.alert('Wrong password')
           }
    
           const user = data.user;
    
           setUserStorage({
            auth:password,
            data: {
                ...userStorage.data,
                firstName:user.firstName,
                lastName:user.lastName,
                gender:user.gender,
                birthday:user.birthday,
                email:user.email
            }
           })
    
           console.log(userStorage)
    
           router.replace('/')
        },1000)
    }

    const handleRegister = () => {
        router.replace('/register')
    }
    return {
        usernameChanged,passwordHanged,username,password,handleLogin, handleRegister
    }
}