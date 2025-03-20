
// Initialize storage

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
    if(birthday.includes('-')){
      var [month, day, year] = birthday.split('-').map(Number);
    }else{
    const [month, day, year] = birthday.split('/').map(Number);
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
