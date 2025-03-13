import { Text, View, SafeAreaView, ScrollView, Alert, StyleSheet, Pressable } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import mmkvController from "@/store/mmkvController";
import settings from '@/configs/settings.json'
import axios from "axios";
import { calculateAge } from "@/helpers/helper";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors"
import useGemini from "@/hooks/useGemini";
import { router } from "expo-router";
import foods1 from './../../store/foods1.json';
import { FontAwesome } from "@expo/vector-icons";
import MealItem from '../../components/mealItem'
export default function Meals() {

  const { generateMealPlan } = useGemini();
  const { userStorage, setUserStorage, meals, setMeals, medical, currentCondition } = mmkvController()
  const [loading, setLoading] = useState(false)
  const [targetNutrition, setTargetNutrition] = useState({ age: 25, calories: "0", protein: "0", carbohydrates: "0", fats: "0" })


  useEffect(() => {
     generateTargetNutrition()
  }, [])

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


  const getBmi = () => {
    const healthData = userStorage.data
    const w = healthData.weight
    const h = healthData.height
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);

    return parseFloat(bmi.toFixed(2));
  }
  const handleMealPlan = async () => {
    setLoading(true)
    const url = settings.server_url + "/users/generate-meal-plan";
    const userData = userStorage.data
    const age = calculateAge(userData.birthday)
    const bmi = getBmi()


    const medicalHistory = JSON.stringify(medical.history);
    const alergies = JSON.stringify(medical.alergies);
    const diseases = JSON.stringify(medical.desieases);


    const mealRequest = await generateMealPlan({
      age: age, gender: userData.gender, feeling: currentCondition, current_diseases: diseases,
      bmi: bmi, allergies: alergies, medical_history: medicalHistory
    })

    setMeals([...meals, mealRequest.meal_plan])
    setLoading(false)

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

  const handleReset = () => {
    Alert.alert('Reset Meal Plan', 'Are you sure to wipe out all your meal plans?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => setMeals([]) },
    ]);
  }

  const generateTargetNutrition = () => {
    const hypertension = [
      { age: 25, calories: "1000-1200", protein: "38-75g", carbohydrates: "113-165g", fats: "28-47g" },
      { age: 30, calories: "1200-1400", protein: "45-88g", carbohydrates: "135-193g", fats: "33-54g" },
      { age: 35, calories: "1400-1600", protein: "53-100g", carbohydrates: "158-200g", fats: "39-62g" },
      { age: 40, calories: "1600-1800", protein: "60-113g", carbohydrates: "180-248g", fats: "44-70g" },
      { age: 45, calories: "1800-2000", protein: "68-125g", carbohydrates: "203-275g", fats: "50-78g" },
      { age: 50, calories: "2000-2200", protein: "75-125g", carbohydrates: "225-303g", fats: "56-86g" },
      { age: 55, calories: "2200-2400", protein: "83-150g", carbohydrates: "248-330g", fats: "61-93g" },
      { age: 60, calories: "2400-2600", protein: "90-163g", carbohydrates: "270-358g", fats: "67-101g" }
  ];
  
  const obesityTargets = [
      { age: 25, calories: "800-1000", protein: "50-88g", carbohydrates: "70-113g", fats: "18-33g" },
      { age: 30, calories: "900-1200", protein: "56-105g", carbohydrates: "79-135g", fats: "22-40g" },
      { age: 35, calories: "1000-1400", protein: "63-123g", carbohydrates: "88-158g", fats: "22-47g" },
      { age: 40, calories: "1200-1500", protein: "75-131g", carbohydrates: "105-169g", fats: "27-50g" },
      { age: 45, calories: "1300-1600", protein: "81-140g", carbohydrates: "114-180g", fats: "29-53g" },
      { age: 50, calories: "1400-1800", protein: "88-158g", carbohydrates: "123-203g", fats: "31-60g" },
      { age: 55, calories: "1500-1900", protein: "94-166g", carbohydrates: "131-214g", fats: "33-63g" },
      { age: 60, calories: "1600-2000", protein: "100-175g", carbohydrates: "140-225g", fats: "36-67g" }
  ];
  
  const diabetesTargets = [
      { age: 25, calories: "900-1100", protein: "45-83g", carbohydrates: "90-138g", fats: "25-43g" },
      { age: 30, calories: "1000-1300", protein: "50-98g", carbohydrates: "113-163g", fats: "28-36g" },
      { age: 35, calories: "1100-1400", protein: "55-105g", carbohydrates: "110-175g", fats: "31-55g" },
      { age: 40, calories: "1200-1600", protein: "60-120g", carbohydrates: "120-200g", fats: "32-36g" },
      { age: 45, calories: "1300-1700", protein: "65-128g", carbohydrates: "130-213g", fats: "36-66g" },
      { age: 50, calories: "1400-1800", protein: "70-135g", carbohydrates: "140-225g", fats: "39-70g" },
      { age: 55, calories: "1500-1900", protein: "75-143g", carbohydrates: "150-238g", fats: "42-74g" },
      { age: 60, calories: "1600-2000", protein: "80-150g", carbohydrates: "160-250g", fats: "44-78g" }
  ];

  const healthyTargets = [
    { age: 25, calories: "1800-2200", protein: "50-100g", carbohydrates: "250-350g", fats: "50-70g" },
    { age: 30, calories: "2000-2400", protein: "55-110g", carbohydrates: "260-370g", fats: "55-80g" },
    { age: 35, calories: "2200-2600", protein: "60-120g", carbohydrates: "270-380g", fats: "60-90g" },
    { age: 40, calories: "2400-2800", protein: "65-130g", carbohydrates: "280-400g", fats: "65-100g" },
    { age: 45, calories: "2500-2900", protein: "70-140g", carbohydrates: "290-420g", fats: "70-110g" },
    { age: 50, calories: "2600-3000", protein: "75-150g", carbohydrates: "300-440g", fats: "75-120g" },
    { age: 55, calories: "2700-3100", protein: "80-160g", carbohydrates: "310-460g", fats: "80-130g" },
    { age: 60, calories: "2800-3200", protein: "85-170g", carbohydrates: "320-480g", fats: "85-140g" }
];

  const diseases = medical.desieases;
  const latestDisease = diseases[diseases.length - 1]??'';
  let targetNutritioRange = null;
  if (latestDisease.toLocaleLowerCase() === 'obesity') {
    targetNutritioRange = obesityTargets
  } else if (latestDisease.toLocaleLowerCase() === 'diabetes') {
    targetNutritioRange = diabetesTargets
  } else if (latestDisease.toLocaleLowerCase() === 'hypertension') {
    targetNutritioRange = hypertension
  }else
  {
    targetNutritioRange = healthyTargets
  }

  let _targetNutrition = null;
  let age = calculateAge(userStorage.data.birthday);

  for (const value of targetNutritioRange) {
    if (value.age >= age && value.age+5 >= age) {
        return setTargetNutrition(value);
    }
}


  setTargetNutrition(_targetNutrition);


  }
  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
            <View style={{
                marginTop: 40,
                padding: 20,
                flex: 0,
                justifyContent: 'space-between',
                flexDirection:'row',
                alignItems:'center'
            }}>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10 }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold'
                    }}>Meals</Text>
                </View>
                <Pressable onTouchEnd={()=>router.push('/editmeals')}>
                <FontAwesome name="pencil" size={24} color="black" />
                </Pressable>
            </View>

      <ScrollView style={{ flex: 1, width: '100%' }}>

        <View style={{
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10
        }}>
          <Text style={{ textAlign: 'start', marginBottom: 30, marginTop: 20, fontWeight: 'bold' }}>Your target tats for today</Text>
          <View iew style={{
            flex: 0,
            gap: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
            <View style={[styles.topContainer,{
              backgroundColor:Colors.protein.background,
           }]}>
              <Text style={[styles.bmiStat,{color:'white'}]}>{targetNutrition.protein}</Text>
              <Text style={{color:Colors.protein.text}}>Protein Target (g)</Text>
            </View>
            <View style={[styles.topContainer,{backgroundColor:Colors.carbohydrates.background}]}>
              <Text style={[styles.bmiStat,{color:Colors.carbohydrates.text}]}>{targetNutrition.calories}</Text>
              <Text style={{color:Colors.carbohydrates.text}}>Calories (g) </Text>
            </View>
          </View>
          <View style={{
            flex: 0,
            gap: 20,
            justifyContent: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
            <View style={[styles.topContainer,{backgroundColor:Colors.sugar.background}]}>
              <Text style={[styles.bmiStat,{color:Colors.sugar.text}]}>{targetNutrition.carbohydrates}</Text>
              <Text style={{color:'white'}}>Carbohydrates (g)</Text>
            </View>
            <View style={[styles.topContainer,{backgroundColor:Colors.fats.background}]}>
              <Text style={[styles.bmiStat,{color:Colors.fats.text}]}>{targetNutrition.fats}</Text>
              <Text style={{color:'black'}}>Fats Target (g)</Text>
            </View>
          </View>

          {meals.map((m, i) => (
            <View style={{
              flex: 0,
              width: '100%',
              padding: 10,
              gap: 5
            }} key={i}>
              <Text style={{ fontWeight: 'bold', textAlign: 'right' }}>Meals for today</Text>
              <Text style={{ fontWeight: 'bold' }}>Breakfast</Text> 
              {m.breakfast.map((b, bi) => (
                <MealItem b={b} bi={bi}/>
              ))}
              <Text style={{ fontWeight: 'bold' }}>Lunch</Text>
              {m.lunch.map((b, bi) => (
                <MealItem b={b} bi={bi}/>
              ))}
              <Text style={{ fontWeight: 'bold' }}>Dinner</Text>
              {m.dinner.map((b, bi) => (
                <MealItem b={b} bi ={bi}/>
              ))}
            </View>
          ))}
          {loading ? <ActivityIndicator animating={true} size={40} /> : ''}
          <View style={{ gap: 10, marginTop: 20 }}>
            <Button mode="contained" textColor="white" onTouchEnd={generateOfflineMeals}>Generate Meal Plan</Button>
            <Button mode="contained" textColor="white" buttonColor="red" onTouchEnd={handleReset}>Reset Meal Plan</Button>

            <View style={{
              marginTop: 50,
              flex: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ fontWeight: 'bold' }}>Disclaimer</Text>
              <Text>
                The FooD PA app is specifically designed for the individual with obesity hypertension and diabetes it is not intended for use by people with other health conditions if you have any of these conditions consult your dietitian or nutritionist before following the apps recommendations.
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  mainContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    padding: 20,
    gap: 10,
  },
  topContainer: {
    height: 'auto',
    width: '48%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0.02,
    elevation: 3,
    gap: 5,
    padding: 20,
  },
  resultContainer: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0.02,
    elevation: 3,
    gap: 5,
    padding: 20,
    backgroundColor: '#FAFFAF'
  },
  bmiWeightCard: {
    backgroundColor: 'white',
    flex: 0,
    width: '100%',
    height: 'auto',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0.02,
    elevation: 3,
    gap: 5,
    padding: 20
  },
  bmiWeightCardInner: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  bmiStat: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bmiStatResult: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  weightStat: {
    fontSize: 30,
  },
  //    bmiButtonAdd:{
  //     width:100,
  //     height:100
  //    }
  mealTrack: {
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0.02,
    elevation: 3,
    padding: 20,
    backgroundColor: 'white'
  },
  trackItem: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#616362'
  },
  trackItemTitle: {
    flex: 0,
    justifyContent: 'flex-start'
  },
  trackItemName: {
    fontWeight: 'bold'
  }
});