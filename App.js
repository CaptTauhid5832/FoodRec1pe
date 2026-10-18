// Foodie recipe app, all screens in one file so it runs on Expo Snack.
// Photos load from the GitHub repo, which must be public.
import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Pressable,
  FlatList, TextInput, ActivityIndicator, Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// ===== src/redux/favoritesSlice.js =====
// Built-in recipes are identified by idFood; recipes the user creates get an `id`.
// Prefixing keeps the two kinds from ever colliding.
const getRecipeKey = (recipe) => {
  if (!recipe) return null;
  if (recipe.idFood) return `food-${recipe.idFood}`;
  if (recipe.id) return `custom-${recipe.id}`;
  return null;
};

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const key = getRecipeKey(recipe);
      if (!key) return; // nothing we can reliably identify

      const index = state.favoriterecipes.findIndex(
        (item) => getRecipeKey(item) === key
      );
      if (index >= 0) {
        state.favoriterecipes.splice(index, 1); // already a favorite: remove it
      } else {
        state.favoriterecipes.push(recipe); // not a favorite yet: add it
      }
    },
  },
});

const { toggleFavorite } = favoritesSlice.actions;

const selectIsFavorite = (state, recipe) => {
  const key = getRecipeKey(recipe);
  return key !== null && state.favorites.favoriterecipes.some((item) => getRecipeKey(item) === key);
};

const favoritesReducer = favoritesSlice.reducer;

// ===== src/redux/store.js =====
const store = configureStore({ reducer: { favorites: favoritesReducer } });

const imageSource = (img) => (typeof img === "string" ? { uri: img } : img);

// ===== src/data/moreRecipes.js =====
// Recipes you added, each with its own photo in assets/recipes.
const moreRecipes = [
  {
  "category": "Dessert",
    "idFood": "15",
    "idCategory": "3",
    "recipeName": "Chocolate Brownies",
    "recipeInstructions": "Heat the oven to 180C/160C fan. Line a 20cm square tin with baking paper.\r\nMelt the chocolate and butter together over a low heat, then let it cool slightly.\r\nWhisk the eggs and sugar until pale and thick, then fold in the chocolate mixture.\r\nSift in the flour and cocoa and fold gently until just combined.\r\nPour into the tin and bake for 25 minutes until the top is set but the middle is still soft.\r\nCool completely in the tin before cutting into squares.",
    "recipeImage": "https://raw.githubusercontent.com/CaptTauhid5832/FoodRec1pe/main/assets/recipes/brownies.jpg",
    "recipeId": "dessert_15",
    "recipeCategory": "Dessert",
    "recipeOrigin": "American",
    "cookingDescription": "Heat the oven to 180C/160C fan. Line a 20cm square tin with baking paper.",
    "recipeTags": "Bake,Chocolate",
    "ingredients": [
      {
        "ingredientName": "Dark Chocolate",
        "measure": "200g"
      },
      {
        "ingredientName": "Butter",
        "measure": "175g"
      },
      {
        "ingredientName": "Caster Sugar",
        "measure": "250g"
      },
      {
        "ingredientName": "Eggs",
        "measure": "3 large"
      },
      {
        "ingredientName": "Plain Flour",
        "measure": "85g"
      },
      {
        "ingredientName": "Cocoa Powder",
        "measure": "40g"
      }
    ]
  },
  {
    "category": "Dessert",
    "idFood": "39",
    "idCategory": "3",
    "recipeName": "Lemon Delicious Pudding",
    "recipeInstructions": "Heat the oven to 180C/160C fan and butter a 1.5 litre baking dish.\r\nZest the lemons until you have 1 tablespoon of zest, then squeeze out 1/2 cup of juice.\r\nBeat the melted butter, sugar and zest together, then beat in the egg yolks one at a time.\r\nStir in the flour, then slowly whisk in the milk and lemon juice. The batter will be very runny.\r\nIn a clean bowl, whisk the egg whites until soft peaks form, then gently fold them into the batter.\r\nPour into the dish and place it in a roasting tin. Pour hot water into the tin to come halfway up the dish.\r\nBake for 40 to 45 minutes until the top is golden and springs back when touched.\r\nServe warm. The top is a light sponge and underneath is a lemon custard sauce.",
    "recipeImage": "https://raw.githubusercontent.com/CaptTauhid5832/FoodRec1pe/main/assets/recipes/lemon-pudding.jpg",
    "recipeId": "dessert_39",
    "recipeCategory": "Dessert",
    "recipeOrigin": "Australian",
    "cookingDescription": "A soft lemon sponge on top with its own lemon custard sauce underneath.",
    "recipeTags": "Pudding,Lemon",
    "ingredients": [
      {
        "ingredientName": "Lemons",
        "measure": "2 large (1 tbs zest, 1/2 cup juice)"
      },
      {
        "ingredientName": "Caster Sugar",
        "measure": "1 cup (200g)"
      },
      {
        "ingredientName": "Full Fat Milk",
        "measure": "1 cup (250ml)"
      },
      {
        "ingredientName": "Plain Flour",
        "measure": "1/3 cup (50g)"
      },
      {
        "ingredientName": "Eggs",
        "measure": "3, separated"
      },
      {
        "ingredientName": "Butter",
        "measure": "60g melted"
      }
    ]
  },
  {
    "category": "Lamb",
    "idFood": "40",
    "idCategory": "4",
    "recipeName": "Slow Roast Lamb",
    "recipeInstructions": "Make the roasting bed: put the garlic, onion and rosemary in the roasting pan. This lifts the lamb out of the juices so it cooks evenly, flavours the meat that touches it, and flavours the pan juices for the gravy.\r\nSeason the lamb leg all over with salt and pepper.\r\nTurn the lamb upside down (fat side down) onto the bed and pour the stock and wine around it. Leg is a lean cut, so slow-cooking it partly in liquid keeps it moist.\r\nDrizzle the exposed top of the lamb with olive oil.\r\nCover the pan tightly with foil and slow roast at 160C/140C fan for 5 hours, until the meat pulls apart easily.\r\nRemove the foil, turn the oven up to 200C/180C fan and roast for 20 to 30 minutes until browned.\r\nRest the lamb for 15 minutes. Strain the pan juices into a saucepan, whisk in the flour and simmer until thickened to make gravy.\r\nPull the lamb apart with tongs and serve with the gravy.",
    "recipeImage": "https://raw.githubusercontent.com/CaptTauhid5832/FoodRec1pe/main/assets/recipes/slow-roast-lamb.jpg",
    "recipeId": "lamb_40",
    "recipeCategory": "Lamb",
    "recipeOrigin": "Australian",
    "cookingDescription": "Lamb leg slow roasted on garlic, onion and rosemary until it falls apart.",
    "recipeTags": "Roast,Slow Cooked",
    "ingredients": [
      {
        "ingredientName": "Lamb Leg",
        "measure": "2kg bone-in"
      },
      {
        "ingredientName": "Garlic",
        "measure": "1 head, halved"
      },
      {
        "ingredientName": "Onions",
        "measure": "2, quartered"
      },
      {
        "ingredientName": "Rosemary",
        "measure": "4 sprigs"
      },
      {
        "ingredientName": "Chicken Stock",
        "measure": "2 cups (500ml)"
      },
      {
        "ingredientName": "Red Wine",
        "measure": "1 cup (250ml)"
      },
      {
        "ingredientName": "Olive Oil",
        "measure": "1 tbs"
      },
      {
        "ingredientName": "Plain Flour",
        "measure": "2 tbs (for gravy)"
      },
      {
        "ingredientName": "Salt",
        "measure": "1 tsp"
      },
      {
        "ingredientName": "Pepper",
        "measure": "1/2 tsp"
      }
    ]
  },
  {
    "category": "Pasta",
    "idFood": "41",
    "idCategory": "6",
    "recipeName": "Creamy Vegan Mushroom Pasta",
    "recipeInstructions": "Cook the pasta in salted boiling water. If using frozen peas, add them to the pasta water for the last minute of cooking. Drain.\r\nHeat 1 tbs oil in a pan over medium-low heat and saute the onion and garlic until tender and golden.\r\nPut the onion and garlic in a blender with the hemp seeds, vegetable broth, nutritional yeast, miso, salt and nutmeg.\r\nBlend until creamy and smooth.\r\nHeat the remaining oil in a skillet over medium heat. Add the mushrooms and saute for 6 to 7 minutes until golden and tender, then season with salt.\r\nToss the pasta and peas with the creamy sauce, top with the mushrooms and sprinkle with parsley.",
    "recipeImage": "https://raw.githubusercontent.com/CaptTauhid5832/FoodRec1pe/main/assets/recipes/vegan-mushroom-pasta.jpg",
    "recipeId": "pasta_41",
    "recipeCategory": "Pasta",
    "recipeOrigin": "Italian",
    "cookingDescription": "Pasta in a creamy hemp seed sauce with golden mushrooms and peas.",
    "recipeTags": "Pasta,Vegan,Creamy",
    "ingredients": [
      {
        "ingredientName": "Pasta (pappardelle or tagliatelle)",
        "measure": "340g"
      },
      {
        "ingredientName": "Frozen Peas",
        "measure": "1 cup"
      },
      {
        "ingredientName": "Olive Oil",
        "measure": "2 tbs"
      },
      {
        "ingredientName": "Onion",
        "measure": "1 chopped"
      },
      {
        "ingredientName": "Garlic",
        "measure": "3 cloves"
      },
      {
        "ingredientName": "Hemp Seeds",
        "measure": "1/2 cup"
      },
      {
        "ingredientName": "Vegetable Broth",
        "measure": "1 cup"
      },
      {
        "ingredientName": "Nutritional Yeast",
        "measure": "3 tbs"
      },
      {
        "ingredientName": "White Miso",
        "measure": "1 tbs"
      },
      {
        "ingredientName": "Nutmeg",
        "measure": "pinch"
      },
      {
        "ingredientName": "Mushrooms",
        "measure": "300g sliced"
      },
      {
        "ingredientName": "Salt",
        "measure": "to taste"
      },
      {
        "ingredientName": "Parsley",
        "measure": "to serve"
      }
    ]
  },
  {
    "category": "Seafood",
    "idFood": "42",
    "idCategory": "8",
    "recipeName": "Seafood Creole",
    "recipeInstructions": "Mix the oregano, salt, white pepper, black pepper, cayenne pepper, thyme and basil in a small bowl and set aside.\r\nMelt the butter in a large Dutch oven over medium heat. Stir in the tomato, onion, celery, green bell pepper and garlic. Cook and stir until the onion is translucent, about 5 minutes.\r\nStir in the chicken stock, tomato sauce, sugar, hot pepper sauce and bay leaves. Reduce the heat to low and bring to a simmer. Stir in the seasoning mix and simmer for about 20 minutes until the flavours blend.\r\nGently stir in the rock shrimp, bay scallops and haddock. Bring back to a simmer and cook until the shellfish and fish are opaque, about 20 minutes more. Remove the bay leaves and serve.",
    "recipeImage": "https://raw.githubusercontent.com/CaptTauhid5832/FoodRec1pe/main/assets/recipes/seafood-creole.jpg",
    "recipeId": "seafood_42",
    "recipeCategory": "Seafood",
    "recipeOrigin": "American",
    "cookingDescription": "Shrimp, scallops and haddock simmered in a spicy tomato sauce.",
    "recipeTags": "Seafood,Stew,Spicy",
    "ingredients": [
      {
        "ingredientName": "Dried Oregano",
        "measure": "1/2 tsp"
      },
      {
        "ingredientName": "Salt",
        "measure": "1 tsp"
      },
      {
        "ingredientName": "White Pepper",
        "measure": "1/4 tsp"
      },
      {
        "ingredientName": "Black Pepper",
        "measure": "1/4 tsp"
      },
      {
        "ingredientName": "Cayenne Pepper",
        "measure": "1/4 tsp"
      },
      {
        "ingredientName": "Dried Thyme",
        "measure": "1/2 tsp"
      },
      {
        "ingredientName": "Dried Basil",
        "measure": "1/2 tsp"
      },
      {
        "ingredientName": "Butter",
        "measure": "4 tbs"
      },
      {
        "ingredientName": "Tomato",
        "measure": "1 large chopped"
      },
      {
        "ingredientName": "Onion",
        "measure": "1 chopped"
      },
      {
        "ingredientName": "Celery",
        "measure": "2 stalks chopped"
      },
      {
        "ingredientName": "Green Bell Pepper",
        "measure": "1 chopped"
      },
      {
        "ingredientName": "Garlic",
        "measure": "3 cloves minced"
      },
      {
        "ingredientName": "Chicken Stock",
        "measure": "2 cups"
      },
      {
        "ingredientName": "Tomato Sauce",
        "measure": "1 cup"
      },
      {
        "ingredientName": "Sugar",
        "measure": "1 tsp"
      },
      {
        "ingredientName": "Hot Pepper Sauce",
        "measure": "1 tsp"
      },
      {
        "ingredientName": "Bay Leaves",
        "measure": "2"
      },
      {
        "ingredientName": "Rock Shrimp",
        "measure": "250g"
      },
      {
        "ingredientName": "Bay Scallops",
        "measure": "250g"
      },
      {
        "ingredientName": "Haddock",
        "measure": "250g cut into chunks"
      }
    ]
  }
];

