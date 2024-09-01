import { Text, View, SafeAreaView, ScrollView, Alert } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import mmkvController from "@/store/mmkvController";
import settings from '@/configs/settings.json'
import axios from "axios";
import { calculateAge } from "@/helpers/helper";
import { useEffect, useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import useGemini from "@/hooks/useGemini";

export default function Meals() {

  const {generateMealPlan} = useGemini();
  const { userStorage, setUserStorage, meals, setMeals, medical, currentCondition } = mmkvController()
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    console.log('meals', meals)
  }, [])
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

  const handleReset = () => {
    Alert.alert('Reset Meal Plan', 'Are you sure to wipe out all your meal plans?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => setMeals([])},
    ]);
  }
  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>

        <View style={{
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 10
        }}>
          <Text style={{textAlign:'center',marginBottom:10}}>Your current condition</Text>
          <Text style={{
                    fontSize:20,
                    textAlign:'center',
                    fontWeight:'bold',
                    padding:10,
                    color:'white',
                    borderRadius:10,
                    backgroundColor:'grey',
                }}>{currentCondition}</Text>

          {meals.map((m, i) => (
            <View style={{
              flex: 0,
              width: '100%',
              padding: 10,
              gap: 5
            }} key={i}>
              <Text style={{ fontWeight: 'bold', textAlign:'right' }}>Meal for day {i+1}</Text>
              <Text style={{fontWeight:'bold'}}>Breakfast</Text>
              {m.breakfast.map((b, bi) => (
                <View style={{
                  flex: 0,
                  backgroundColor: 'white',
                  elevation: 2,
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10
                }}>
                  <Text style={{ fontWeight: 'bold' }}>{b.item}</Text>
                  <Text>{b.notes}</Text>

                </View>
              ))}
              <Text style={{fontWeight:'bold'}}>Lunch</Text>
              {m.lunch.map((b, bi) => (
                <View style={{
                  flex: 0,
                  backgroundColor: 'white',
                  elevation: 2,
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10
                }}>
                  <Text style={{ fontWeight: 'bold' }}>{b.item}</Text>
                  <Text>{b.notes}</Text>

                </View>
              ))}
              <Text style={{fontWeight:'bold'}}>Dinner</Text>
              {m.dinner.map((b, bi) => (
                <View style={{
                  flex: 0,
                  backgroundColor: 'white',
                  elevation: 2,
                  padding: 10,
                  borderRadius: 10,
                  marginBottom: 10
                }}>
                  <Text style={{ fontWeight: 'bold' }}>{b.item}</Text>
                  <Text>{b.notes}</Text>

                </View>
              ))}
            </View>
          ))}
          {loading?<ActivityIndicator animating={true}size={40}/>:''}
          <View style={{gap:10, marginTop:20}}>
          <Button mode="contained" textColor="white" onTouchEnd={handleMealPlan}>Generate Meal Plan</Button>
          <Button mode="contained" textColor="white" buttonColor="red" onTouchEnd={handleReset}>Reset Meal Plan</Button>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>




  );
}
