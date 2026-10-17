# FoodRecipe
# Capt's React Project nundernSuperviosn of IBM

A hands-on practice repository for learning React and React Native by building real mobile apps with Expo.

---

# Capt's Recipe App

A cross-platform recipe app built with React Native and Expo, running on Android, iOS and the web from a single codebase.

### Features
- Recipe list with colored cards, cooking time and difficulty level
- Detail screen with ingredients and numbered cooking steps
- Back navigation to the recipe list
- Clean, mobile-first layout using StyleSheet

### Tech Stack
- React Native
- Expo
- TypeScript
- Android Emulator, iOS Simulator and Web

### Run Locally
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd recipe-app
npm install
npx expo start
```
Press **a** for Android, **i** for iOS, or **w** for Web.

---

## About React
React is a JavaScript library for building user interfaces from reusable components. Each component manages its own state and re-renders automatically when that state changes.

React Native uses the same principles but renders native mobile components such as `View`, `Text`, `FlatList` and `TouchableOpacity` instead of HTML.

### Core Concepts
- **Components** – building the UI from small reusable pieces
- **JSX** – writing UI markup inside JavaScript
- **Props** – passing data into components
- **State (useState)** – managing selected items and screen changes
- **Lists (FlatList)** – rendering data efficiently
- **Styling (StyleSheet)** – organizing layout and design

---

### React Navigation
React Navigation is the standard library for moving between screens in React Native apps.
- **Stack Navigation** – push and pop screens, such as List → Detail
- **Tab Navigation** – bottom tabs such as Home, Favorites and Settings
- Native back gestures and header bars

---

### Axios
Axios is a promise-based HTTP client for calling APIs from JavaScript.
```js
import axios from "axios";

const res = await axios.get("https://api.example.com/recipes");
setRecipes(res.data);
```

---

### React Native Config
React Native Config loads environment settings from a `.env` file, keeping API keys and URLs out of the source code.
```
API_URL=https://api.example.com
API_KEY=your_key_here
```
```js
import Config from "react-native-config";

console.log(Config.API_URL);
```

---

## Capt's World

---

**Author:** L K Tauhidur Rahman (Capt)
