import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import profileStyles from "@/assets/styles/profileStyles";
import { Ionicons } from "@expo/vector-icons";
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
    const handleInfoSave = async () => {
        switch(category){
            case "alergies":
                const alergies = [...medical.alergies, modalValue];
                setMedical({...medical,alergies:alergies})
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
                            <TextInput mode="flat" placeholder={category} style={{borderBottomWidth:1}} value={modalValue} onChangeText={(val) => setModalValue(val)} />
                            {category == "history"?<TextInput mode="flat" style={{borderBottomWidth:1}} placeholder="Date known" inputMode="tel" value={modalValueSecondary} onChangeText={(val) => setModaValueSecondary(val)} />:""}
                            <Button mode="contained" onTouchEnd={handleInfoSave}>SAVE</Button>
                        </Modal>
                    </Portal>
                    <View style={profileStyles.topContainer} onTouchEnd={() => router.push('/status_update')}>
                        <View style={profileStyles.profileDetailsTop}>
                            <Text style={medicalStyle.medicalStatus}>{currentCondition}</Text>
                        </View>
                    </View>
                    <Text>Current Status</Text>

                    <Text style={profileStyles.sectionTitle}>Alergies</Text>
                    <View style={profileStyles.profileSection}>

                        {medical.alergies.map((val,index)=>(
                            <ProfileSectionInfo label="" value={val} mode="view" inputType={"text"} key={val+index} />
                        ))}

                        <Button buttonColor="#d9d9d9" textColor="gray" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("alergies")}>ADD</Button>
                    </View>

                    <Text style={profileStyles.sectionTitle}>Desiases</Text>
                    <View style={profileStyles.profileSection}>

                        {medical.desieases.map((val,index)=>(
                            <ProfileSectionInfo label="" value={val} mode="view" inputType={"text"} key={val} />
                        ))}
                    <Button buttonColor="#d9d9d9" textColor="gray" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("diseases")}>ADD</Button>

                    </View>

                    <Text style={profileStyles.sectionTitle}>Medical History</Text>
                    <View style={profileStyles.profileSection}>
                    {medical.history.map((val,index)=>(
                            <ProfileSectionInfo label={val.diagnosis} value={val.date_diagnosed} mode="view" inputType={"text"} key={val} />
                        ))}
                    <Button buttonColor="#d9d9d9" textColor="gray" style={{ elevation: 1, width: '100%', }} onTouchEnd={() => setCategory("history")}>ADD</Button>
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