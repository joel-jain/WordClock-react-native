# Matrix Word Clock

A production-ready, typographic clock application built with **React Native** and **TypeScript**. This project transforms standard digital time into human-readable sentences (e.g., *"IT IS TEN PAST SIX"*) displayed on a custom animated 11x10 grid.

Beyond the visual interface, this repository demonstrates a complete **DevOps Lifecycle**:
* **Continuous Integration (CI):** Automated testing via GitHub Actions ensures code quality on every push.
* **Continuous Delivery (CD):** Automated builds via EAS deliver installable APKs immediately upon release.
* **Clean Architecture:** Scalable folder structure with strict typing and unit test coverage.

<p align="center">
  <img src="light-mode.png" width="300" alt="Light Mode" />
  <img src="dark-mode.png" width="300" alt="Dark Mode" />
</p>

## Features

* **Fuzzy Time Logic:** Converts numeric time (10:18) into human phrases ("TWENTY PAST TEN").
* **Matrix Grid UI:** Custom 11x10 letter grid with dynamic highlighting logic.
* **Home Screen Widget:** Native Android widget that displays the word clock directly on the launcher.
* **Theme Engine:** Built-in Light/Dark mode with persistent user preference (AsyncStorage).
* **Smooth Animations:** Custom animated toggle switch with interpolated colors and icons.
* **Robust Testing:** Full Unit and Component test suite using Jest & React Native Testing Library.
* **Automated Pipelines:**
    * **CI:** Runs tests on every Pull Request to prevent regressions.

## Tech Stack

* **Framework:** React Native (Expo SDK 52)
* **Language:** TypeScript
* **State Management:** React Context API
* **Persistence:** AsyncStorage
* **Native Widget:** `react-native-android-widget`
* **Testing:** Jest, React Native Testing Library
* **CI/CD:** GitHub Actions, EAS (Expo Application Services)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following tools installed:
* **Node.js** (v18+ recommended)
* **npm** (comes with Node)
* **Git**
* **Android Studio** (for Android emulator/widget testing) or **Expo Go** app (for physical device testing).

### 1. Installation

```bash
# Clone the repository
git clone [https://github.com/joel-jain/WordClock-react-native.git](https://github.com/joel-jain/WordClock-react-native.git)

# Navigate to project folder
cd WordClock-react-native

# Install dependencies
npm install
````

### 2\. Running the App

Start the Expo development server:

```bash
npx expo start
```

  * **Scan QR Code:** Open **Expo Go** on your phone and scan the terminal QR code.
  * **Emulators:** Press `a` for Android or `i` for iOS (macOS only).

### 3\. Testing the Widget (Android)

To test the native Android widget, you must run the native build command (requires Android Studio/Emulator):

```bash
npx expo run:android
```

*Once installed, long-press your home screen, select "Widgets", and find "Word Clock".*

### 4\. Running Tests

Execute the test suite to verify logic integrity:

```bash
npm test
```

## Building for Production

This project uses **EAS Build** to generate installable Android APKs.

1.  **Install EAS CLI:**
    ```bash
    npm install -g eas-cli
    ```
2.  **Login to Expo:**
    ```bash
    eas login
    ```
3.  **Build APK:**
    ```bash
    eas build --platform android --profile production-apk
    ```

## Project Structure

```
.github/             # CI/CD Workflows (ci.yml)
src/
├── components/      # Reusable UI (Grid, WordCell, ThemeToggle, OptionsModal)
├── context/         # Theme State & Persistence Logic
├── hooks/           # Custom Hooks (useTime, useTheme)
├── screens/         # Main Screen Layouts (HomeScreen)
├── theme/           # Color Palettes
├── utils/           # Time Logic & Grid Mapping Data
├── widgets/         # Android Home Screen Widget Logic
└── __tests__/       # Unit & Component Tests
```

## Future Roadmap

  * [ ] **Custom Themes:** Implement a theme selector with new palettes (e.g., *Matrix Green*, *Cyberpunk Neon*).
  * [ ] **Multi-Language Support (i18n):** Adapt logic for Spanish, German, and French.
  * [ ] **WearOS Support:** Extend codebase for smartwatch apps.

-----

Built with ❤️ using React Native & Expo.
