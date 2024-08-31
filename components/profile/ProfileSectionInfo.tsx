import profileStyles from "@/assets/styles/profileStyles";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";


interface ProfileSectionInfoProps {
    label: string;
    value: string;
    mode: string,
    setValue?: (value: string) => void;
    inputType?: string;
}

// Functional component with typed props
const ProfileSectionInfo: React.FC<ProfileSectionInfoProps> = ({ label, value, mode="", setValue =()=>{}, inputType = "text" }) => {

    
    if (mode == 'edit') {
        return (
            <View style={profileStyles.profileSectionInfo}>
                <TextInput value={value} inputMode={inputType} label={label} style={profileStyles.textInput} onChangeText={setValue} placeholder={inputType == 'date'?"mm/dd/yyyy":""} />
            </View>
        )
    }
    return (
        <View style={profileStyles.profileSectionInfo}>
            {label?<Text style={profileStyles.profileSectionInfoLabel}>{label}:</Text>:''}
            <Text>{value}</Text>
        </View>
    );
};

export default ProfileSectionInfo;