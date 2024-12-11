import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios"

const API_KEY = 'AIzaSyBffeqo2BwmqN8drevZFJ2eRF6lzjsZdzc';

export default function useGemini() {

    const genAi = new GoogleGenerativeAI(API_KEY)
    const model = genAi.getGenerativeModel({
        model:"gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    })
    
    const generateMealPlan = async(healthData: {
        age: number,
        feeling: string,
        current_diseases: string,
        medical_history: string,
        bmi: number,
        gender:string,
        allergies:string
    }) => {
        const {
            age, gender,
            feeling, current_diseases,
            allergies, medical_history, bmi
        } = healthData

        let prompt = `
        Prompt:
        Goal: Create a personalized meal plan to support a healthy body and immune system.
        Food Type: Filipino Foods.
        Data:
        
        Age: ${age}
        Gender: ${gender}
        Health Status: ${feeling}
        Medical Conditions: ${current_diseases}
        Allergies: ${allergies}
        Medical History: ${medical_history}
        
        BMI: ${bmi}
        
        Notes: Consider dietary restrictions, allergies, and health conditions when planning meals. Indicate a serving sizes for all foods.
        
        USE THIS JSON FORMAT:
        {
          "meal_plan": {
            "date": "2024-08-28",
            "breakfast": [
              {
                "item": "Oatmeal",
                "notes": "Low-sodium oats, avoid added sugar",
                "servings:"1 cup"
              },...
            ],
            "lunch": [
              {
                "item": "Grilled chicken",
                "notes": "Lean protein source",
                "servings":"1 piece"
              },...
            ],
            "dinner": [
              {
                "item": "Salmon",
                "notes": "Lean protein source",
                "servings":"2 pieces"
              },...
            ]
          }
        }
          `;

        console.log(prompt)
        const result = await model.generateContent(prompt)
        const response = result.response.text()

        const generated = JSON.parse(response)
        console.log("generated",generated)
        return generated;
    }

    return {generateMealPlan}
}