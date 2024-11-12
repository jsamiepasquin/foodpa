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
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';

export default function Feedback() {

    const [formData, setFormData] = useState({
        setupEase: '',
        accuracy: '',
        satisfaction: '',
        healthImpact: '',
        improvements: '',
    });

    const setupEaseOptions = [
        { id: '1', label: 'Very easy', value: 'very_easy' },
        { id: '2', label: 'Somewhat easy', value: 'somewhat_easy' },
        { id: '3', label: 'Neutral', value: 'neutral' },
        { id: '4', label: 'Somewhat difficult', value: 'somewhat_difficult' },
        { id: '5', label: 'Very difficult', value: 'very_difficult' },
    ];

    const accuracyOptions = [
        { id: '1', label: 'Very accurate', value: 'very_accurate' },
        { id: '2', label: 'Somewhat accurate', value: 'somewhat_accurate' },
        { id: '3', label: 'Neutral', value: 'neutral' },
        { id: '4', label: 'Somewhat inaccurate', value: 'somewhat_inaccurate' },
        { id: '5', label: 'Very inaccurate', value: 'very_inaccurate' },
    ];

    const satisfactionOptions = [
        { id: '1', label: 'Very satisfied', value: 'very_satisfied' },
        { id: '2', label: 'Somewhat satisfied', value: 'somewhat_satisfied' },
        { id: '3', label: 'Neutral', value: 'neutral' },
        { id: '4', label: 'Somewhat dissatisfied', value: 'somewhat_dissatisfied' },
        { id: '5', label: 'Very dissatisfied', value: 'very_dissatisfied' },
    ];

    const healthImpactOptions = [
        { id: '1', label: 'Significantly', value: 'significantly' },
        { id: '2', label: 'Moderately', value: 'moderately' },
        { id: '3', label: 'Slightly', value: 'slightly' },
        { id: '4', label: 'Not at all', value: 'not_at_all' },
        { id: '5', label: 'I haven’t noticed any changes', value: 'no_changes' },
    ];

    const handleRadioButtonPress = (question, updatedRadioButtons) => {
        console.log(updatedRadioButtons, question)
        // Find the selected radio button by looking for the one with `selected` set to true
        setFormData({ ...formData, [question]: updatedRadioButtons });
      };

    const QuestionBox = ({question, radioButtons, handler})=>{
        return <View style={medicalStyle.questionBox}>
        <Text style={styles.question}>{question}</Text>
        <RadioGroup layout="column" containerStyle={medicalStyle.radios}
            radioButtons={radioButtons}
            onPress={handler}
        />
        </View>
    }

    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <ScrollView style={{ flex: 1, width: '100%',padding:20 }}>

                <QuestionBox radioButtons={setupEaseOptions} question={"How easy was it to set up and start using the app?"}
                handler={(updatedRadioButtons) => handleRadioButtonPress('setupEase', updatedRadioButtons)}/>
                <QuestionBox radioButtons={accuracyOptions} question={"How accurate do you feel the health data and insights provided by the app are?"}
                handler={(updatedRadioButtons) => handleRadioButtonPress('accuracy', updatedRadioButtons)}/>
                <QuestionBox radioButtons={satisfactionOptions} question={"How satisfied are you with the features and functionalities offered by the app?"}
                handler={(updatedRadioButtons) => handleRadioButtonPress('satisfaction', updatedRadioButtons)}/>
                <QuestionBox radioButtons={healthImpactOptions} question={"Has the app helped you improve your health or wellness?"}
                handler={(updatedRadioButtons) => handleRadioButtonPress('healthImpact', updatedRadioButtons)}/>
            
                <Text style={styles.question}>What additional features or improvements would you like to see in future updates?</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your suggestions here"
                        value={formData.improvements}
                        onChangeText={(text) => setFormData({ ...formData, improvements: text })}
                    />
                </View>

                <Button title="Submit Feedback" onPress={() => console.log(formData)} />
            </ScrollView>

        </SafeAreaView>
    );
}
const medicalStyle = StyleSheet.create({
    medicalStatus: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    questionBox: {
        height: 'auto',
        width: '100%',
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
        marginBottom:20
    },
    answerInput: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        outline: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        borderColor: 'gray',
        marginTop: 10

    },
    radios:{
         flex:0,alignItems:'flex-start', justifyContent:'flex-start', borderWidth:1,width:300, padding:10, borderRadius:20, borderColor:'gray'
    }
});