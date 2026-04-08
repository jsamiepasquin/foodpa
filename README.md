# FoodPA - Food Packing Application

## Project Overview
FoodPA is a modern mobile application built with Expo and React Native designed to streamline food order preparation and delivery tracking. The application helps food service businesses manage inventory, process orders efficiently, and provide real-time delivery updates to customers.

## Features
- 📱 Cross-platform mobile application (iOS & Android)
- 🔐 User authentication and role-based access control
- 📦 Food inventory management system
- 📋 Real-time order tracking and management
- 🚚 Delivery scheduling and route optimization
- 📊 Order analytics and reporting
- 💬 Customer notifications and updates

## Technologies Used
- **Framework**: React Native with Expo
- **Language**: TypeScript/JavaScript
- **Backend**: Node.js
- **Database**: MongoDB
- **Build Tools**: EAS Build

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/jsamiepasquin/foodpa.git
   cd foodpa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with your configuration

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## Development Commands

- `npm start` - Start the Expo development server
- `npm run reset-project` - Reset to blank project template
- `eas build --profile preview --platform android` - Build Android preview
- `eas prebuild` - Generate native code

## Project Structure
- `app/` - Main application code with file-based routing
- `app-example/` - Example starter code (archived after reset)
- `components/` - Reusable React components
- `assets/` - Images, fonts, and other static files

## Contributing
We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
For issues, questions, or feature requests, please open an issue on our [GitHub Issues](https://github.com/jsamiepasquin/foodpa/issues) page.