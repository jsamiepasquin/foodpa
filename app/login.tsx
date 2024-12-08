import { Image, StyleSheet, Platform, View, TextInput, Text } from 'react-native';
import { ActivityIndicator, Button, PaperProvider } from 'react-native-paper';
import { theme } from '../configs/theme';
import { styles } from '../assets/styles/login.styles';

import useLogin from '../hooks/login/useLogin';
import { Stack } from 'expo-router';
import { useState } from 'react';
import SecureInput from '@/components/SecureInput';

export default function Login() {

    const { password, username, usernameChanged, passwordHanged, handleLogin, handleRegister, loading } = useLogin()
    const [showPassword,setShowPassword] = useState(false);
    return (
        <View style={styles.loginContainer}>

            <View style={styles.logoWrapper}>
                <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />
                <Text style={styles.title}>FOODPA</Text>

            </View>
            <TextInput placeholder='Username' style={styles.loginInput} label={"Username"} mode='flat' onChangeText={usernameChanged} value={username}  />
            <SecureInput placeholder={'Password'} setValue={passwordHanged} value={password} show={showPassword} setShow={setShowPassword} style = {styles.loginInput}/>


            {loading ? (<ActivityIndicator size="small" />) : (<Button mode='contained' style={styles.buttonLogin} onTouchEnd={handleLogin}>LOGIN</Button>
            )}

            <Text style={styles.registerMessage}>If you do not have an account yet, </Text>
            <Button mode='contained' style={styles.buttonLogin} buttonColor='gray' textColor='white' onTouchEnd={handleRegister}>REGISTER</Button>
        </View>
    );
}
