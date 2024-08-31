import { Image, StyleSheet, Platform, View, Alert, ScrollView } from 'react-native';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '../configs/theme';
import { styles } from '../assets/styles/login.styles';
import mmkvController from "@/store/mmkvController";
import { useState } from 'react';
import HealthDataState from '@/interface/HealthDataState';
import { SafeAreaView } from 'react-native-safe-area-context';
import settings from '@/configs/settings.json'
import axios from 'axios';
import { router } from 'expo-router';

export default function Register() {
    const { userStorage, setUserStorage,setUserKey } = mmkvController()

    const [healthData, setHealthData] = useState<HealthDataState>(
        userStorage.data);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState("")

    const handleChangeText = (field: string, value: string) => {
        switch (field) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'repassword':
                setRePassword(value);
                break;
            case 'firstname':
                setFirstname(value);
                break;
            case 'lastname':
                setLastname(value);
                break;
            case 'birthday':
                setBirthday(value);
                break;
            case 'gender':
                setGender(value);
                break;
            default:
                break;
        }
    }

    const handleRegister = async() => {
        if (!username) return Alert.alert('Username cannot be empty');
        if (!password) return Alert.alert('Password cannot be empty');
        if (!repassword) return Alert.alert('Retype your password');
        if (password != repassword)return Alert.alert("Retyped password does not match with password");

        
        setUserKey(username)

        console.log({
            username,password
        })
        setTimeout(()=>{
            setUserStorage({
                auth:password,
                data:{
                    ...userStorage.data,
                    firstName:firstname,
                    lastName:lastname,
                    gender:gender,
                    birthday:birthday,
                    email:username,
                }
            })
    
            router.replace('/login')
        },1000)

        // const registerUrl = settings.server_url+'/users/register'


        // let req = await axios.post(registerUrl,{
        //     inputs:{
        //         first_name:firstname,
        //         last_name:lastname,
        //         gender:gender,
        //         birth_date:birthday,
        //         email:username,
        //         password:password
        //     }
        // })
        // let data = req.data

        // if(data.status == 200){
        //     router.replace('/login')
        // }else{
        //     Alert.alert("Registration Failed")
        // }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.loginContainer}>
                    <TextInput label={"Firstname"} mode='flat' onChangeText={(value) => handleChangeText('firstname', value)} value={firstname} />
                    <TextInput label={"Lastname"} mode='flat' onChangeText={(value) => handleChangeText('lastname', value)} value={lastname} />
                    <TextInput label={"Gender"} mode='flat' onChangeText={(value) => handleChangeText('gender', value)} value={gender} placeholder='Male/Female' />
                    <TextInput label={"Birthday"} mode='flat' onChangeText={(value) => handleChangeText('birthday', value)} value={birthday} placeholder='mm/dd/yyyy' />
                    <TextInput label={"Username"} mode='flat' onChangeText={(value) => handleChangeText('username', value)} value={username} inputMode='email' />
                    <TextInput label={"Password"} mode='flat' onChangeText={(value) => handleChangeText('password', value)} value={password} secureTextEntry />
                    <TextInput label={"Retype Password"} mode='flat' onChangeText={(value) => handleChangeText('repassword', value)} value={repassword} secureTextEntry />
                    <Button mode='contained' style={styles.buttonLogin} onTouchEnd={handleRegister}>Register</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
