import { Text, View, SafeAreaView, ScrollView, Alert, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../constants/Colors"
import useGemini from "@/hooks/useGemini";
import { FontAwesome } from "@expo/vector-icons";


export default MealItem  = ({b, bi, action = null})=>{
    return (
        <View style={{
            flex: 0,
            backgroundColor: 'white',
            elevation: 2,
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          }} key={bi}>
            <Text style={{ fontWeight: 'bold',fontSize:20 }}>{b.food}</Text>
            <Text>{b.notes}</Text>
            <View style={{
              flex:0,
              flexDirection:'row',
              justifyContent:'flex-start',
              gap:10,
              flexWrap:'wrap',
            }}>
              <View style={{flex:0, flexDirection:'row', backgroundColor:'#ffc421',borderRadius:5, padding:3, alignItems:'center'}}><Text style={{color:'white',padding:2, }}>cal:</Text><Text style={{ fontWeight: "bold", color:'white' }}>{b.calories}</Text></View>
              <View style={{flex:0, flexDirection:'row', backgroundColor:'#219fff',borderRadius:5, padding:3, alignItems:'center'}}><Text style={{color:'white',padding:2, }}>Protein:</Text><Text style={{ fontWeight: "bold", color:'white' }}>{b.protein}</Text></View>
              <View style={{flex:0, flexDirection:'row', backgroundColor:'#ff2176',borderRadius:5, padding:3, alignItems:'center'}}><Text style={{color:'white',padding:2, }}>Carbs:</Text><Text style={{ fontWeight: "bold", color:'white' }}>{b.carbohydrates}</Text></View>
              <View style={{flex:0, flexDirection:'row', backgroundColor:'#fff9e8',borderRadius:5, padding:3, alignItems:'center'}}><Text style={{color:'black',padding:2, }}>Fats:</Text><Text style={{ fontWeight: "bold", color:'black' }}>{b.fats}</Text></View>
              </View>
          </View>
    )
}