// ===== src/data/extraCategoryRecipes.js =====
// One recipe for each extra category. The photo is that category's image.
const img = (name) => `https://www.themealdb.com/images/category/${name}.png`;

const make = (idFood, idCategory, category, recipeName, origin, ingredients, steps) => ({
  category,
  idFood,
  idCategory,
  recipeName,
  recipeInstructions: steps.join("\r\n"),
  recipeImage: img(category.toLowerCase()),
  recipeId: `${category.toLowerCase()}_${idFood}`,
  recipeCategory: category,
  recipeOrigin: origin,
  cookingDescription: steps[0],
  recipeTags: category,
  ingredients: ingredients.map(([ingredientName, measure]) => ({ ingredientName, measure })),
});

const extraCategoryRecipes = [
  make("50", "9", "Breakfast", "Full English Breakfast", "British",
    [["Eggs", "2"], ["Sausages", "2"], ["Bacon", "2 rashers"], ["Baked Beans", "200g"], ["Tomato", "1 halved"], ["Mushrooms", "100g"], ["Bread", "2 slices"]],
    ["Grill the sausages and bacon until golden.",
     "Fry the mushrooms and tomato halves in a little oil.",
     "Warm the baked beans in a small pan.",
     "Fry the eggs to your liking and toast the bread.",
     "Serve everything together on a warm plate."]),
  make("51", "10", "Pork", "Honey Garlic Pork Chops", "American",
    [["Pork Chops", "4"], ["Honey", "3 tbs"], ["Garlic", "4 cloves minced"], ["Soy Sauce", "2 tbs"], ["Olive Oil", "1 tbs"], ["Salt", "pinch"], ["Pepper", "pinch"]],
    ["Season the pork chops with salt and pepper.",
     "Heat the oil in a pan and cook the chops 4-5 minutes per side.",
     "Mix the honey, garlic and soy sauce in a bowl.",
     "Pour the sauce over the chops and simmer for 2 minutes until sticky.",
     "Rest for 5 minutes, then serve."]),
  make("52", "11", "Starter", "Garlic Bread", "Italian",
    [["Baguette", "1"], ["Butter", "100g softened"], ["Garlic", "3 cloves crushed"], ["Parsley", "2 tbs chopped"], ["Salt", "pinch"]],
    ["Heat the oven to 200C/180C fan.",
     "Mix the butter, garlic, parsley and salt.",
     "Cut the baguette into slices without cutting all the way through.",
     "Spread the garlic butter between the slices and wrap in foil.",
     "Bake for 15 minutes, open the foil and bake 5 more minutes until crisp."]),
  make("53", "12", "Vegetarian", "Vegetable Stir Fry", "Chinese",
    [["Broccoli", "1 head"], ["Carrot", "2 sliced"], ["Bell Pepper", "1 sliced"], ["Soy Sauce", "3 tbs"], ["Ginger", "1 tbs grated"], ["Garlic", "2 cloves"], ["Vegetable Oil", "2 tbs"]],
    ["Heat the oil in a wok over high heat.",
     "Add the garlic and ginger and fry for 30 seconds.",
     "Add the carrot and broccoli and stir fry for 3 minutes.",
     "Add the bell pepper and cook for 2 more minutes.",
     "Stir in the soy sauce and serve with rice."]),
  make("54", "13", "Side", "Roast Potatoes", "British",
    [["Potatoes", "1kg"], ["Vegetable Oil", "4 tbs"], ["Rosemary", "2 sprigs"], ["Salt", "1 tsp"]],
    ["Heat the oven to 220C/200C fan with the oil in a roasting tin.",
     "Peel and cut the potatoes into large chunks.",
     "Boil for 8 minutes, drain and shake to rough up the edges.",
     "Tip into the hot oil, add rosemary and salt, and turn to coat.",
     "Roast for 45 minutes, turning once, until golden and crisp."]),
];

