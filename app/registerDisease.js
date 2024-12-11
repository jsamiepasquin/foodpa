import { Image, StyleSheet, Platform, View, Alert, ScrollView, Text, Pressable } from 'react-native';
import { ActivityIndicator, Button, PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '../configs/theme';
import { styles } from '../assets/styles/login.styles';
import mmkvController from "./../store/mmkvController";
import { useState } from 'react';
import HealthDataState from '@/interface/HealthDataState';
import { SafeAreaView } from 'react-native-safe-area-context';
import settings from '@/configs/settings.json'
import axios from 'axios';
import { router } from 'expo-router';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import SecureInput from '../components/SecureInput'

export default function RegisterDisease() {

    const [loading, setLoading] = useState(false);
    const { userStorage, setUserStorage,setMedical } = mmkvController()


    const [healthData, setHealthData] = useState({
            allergies:['','',''],
            diseases:['','',''],
            illnesses:['','','']
    })

    // height: 170,
    //         weight: 59,
    //         waistCircumference: 94,
    //         hipCircumference: 65,
    //         bodyTemperature: 34,
    //         bloodPressure: "110/90",
    //         heartRate: "72",
    //         bloodSugar: "120",
    //         cholesterolLevels: "120",


    const handleBack = ()=>{
        router.back()
    }

    const handleNext =()=>{
        setMedical({
            alergies:healthData.allergies,
            desieases:healthData.diseases,
            history: healthData.illnesses
        })

        router.push('/registerLastStep')
    }

    const handleSkip = () => {
        router.push('/registerLastStep')
    }
 
    const allergyChanged =(value, i)=>{
        let allergies = healthData.allergies

        allergies[i] = value
        setHealthData({...healthData,allergies:allergies})
    }
    const diseaseChanged =(value, i)=>{
        let diseases = healthData.diseases

        diseases[i] = value
        setHealthData({...healthData,diseases:diseases})
    }
    const illnessChanged =(value, i)=>{
        let illnesses = healthData.illnesses

        illnesses[i] = value
        setHealthData({...healthData,illnesses:illnesses})
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
                    }}>Medical History</Text>
                    <Text style={{fontWeight:'bold'}}>Allergies</Text>
                    <TextInput label={"Allergy 1: "} mode='flat' onChangeText={(value) =>allergyChanged(value,0)} value={healthData.allergies[0]} keyboardType='text' />
                    <TextInput label={"Allergy 2: "} mode='flat' onChangeText={(value) =>allergyChanged(value,1)} value={healthData.allergies[1]} keyboardType='text' />
                    <TextInput label={"Allergy 2: "} mode='flat' onChangeText={(value) =>allergyChanged(value,2)} value={healthData.allergies[2]} keyboardType='text' />
                    
                    <Text style={{fontWeight:'bold'}}>Diseases</Text>
                    <TextInput label={"Disease 1: "} mode='flat' onChangeText={(value) =>diseaseChanged(value,0)} value={healthData.diseases[0]} keyboardType='text' />
                    <TextInput label={"Disease 2: "} mode='flat' onChangeText={(value) =>diseaseChanged(value,1)} value={healthData.diseases[1]} keyboardType='text' />
                    <TextInput label={"Disease 2: "} mode='flat' onChangeText={(value) =>diseaseChanged(value,2)} value={healthData.diseases[2]} keyboardType='text' />

                    </View>

                    {loading ? (<ActivityIndicator  size="small" />) : (<Button mode='contained' style={styles.buttonLogin} onTouchEnd={handleNext}>Next</Button>)}
                    <View style={{marginBottom:10}}></View>
                    <Button mode='contained' style={styles.buttonSecondary} onTouchEnd={handleSkip}>Skip for now</Button>

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
