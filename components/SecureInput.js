import { styles } from "@/assets/styles/login.styles";
import { Entypo } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";
import { TextInput as PaperInput } from "react-native-paper";


export default function SecureInput({value, setValue, show, label="", placeholder="", setShow, style, type="default"}){
    if(type == 'paper'){
        return(<View style={styles.secureEntry}>
            <PaperInput style={style?style:{width:'90%'}} label={label} placeholder={placeholder} mode='flat' onChangeText={setValue} value={value} secureTextEntry={!show} />
            <Pressable onPress={()=>setShow(!show)}>{show?(<Entypo name="eye-with-line" size={24} color="black" />):(<Entypo name="eye" size={24} color="black" />)}</Pressable>
        </View>)
    }
    return(<View style={styles.secureEntry}>
    <TextInput style={style?style:{width:'90%'}} label={label} placeholder={placeholder} mode='flat' onChangeText={setValue} value={value} secureTextEntry={!show} />
    <Pressable onPress={()=>setShow(!show)}>{show?(<Entypo name="eye-with-line" size={24} color="black" />):(<Entypo name="eye" size={24} color="black" />)}</Pressable>
</View>)
}