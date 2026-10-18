# FoodRecipe
# Capt's React Project under supervision of IBM

A hands-on practice repository for learning React and React Native by building real mobile apps with Expo.

---

# Capt's Recipe App

A cross-platform recipe app built with React Native and Expo, running on Android, iOS and the web from a single codebase.

### Features
- Welcome splash screen with animated rings
- Recipe list with category filter (Beef, Chicken, ...) and two-column cards
- Detail screen with ingredients and instructions
- Favorite any recipe with the heart button, and see them all under **My Favorites**
- **My Food**: create, edit and delete your own recipes (saved on the device)

### Tech Stack
- React Native 0.88 + Expo SDK 58 (JavaScript)
- React Navigation 7 (native stack)
- Redux Toolkit for favorites
- AsyncStorage for your own recipes
- Jest + React Native Testing Library for tests
- Runs on Android, iOS and Web

### Requirements
- **Node.js 22.13 or newer** (`node -v` to check)
- To run on a phone: the latest **Expo Go** app from the App Store / Play Store

### Run Locally
```bash
git clone https://github.com/CaptTauhid5832/FooodRec1pe.git
cd FooodRec1pe
npm install
npx expo start
```
Scan the QR code with Expo Go, or press **a** for Android, **i** for iOS, **w** for Web.

### Test and Build
```bash
npm test            # runs the test suite
npm run build:web   # production web build into dist/
```
Every push to `main` runs both automatically on GitHub Actions (`.github/workflows/ci.yml`).

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
