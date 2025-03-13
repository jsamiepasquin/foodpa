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
import foods1 from './../store/foods1.json';

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
        generateOfflineMeals()
        router.replace('/(tabs)/meals')
    }
    const handleSkip = () => {
        router.push('/')
    }

    const generateOfflineMeals = ()=>{

        const diseases = medical.desieases;
        let foods = [];
        diseases.forEach(dis=>{
          let setFoods = null;
          if(dis.toLocaleLowerCase() == 'hypertension')setFoods = foods1.hypertension
          if(dis.toLocaleLowerCase() == 'diabetes')setFoods = foods1.diabetes
          if(dis.toLocaleLowerCase() == 'obesity')setFoods = foods1.obesity
          foods = [...foods, ...setFoods]
    
          console.log('food for '+dis, setFoods)
        })
        if(diseases.length == 0 || !diseases){
            foods = [...foods1.hypertension, ...foods1.diabetes, ...foods1.obesity]
        }
    
         let pickedFoods = [];
    
         let breakFast = generateMeals(pickedFoods, foods)
         pickedFoods = [...pickedFoods, ...breakFast]
    
         let lunch = generateMeals(pickedFoods, foods)
         pickedFoods = [...pickedFoods, ...lunch]
    
         let dinner = generateMeals(pickedFoods, foods)
         pickedFoods = [...pickedFoods, ...dinner]
    
         const newMeal = {
          breakfast:breakFast,
          lunch:lunch,
          dinner:dinner
         }
    
         setMeals([newMeal])
    
      }
    
      const generateMeals = (pickedFoods, foods)=>{
        let finalFoods = []
        for (let i = 0; i < 2 ; i++) {
          let result = getRandomFood(foods, pickedFoods);
          pickedFoods = result.pickedFoods
          finalFoods.push(result.pickedFood)
         }
         return finalFoods
      }
      function getRandomFood(foodList, pickedFoods = []) {
        if (foodList.length === pickedFoods.length) {
            return "All foods have been picked.";
        }
    
        let randomIndex;
        let randomFood;
    
        do {
            randomIndex = Math.floor(Math.random() * foodList.length);
            randomFood = foodList[randomIndex];
        } while (pickedFoods.some(picked => picked.food === randomFood.food));
    
        pickedFoods.push(randomFood);
        return { pickedFood: randomFood, pickedFoods: pickedFoods };
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
