# 🕒  Word Clock

A minimalist, typographic clock application built with **React Native** and **Expo**. 
Instead of numbers, it uses a grid of glowing letters to tell the time in human-readable sentences (e.g., "IT IS TEN PAST SIX").

## ✨ Features

* **Fuzzy Time Logic:** Converts numeric time (10:18) into human phrases ("TWENTY PAST TEN").
* **Matrix Grid UI:** Custom 11x10 letter grid with dynamic highlighting logic.
* **Theming Engine:** Built-in Light/Dark mode with persistent user preference (AsyncStorage).
* **Smooth Animations:** Custom animated toggle switch with interpolating colors and icons.
* **Testing Suite:** Fully tested business logic and UI components using Jest.

## 🛠 Tech Stack

* **Framework:** React Native (Expo SDK 52)
* **Language:** TypeScript
* **State Management:** React Context API
* **Persistence:** AsyncStorage
* **Testing:** Jest & React Native Testing Library

## 🚀 How to Run

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/joel-jain/WordClock-react-native.git](https://github.com/joel-jain/WordClock-react-native.git)
    cd WordClock-react-native
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the app**
    ```bash
    npx expo start
    ```

4.  **Run Tests**
    ```bash
    npm test
    ```

## 📂 Project Structure
