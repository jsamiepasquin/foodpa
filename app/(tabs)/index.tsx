import profileStyles from "@/assets/styles/bmiStyles";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Constants  from "expo-constants";
import {generateRandomNumber} from '@/helpers/helper'
import {WebView} from "react-native-webview";
import { useEffect, useState } from "react";
import images from '@/helpers/images'
import { Card } from "react-native-paper";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";


export default function  
() {

  const [fruits, setFruits] = useState([0,1,2,3,4,5,6,7,8,9]);


  useEffect(()=>{

    for (let i = 0; i < 10; i++) {
      const updatedFruits = [...fruits]
      updatedFruits[i] = generateRandomNumber(0,9)
      setFruits(updatedFruits)
    }
  },[])

  useEffect(()=>{
    console.log('fruits',fruits[1])
  },[fruits])


  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>

        <View style={profileStyles.mainContainer}>
          <View style={{
            flex:0,
            justifyContent:'flex-start',
            flexDirection:'column',
          }}>
             <View style={{
              flex:0,
              padding:30,
              flexDirection:'row',
              justifyContent:'center'
             }}>
              <Image style={{
              width:170,
              borderRadius:100,
              height:170
              }} source={require('@/assets/images/adaptive-icon.png')}/></View>

              <View style={{marginBottom:30}}>
                <Text style={{textAlign:'center',fontSize:30, fontWeight:'bold'}}>FOODPA</Text>
              </View>

            <View style={{
              flex:0,
             justifyContent:"center",
             alignItems:'center',
             flexDirection:'row',
             flexWrap:'wrap',
             gap:5,

            }}>
            {fruits.map((src,idx)=>(
              <Image style={{width:100,height:100, borderRadius:30}} source={images[src].image} key={idx}/>
            ))}
            </View>
          </View>

        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

