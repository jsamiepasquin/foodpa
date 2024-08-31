interface HealthDataState {
    height: number,
    weight: number,
    waistCircumference: number,
    hipCircumference: number,
    bodyTemperature: number;  // e.g., "98.6°F"
    bloodPressure: string;  // e.g., "120/80 mmHg"
    heartRate: string;  // e.g., "72 bpm"
    bloodSugar: string;  // e.g., "90 mg/dL"
    cholesterolLevels: string;  // e.g., "180 mg/dL",
    firstName: string;   // New field
    lastName: string;    // New field
    birthday: string;    // New field
    gender: string;
    email: string;
  }
  export default HealthDataState