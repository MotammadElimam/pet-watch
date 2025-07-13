# Pet Watch - Pet Adoption App

A React Native mobile application for browsing and adopting pets. Built with Expo and TypeScript.

## Features

### 🐾 Pet Browsing

- Browse a curated list of pets available for adoption
- View detailed pet information including breed, age, health status, and compatibility
- Beautiful card-based UI with pet images and key details

### 📱 Pet Details

- Comprehensive pet profiles with all relevant information
- Health status indicators (vaccinated, neutered)
- Compatibility tags showing what the pet is good with
- Location information with map integration
- Direct adoption button

### 💳 Mock Payment System

- Complete payment form with validation
- Credit card information input with formatting
- Contact information collection
- Simulated payment processing with success confirmation
- Terms and conditions acceptance

### 📍 Location Services

- Device location simulation
- Pet location display with coordinates
- Distance calculation between user and pet
- Simulated Google Maps interface
- Get directions functionality

### ❤️ My Pets

- View adopted pets collection
- Pet management with remove functionality
- Health information quick access
- Statistics dashboard (total pets, dogs, cats, others)
- Empty state with call-to-action

## Screenshots

Here are screenshots of all main screens in the Pet Watch app:

<p align="center">
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.03.51 PM.png" alt="Screen 1" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.17 PM.png" alt="Screen 2" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.21 PM.png" alt="Screen 3" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.24 PM.png" alt="Screen 4" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.28 PM.png" alt="Screen 5" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.45 PM.png" alt="Screen 6" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.50 PM.png" alt="Screen 7" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.52 PM.png" alt="Screen 8" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.11.55 PM.png" alt="Screen 9" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.12.00 PM.png" alt="Screen 10" width="250" />
  <img src="assets/screenshots/Screenshot 2025-07-13 at 5.12.36 PM.png" alt="Screen 11" width="250" />
</p>

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd pet-watch
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```
   This will open the Expo Dev Tools in your browser.

> **Note:**
> For full functionality (such as maps), you must use a development build of the app. The standard Expo Go app does **not** support all required native modules.
>
> - To create a development build for iOS:
>   ```bash
>   npx expo run:ios
>   ```
> - To create a development build for Android:
>   ```bash
>   npx expo run:android
>   ```
>
> After building, open the app on your device or emulator. You can then use the QR code or launch directly from your development tools.

4. **Run on your preferred platform:**
   - **On a real device:**
     - Download the [Expo Go](https://expo.dev/client) app from the App Store (iOS) or Google Play (Android).
     - Scan the QR code in Expo Dev Tools to open the app on your device instantly.
   - **On an iOS simulator:**
     - Press `i` in the Expo Dev Tools, or run:
       ```bash
       npx expo run:ios
       ```
   - **On an Android emulator:**
     - Press `a` in the Expo Dev Tools, or run:
       ```bash
       npx expo run:android
       ```
   - **On the web:**
     - Press `w` in the Expo Dev Tools, or run:
       ```bash
       npx expo start --web
       ```

## Project Structure

```
pet-watch/
├── app/                  # App entry points and screens
│   ├── _layout.tsx       # Main navigation layout
│   ├── index.tsx         # Home screen
│   ├── location.tsx      # Location/map screen
│   ├── pet-details.tsx   # Pet details screen
│   └── tabs/             # Tab navigation and screens
├── components/           # Reusable UI components
├── context/              # React context providers
├── data/                 # Mock data (e.g., pets)
├── styles/               # All style files (components & screens)
├── types/                # TypeScript types
├── utils/                # Utility functions
├── assets/
│   ├── fonts/            # Custom fonts
│   ├── images/           # App icons and images
│   └── screenshots/      # App screenshots for README
├── android/              # Android native project
├── ios/                  # iOS native project
├── package.json          # Project metadata and scripts
├── app.json              # Expo configuration
└── README.md             # Project documentation
```

## Technologies Used

- **React Native**: Cross-platform mobile app framework
- **Expo**: Development/build tooling for React Native
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation
- **react-native-maps**: Real map view integration
- **@shopify/flash-list**: High-performance list rendering

## Development Notes

- All location services use real device GPS (with permissions)
- Payment processing is mocked for demo purposes
- Pet adoption status is managed through local state
- Images are loaded from Unsplash CDN or local assets
- Code is modular, with styles separated for maintainability
