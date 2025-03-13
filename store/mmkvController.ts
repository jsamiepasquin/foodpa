
import { useEffect } from 'react';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
import settings from './../configs/settings.json'
import axios from 'axios';
import { auth } from '@/helpers/helper';
import { Alert } from 'react-native';

const storage = new MMKVLoader().initialize();

interface Meal {
    item: string;
    notes: string;
  }
  
  interface MealPlan {
    date: string;
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
  }

export default function mmkvController() {
    const [userKey, setUserKey] = useMMKVStorage('user_key', storage, 'user');
    const [mealHistory, setMealHistory] = useMMKVStorage('meal_history', storage, []);
    const [userStorage, setUserStorage] = useMMKVStorage('user  ', storage, {
        auth: "",
        data: {
            height: 170,
            weight: 59,
            waistCircumference: 94,
            hipCircumference: 65,
            bodyTemperature: 34,
            bloodPressure: "110/90",
            heartRate: "72",
            bloodSugar: "120",
            cholesterolLevels: "120",
            firstName: "",    // Initialize with empty strings or default values
            lastName: "",
            birthday: "",
            gender: "",
            email: ""
        }
    })

    const [feedback, setFeedback] = useMMKVStorage('feedback',storage,{
        setupEase: '',
        accuracy: '',
        satisfaction: '',
        healthImpact: '',
        improvements: '',
    })
    const [currentCondition, setCurrentCondition] = useMMKVStorage('current_condition', storage, "Healthy")

    const [medical, setMedical] = useMMKVStorage('medical', storage, {
        alergies: [] as string[],
        desieases: [] as string[],
        history: [] as object[],
    });

    const updateHealthData = async(paramData, silent=false) => {
        
         const saveUrl = settings.server_url + '/users/save-health-data'

         const saveRequest = await axios.post(saveUrl,{
            user_id:userStorage.auth,
            ...paramData
         })

         const requestData = saveRequest.data
         console.log('save data', requestData)
         
         if(!requestData.success){
         return silent?false: Alert.alert('Error occurred','Failed to save your data!' )
         }

         const healthData = requestData.data
         setUserStorage({
            auth:userStorage.auth,
            data:healthData
         })

         return silent?true:Alert.alert('Success','Profile data successfully saved!')

    }

    const [meals, setMeals] = useMMKVStorage('meals', storage, [])


    const fetchUserData = async()=>{
        try{
            const fetchUser = await axios.get(settings.server_url+'/users/data?user_id='+userStorage.auth)
        const userData = fetchUser.data

        console.log('user data fetched',userData)
        setUserStorage({...userStorage,data:userData})
        }catch(err){
            console.log(err)
        }
    }


return { userStorage, setUserStorage,updateHealthData, currentCondition, setCurrentCondition, medical, setMedical, setUserKey, meals, setMeals, mealHistory, setMealHistory,
    feedback,setFeedback,fetchUserData
 }
}