import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import profileStyles from "@/assets/styles/profileStyles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { styles } from "@/assets/styles/login.styles";
import ProfileSectionInfo from "@/components/profile/ProfileSectionInfo";
import { useEffect, useState } from "react";
import { Button, Modal, Portal, TextInput } from "react-native-paper";
import { auth, calculateAge } from '@/helpers/helper'
import useAuthentication from '@/hooks/useAuthentication';
import mmkvController from '@/store/mmkvController'
import HealthDataState from '@/interface/HealthDataState'
import { router } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import foods1 from './../store/foods1.json';
import MealItem from "@/components/mealItem";
import mealItem from "@/components/mealItem";


export default function EditMeals() {


    const { userStorage, setUserStorage,  meals, setMeals } = mmkvController()

    const [mode, setMode] = useState('view')
    const [healthData, setHealthData] = useState<HealthDataState>(userStorage.data);
    const [modalValue, setModalValue] = useState("")
    const [category, setCategory] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [modalValueSecondary, setModaValueSecondary] = useState("")
    const [foods, setFoods] = useState([])
    const [foodsData, setFoodsData] = useState([])

    useEffect(()=>{
        let combined_foods = []

        for (let key in foods1) {
            if (foods1.hasOwnProperty(key)) { // Check if the property is an own property
                combined_foods = [...combined_foods, ...foods1[key]]
            }
        }
        setFoodsData(combined_foods)
        setFoods(combined_foods.map((fdata, idx)=>{
            return {
                id:idx,value:fdata.food
            }
        }))

        console.log('combined',combined_foods)
    },[])

    useEffect(() => {
        if (category) setModalVisible(true)
        else setModalVisible(false)
    }, [category])

    const handleSave = async () => {
        setMode('view')
    }
    const handleInfoSave = async () => {
        console.log('modalvalue', modalValue)

        const foodSelected  = foodsData.filter((fvalue,idx)=>fvalue.food==modalValue)[0]??null

        const newMeal = {
            breakfast:meals[0].breakfast??[],
            lunch:meals[0].lunch??[],
            dinner:meals[0].dinner??[]
           }

        switch(category){
            case "breakfast":
                newMeal.breakfast =meals[0]? [...meals[0].breakfast, foodSelected]:newMeal.breakfast = [foodSelected]
                break;
            case "lunch":
                newMeal.lunch =meals[0]? [...meals[0].lunch, foodSelected]:newMeal.lunch = [foodSelected]
                break;
            case "dinner":
                newMeal.dinner =meals[0]? [...meals[0].dinner, foodSelected]:newMeal.dinner = [foodSelected]
                break;
        }

        setMeals([newMeal])

        
        setCategory("")
        setModalValue("")
    }

    const handleRemove = (idx, mealCat) => {
        let newMeal = {
            breakfast:meals[0].breakfast??[],
            lunch:meals[0].lunch??[],
            dinner:meals[0].dinner??[]
           }

        switch(mealCat){
            case "breakfast":
                newMeal.breakfast.splice(idx,1)
                break;
            case "lunch":
                newMeal.lunch.splice(idx,1)
                break;
            case "dinner":
                newMeal.dinner.splice(idx,1)
                break;
        }

        setMeals([newMeal])
    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1, width: '100%' }}>

                <View style={profileStyles.mainContainer}>
                    <Portal>

                        <Modal theme={{
                            colors: {
                                backdrop: 'rgba(138, 138, 138, 0.8)',
                            },
                        }}
                            visible={modalVisible} onDismiss={() => setCategory("")} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, gap: 30 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Input {category}</Text>
                            <SelectList setSelected={(val:string)=>setModalValue(val)} data={foods} save="value"
                                    boxStyles={{width:'100%'}}
                                    placeholder="Select Food"/>
                            <Button mode="contained" onTouchEnd={handleInfoSave}>SAVE</Button>
                        </Modal>
                    </Portal>

                    <Text style={profileStyles.sectionTitle}>Breakfast</Text>
                    <View style={medicalStyle.mealSection}>

                        {meals[0]?.breakfast?.map((val,index)=>(
                            <View style={medicalStyle.mealItem} key={val.food}>
                                <Pressable onTouchEnd={()=>handleRemove(index,'breakfast')}><MaterialIcons name="delete" size={24} color={"red"}/></Pressable>
                                <MealItem b={val} bi={index} />
                            </View>
                        ))}

                        <Button buttonColor="#d9d9d9" textColor="black" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("breakfast")}>ADD</Button>
                    </View>

                    <Text style={profileStyles.sectionTitle}>Lunch</Text>
                    <View style={medicalStyle.mealSection}>

                        {meals[0]?.lunch?.map((val,index)=>(
                            <View style={medicalStyle.mealItem} key={val.food}>
                                <Pressable onTouchEnd={()=>handleRemove(index,'lunch')}><MaterialIcons name="delete" size={24} color={"red"}/></Pressable>
                                <MealItem b={val} bi={index} />
                            </View>
                        ))}

                        <Button buttonColor="#d9d9d9" textColor="black" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("lunch")}>ADD</Button>
                    </View>

                    <Text style={profileStyles.sectionTitle}>Dinner</Text>
                    <View style={medicalStyle.mealSection}>

                        {meals[0]?.dinner?.map((val,index)=>(
                            <View style={medicalStyle.mealItem} key={val.food}>
                                <Pressable onTouchEnd={()=>handleRemove(index,'dinner')}><MaterialIcons name="delete" size={24} color={"red"}/></Pressable>
                                <MealItem b={val} bi={index} />
                            </View>
                        ))}

                        <Button buttonColor="#d9d9d9" textColor="black" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("dinner")}>ADD</Button>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}


const medicalStyle = StyleSheet.create({
    medicalStatus: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    mealSection:{
        flex:0,
        width:'100%',
        flexDirection:"column"
    },
    mealItem:{
        flex:0,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'flex-start',
        gap:20
    }
});