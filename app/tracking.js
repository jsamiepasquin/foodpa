import { Image, StyleSheet, Platform, View, SafeAreaView, ScrollView, Text } from 'react-native';
import { Button, PaperProvider, TextInput } from 'react-native-paper';
import { theme } from '../configs/theme';
import profileStyle from '../assets/styles/profileStyles'
import bmiStyle from '@/assets/styles/bmiStyles'
import { Modal, Portal } from "react-native-paper";
import meals from './../store/foods.json'
import mmkvController from "./../store/mmkvController";
import useLogin from '../hooks/login/useLogin';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Tracking() {

    const dateToday = new Date().toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const [logMealModal, setLogMealModal] = useState(false)
    const { mealHistory, setMealHistory } = mmkvController()
    const [mealStats, setMealStats] = useState({ sugar: 0, carbohydrates: 0 })
    const [historyKey, setHistoryKey] = useState(dateToday)
    const [mealDates, setMealDates] = useState([])
    const [foods, setFoods] = useState([])
    const [foodSelected, setFoodSelected] = useState({
        food: {},
        quantity: 0,

    })

    useEffect(() => {
        const mfoods = meals.meals.map((data, idx) => { return { key: idx, value: data.name } })
        setFoods(mfoods)
    }, [])

    useEffect(() => {
        let newStats = mealStats
        for (let i = 0; i < mealHistory.length; i++) {
            const meal = mealHistory[i];
            if (meal.date == historyKey) {
                newStats = {
                    sugar: parseInt(newStats.sugar) + parseInt(meal.sugar),
                    carbohydrates: parseInt(newStats.carbohydrates) + parseInt(meal.carbohydrates)
                }
            }
        }
        setMealStats(newStats)

        console.log(getMealDays())
        setMealDates(getMealDays())
        console.log("history key", historyKey)
        console.log('mealhistory', mealHistory)
    }, [mealHistory])

    const saveFoodSelected = () => {
        console.log(foodSelected)
        const mealSelected = meals.meals.filter((data) => data.name == foodSelected.food)
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

        const newMeal = { ...mealSelected[0], date: date, time: time }
        console.log(newMeal)
        setMealHistory([...mealHistory,
            newMeal
        ])
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

    return (
        <SafeAreaView
            style={{ flex: 1 }}>
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
                            <TextInput mode='flat' label="Quantity" inputMode='numeric' onChangeText={(val) => { setFoodSelected({ ...foodSelected, quantity: val }) }} value={foodSelected.quantity} />
                            <Button mode="contained" onTouchEnd={saveFoodSelected}>SAVE</Button>
                        </Modal>
                    </Portal>

                    <Text>Your Stats Today</Text>

                    <View style={{
                        flex: 0,
                        gap: 20,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginBottom: 50
                    }}>
                        <View style={styles.topContainer}>
                            <Text style={styles.bmiStat}>{mealStats.sugar}</Text>
                            <Text>Sugar Intake</Text>
                        </View>
                        <View style={styles.topContainer}>
                            <Text style={styles.bmiStat}>{mealStats.carbohydrates}</Text>
                            <Text>Carbohydrate Intake</Text>
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
                                        <Text style={styles.trackItemName}>{data.name}</Text>
                                        <Text>{data.date}</Text>
                                    </View>
                                    <Text>Sugar {data.sugar}, Carbohydrate {data.carbohydrates}</Text>
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
        width: '45%',
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
        fontSize: 80,
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