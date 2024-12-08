
import { useEffect } from 'react';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

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

    const [meals, setMeals] = useMMKVStorage('meals', storage, [])


return { userStorage, setUserStorage, currentCondition, setCurrentCondition, medical, setMedical, setUserKey, meals, setMeals, mealHistory, setMealHistory,
    feedback,setFeedback
 }
}