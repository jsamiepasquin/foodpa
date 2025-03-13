import { Image, StyleSheet, Platform, View, Alert, ScrollView, Text, Pressable } from 'react-native';
import { ActivityIndicator, Button, PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '../configs/theme';
import { styles } from '../assets/styles/login.styles';
import { useEffect, useState } from 'react';
import HealthDataState from '@/interface/HealthDataState';
import { SafeAreaView } from 'react-native-safe-area-context';
import settings from '@/configs/settings.json'
import axios from 'axios';
import { router } from 'expo-router';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import SecureInput from '../components/SecureInput'
import mmkvController from '../store/mmkvController'
export default function RegisterHealth() {

    const { userStorage, setUserStorage,updateHealthData } = mmkvController()

    const [loading, setLoading] = useState(false);

    const [healthData, setHealthData] = useState({
            height: 170,
            weight: 59,
            waistCircumference: 94,
            hipCircumference: 65,
            bodyTemperature: 34,
            bloodPressure: "110/90",
            heartRate: "72",
            bloodSugar: "120",
            cholesterolLevels: "120",
    })

    useEffect(()=>{
        console.log('user_id',userStorage.auth)
    },[])

    const handleBack = ()=>{
        router.back()
    }

    const handleNext =async()=>{
        setLoading(true)
        const update = await updateHealthData(healthData, true)
        if(update){
            router.push('/registerDisease')
        }else{
            Alert.alert('Error','There was a problem while saving your information.')
        }
    }
    const handleSkip = () => {
        router.push('/registerDisease')
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.loginContainer}>
                    <View style={{
                        flex:0,
                        gap:10,
                        flexDirection:'column',
                        borderBottomWidth:1,
                        marginBottom:60
                    }}>
                        <Pressable>
                        <AntDesign name="arrowleft" size={30} color="black" onPress={handleBack} />
                        </Pressable>
                    <Text style={{
                        fontSize:40,
                        fontWeight:'bold',
                        marginBottom:20,
                        paddingBottom:20
                    }}>Tell Me About Your Health</Text>
                    <TextInput label={"Height (cm)"} mode='flat' onChangeText={(value) =>setHealthData({...healthData,height:value})} value={healthData.height} keyboardType='numeric' />
                    <TextInput label={"Weight (kg)"} mode='flat' onChangeText={(value) =>setHealthData({...healthData,weight:value})} value={healthData.weight} keyboardType='numeric' />
                    {/* <TextInput label={"Cholesterol"} mode='flat' onChangeText={(value) =>setHealthData({...healthData,cholesterolLevels:value})} value={healthData.cholesterolLevels} keyboardType='numeric' />
                    <TextInput label={"Blood Sugar"} mode='flat' onChangeText={(value) =>setHealthData({...healthData,bloodSugar:value})} value={healthData.bloodSugar} keyboardType='numeric' /> */}
                    </View>

                    {loading ? (<ActivityIndicator  size="small" />) : (<Button mode='contained' style={styles.buttonLogin} onTouchEnd={handleNext}>Next</Button>)}
                    <View style={{marginBottom:10}}></View>
                    <Button mode='contained' style={styles.buttonSecondary} onTouchEnd={handleSkip}>Dot it later</Button>

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
