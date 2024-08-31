import { Image, StyleSheet, Platform, View } from 'react-native';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '../configs/theme';
import {styles} from '../assets/styles/login.styles';

import useLogin from '../hooks/login/useLogin';
import { Stack } from 'expo-router';

export default function Login() {

    const {password,username,usernameChanged,passwordHanged, handleLogin, handleRegister} = useLogin()

    return (
        <View style={styles.loginContainer}>
            <TextInput label={"Username"} mode='flat' onChangeText={usernameChanged} value={username} />
            <TextInput label={"Password"} mode='flat' onChangeText={passwordHanged} value={password} />
            <Button mode='contained' style={styles.buttonLogin} onTouchEnd={handleLogin}>login</Button>
            <Button mode='contained' buttonColor='gray' textColor='white' onTouchEnd={handleRegister}>Register</Button>
        </View>
    );
}