// ===== src/components/categories.js =====
function Categories({
    categories,
    activeCategory,
    handleChangeCategory,
  }) {
    const navigation = useNavigation(); // Use navigation
  
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={categoriesStyles.scrollContainer}
        >
          {/* Add "My Food" category */}
          <TouchableOpacity
            onPress={() => navigation.navigate("MyFood")} // Navigate to "MyFood" screen
            style={categoriesStyles.categoryContainer}
          >
            <View style={[categoriesStyles.imageContainer, categoriesStyles.myFoodButton]}>
              <Image
                source={{uri:'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                style={categoriesStyles.categoryImage}
              />
            </View>
            <Text style={categoriesStyles.categoryText}>My Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("FavoriteScreen")} // Navigate to "MyFood" screen
            style={categoriesStyles.categoryContainer}
          >
            <View style={[categoriesStyles.imageContainer, categoriesStyles.myFoodButton]}>
              <Image
                source={{uri:'https://images.unsplash.com/photo-1463740839922-2d3b7e426a56?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
                style={categoriesStyles.categoryImage}
              />
            </View>
            <Text style={categoriesStyles.categoryText}>My Favorites</Text>
          </TouchableOpacity>
  
          {categories.map((cat, index) => {
            let isActive = cat.strCategory == activeCategory;
            let activeButtonStyle = isActive
              ? categoriesStyles.activeButton
              : categoriesStyles.inactiveButton;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                style={categoriesStyles.categoryContainer}
              >
                <View style={[categoriesStyles.imageContainer, activeButtonStyle]}>
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={categoriesStyles.categoryImage}
                  />
                </View>
                <Text style={categoriesStyles.categoryText}>{cat.strCategory}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  
  const categoriesStyles = StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 15,
    },
    categoryContainer: {
      alignItems: "center",
      marginRight: wp(4),
    },
    imageContainer: {
      borderRadius: 9999,
      padding: 6,
    },
    activeButton: {
      backgroundColor: "#F59E0B",
    },
    inactiveButton: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    categoryImage: {
      width: hp(6),
      height: hp(6),
      borderRadius: 9999,
    },
    categoryText: {
      fontSize: hp(1.6),
      color: "#52525B",
      marginTop: hp(0.5),
    },
    // Styles for "My Food" category
    myFoodButton: {
      backgroundColor: "#4ADE80",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
    myFoodText: {
      color: "white",
      fontWeight: "bold",
      fontSize: hp(1.5),
    },
  });

// ===== src/components/recipes.js =====
function FoodItems({ categories, foods }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => (
<ArticleCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={recipesStyles.container}>
      <View testID="recipesDisplay">
        {foods.length === 0 ? (
          <Text style={recipesStyles.emptyText}>No recipes in this category yet.</Text>
        ) : null}
        <FlatList
          data={foods}
          keyExtractor={(item) => item.idFood}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={recipesStyles.row}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  return (
    <View
      style={[recipesStyles.cardContainer, { paddingLeft: 20, paddingRight: 15}]} testID="articleDisplay"
    >
      <TouchableOpacity testID={`recipeCard-${item.idFood}`} onPress={() => navigation.navigate("RecipeDetail", { ...item })}>
        <Image
          source={imageSource(item.recipeImage)}
          style={[recipesStyles.articleImage, { height: index % 3 === 0 ? hp(25) : hp(35) }]}
        />
        <Text style={recipesStyles.articleText}>
          {(item.recipeName || "").length > 20
            ? `${item.recipeName.slice(0, 20)}...`
            : item.recipeName}
        </Text>
        <Text style={recipesStyles.articleDescription}>
          {item.cookingDescription && item.cookingDescription.length > 40
            ? `${item.cookingDescription.slice(0, 40)}...`
            : item.cookingDescription}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const recipesStyles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4), // mx-4 equivalent
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(3),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginBottom: hp(1.5),
  },
  loading: {
    marginTop: hp(20),
  },
  cardContainer: {
    justifyContent: "center",
    marginBottom: hp(1.5),
    flex: 1, // Allows cards to grow and fill space evenly
  },
  articleImage: {
    width: "100%",
   
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.05)", // bg-black/5
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600", // font-semibold
    color: "#52525B", // text-neutral-600
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280", // gray-500
    marginLeft: wp(2),
    marginTop: hp(0.5),
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: hp(1.8),
    marginTop: hp(4),
  },
  row: {
    justifyContent: "space-between", // Align columns evenly
  },
});

// ===== src/screens/RecipesFormScreen.js =====
const STORAGE_KEY = "customrecipes";

const makeRecipeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [ingredients, setIngredients] = useState(
    recipeToEdit && recipeToEdit.ingredients ? recipeToEdit.ingredients.join("\n") : ""
  );
  const [instructions, setInstructions] = useState(
    recipeToEdit
      ? recipeToEdit.instructions
        ? recipeToEdit.instructions.join("\n")
        : recipeToEdit.description || ""
      : ""
  );
  const [error, setError] = useState("");

  const toList = (text) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.5,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.error("Error picking image:", e);
      setError("Could not open the photo library.");
    }
  };

  const saverecipe = async () => {
    if (!title.trim()) {
      setError("Please give your recipe a title.");
      return;
    }
    const newrecipe = {
      // keep the same id when editing so favorites stay linked to this recipe
      id: recipeToEdit?.id || makeRecipeId(),
      title: title.trim(),
      image: image.trim(),
      ingredients: toList(ingredients),
      instructions: toList(instructions),
      description: toList(instructions).join(" "),
    };
    try {
      const existingRecipes = await AsyncStorage.getItem(STORAGE_KEY);
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

      if (recipeToEdit !== undefined && recipeIndex !== undefined) {
        recipes[recipeIndex] = newrecipe; // update the recipe being edited
      } else {
        recipes.push(newrecipe); // add a new recipe
      }
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      // MyRecipeScreen reloads automatically when it comes back into focus
      navigation.goBack();
    } catch (e) {
      console.error("Error saving the recipe:", e);
      setError("Could not save the recipe. Please try again.");
    }
  };

  return (
    <ScrollView style={formStyles.container} contentContainerStyle={formStyles.content}>
      <Text style={formStyles.label}>Recipe Name</Text>
      <TextInput
        placeholder="Recipe name"
        value={title}
        onChangeText={(t) => {
          setTitle(t);
          if (error) setError("");
        }}
        style={formStyles.input}
        testID="titleInput"
      />

      <Text style={formStyles.label}>Image</Text>
      <TouchableOpacity onPress={pickImage} style={formStyles.uploadButton} testID="uploadImageButton">
        <Text style={formStyles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="or paste an image URL"
        value={image}
        onChangeText={setImage}
        style={formStyles.input}
        autoCapitalize="none"
        testID="imageInput"
      />
      {image ? (
        <Image source={{ uri: image }} style={formStyles.image} testID="imagePreview" />
      ) : (
        <Text style={formStyles.imagePlaceholder}>No image selected</Text>
      )}

      <Text style={formStyles.label}>Ingredients (one per line)</Text>
      <TextInput
        placeholder={"2 eggs\n1 cup flour"}
        value={ingredients}
        onChangeText={setIngredients}
        multiline={true}
        numberOfLines={5}
        style={[formStyles.input, formStyles.multiline]}
        testID="ingredientsInput"
      />

      <Text style={formStyles.label}>Instructions (one step per line)</Text>
      <TextInput
        placeholder={"Mix the eggs and flour\nBake for 20 minutes"}
        value={instructions}
        onChangeText={setInstructions}
        multiline={true}
        numberOfLines={6}
        style={[formStyles.input, formStyles.multiline]}
        testID="instructionsInput"
      />

      {error ? <Text style={formStyles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={saverecipe} style={formStyles.saveButton} testID="saveButton">
        <Text style={formStyles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={formStyles.cancelButton}>
        <Text style={formStyles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: wp(4),
    paddingTop: hp(4),
    paddingBottom: hp(6),
  },
  label: {
    fontWeight: "bold",
    color: "#4B5563",
    marginTop: hp(1),
  },
  multiline: {
    height: hp(16),
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
    marginTop: hp(1),
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: hp(1),
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: hp(1),
  },
  imagePlaceholder: {
    height: hp(20),
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: hp(20),
    color: "#9CA3AF",
  },
  errorText: {
    color: "#DC2626",
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 6,
  },
  cancelButtonText: {
    color: "#4F75FF",
  },
});

// ===== src/screens/HomeScreen.js =====
function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Chicken");

  // Hardcoded categories for news
  const [categories, setCategories] = useState([
    {
      idCategory: "1",
      strCategory: "Beef",
      strCategoryThumb: "https://www.themealdb.com/images/category/beef.png",
      
      },
    {
      idCategory: "2",
      strCategory: "Chicken",
      strCategoryThumb: "https://www.themealdb.com/images/category/chicken.png",
     
    },
    {
      idCategory: "3",
      strCategory: "Dessert",
      strCategoryThumb: "https://www.themealdb.com/images/category/dessert.png",
      
    },
    {
      idCategory: "4",
      strCategory: "Lamb",
      strCategoryThumb: "https://www.themealdb.com/images/category/lamb.png",
    },
    {
      idCategory: "6",
      strCategory: "Pasta",
      strCategoryThumb: "https://www.themealdb.com/images/category/pasta.png",
    },
    {
      idCategory: "8",
      strCategory: "Seafood",
      strCategoryThumb: "https://www.themealdb.com/images/category/seafood.png",
    },
    {
      idCategory: "9",
      strCategory: "Breakfast",
      strCategoryThumb: "https://www.themealdb.com/images/category/breakfast.png",
    },
    {
      idCategory: "10",
      strCategory: "Pork",
      strCategoryThumb: "https://www.themealdb.com/images/category/pork.png",
    },
    {
      idCategory: "11",
      strCategory: "Starter",
      strCategoryThumb: "https://www.themealdb.com/images/category/starter.png",
    },
    {
      idCategory: "12",
      strCategory: "Vegetarian",
      strCategoryThumb: "https://www.themealdb.com/images/category/vegetarian.png",
    },
    {
      idCategory: "13",
      strCategory: "Side",
      strCategoryThumb: "https://www.themealdb.com/images/category/side.png",
    },
      
  ]);

  // Keep all foods in state (unfiltered list)
  const [allFood, setAllFood] = useState([
    {
      category:'Beef',
      idFood:'1',
      idCategory: "1",
      recipeName: "Beef and Mustard Pie",
      recipeInstructions: "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
      recipeImage: "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "beef_01",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "British",
      cookingDescription: "Preheat the oven to 150C/300F/Gas 2. Toss the beef and flour together in a bowl with some salt and black pepper...",
      recipeTags: "Meat,Pie",
      ingredients: [
        {
          ingredientName: "Beef",
          measure: "1kg"
        },
        {
          ingredientName: "Plain Flour",
          measure: "2 tbs"
        },
        {
          ingredientName: "Rapeseed Oil",
          measure: "2 tbs"
        },
        {
          ingredientName: "Red Wine",
          measure: "200ml"
        },
        {
          ingredientName: "Beef Stock",
          measure: "400ml"
        },
        {
          ingredientName: "Onion",
          measure: "1 finely sliced"
        },
        {
          ingredientName: "Carrots",
          measure: "2 chopped"
        },
        {
          ingredientName: "Thyme",
          measure: "3 sprigs"
        },
        {
          ingredientName: "Mustard",
          measure: "2 tbs"
        },
        {
          ingredientName: "Egg Yolks",
          measure: "2 free-range"
        },
        {
          ingredientName: "Puff Pastry",
          measure: "400g"
        },
        {
          ingredientName: "Green Beans",
          measure: "300g"
        },
        {
          ingredientName: "Butter",
          measure: "25g"
        },
        {
          ingredientName: "Salt",
          measure: "pinch"
        },
        {
          ingredientName: "Pepper",
          measure: "pinch"
        }
      ],
       

    },
    {
      category:'Beef',
      idFood:'2',
      idCategory: "1",
      recipeInstructions: "Add'l ingredients: mayonnaise, siracha\r\n\r\n1\r\n\r\nPlace rice in a fine-mesh sieve and rinse until water runs clear. Add to a small pot with 1 cup water (2 cups for 4 servings) and a pinch of salt. Bring to a boil, then cover and reduce heat to low. Cook until rice is tender, 15 minutes. Keep covered off heat for at least 10 minutes or until ready to serve.\r\n\r\n2\r\n\r\nMeanwhile, wash and dry all produce. Peel and finely chop garlic. Zest and quarter lime (for 4 servings, zest 1 lime and quarter both). Trim and halve cucumber lengthwise; thinly slice crosswise into half-moons. Halve, peel, and medium dice onion. Trim, peel, and grate carrot.\r\n\r\n3\r\n\r\nIn a medium bowl, combine cucumber, juice from half the lime, ¼ tsp sugar (½ tsp for 4 servings), and a pinch of salt. In a small bowl, combine mayonnaise, a pinch of garlic, a squeeze of lime juice, and as much sriracha as you’d like. Season with salt and pepper.\r\n\r\n4\r\n\r\nHeat a drizzle of oil in a large pan over medium-high heat. Add onion and cook, stirring, until softened, 4-5 minutes. Add beef, remaining garlic, and 2 tsp sugar (4 tsp for 4 servings). Cook, breaking up meat into pieces, until beef is browned and cooked through, 4-5 minutes. Stir in soy sauce. Turn off heat; taste and season with salt and pepper.\r\n\r\n5\r\n\r\nFluff rice with a fork; stir in lime zest and 1 TBSP butter. Divide rice between bowls. Arrange beef, grated carrot, and pickled cucumber on top. Top with a squeeze of lime juice. Drizzle with sriracha mayo.",
      recipeName: "Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber",
      recipeImage: "https://images.unsplash.com/photo-1676300185292-e23bb3db50fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "beef_02",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "Vietnamese",
      cookingDescription: "In a medium bowl, toss cucumber with vinegar, salt, and sugar; set aside to pickle...",
      recipeTags: "Rice,Bowl",
      ingredients: [
        {
          ingredientName: "Ground Beef",
          measure: "500g"
        },
        {
          ingredientName: "Rice",
          measure: "200g"
        },
        {
          ingredientName: "Cucumber",
          measure: "1 sliced"
        },
        {
          ingredientName: "Carrot",
          measure: "1 grated"
        },
        {
          ingredientName: "Sriracha",
          measure: "2 tbs"
        },
        {
          ingredientName: "Mayonnaise",
          measure: "3 tbs"
        },
        {
          ingredientName: "Soy Sauce",
          measure: "2 tbs"
        },
        {
          ingredientName: "Lime",
          measure: "1 juiced"
        },
        {
          ingredientName: "Brown Sugar",
          measure: "1 tbs"
        },
        {
          ingredientName: "Vinegar",
          measure: "2 tbs"
        }
      ],
    },
    {
      idCategory: "1",
      idFood:'3',
      category:'Beef',
      recipeName: "Beef Brisket Pot Roast",
      recipeInstructions:"To cook Beef Brisket Pot Roast, preheat the oven to 160°C (320°F) and season a 1.5kg beef brisket with 2 tsp salt, 1 tsp pepper, 1 tsp garlic powder, and 1 tsp onion powder. Heat 2 tbsp olive oil in a large oven-safe pot over medium-high heat, sear the brisket on all sides, then set it aside. In the same pot, sauté 2 chopped onions, 4 chopped carrots, and 3 minced garlic cloves until softened. Pour in 250ml red wine, deglaze the pot by scraping up the browned bits, and simmer for 2-3 minutes. Add 500ml beef stock and 3 sprigs of thyme, then return the brisket to the pot. Cover and cook in the oven for 3-4 hours until the meat is tender. Let the brisket rest for 10-15 minutes before slicing, and serve with the vegetables and sauce from the pot.",
      recipeImage: "https://images.unsplash.com/photo-1622003184404-bc0c66144534?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "beef_03",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "American",
      cookingDescription: "Preheat oven to 160°C/325°F. Rub brisket with salt, pepper, garlic powder, and onion powder...",
      recipeTags: "Roast,Pot",
      ingredients: [
        {
          ingredientName: "Beef Brisket",
          measure: "1.5kg"
        },
        {
          ingredientName: "Salt",
          measure: "2 tsp"
        },
        {
          ingredientName: "Pepper",
          measure: "1 tsp"
        },
        {
          ingredientName: "Garlic Powder",
          measure: "1 tsp"
        },
        {
          ingredientName: "Onion Powder",
          measure: "1 tsp"
        },
        {
          ingredientName: "Olive Oil",
          measure: "2 tbs"
        },
        {
          ingredientName: "Onions",
          measure: "2 chopped"
        },
        {
          ingredientName: "Carrots",
          measure: "4 chopped"
        },
        {
          ingredientName: "Garlic",
          measure: "3 cloves minced"
        },
        {
          ingredientName: "Beef Stock",
          measure: "500ml"
        },
        {
          ingredientName: "Red Wine",
          measure: "250ml"
        },
        {
          ingredientName: "Thyme",
          measure: "3 sprigs"
        }
      ],

    },
    {
      idCategory: "1",
      idFood:'4',
      category:'Beef',
      recipeName: "Beef Bourguignon",
              recipeInstructions: "Heat a large casserole pan and add 1 tbsp goose fat. Season the beef and fry until golden brown, about 3-5 mins, then turn over and fry the other side until the meat is browned all over, adding more fat if necessary. Do this in 2-3 batches, transferring the meat to a colander set over a bowl when browned.\r\nIn the same pan, fry the bacon, shallots or pearl onions, mushrooms, garlic and bouquet garni until lightly browned. Mix in the tomato purée and cook for a few mins, stirring into the mixture. This enriches the bourguignon and makes a great base for the stew. Then return the beef and any drained juices to the pan and stir through.\r\nPour over the wine and about 100ml water so the meat bobs up from the liquid, but isn’t completely covered. Bring to the boil and use a spoon to scrape the caramelised cooking juices from the bottom of the pan – this will give the stew more flavour.\r\nHeat oven to 150C/fan 130C/gas 2. Make a cartouche: tear off a square of foil slightly larger than the casserole, arrange it in the pan so it covers the top of the stew and trim away any excess foil. Then cook for 3 hrs. If the sauce looks watery, remove the beef and veg with a slotted spoon, and set aside. Cook the sauce over a high heat for a few mins until the sauce has thickened a little, then return the beef and vegetables to the pan.\r\nTo make the celeriac mash, peel the celeriac and cut into cubes. Heat the olive oil in a large frying pan. Tip in the celeriac and fry for 5 mins until it turns golden. Season well with salt and pepper. Stir in the rosemary, thyme, bay and cardamom pods, then pour over 200ml water, enough to nearly cover the celeriac. Turn the heat to low, partially cover the pan and leave to simmer for 25-30 mins.\r\nAfter 25-30 mins, the celeriac should be soft and most of the water will have evaporated. Drain away any remaining water, then remove the herb sprigs, bay and cardamom pods. Lightly crush with a potato masher, then finish with a glug of olive oil and season to taste. Spoon the beef bourguignon into serving bowls and place a large spoonful of the celeriac mash on top. Garnish with one of the bay leaves, if you like.",
      recipeImage: "https://images.unsplash.com/photo-1548869206-93b036288d7e?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "beef_04",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "French",
      cookingDescription: "Preheat the oven to 150°C. Heat oil in a large casserole, brown the beef, and set aside. In the same pot, sauté onions...",
      recipeTags: "Stew,Meat",
      ingredients: [
        {
          ingredientName: "Beef Chuck",
          measure: "1kg"
        },
        {
          ingredientName: "Onions",
          measure: "2 sliced"
        },
        {
          ingredientName: "Carrots",
          measure: "3 chopped"
        },
        {
          ingredientName: "Garlic",
          measure: "4 cloves minced"
        },
        {
          ingredientName: "Bacon",
          measure: "150g chopped"
        },
        {
          ingredientName: "Red Wine",
          measure: "500ml"
        },
        {
          ingredientName: "Beef Stock",
          measure: "500ml"
        },
        {
          ingredientName: "Thyme",
          measure: "2 sprigs"
        },
        {
          ingredientName: "Mushrooms",
          measure: "200g sliced"
        },
        {
          ingredientName: "Butter",
          measure: "50g"
        },
        {
          ingredientName: "Salt",
          measure: "pinch"
        },
        {
          ingredientName: "Pepper",
          measure: "pinch"
        }
      ],

    },
    {
      idFood:'5',
      idCategory: "1",
      category:'Beef',
      recipeInstructions:"To make Beef Stroganoff, season 500g of thinly sliced beef with salt and pepper, then lightly coat the beef with 2 tablespoons of flour. Heat 2 tablespoons of olive oil and 2 tablespoons of butter in a large pan over medium-high heat. Sear the beef strips in batches until browned, then remove and set aside. In the same pan, sauté 1 finely chopped onion and 2 minced garlic cloves until soft and fragrant. Add 250g of sliced mushrooms and cook until softened. Stir in 1 tablespoon of flour, cook for 1 minute, then pour in 1 cup of beef stock and 1 cup of sour cream. Simmer the mixture for a few minutes, then return the beef to the pan and cook for another 5 minutes, allowing the sauce to thicken and coat the beef. Serve hot over noodles or rice, garnished with fresh parsley.",
      recipeName: "Beef Stroganoff",
      recipeImage: "https://images.unsplash.com/photo-1726677730666-fdc08a8da464?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "beef_05",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "Russian",
      cookingDescription: "Heat butter in a pan, cook the beef strips until browned. Add onions, garlic, and mushrooms, sautéing until soft...",
      recipeTags: "Creamy,Meat",
      ingredients: [
        {
          ingredientName: "Beef Sirloin",
          measure: "500g"
        },
        {
          ingredientName: "Onions",
          measure: "1 chopped"
        },
        {
          ingredientName: "Garlic",
          measure: "2 cloves minced"
        },
        {
          ingredientName: "Mushrooms",
          measure: "200g sliced"
        },
        {
          ingredientName: "Sour Cream",
          measure: "150g"
        },
        {
          ingredientName: "Dijon Mustard",
          measure: "1 tbs"
        },
        {
          ingredientName: "Beef Stock",
          measure: "200ml"
        },
        {
          ingredientName: "Butter",
          measure: "2 tbs"
        },
        {
          ingredientName: "Salt",
          measure: "pinch"
        },
        {
          ingredientName: "Pepper",
          measure: "pinch"
        }
      ],       
        
    },
    {
      idFood:'6',
      idCategory: "1",
      recipeInstructions:"To make Beef Tacos, heat 1 tablespoon of oil in a skillet over medium heat, then add 500g of ground beef and cook until browned, breaking it up with a spoon. Drain excess fat and stir in 1 packet of taco seasoning or a homemade mix of 1 tsp chili powder, 1/2 tsp cumin, 1/2 tsp paprika, 1/2 tsp garlic powder, and 1/2 tsp onion powder, along with 1/4 cup of water. Simmer for 5-7 minutes until the beef is fully cooked and the flavors meld. Warm taco shells or tortillas, then fill them with the seasoned beef. Top with your choice of shredded lettuce, diced tomatoes, grated cheese, sour cream, salsa, and guacamole. Serve and enjoy!",
      category:'Beef',
      recipeName: "Beef Tacos",
      recipeImage: "https://images.unsplash.com/photo-1619221882161-95135fca04e4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "beef_06",
      alternateDrink: null,
      recipeCategory: "Beef",
      recipeOrigin: "Mexican",
      cookingDescription: "In a skillet, cook the beef until browned. Add onions, garlic, cumin, and chili powder, cooking for 5 minutes...",
      recipeTags: "Mexican,Taco",
      ingredients: [
        {
          ingredientName: "Ground Beef",
          measure: "500g"
        },
        {
          ingredientName: "Onions",
          measure: "1 chopped"
        },
        {
          ingredientName: "Garlic",
          measure: "2 cloves minced"
        },
        {
          ingredientName: "Cumin",
          measure: "1 tsp"
        },
        {
          ingredientName: "Chili Powder",
          measure: "1 tsp"
        },
        {
          ingredientName: "Tomatoes",
          measure: "2 chopped"
        },
        {
          ingredientName: "Lettuce",
          measure: "100g shredded"
        },
        {
          ingredientName: "Cheese",
          measure: "100g grated"
        },
        {
          ingredientName: "Sour Cream",
          measure: "100g"
        },
        {
          ingredientName: "Tortillas",
          measure: "6 small"
        }
      ],
      
        
    },
    {
      idCategory: "2",
      idFood:'7',
      recipeInstructions:"To make Chicken Curry, heat 2 tablespoons of oil in a large pan over medium heat, then sauté 1 chopped onion until soft. Add 2 minced garlic cloves, 1 tablespoon of grated ginger, and cook for 1-2 minutes. Stir in 2 tablespoons of curry powder, 1 teaspoon of cumin, and 1 teaspoon of turmeric, cooking for another minute until fragrant. Add 500g of diced chicken and brown the pieces on all sides. Pour in 400ml of coconut milk and 1 cup of chicken stock, bringing the mixture to a simmer. Cover and cook for 20-25 minutes until the chicken is tender. Season with salt and pepper to taste, then garnish with fresh cilantro. Serve the curry over rice or with naan bread.",
      category:'Chicken',
      recipeName: "Chicken Curry",
      recipeImage: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_01",
      recipeCategory: "Chicken",
      recipeOrigin: "Indian",
      cookingDescription: "Cook chicken with spices, tomatoes, and onions until tender.",
      recipeTags: "Spicy,Curry",
      ingredients: [
        {
          ingredientName: "Chicken",
          measure: "500g"
        },
        {
          ingredientName: "Onions",
          measure: "2 chopped"
        },
        {
          ingredientName: "Tomatoes",
          measure: "3 chopped"
        },
        {
          ingredientName: "Cumin",
          measure: "1 tsp"
        },
        {
          ingredientName: "Turmeric",
          measure: "1 tsp"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'8',
      recipeInstructions:"To make Chicken Alfredo, season 2 boneless, skinless chicken breasts with salt and pepper, then cook in a large skillet with 2 tablespoons of olive oil over medium heat until golden and cooked through, about 6-7 minutes per side. Remove the chicken, slice it, and set aside. In the same pan, melt 2 tablespoons of butter, add 3 minced garlic cloves, and sauté for 1 minute. Stir in 1 cup of heavy cream and bring to a simmer, then add 1 cup of grated Parmesan cheese, stirring until the sauce is smooth and thickened. Cook 300g of fettuccine pasta according to package instructions, drain, and toss it with the Alfredo sauce. Add the sliced chicken on top and garnish with parsley before serving.",
      category:'Chicken',
      recipeName: "Chicken Alfredo",

      recipeImage: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_02",
      recipeCategory: "Chicken",
      recipeOrigin: "Italian",
      cookingDescription: "Cook chicken with Alfredo sauce and serve with pasta.",
      recipeTags: "Pasta,Creamy",
      ingredients: [
        {
          ingredientName: "Chicken",
          measure: "400g"
        },
        {
          ingredientName: "Cream",
          measure: "200ml"
        },
        {
          ingredientName: "Parmesan",
          measure: "100g grated"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'9',
      category:'Chicken',
      recipeInstructions:"To make Chicken Parmesan, start by seasoning 2 boneless, skinless chicken breasts with salt and pepper, then coat each in flour, dip in beaten eggs, and cover with breadcrumbs mixed with grated Parmesan cheese. Heat 2 tablespoons of olive oil in a skillet over medium heat and cook the breaded chicken breasts for 4-5 minutes per side until golden brown and crispy. Transfer the chicken to a baking dish, top each breast with marinara sauce and shredded mozzarella cheese. Bake in a preheated oven at 190°C (375°F) for 15-20 minutes until the cheese is melted and bubbly. Garnish with fresh basil and serve over pasta or with a side salad.",
      recipeName: "Chicken Parmesan",
      recipeImage: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_03",
      recipeCategory: "Chicken",
      recipeOrigin: "Italian",
      cookingDescription: "Bread and fry chicken cutlets, then top with marinara sauce and cheese.",
      recipeTags: "Breaded,Cheesy",
      ingredients: [
        {
          ingredientName: "Chicken Cutlets",
          measure: "4 pieces"
        },
        {
          ingredientName: "Marinara Sauce",
          measure: "1 cup"
        },
        {
          ingredientName: "Mozzarella Cheese",
          measure: "1 cup shredded"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'10',
      category:'Chicken',
      recipeInstructions:"To make Chicken Teriyaki, heat 1 tablespoon of oil in a skillet over medium heat, then cook 2 boneless, skinless chicken breasts, sliced into strips, until browned and cooked through, about 5-6 minutes. In a small bowl, whisk together 1/4 cup soy sauce, 2 tablespoons of honey, 1 tablespoon of rice vinegar, 1 tablespoon of sesame oil, 1 tablespoon of cornstarch, and 2 minced garlic cloves. Pour the sauce over the cooked chicken and simmer for 3-4 minutes until the sauce thickens and coats the chicken. Serve the chicken teriyaki with steamed rice and garnish with sesame seeds and chopped green onions.",
      recipeName: "Chicken Teriyaki",
      recipeImage: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_04",
      recipeCategory: "Chicken",
      recipeOrigin: "Japanese",
      cookingDescription: "Marinate chicken in teriyaki sauce and grill until cooked.",
      recipeTags: "Grilled,Asian",
      ingredients: [
        {
          ingredientName: "Chicken",
          measure: "500g"
        },
        {
          ingredientName: "Teriyaki Sauce",
          measure: "1/2 cup"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'11',
      recipeInstructions:"To make Chicken Fajitas, heat 1 tablespoon of oil in a large skillet over medium heat, then cook 2 boneless, skinless chicken breasts, sliced into thin strips, seasoned with 1 teaspoon of chili powder, 1 teaspoon of cumin, 1/2 teaspoon of paprika, salt, and pepper. Cook the chicken for 5-6 minutes until browned and cooked through. Remove the chicken from the skillet and set aside. In the same pan, sauté 1 sliced onion and 2 sliced bell peppers for about 4-5 minutes until softened. Return the chicken to the skillet and toss to combine with the vegetables. Serve the fajitas with warm tortillas and your choice of toppings like guacamole, sour cream, salsa, and cheese.",
      category:'Chicken',
      recipeName: "Chicken Fajitas",
      recipeImage: "https://images.unsplash.com/photo-1689773976415-293dd893f77e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_05",
      recipeCategory: "Chicken",
      recipeOrigin: "Mexican",
      cookingDescription: "Cook chicken with bell peppers and onions, serve in tortillas.",
      recipeTags: "Mexican,Spicy",
      ingredients: [
        {
          ingredientName: "Chicken",
          measure: "500g"
        },
        {
          ingredientName: "Bell Peppers",
          measure: "2 sliced"
        },
        {
          ingredientName: "Onions",
          measure: "1 sliced"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'12',
      recipeInstructions:"To make a Chicken Caesar Salad, start by grilling or pan-searing 2 boneless, skinless chicken breasts seasoned with salt and pepper until cooked through, about 6-7 minutes per side, then let them rest before slicing. In a large bowl, combine 6 cups of chopped romaine lettuce, the sliced chicken, and 1/2 cup of grated Parmesan cheese. For the dressing, whisk together 1/4 cup of mayonnaise, 2 tablespoons of lemon juice, 1 teaspoon of Dijon mustard, 1 minced garlic clove, and salt and pepper to taste. Drizzle the dressing over the salad and toss gently to combine. Top with croutons and extra Parmesan before serving.",
      category:'Chicken',
      recipeName: "Chicken Caesar Salad",
      recipeImage: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_06",
      recipeCategory: "Chicken",
      recipeOrigin: "American",
      cookingDescription: "Grill chicken and toss with romaine lettuce, croutons, and Caesar dressing.",
      recipeTags: "Salad,Healthy",
      ingredients: [
        {
          ingredientName: "Chicken Breast",
          measure: "2 grilled"
        },
        {
          ingredientName: "Romaine Lettuce",
          measure: "1 head chopped"
        },
        {
          ingredientName: "Croutons",
          measure: "1 cup"
        },
        {
          ingredientName: "Caesar Dressing",
          measure: "1/4 cup"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'13',
      recipeInstructions:"To make Buffalo Chicken Wings, preheat your oven to 200°C (400°F) or heat oil in a deep fryer. If using the oven, line a baking sheet with aluminum foil and place a wire rack on top. Toss 1 kg of chicken wings with salt, pepper, and 1 teaspoon of baking powder for extra crispiness, then arrange them in a single layer on the rack. Bake for about 40-45 minutes, turning halfway, until golden and crispy. Meanwhile, in a saucepan, melt 1/2 cup of unsalted butter and whisk in 1/2 cup of hot sauce (like Frank's RedHot) and 1 tablespoon of vinegar. Once the wings are done, toss them in the Buffalo sauce until well coated. Serve hot with celery sticks and blue cheese or ranch dressing for dipping.",
      category:'Chicken',
      recipeName: "Buffalo Chicken Wings",
      recipeImage: "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_07",
      recipeCategory: "Chicken",
      recipeOrigin: "American",
      cookingDescription: "Deep-fry chicken wings and toss in buffalo sauce.",
      recipeTags: "Spicy,Fried",
      ingredients: [
        {
          ingredientName: "Chicken Wings",
          measure: "12 pieces"
        },
        {
          ingredientName: "Buffalo Sauce",
          measure: "1/2 cup"
        }
      ],
    },
    {
      idCategory: "2",
      idFood:'14',
      recipeInstructions:"To make Chicken and Rice, heat 2 tablespoons of oil in a large skillet over medium heat, then season 4 bone-in, skin-on chicken thighs with salt and pepper and brown them on both sides for about 5-7 minutes. Remove the chicken and set aside. In the same skillet, add 1 chopped onion and 2 minced garlic cloves, sautéing until the onion is translucent. Stir in 1 cup of long-grain rice, allowing it to toast for 1-2 minutes. Add 2 cups of chicken broth, 1 teaspoon of paprika, and the browned chicken thighs back to the skillet. Bring to a simmer, cover, and reduce the heat to low, cooking for 20-25 minutes or until the rice is tender and the chicken is cooked through. Fluff the rice with a fork, garnish with chopped parsley, and serve hot.",
      category:'Chicken',
      recipeName: "Chicken and Rice",
      recipeImage: "https://images.unsplash.com/photo-1617651523904-8768096faf40?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      recipeId: "chicken_08",
      recipeCategory: "Chicken",
      recipeOrigin: "American",
      cookingDescription: "Cook chicken with rice and seasonings in a single pot.",
      recipeTags: "Comfort Food,One-Pot",
      ingredients: [
        {
          ingredientName: "Chicken",
          measure: "500g"
        },
        {
          ingredientName: "Rice",
          measure: "1 cup"
        },
        {
          ingredientName: "Chicken Broth",
          measure: "2 cups"
        }
      ],
    },
    ...moreRecipes,
    ...extraCategoryRecipes,
  ]);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
  };

  // Filter foods by active category during rendering
  const filteredfoods = allFood.filter(
    (food) => food.category === activeCategory
  );

  return (
    <View style={homeStyles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={homeStyles.scrollContainer}
        testID="scrollContainer"
      >
        <View style={homeStyles.headerContainer} testID="headerContainer">
        <Image
            source={{uri:'https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png'}}
            style={homeStyles.avatar}
          />
          <Text style={homeStyles.greetingText}>Hello, User!</Text>
        </View>

        <View style={homeStyles.titleContainer}>
          <Text style={homeStyles.title}>Make your own food,</Text>
          <Text style={homeStyles.subtitle}>
            stay at <Text style={homeStyles.highlight}>home</Text>
          </Text>
        </View>

        <View testID="categoryList">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View testID="foodList">
          <FoodItems foods={filteredfoods} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // white
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14), // pt-14 equivalent
  },
  headerContainer: {
    marginHorizontal: wp(4), // mx-4 equivalent
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: "#52525B", // neutral-600
    fontWeight: "600", // font-semibold
    backgroundColor: "#F3F4F6", // gray-100
    paddingHorizontal: wp(2), // px-2
    paddingVertical: hp(0.5), // py-1
    borderRadius: 9999, // full rounded
    textAlign: "center",
  },
  titleContainer: {
    marginHorizontal: wp(4), // mx-4
    marginBottom: hp(2), // mb-2
  },
  title: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: "600", // font-semibold
    color: "#52525B", // neutral-600
  },
  highlight: {
    color: "#F59E0B", // amber-400
  },
});

// ===== src/screens/RecipeDetailScreen.js =====
// Time, servings, calories and difficulty for a recipe.
// Uses the recipe's own values when it has them, otherwise estimates them
// from its number of steps and ingredients.
const recipeInfo = (recipe) => {
  const steps = (recipe.recipeInstructions || "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 3).length;
  const ingredients = (recipe.ingredients || []).length;
  const mins = recipe.prepTime || 10 + steps * 5;
  const servings = recipe.servings || (ingredients > 8 ? 4 : 2);
  const calories = recipe.calories || 150 + ingredients * 45;
  const difficulty =
    recipe.difficulty || (steps <= 4 ? "Easy" : steps <= 8 ? "Medium" : "Hard");
  return { mins, servings, calories, difficulty };
};

function RecipeDetailScreen(props) {
  const recipe = props.route?.params || {}; // recipe passed from previous screen

  const dispatch = useDispatch();
  const isFavourite = useSelector((state) => selectIsFavorite(state, recipe));

  const navigation = useNavigation();

  if (!recipe.idFood) {
    return (
      <View style={[detailStyles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={detailStyles.recipeTitle}>Recipe not found</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={[detailStyles.backButton, { marginTop: 12, marginLeft: 0 }]}>
          <Text style={detailStyles.backButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe)); // Dispatch the recipe to favorites
  };

  const info = recipeInfo(recipe);

  return (
    <ScrollView
      style={detailStyles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={detailStyles.scrollContent}
    >
      {/* Recipe Image */}
      <View style={detailStyles.imageContainer} testID="imageContainer">
        <Image source={imageSource(recipe.recipeImage)} style={detailStyles.recipeImage} />
      </View>

      {/* Back Button and Favorite Button */}
      <View style={detailStyles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={detailStyles.backButton}
        >
          <Text style={detailStyles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          testID="favoriteButton"
          style={[detailStyles.favoriteButton, { backgroundColor: "white" }]}
        >
          <Text style={detailStyles.favoriteButtonText}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Description */}
      <View style={detailStyles.contentContainer}>
        {/* Title and Category */}
        <View style={detailStyles.recipeDetailsContainer} testID="recipeDetailsContainer">
          <Text style={detailStyles.recipeTitle} testID="recipeTitle">
            {recipe.recipeName}
          </Text>
          <Text style={detailStyles.recipeCategory} testID="recipeCategory">
            {recipe.category}
          </Text>
        </View>

        {/* Mins, Servings, Calories, Type */}
        <View style={detailStyles.miscContainer} testID="miscContainer">
          <View style={detailStyles.miscItem}>
            <Text style={detailStyles.miscIcon}>🕒</Text>
            <Text style={detailStyles.miscText} testID="prepTime">{info.mins} Mins</Text>
          </View>
          <View style={detailStyles.miscItem}>
            <Text style={detailStyles.miscIcon}>👥</Text>
            <Text style={detailStyles.miscText} testID="servings">{String(info.servings).padStart(2, "0")} Servings</Text>
          </View>
          <View style={detailStyles.miscItem}>
            <Text style={detailStyles.miscIcon}>🔥</Text>
            <Text style={detailStyles.miscText} testID="calories">{info.calories} Cal</Text>
          </View>
          <View style={detailStyles.miscItem}>
            <Text style={detailStyles.miscIcon}>🎚️</Text>
            <Text style={detailStyles.miscText} testID="difficulty">{info.difficulty}</Text>
          </View>
        </View>

        {/* Ingredients */}
        <View style={detailStyles.sectionContainer}>
          <Text style={detailStyles.sectionTitle}>Ingredients</Text>
          <View style={detailStyles.ingredientsList} testID="ingredientsList">
            {(recipe.ingredients || []).map((i, index) => (
              <View key={index} style={detailStyles.ingredientItem}>
                <View style={detailStyles.ingredientBullet} />
                <Text style={detailStyles.ingredientText}>
                  {i.ingredientName} {i.measure}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={detailStyles.sectionContainer} testID="sectionContainer">
          <Text style={detailStyles.sectionTitle}>Instructions</Text>
          <Text style={detailStyles.instructionsText}>{recipe.recipeInstructions}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const detailStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: wp(98),
    height: hp(45),
    borderRadius: 20,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginLeft: wp(5),
  },
  backButtonText: {
    fontSize: hp(2),
    color: "#333",
    fontWeight: "bold",
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    marginRight: wp(5),
  },
  favoriteButtonText: {
    fontSize: hp(2),
    color: "red",
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF", // text-neutral-500
  },
  miscContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
  },
  miscIcon: {
    fontSize: hp(3.5),
    marginBottom: 5,
  },
  miscText: {
    fontSize: hp(2),
    fontWeight: "600",
  },
  sectionContainer: {
    marginHorizontal: wp(5),
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: hp(2.8),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ingredientsList: {
    marginLeft: wp(4),
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.9),
    color: "#333",
  },
  instructionsText: {
    fontSize: hp(2),
    color: "#444",
    lineHeight: hp(3),
    textAlign: "justify",
  },
});

// ===== src/screens/MyRecipeScreen.js =====
function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchrecipes = useCallback(async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem(STORAGE_KEY);
      let list = storedRecipes ? JSON.parse(storedRecipes) : [];
      // Recipes saved by the old version of the app have no id: give them one once.
      if (list.some((r) => !r.id)) {
        list = list.map((r) => (r.id ? r : { ...r, id: makeRecipeId() }));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }
      setrecipes(list);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reload whenever this screen comes back into focus (e.g. after saving a recipe)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchrecipes);
    fetchrecipes();
    return unsubscribe;
  }, [navigation, fetchrecipes]);

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const deleterecipe = async (index) => {
    try {
      const updatedrecipes = [...recipes];
      updatedrecipes.splice(index, 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedrecipes));
      setrecipes(updatedrecipes);
    } catch (error) {
      console.error("Error deleting the recipe:", error);
    }
  };

  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
  };

  return (
    <View style={myRecipeStyles.container}>
      <View style={myRecipeStyles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={myRecipeStyles.backButton}>
          <Text style={myRecipeStyles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddrecipe} style={myRecipeStyles.addButton} testID="addRecipeButton">
          <Text style={myRecipeStyles.addButtonText}>Add New Recipe</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={myRecipeStyles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={myRecipeStyles.norecipesText}>No recipes added yet.</Text>
          ) : (
            recipes.map((recipe, index) => (
              <View key={recipe.id || index} style={myRecipeStyles.recipeCard} testID="recipeCard">
                <TouchableOpacity testID="handlerecipeBtn" onPress={() => handlerecipeClick(recipe)}>
                  {recipe.image ? (
                    <Image source={{ uri: recipe.image }} style={myRecipeStyles.recipeImage} />
                  ) : null}
                  <Text style={myRecipeStyles.recipeTitle}>{recipe.title}</Text>
                  <Text style={myRecipeStyles.recipeDescription} testID="recipeDescp">
                    {recipe.description && recipe.description.length > 50
                      ? `${recipe.description.slice(0, 50)}...`
                      : recipe.description}
                  </Text>
                </TouchableOpacity>

                {/* Edit and Delete Buttons */}
                <View style={myRecipeStyles.actionButtonsContainer} testID="editDeleteButtons">
                  <TouchableOpacity onPress={() => editrecipe(recipe, index)} style={myRecipeStyles.editButton}>
                    <Text style={myRecipeStyles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleterecipe(index)} style={myRecipeStyles.deleteButton}>
                    <Text style={myRecipeStyles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const myRecipeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    paddingTop: hp(5),
    backgroundColor: "#F9FAFB",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
  },
  addButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: "center",
    borderRadius: 6,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  norecipesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  recipeCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Android shadow
  },
  recipeImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: hp(1),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#34D399",
    paddingVertical: 6,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 6,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});

// ===== src/screens/CustomRecipesScreen.js =====
function CustomRecipesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { recipe } = route.params || {};

  // Hooks must run on every render, so this comes before the early return below.
  const isFavourite = useSelector((state) => selectIsFavorite(state, recipe));

  if (!recipe) {
    return (
      <View style={customStyles.emptyContainer}>
        <Text style={customStyles.recipeTitle}>No Recipe Details Available</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={customStyles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const ingredients = recipe.ingredients || [];
  // older saved recipes only have a description
  const instructions =
    recipe.instructions || (recipe.description ? [recipe.description] : []);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <ScrollView
      style={customStyles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={customStyles.scrollContent}
      testID="scrollContent"
    >
      {/* Recipe Image */}
      <View style={customStyles.imageContainer} testID="imageContainer">
        {recipe.image ? (
          <Image source={{ uri: recipe.image }} style={customStyles.recipeImage} />
        ) : (
          <View style={[customStyles.recipeImage, customStyles.imageFallback]} />
        )}
      </View>

      <View style={customStyles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity onPress={() => navigation.goBack()} style={customStyles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={customStyles.favoriteButton}
          testID="favoriteButton"
          accessibilityLabel={isFavourite ? "Remove from favorites" : "Add to favorites"}
        >
          <Text style={customStyles.favoriteText}>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Details */}
      <View style={customStyles.contentContainer} testID="contentContainer">
        <Text style={customStyles.recipeTitle}>{recipe.title}</Text>
        <View style={customStyles.sectionContainer} testID="customIngredients">
          <Text style={customStyles.sectionTitle}>Ingredients</Text>
          {ingredients.length > 0 ? (
            ingredients.map((item, i) => (
              <Text key={i} style={customStyles.contentText}>
                {"\u2022 "}
                {item}
              </Text>
            ))
          ) : (
            <Text style={customStyles.contentText}>No ingredients added.</Text>
          )}
        </View>
        <View style={customStyles.sectionContainer} testID="customInstructions">
          <Text style={customStyles.sectionTitle}>Instructions</Text>
          {instructions.length > 0 ? (
            instructions.map((step, i) => (
              <Text key={i} style={customStyles.contentText}>
                {`${i + 1}. ${step}`}
              </Text>
            ))
          ) : (
            <Text style={customStyles.contentText}>No instructions added.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const customStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    width: wp(98),
    height: hp(50),
    borderRadius: 35,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
  },
  imageFallback: {
    backgroundColor: "#FDE68A",
  },
  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(2),
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563",
    marginBottom: hp(1),
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    marginRight: wp(5),
    backgroundColor: "white",
  },
  favoriteText: {
    color: "red",
    fontSize: hp(2),
  },
  contentText: {
    fontSize: hp(1.8),
    color: "#4B5563",
    marginBottom: 4,
  },
});

// ===== src/screens/FavoriteScreen.js =====
function FavoriteScreen() {
  const navigation = useNavigation();

  // Assuming you have a similar structure for recipes in your Redux store
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={favoriteStyles.emptyContainer}>
        <Text style={favoriteStyles.emptyText}>No favorite recipes yet!</Text>
        {/* add back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "#2563EB",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
            width: 100,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={favoriteStyles.container}>
      {/* Heading */}
      <View testID="FavoriteRecipes">
        <Text
          style={{ fontSize: hp(3.8), marginTop: hp(4), marginLeft: 20, fontWeight: "600", color: "#52525B" }}
        >
          My Favorite Recipes
        </Text>
      </View>
    
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          backgroundColor: "#2563EB",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item, index) => getRecipeKey(item) ?? String(index)}
        contentContainerStyle={favoriteStyles.listContentContainer}
        renderItem={({ item }) => {
          // Recipes from the app use recipeName/recipeImage; your own recipes use title/image
          const name = item.recipeName || item.title || "";
          const image = item.recipeImage || item.image;
          return (
            <TouchableOpacity
              style={favoriteStyles.cardContainer}
              onPress={() =>
                item.idFood
                  ? navigation.navigate("RecipeDetail", { ...item })
                  : navigation.navigate("CustomRecipesScreen", { recipe: item })
              }
            >
              {image ? <Image source={imageSource(image)} style={favoriteStyles.recipeImage} /> : null}
              <Text style={favoriteStyles.recipeTitle}>
                {name.length > 20 ? `${name.slice(0, 20)}...` : name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const favoriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});

// ===== src/screens/WelcomeScreen.js =====
function WelcomeScreen() {
  const ring1padding = React.useRef(new Animated.Value(0)).current;
  const ring2padding = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  useEffect(() => {
    const timers = [
      setTimeout(() => Animated.spring(ring1padding, { toValue: hp(5), useNativeDriver: false }).start(), 100),
      setTimeout(() => Animated.spring(ring2padding, { toValue: hp(5.5), useNativeDriver: false }).start(), 300),
      // replace (not navigate) so pressing Back on Home doesn't return to this splash
      setTimeout(() => navigation.replace("Home"), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <View style={welcomeStyles.container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        style={[welcomeStyles.ring, { padding: ring2padding }]}
      >
        <Animated.View
          style={[welcomeStyles.ring, { padding: ring1padding }]}
        >
          <Image
            source={{uri:'https://cdn.pixabay.com/photo/2024/08/29/02/47/italian-9005494_1280.png'}}
            style={welcomeStyles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={welcomeStyles.textContainer}>
        <Text style={welcomeStyles.title}>Foodie</Text>
        <Text style={welcomeStyles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24", // amber-500
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // white/20
    borderRadius: 9999, // full rounded
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
});

// ===== src/navigation/index.js =====
const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="MyFood" component={MyRecipeScreen} />
        <Stack.Screen name="CustomRecipesScreen" component={CustomRecipesScreen} />
        <Stack.Screen name="RecipesFormScreen" component={RecipesFormScreen} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
