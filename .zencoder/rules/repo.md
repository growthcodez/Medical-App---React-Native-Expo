---
description: Repository Information Overview
alwaysApply: true
---

# PayBill App Information

## Summary
PayBill is a mobile application built using **React Native** and the **Expo** framework. It appears to be a medical or financial services application (as per README and screen names like "EscrowDeals", "SendMoney", "Wallet") that provides features such as authentication, product browsing, wallet management, and money transfers.

## Structure
- **src/**: Core application source code.
  - **screens/**: Implementation of various app screens (Home, Wallet, Login, etc.).
  - **asset/**: Local assets including fonts, icons, and category-specific images.
  - **constant/**: Global constants for the app (e.g., colors, sizes).
- **assets/**: Static resources for the application (app icons, splash screens).
- **android/**: Native Android project files and configurations.
- **app.json**: Expo-specific configuration including app name, version, and platform settings.
- **eas.json**: Configuration for Expo Application Services (EAS) build and submission.
- **App.js**: Main entry point component for the React Native application.

## Language & Runtime
**Language**: JavaScript / React  
**Version**: React Native ^0.73.6, React ^18.2.0, Expo ^54.0.32  
**Build System**: Expo CLI / EAS (Expo Application Services)  
**Package Manager**: npm (uses `package-lock.json`)

## Dependencies
**Main Dependencies**:
- `@react-navigation/native`: Navigation management.
- `react-native-webview`: For rendering web content.
- `react-native-video`: For video playback capabilities.
- `react-native-reanimated`: For advanced animations.
- `react-native-safe-area-context`: Safe area management for various device screens.
- `react-native-screens`: Native navigation primitives.
- `react-native-svg`: SVG support for graphics.

**Development Dependencies**:
- `@babel/core`: Babel compiler core.

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## EAS Build
The project uses EAS for builds as defined in `eas.json`:
- **Development**: Configured with `developmentClient: true`.
- **Preview**: Configured to produce `apk` for Android.
- **Production**: Configured with `autoIncrement` for versioning.

## Testing
No explicit testing framework (like Jest or Detox) was found configured in the root `package.json`.
