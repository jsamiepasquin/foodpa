import { useState } from "react";

import settings from '../../configs/settings.json'
import axios from "axios";
import { Alert } from "react-native";
import { router } from "expo-router";

import mmkvController from "@/store/mmkvController";
export default function useLogin() {

    const { userStorage, setUserStorage, setUserKey } = mmkvController()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const usernameChanged = (text) => {
        setUsername(text)
    }
    const passwordHanged = (text) => {
        setPassword(text)
    }

    const handleLogin = async () => {
        setLoading(true)
        const loginUrl = settings.server_url + '/users/login'
        try {
            const response = await axios.post(loginUrl, {
                email: username,
                password
            });
            const data = response.data;
            const user = data.user;

            setUserStorage({
                auth: user.user_id,
                data: {
                    ...userStorage.data,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    gender: user.gender,
                    birthday: user.birth_date,
                    email: user.email
                }
            })
            router.replace('/')
        } catch (err) {
            setLoading(false)
            console.log(err)
            if (err.response) {
                console.log(err.response.status, err.response)
                if (err.response.status == 404) return Alert.alert('Login Failed', 'Wrong Username');
                else if (err.response.status == 401) return Alert.alert('Login Failed', 'Wrong password');
                else return Alert.alert('Login Failed', 'Something went wrong. Please try again.');
            }

        } finally {
        }


    }

    const handleRegister = () => {
        router.push('/register')
    }
    return {
        usernameChanged, passwordHanged, username, password, handleLogin, handleRegister, loading
    }
}