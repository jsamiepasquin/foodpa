import { StyleSheet, Platform, View, SafeAreaView, ScrollView, Text, Pressable } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Modal, Portal } from "react-native-paper";
import mmkvController from "./../../store/mmkvController";
import { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import meals from '../../store/foods.json'
import foods1 from '../../store/foods1.json'
import { Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import useAuthentication from '../../hooks/useAuthentication';
import { router } from 'expo-router';
import {Colors} from '../../constants/Colors'

export default function Index() {
    const { logout } = useAuthentication();
    const dateToday = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const [logMealModal, setLogMealModal] = useState(false)
    const { mealHistory, setMealHistory } = mmkvController()

    const [mealStats, setMealStats] = useState({ carbohydrates: 0, calories: 0,protein:0, fats:0 })
    const [historyKey, setHistoryKey] = useState(dateToday)
    const [mealDates, setMealDates] = useState([])
    const [foodSelected, setFoodSelected] = useState({
        food: {},
        quantity: 0,
    })
    const [menu, setMenu] = useState(false)

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

        updateStats(mealHistory)

    },[mealHistory])

    const updateStats = (newMeals) => {
        let newStats = {carbohydrates:0, calories:0,protein:0,fats:0}
        for (let i = 0; i < mealHistory.length; i++) {
            const meal = newMeals[i];
            if (meal.date == historyKey) {
                newStats = {
                    carbohydrates: parseFloat(newStats.carbohydrates) + parseFloat(meal.carbohydrates),
                    calories: parseFloat(newStats.calories) + parseFloat(meal.calories),
                    protein:parseFloat(newStats.protein) + parseFloat(meal.protein),
                    fats:parseFloat(newStats.fats??0) + parseFloat(meal.fats??0)
                }
            }
        }
        setMealStats(newStats)
    }

    const saveFoodSelected = () => {
        console.log(foodSelected)
        const mealSelected = foodsData.filter((data) => data.food == foodSelected.food)
        setLogMealModal(false)
        const currentDate = new Date();
        const date = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const time = currentDate.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });

        const newMeal = { ...mealSelected[0], date: date, time: time, quantity:foodSelected.quantity }
        const newMeals  =[...mealHistory,newMeal]
        console.log(newMeal)
        setMealHistory(newMeals)
        setMealDates(getMealDays())
    }

    const getMealDays = () => {
        var dates = {};
        for (let i = 0; i < mealHistory.length; i++) {
            const data = mealHistory[i];
            dates[data.date] = data.date
            console.log(data.date)
        }

        console.log('dates', dates)
        return Object.keys(dates)

    }

    const feedback =()=> {
        setMenu(false)
        router.navigate('/feedback')

    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}>

            <View style={{
                marginTop: 40,
                padding: 20,
                flex: 0,
                justifyContent: 'space-between',
                flexDirection:'row',
                alignItems:'center'
            }}>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10 }}>
                    <Image style={{
                        width: 40,
                        borderRadius: 100,
                        height: 40
                    }} source={require('@/assets/images/adaptive-icon.png')} />
                    <Text style={{
                        fontSize: 20,
                        fontWeight:'bold'
                    }}>Dashboard</Text>
                </View>
                <Pressable onPress={()=>setMenu(true)}>
                <FontAwesome6 name="bars" size={24} color="black" />
                </Pressable>
            </View>
            <ScrollView style={{ flex: 1, width: '100%' }}>

                <View style={styles.mainContainer}>

                    <Portal>

                        <Modal theme={{
                            colors: {
                                backdrop: 'rgba(138, 138, 138, 0.8)',
                            },
                        }}
                            visible={logMealModal} onDismiss={() => setLogMealModal(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, gap: 30 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>What did you eat?</Text>
                            <SelectList setSelected={(val) => setFoodSelected({ ...foodSelected, food: val })} data={foods} save="value" boxStyles={{ width: '100%' }} placeholder="Select food you ate" />
                            <TextInput mode='flat' label="Quantity (g)" inputMode='numeric' onChangeText={(val) => { setFoodSelected({ ...foodSelected, quantity: val }) }} value={foodSelected.quantity} />
                            <Button mode="contained" onTouchEnd={saveFoodSelected}>SAVE</Button>
                        </Modal>
                        <Modal theme={{
                            colors: {
                                backdrop: 'rgba(138, 138, 138, 0.8)',
                                    },
                                }}
                            visible={menu} onDismiss={() => setMenu(false)} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10, gap: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Menu</Text>
                            <Button mode="contained"  textColor="white" onTouchEnd={feedback}>Feedback</Button>
                            <Button mode="contained" buttonColor="gray" textColor="white" onTouchEnd={logout}>Logout</Button>
                        </Modal>
                    </Portal>

                    <Text>Your Stats Today</Text>

                    <View style={{
                        flex: 0,
                        gap: 20,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}>
                        <View style={[styles.topContainer,{backgroundColor:Colors.sugar.background}]}>
                            <Text style={[styles.bmiStat,{color:Colors.sugar.text}]}>{mealStats.carbohydrates.toFixed(1)}</Text>
                            <Text style={{color:Colors.sugar.text}}>Carbohydrate Intake</Text>
                        </View>
                        <View style={[styles.topContainer,{backgroundColor:Colors.carbohydrates.background}]}>
                            <Text style={[styles.bmiStat,{color:Colors.carbohydrates.text}]}>{mealStats.calories.toFixed(1)}</Text>
                            <Text style={{color:Colors.carbohydrates.text}}>Calories Intake</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 0,
                        gap: 20,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginBottom: 50,}}>
                    <View style={[styles.topContainer,{backgroundColor:Colors.fats.background}]}>
                            <Text style={styles.bmiStat}>{mealStats.fats.toFixed(1)}</Text>
                            <Text>Fats</Text>
                        </View>
                        <View style={[styles.topContainer,{backgroundColor:Colors.protein.background}]}>
                            <Text style={[styles.bmiStat,{color:Colors.protein.text}]}>{mealStats.protein.toFixed(1)}</Text>
                            <Text style={{color:Colors.protein.text}}>Protein</Text>
                        </View>
                    </View>
                    <Button mode="contained" textColor="white" onTouchEnd={() => setLogMealModal(true)}>Log Meal</Button>


                    <View style={styles.mealTrack}>
                        <View style={{ flex: 0, justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: 'row' }}>
                            <Text style={{ fontWeight: 'bold' }}>Meal History</Text>

                        </View>
                        <SelectList setSelected={(val) => setHistoryKey(val)} data={mealDates} save="value" boxStyles={{ width: '100%', marginTop: 30, marginBottom: 20 }} placeholder={dateToday} />
                        {mealHistory.map((data, idx) => (
                            data.date == historyKey ? (
                                <View style={styles.trackItem} key={idx}>
                                    <View style={styles.trackItemTitle}>
                                        <Text style={styles.trackItemName}>{data.quantity} x {data.food}</Text>
                                        <Text>{data.date}</Text>
                                        <Text>Calories: {data.calories}, Carbohydrate  {data.carbohydrates}</Text>
                                        <Text>Protein: {data.protein}</Text>
                                        <Text>fats: {data.fats}</Text>
                                    </View>
                                    <Text> Servings: {data.serving_size}</Text>
                                </View>
                            ) : ''
                        ))}

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
        fontSize: 40,
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