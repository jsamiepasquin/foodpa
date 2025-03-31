
// Initialize storage

import { Alert } from "react-native";

// Function for authentication (implement as needed)
export const auth = async () => {
  // Your authentication logic here
};

// Function to calculate age
export const calculateAge = (birthday: string): number => {
    // Check if the input is valid
    if (!birthday) {
      console.error('Birthday is required');
      return NaN; // Or handle this case as needed
    }
  
    // Split the birthday string into components

    // check if the birthday uses a dash or a slash
    let month, day, year;
    if(birthday.includes('-')){
      var d = birthday.split('-').map(Number);
      month = d[0];
      day = d[1];
      year = d[2];
    }else{
      var d= birthday.split('/').map(Number);
      month = d[0];
      day = d[1];
      year = d[2];
    }
  
    // Validate the date components
    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      console.error('Invalid date format');
      return NaN; // Or handle this case as needed
    }
  
    // Create a Date object from the parsed components
    const birthDate = new Date(year, month - 1, day); // Note: months are 0-based in JavaScript
  
    if (isNaN(birthDate.getTime())) {
      console.error('Invalid date');
      return NaN; // Or handle this case as needed
    }
  
    const today = new Date(); // Get the current date
    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate preliminary age
    const monthDifference = today.getMonth() - birthDate.getMonth(); // Calculate month difference
  
    // If the birth month has not yet occurred this year, subtract 1 from age
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };
  export const getBMICategory = (bmi: number): string => {
    if (bmi <= 18.5) {
        return 'Underweight';
      } 
       if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal weight';
      } 
       if (bmi >= 25 && bmi <= 29.9) {
        return 'Overweight';
      } 
       if (bmi >= 30 && bmi <= 34.9) {
        return 'Obesity Class I';
      } 
       if (bmi >= 35 && bmi <= 39.9) {
        return 'Obesity Class II';
      } 
       if (bmi >= 40) {
        return 'Obesity Class III';
      } 

        return 'Invalid BMI';
      
  };
  export const generateRandomNumber = function(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  export const generateTargetNutrition = (medical,userStorage, withAlert = false) => {
      const hypertension = [
        { age: 25, calories: "1000-1200", protein: "38-75g", carbohydrates: "113-165g", fats: "28-47g" },
        { age: 30, calories: "1200-1400", protein: "45-88g", carbohydrates: "135-193g", fats: "33-54g" },
        { age: 35, calories: "1400-1600", protein: "53-100g", carbohydrates: "158-200g", fats: "39-62g" },
        { age: 40, calories: "1600-1800", protein: "60-113g", carbohydrates: "180-248g", fats: "44-70g" },
        { age: 45, calories: "1800-2000", protein: "68-125g", carbohydrates: "203-275g", fats: "50-78g" },
        { age: 50, calories: "2000-2200", protein: "75-125g", carbohydrates: "225-303g", fats: "56-86g" },
        { age: 55, calories: "2200-2400", protein: "83-150g", carbohydrates: "248-330g", fats: "61-93g" },
        { age: 60, calories: "2400-2600", protein: "90-163g", carbohydrates: "270-358g", fats: "67-101g" }
    ];
    
    const obesityTargets = [
        { age: 25, calories: "800-1000", protein: "50-88g", carbohydrates: "70-113g", fats: "18-33g" },
        { age: 30, calories: "900-1200", protein: "56-105g", carbohydrates: "79-135g", fats: "22-40g" },
        { age: 35, calories: "1000-1400", protein: "63-123g", carbohydrates: "88-158g", fats: "22-47g" },
        { age: 40, calories: "1200-1500", protein: "75-131g", carbohydrates: "105-169g", fats: "27-50g" },
        { age: 45, calories: "1300-1600", protein: "81-140g", carbohydrates: "114-180g", fats: "29-53g" },
        { age: 50, calories: "1400-1800", protein: "88-158g", carbohydrates: "123-203g", fats: "31-60g" },
        { age: 55, calories: "1500-1900", protein: "94-166g", carbohydrates: "131-214g", fats: "33-63g" },
        { age: 60, calories: "1600-2000", protein: "100-175g", carbohydrates: "140-225g", fats: "36-67g" }
    ];
    
    const diabetesTargets = [
        { age: 25, calories: "900-1100", protein: "45-83g", carbohydrates: "90-138g", fats: "25-43g" },
        { age: 30, calories: "1000-1300", protein: "50-98g", carbohydrates: "113-163g", fats: "28-36g" },
        { age: 35, calories: "1100-1400", protein: "55-105g", carbohydrates: "110-175g", fats: "31-55g" },
        { age: 40, calories: "1200-1600", protein: "60-120g", carbohydrates: "120-200g", fats: "32-36g" },
        { age: 45, calories: "1300-1700", protein: "65-128g", carbohydrates: "130-213g", fats: "36-66g" },
        { age: 50, calories: "1400-1800", protein: "70-135g", carbohydrates: "140-225g", fats: "39-70g" },
        { age: 55, calories: "1500-1900", protein: "75-143g", carbohydrates: "150-238g", fats: "42-74g" },
        { age: 60, calories: "1600-2000", protein: "80-150g", carbohydrates: "160-250g", fats: "44-78g" }
    ];
  
    const healthyTargets = [
      { age: 25, calories: "1800-2200", protein: "50-100g", carbohydrates: "250-350g", fats: "50-70g" },
      { age: 30, calories: "2000-2400", protein: "55-110g", carbohydrates: "260-370g", fats: "55-80g" },
      { age: 35, calories: "2200-2600", protein: "60-120g", carbohydrates: "270-380g", fats: "60-90g" },
      { age: 40, calories: "2400-2800", protein: "65-130g", carbohydrates: "280-400g", fats: "65-100g" },
      { age: 45, calories: "2500-2900", protein: "70-140g", carbohydrates: "290-420g", fats: "70-110g" },
      { age: 50, calories: "2600-3000", protein: "75-150g", carbohydrates: "300-440g", fats: "75-120g" },
      { age: 55, calories: "2700-3100", protein: "80-160g", carbohydrates: "310-460g", fats: "80-130g" },
      { age: 60, calories: "2800-3200", protein: "85-170g", carbohydrates: "320-480g", fats: "85-140g" }
  ];
    console.log('user data',userStorage)

    const diseases = medical?.desieases??[];

    const latestDisease = diseases[diseases.length - 1]??'';
    let targetNutritioRange = null;
    if (latestDisease.toLocaleLowerCase() === 'obesity') {
      targetNutritioRange = obesityTargets
    } else if (latestDisease.toLocaleLowerCase() === 'diabetes') {
      targetNutritioRange = diabetesTargets
    } else if (latestDisease.toLocaleLowerCase() === 'hypertension') {
      targetNutritioRange = hypertension
    }else{
      targetNutritioRange = healthyTargets
    }
    let age = calculateAge(userStorage.data.birthday);
  
    console.log('targetNutritioRange', targetNutritioRange)
    console.log('age', age)
  
    let _targetNutrition = null;
  
    for (const value of targetNutritioRange) {
      if (value.age >= age && value.age+5 >= age) {
          if(withAlert)Alert.alert('Success','Target nutrition successfully calculated!')
          return value;
      }
    }
    return null;
  }
