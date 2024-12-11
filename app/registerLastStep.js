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
import useGemini from "./../hooks/useGemini";
import { calculateAge } from "./../helpers/helper";

export default function RegisterLastStep() {

    const { userStorage, setUserStorage,updateHealthData,meals, setMeals, medical,currentCondition } = mmkvController()

    const {generateMealPlan} = useGemini();
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

    const getBmi = () => {
        const healthData = userStorage.data
        const w = healthData.weight
        const h = healthData.height
        const heightInMeters = h / 100;
        const bmi = w / (heightInMeters * heightInMeters);
    
        return parseFloat(bmi.toFixed(2));
      }
    const handleNext =async()=>{
        setLoading(true)
    const url = settings.server_url + "/users/generate-meal-plan";
    const userData = userStorage.data
    const age = calculateAge(userData.birthday)
    const bmi = getBmi()


    const medicalHistory = ""
    const alergies = JSON.stringify(medical.alergies);
    const diseases = JSON.stringify(medical.desieases);


    const mealRequest = await generateMealPlan({
      age: age, gender: userData.gender, feeling: currentCondition, current_diseases: diseases,
      bmi: bmi, allergies: alergies, medical_history: medicalHistory
    })

    setMeals([...meals, mealRequest.meal_plan])
    router.replace('/(tabs)/meals')
    }
    const handleSkip = () => {
        router.push('/')
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.loginContainer}>
                    <View style={{
                        flex:0,
                        gap:10,
                        flexDirection:'column',
                        marginBottom:60
                    }}>

                    <Text style={{
                        fontSize:40,
                        fontWeight:'bold',
                        marginBottom:20,
                        paddingBottom:20
                    }}>You Are all Set</Text>
                     </View>

                    <View style={{
                        flex:0,
                        justifyContent:'center',
                        alignItems:'center',
                        padding:50
                    }}>
                    <AntDesign name="checkcircle" size={80} color="blue" />
                    <Text style={{fontSize:30, fontWeight:'bold',margin:20}}>Done</Text>
                    </View>

                    {loading ? (<ActivityIndicator  size="small" />) : (<Button mode='contained' style={styles.buttonLogin} onTouchEnd={handleNext}>Generate Your Meal Plan</Button>)}
                    <View style={{marginBottom:10}}></View>
                    <Button mode='contained' style={styles.buttonSecondary} onTouchEnd={handleSkip}>Skip For Now</Button>

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
