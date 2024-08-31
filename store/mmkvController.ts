
import { useEffect } from 'react';
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export default function mmkvController() {
    const [userKey, setUserKey] = useMMKVStorage('user_key', storage, 'user');

    const [userStorage, setUserStorage] = useMMKVStorage('user  ', storage, {
        auth: "",
        data: {
            height: 0,
            weight: 0,
            waistCircumference: 0,
            hipCircumference: 0,
            bodyTemperature: 0,
            bloodPressure: "",
            heartRate: "",
            bloodSugar: "dL",
            cholesterolLevels: "",
            firstName: "",    // Initialize with empty strings or default values
            lastName: "",
            birthday: "",
            gender: "",
            email: ""
        }
    })
    const [currentCondition, setCurrentCondition] = useMMKVStorage('current_condition', storage, "Healthy")

    const [medical, setMedical] = useMMKVStorage('medical', storage, {
        alergies: [] as string[],
        desieases: [] as string[],
        history: [] as object[],
    });

    const [meals, setMeals] = useMMKVStorage('meals', storage, [
        {
            "date": "2024-08-28",
            "breakfast": [
                {
                    "item": "Oatmeal",
                    "notes": "Low-sodium oats, avoid added sugar, cooked with water or unsweetened almond milk"
                },
                {
                    "item": "Banana",
                    "notes": "Potassium-rich, easy to digest"
                },
                {
                    "item": "Plain yogurt",
                    "notes": "Plain, low-fat yogurt, can be fortified with probiotics for gut health"
                }
            ],
            "lunch": [
                {
                    "item": "Grilled chicken salad",
                    "notes": "Grilled chicken breast, lettuce, spinach, cucumber, tomatoes, and a light vinaigrette dressing (avoid corn and peanuts)"
                },
                {
                    "item": "Brown rice",
                    "notes": "Good source of fiber, easy to digest"
                }
            ],
            "dinner": [
                {
                    "item": "Salmon",
                    "notes": "Lean protein source, rich in omega-3 fatty acids"
                },
                {
                    "item": "Roasted vegetables",
                    "notes": "Avoid corn, choose vegetables like broccoli, carrots, green beans, and sweet potatoes"
                },
                {
                    "item": "Quinoa",
                    "notes": "Gluten-free grain, good source of protein and fiber"
                }
            ]
        }
    ])


return { userStorage, setUserStorage, currentCondition, setCurrentCondition, medical, setMedical, setUserKey, meals, setMeals }
}