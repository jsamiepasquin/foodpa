import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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


export default function Medical() {


    const { userStorage, setUserStorage, currentCondition, medical, setMedical } = mmkvController()
    const { logout } = useAuthentication();

    const [mode, setMode] = useState('view')
    const [healthData, setHealthData] = useState<HealthDataState>(userStorage.data);
    const [modalValue, setModalValue] = useState("")
    const [category, setCategory] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [modalValueSecondary, setModaValueSecondary] = useState("")



    useEffect(() => {
        if (category) setModalVisible(true)
        else setModalVisible(false)
    }, [category])

    const handleSave = async () => {
        setUserStorage({ ...userStorage, data: healthData })
        setMode('view')
    }

    const deleteDisease = (index:number) => {
        // show alert confirmation before deleting.

        Alert.alert(
            "Delete Disease",
            "Are you sure you want to delete this disease?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    const diseases = medical.desieases.filter((val, i) => i !== index);
                    setMedical({...medical,desieases:diseases})

                } }
            ]
        );
    
        
    }
    const deleteAllergy = (index:number) => {
        // show alert confirmation before deleting.
        Alert.alert(
            "Delete Allergy",
            "Are you sure you want to delete this allergy?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    const allergies = medical.alergies.filter((val, i) => i !== index);
                    setMedical({...medical,alergies:allergies})

                } }
            ]
        );
    }
    const handleInfoSave = async () => {
        switch(category){
            case "allergies":
                const allergies = [...medical.alergies, modalValue];
                setMedical({...medical,alergies:allergies})
                break;
            case "diseases":
                const disease = [...medical.desieases, modalValue];
                setMedical({...medical,desieases:disease});
                break;
            case "history":
                const history = [...medical.history, {
                    diagnosis:modalValue,
                    date_diagnosed:modalValueSecondary
                }]
                setMedical({...medical,history:history})
        }
        setCategory("")
        setModalValue("")
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
                            {category == "diseases"?
                            <SelectList setSelected={(val:string)=>setModalValue(val)} data={[{key:0, value:"Diabetes"},{key:1, value:"Hypertension"},{key:2, value:"Obesity"}]} save="value"
                                    boxStyles={{width:'100%'}}
                                    placeholder="Select Disease"/>:
                            <TextInput mode="flat" placeholder={category} style={{borderBottomWidth:1}} value={modalValue} onChangeText={(val) => setModalValue(val)} />
}
                            {category == "history"?<TextInput mode="flat" style={{borderBottomWidth:1}} placeholder="Date known" inputMode="tel" value={modalValueSecondary} onChangeText={(val) => setModaValueSecondary(val)} />:""}
                            <Button mode="contained" onTouchEnd={handleInfoSave}>SAVE</Button>
                        </Modal>
                    </Portal>
                    {/*
                    <View style={profileStyles.topContainer} onTouchEnd={() => router.push('/status_update')}>
                        <View style={profileStyles.profileDetailsTop}>
                            <Text style={medicalStyle.medicalStatus}>{currentCondition}</Text>
                        </View>
                    </View>
                    <Text>Current Status</Text> */}

                    <Text style={profileStyles.sectionTitle}>Allergies</Text>
                    <View style={profileStyles.profileSection}>

                        {medical.alergies.map((val,index)=>(
                            <View style={{flexDirection:'row',gap:10,justifyContent:'space-between',paddingLeft:10,paddingRight:10}} key={val}>
                                <ProfileSectionInfo label="" value={val} mode="view" inputType={"text"} key={val} />
                                <Pressable onTouchEnd={()=>deleteAllergy(index)}><MaterialIcons name="delete" size={24} color={"red"}/></Pressable>
                                </View>
                        ))}

                        <Button buttonColor="#d9d9d9" textColor="black" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("allergies")}>ADD</Button>
                    </View>

                    <Text style={profileStyles.sectionTitle}>Diseases</Text>
                    <View style={profileStyles.profileSection}>

                        {medical.desieases.map((val,index)=>(
                            <View style={{flexDirection:'row',gap:10,justifyContent:'space-between',paddingLeft:10,paddingRight:10}} key={val}>
                                <ProfileSectionInfo label="" value={val} mode="view" inputType={"text"} key={val} />
                                <Pressable onTouchEnd={()=>deleteDisease(index)}><MaterialIcons name="delete" size={24} color={"red"}/></Pressable>
                                </View>
                        ))}
                    <Button buttonColor="#d9d9d9" textColor="black" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("diseases")}>ADD</Button>

                    </View>

                    <Text style={profileStyles.sectionTitle}>Medical History</Text>
                    <View style={profileStyles.profileSection}>
                    {medical.history.map((val,index)=>(
                            <ProfileSectionInfo label={val.diagnosis} value={val.date_diagnosed} mode="view" inputType={"text"} key={val} />
                        ))}
                    <Button buttonColor="#d9d9d9" textColor="black" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("history")}>ADD</Button>
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