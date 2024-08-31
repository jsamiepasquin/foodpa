import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import profileStyles from "@/assets/styles/profileStyles";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { styles } from "@/assets/styles/login.styles";
import ProfileSectionInfo from "@/components/profile/ProfileSectionInfo";
import { useState } from "react";
import { Button } from "react-native-paper";
import { auth, calculateAge } from '@/helpers/helper'
import useAuthentication from '@/hooks/useAuthentication';
import mmkvController from '@/store/mmkvController'
import HealthDataState from '@/interface/HealthDataState'
import { SelectList } from "react-native-dropdown-select-list";
import { router } from "expo-router";


export default function StatusUpdate() {


    const { userStorage, setUserStorage,currentCondition,setCurrentCondition } = mmkvController()
    const { logout } = useAuthentication();

    const [mode, setMode] = useState('view')
    const [healthData, setHealthData] = useState<HealthDataState>(
        userStorage.data);
        const [selected, setSelected] = useState(currentCondition);


        const data = [
            {key:0, value:"Healthy"},
            {key:1, value:"Common Cold"},
            {key:2, value:"Headache"},
            {key:3, value:"Stomach Ache"},
            {key:4, value:"Sore Throat"},
            {key:5, value:"Cough"},
            {key:6, value:"Fever"},
            {key:7, value:"Allergies"},
            {key:8, value:"Muscle Aches"},
            {key:9, value:"Diarrhea"},
            {key:10, value:"Fatigue"}
        ]

    const handleSave = async () => {
        setUserStorage({ ...userStorage, data: healthData })
        setMode('view')
    }
    const logoutHandle = async () => {
        logout()
    }

    const handleSaving = () => {
        setCurrentCondition(selected)
        router.back()
    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1, width: '100%' }}>

               <View style={{
                flex:1,
                padding:10,
                paddingLeft:15,
                paddingRight:15
               }}>
               <View style={{
                width:'100%',
                backgroundColor:'white',
                padding:10,
                borderRadius:10,
                elevation:1,
                gap:10,
                flex:0,
                justifyContent:'center',
                alignItems:'center'
               }}>
                <Text style={{
                    fontSize:20,
                    fontWeight:'bold',
                    marginLeft:40,
                    marginRight:40,
                    marginTop:20,
                    marginBottom:20,
                    textAlign:'center'
                   
                }}>Describe what you feel right now</Text>
                <Text style={{
                    textAlign:'center',
                }}>I'm having/I'm feeling</Text>
                <Text style={{
                    fontSize:20,
                    textAlign:'center',
                    fontWeight:'bold',
                    padding:10,
                    color:'white',
                    borderRadius:10,
                    backgroundColor:'grey',


                }}>{selected}</Text>
               <SelectList setSelected={(val:string)=>setSelected(val)} data={data} save="value"
                    boxStyles={{width:'100%'}}
                    placeholder="Select Health Status"/>

                    <Button mode="contained" textColor="white" onTouchEnd={handleSaving}>Save</Button>
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
    }
});