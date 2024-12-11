import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import profileStyle from '../../assets/styles/profileStyles'
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
import { router } from "expo-router";
export default function Profile() {


  const { userStorage, setUserStorage,updateHealthData } = mmkvController()
  const { logout } = useAuthentication();

  const [mode, setMode] = useState('view')
  const [healthData, setHealthData] = useState<HealthDataState>(
    userStorage.data);


  const handleSave = async () => {
    updateHealthData(healthData)
    setMode('view')
  }
  const logoutHandle = async () => {
    logout()
  }

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>

        <View style={profileStyle.mainContainer}>
          {mode == 'edit' ? (
            <View>
              <Text style={profileStyle.sectionTitle}>Personal Information</Text>
              <View style={profileStyle.profileSection}>
                <ProfileSectionInfo label="First Name" value={healthData.firstName} mode={mode} setValue={(value) => setHealthData({ ...healthData, firstName: value })} inputType={"text"} />
                <ProfileSectionInfo label="Last Name" value={healthData.lastName} mode={mode} setValue={(value) => setHealthData({ ...healthData, lastName: value })} inputType={"text"} />
                <ProfileSectionInfo label="Birthday" value={healthData.birthday} mode={mode} setValue={(value) => setHealthData({ ...healthData, birthday: value })} inputType={"text"} />
                <ProfileSectionInfo label="Gender" value={healthData.gender} mode={mode} setValue={(value) => setHealthData({ ...healthData, gender: value })} inputType={"text"} />
              </View>
            </View>
          ) : (
            <View style={profileStyle.topContainer} onTouchEnd={()=>router.push('/medical')}>
              <Ionicons name="person" size={70} style={profileStyle.profilePicture} />
              <View style={profileStyle.profileDetailsTop}>
                <Text style={profileStyle.profileName}>{healthData.firstName + ' ' + healthData.lastName}</Text>
              </View>
              <View style={profileStyle.genderSection}>
                <View style={profileStyle.profileItems}>{healthData.gender == 'Male' ? (<Ionicons name="male" size={20} />) : (<Ionicons name="female" size={20} />)}</View>
                <View style={profileStyle.profileItems}><Text>{calculateAge(healthData.birthday)}</Text></View>
                <View style={profileStyle.profileItems}><Ionicons name="happy" size={20} color="#78c288" /></View>
              </View>
            </View>
          )}
          <Text style={profileStyle.sectionTitle}>Physical Appearance</Text>
          <View style={profileStyle.profileSection}>
            <ProfileSectionInfo label="Height (cm)" value={String(healthData.height)} mode={mode} setValue={(value) => setHealthData({ ...healthData, height: Number(value) })} inputType={"numeric"} />
            <ProfileSectionInfo label="Weight (kg)" value={String(healthData.weight)} mode={mode} setValue={(value) => setHealthData({ ...healthData, weight: Number(value) })} inputType={"numeric"} />
            <ProfileSectionInfo label="Waist Circumference (cm)" value={String(healthData.waistCircumference)} mode={mode} setValue={(value) => setHealthData({ ...healthData, waistCircumference: Number(value) })} inputType={"numeric"} />
            <ProfileSectionInfo label="Hip Circumference (cm)" value={String(healthData.hipCircumference)} mode={mode} setValue={(value) => setHealthData({ ...healthData, hipCircumference: Number(value) })} inputType={"numeric"} />
          </View>
          <Text style={profileStyle.sectionTitle}>Vital Statistics</Text>
          <View style={profileStyle.profileSection}>
            <ProfileSectionInfo label="Body Temperature °C" value={String(healthData.bodyTemperature)} mode={mode} setValue={(value) => setHealthData({ ...healthData, bodyTemperature: Number(value) })} inputType={"numeric"} />
            <ProfileSectionInfo label="Blood Pressure (mmHg)" value={healthData.bloodPressure} mode={mode} setValue={(value) => setHealthData({ ...healthData, bloodPressure: value })} inputType={"text"} />
            <ProfileSectionInfo label="Heart Rate (bpm)" value={healthData.heartRate} mode={mode} setValue={(value) => setHealthData({ ...healthData, heartRate: value })} inputType={"numeric"} />
            <ProfileSectionInfo label="Blood Sugar Level (mg/dL)" value={healthData.bloodSugar} mode={mode} setValue={(value) => setHealthData({ ...healthData, bloodSugar: value })} inputType={"numeric"} />
            <ProfileSectionInfo label="Cholesterol Levels (mmol/l)" value={healthData.cholesterolLevels} mode={mode} setValue={(value) => setHealthData({ ...healthData, cholesterolLevels: value })} inputType={"numeric"} />
          </View>

          {mode == 'edit' ? (
            <View style={profileStyle.editButtonsView}>
              <Button mode='contained' style={profileStyle.buttonSave} onTouchEnd={handleSave}>Save</Button>
              <Button mode='contained' style={profileStyle.buttonSave} buttonColor="white" onTouchEnd={() => setMode('view')}>Cancel</Button>
            </View>
          ) : (
            <>
              <Button mode='contained' style={profileStyle.buttonSave} buttonColor="white" onTouchEnd={() => setMode('edit')} >Edit Profile</Button>
              <Button mode='contained' style={profileStyle.buttonSave} buttonColor="gray" textColor="white" onTouchEnd={logoutHandle}>Logout</Button>

            </>
          )}

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

