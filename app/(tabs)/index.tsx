import profileStyles from "@/assets/styles/bmiStyles";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Constants  from "expo-constants";
import {WebView} from "react-native-webview";

export default function  
() {
  return (
    <WebView
         style={styles.container} source={{uri:'https://www.healthline.com/fitness'}}>
          
         </WebView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

