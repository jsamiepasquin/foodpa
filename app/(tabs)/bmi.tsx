import { Text, View, ScrollView, Alert } from "react-native";
import { SafeAreaView, } from "react-native-safe-area-context";
import profileStyle from "@/assets/styles/profileStyles";
import bmiStyle from '@/assets/styles/bmiStyles'
import { Button } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import mmkvController from "@/store/mmkvController";
import HealthDataState from '@/interface/HealthDataState'
import { useEffect, useState } from "react";
import {getBMICategory} from '@/helpers/helper'

export default function Bmi() {

  const { userStorage, setUserStorage } = mmkvController()
  const [healthData, setHealthData] = useState<HealthDataState>(
    userStorage.data);

    const [bmi, setBmi] = useState(0);
    const [bmiCategory, setBmiCategory] = useState("Healty")

    useEffect(()=>{
      setHealthData(userStorage.data)
    },[userStorage.data])

    useEffect(()=>{
      let tbmi = getBmi()
      setBmi(tbmi)
      setBmiCategory(getBMICategory(bmi))
    },[healthData.height, healthData.weight])
  const getBmi = () => {
    const w = healthData.weight
    const h = healthData.height

    if(w <= 0) {
      Alert.alert('Information','Please update your weight first.')
      return 0
    }
    if(h <= 0){
      Alert.alert('Information','Please update your height first')
      return 0
    }


    const heightInMeters = h / 100; 
    const bmi = w / (heightInMeters * heightInMeters);

    return parseFloat(bmi.toFixed(2));
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={bmiStyle.mainContainer}>
          <View style={bmiStyle.resultContainer}>
            <Text style={bmiStyle.bmiStatResult}>{bmiCategory}</Text>
            <Text>Result</Text>
          </View>
          <View style={bmiStyle.topContainer}>
            <Text style={bmiStyle.bmiStat}>{bmi}</Text>
            <Text>Your BMI</Text>
          </View>

          {/* WEIGHT */}
          <View style={bmiStyle.bmiWeightCard}>
            <View style={bmiStyle.bmiWeightCardInner}>
              <BmiButton icon="remove" onTouchEnd={()=> setHealthData({...healthData,weight:healthData.weight-1})}/>
              <Text style={bmiStyle.weightStat}>{healthData.weight}</Text>
              <BmiButton icon="add" onTouchEnd={()=> setHealthData({...healthData,weight:healthData.weight+1})}/>
            </View>
            <Text>Weight</Text>
          </View>
          {/* HEGHT */}
          <View style={bmiStyle.bmiWeightCard}>
            <View style={bmiStyle.bmiWeightCardInner}>
              <BmiButton icon="remove" onTouchEnd={()=> setHealthData({...healthData,height:healthData.height-1})}/>
              <Text style={bmiStyle.weightStat}>{healthData.height}</Text>
              <BmiButton icon="add" onTouchEnd={()=> setHealthData({...healthData,height:healthData.height+1})}/>
            </View>
            <Text>Height</Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface BmiButtonProps {
  icon: string;
  onTouchEnd: () =>void
}
const BmiButton: React.FC<BmiButtonProps> = ({ icon,onTouchEnd }) => (
  <View style={{
    backgroundColor: '#ededed',
    height: 'auto',
    borderRadius: 10,
    elevation: 2,
    paddingLeft: 15,
    paddingRight: 15
  }} onTouchEnd={onTouchEnd}><Ionicons name={icon} size={40} /></View>
)