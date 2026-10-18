import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../src/redux/favoritesSlice";
import HomeScreen from "../src/screens/HomeScreen";
import RecipeDetailScreen from "../src/screens/RecipeDetailScreen";
import CustomRecipesScreen from "../src/screens/CustomRecipesScreen";

const mockNavigate = jest.fn();
let mockParams;
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockNavigate, goBack: jest.fn(), replace: jest.fn() }),
  useRoute: () => ({ params: mockParams }),
}));

const makeStore = () => configureStore({ reducer: { favorites: favoritesReducer } });
const renderWithStore = (ui, store = makeStore()) => render(<Provider store={store}>{ui}</Provider>);

beforeEach(() => {
  mockNavigate.mockClear();
  mockParams = undefined;
});

test("Home shows Chicken recipes by default and switches category", async () => {
  await renderWithStore(<HomeScreen />);
  expect(screen.getByText("Chicken Curry")).toBeTruthy();
  expect(screen.queryByText("Beef Tacos")).toBeNull();

  await fireEvent.press(screen.getByText("Beef"));
  expect(screen.getByText("Beef Tacos")).toBeTruthy();
  expect(screen.queryByText("Chicken Curry")).toBeNull();
});

test("tapping a recipe opens its detail screen", async () => {
  await renderWithStore(<HomeScreen />);
  await fireEvent.press(screen.getByTestId("recipeCard-7"));
  expect(mockNavigate).toHaveBeenCalledWith("RecipeDetail", expect.objectContaining({ idFood: "7" }));
});

test("detail screen heart toggles the favorite in the store", async () => {
  const store = makeStore();
  const recipe = { idFood: "7", recipeName: "Chicken Curry", category: "Chicken", ingredients: [] };
  await renderWithStore(<RecipeDetailScreen route={{ params: recipe }} />, store);

  expect(screen.getByText("♡")).toBeTruthy();
  await fireEvent.press(screen.getByTestId("favoriteButton"));
  expect(screen.getByText("♥")).toBeTruthy();
  expect(store.getState().favorites.favoriterecipes).toHaveLength(1);
});

test("custom recipe screen no longer crashes when opened without a recipe", async () => {
  await renderWithStore(<CustomRecipesScreen />);
  expect(screen.getByText("No Recipe Details Available")).toBeTruthy();
});

test("custom recipe screen shows and favorites a user recipe", async () => {
  mockParams = { recipe: { id: "abc", title: "Grandma's Soup", description: "Warm and good" } };
  const store = makeStore();
  await renderWithStore(<CustomRecipesScreen />, store);
  expect(screen.getByText("Grandma's Soup")).toBeTruthy();
  await fireEvent.press(screen.getByTestId("favoriteButton"));
  expect(store.getState().favorites.favoriterecipes).toHaveLength(1);
});

test("every category has at least one recipe", async () => {
  await renderWithStore(<HomeScreen />);
  for (const cat of ["Beef","Chicken","Dessert","Lamb","Pasta","Vegan","Vegetarian","Breakfast","Goat"]) {
    await fireEvent.press(screen.getByText(cat));
    expect(screen.queryByText("No recipes in this category yet.")).toBeNull();
  }
});

test("Dessert shows dessert recipes", async () => {
  await renderWithStore(<HomeScreen />);
  await fireEvent.press(screen.getByText("Dessert"));
  expect(screen.getByText("Chocolate Brownies")).toBeTruthy();
});

test("Chocolate Brownies uses the bundled photo", () => {
  const recipes = require("../src/data/moreRecipes").default;
  const brownies = recipes.find((r) => r.recipeName === "Chocolate Brownies");
  expect(typeof brownies.recipeImage).not.toBe("string"); // bundled asset, not a web link
});

test("removed categories are gone", async () => {
  await renderWithStore(<HomeScreen />);
  for (const cat of ["Miscellaneous","Pork","Seafood","Side","Starter"]) {
    expect(screen.queryByText(cat)).toBeNull();
  }
});

test("Lemon Delicious Pudding is in Dessert with its photo", async () => {
  const recipes = require("../src/data/moreRecipes").default;
  const pud = recipes.find((r) => r.recipeName === "Lemon Delicious Pudding");
  expect(pud.category).toBe("Dessert");
  expect(typeof pud.recipeImage).not.toBe("string");
  await renderWithStore(<HomeScreen />);
  await fireEvent.press(screen.getByText("Dessert"));
  expect(screen.getByText(/^Lemon Delicious/)).toBeTruthy();
});

test("Lamb category shows Slow Roast Lamb with its photo", async () => {
  const recipes = require("../src/data/moreRecipes").default;
  const lamb = recipes.filter((r) => r.category === "Lamb");
  expect(lamb.map((r) => r.recipeName)).toEqual(["Slow Roast Lamb"]);
  expect(typeof lamb[0].recipeImage).not.toBe("string");
  await renderWithStore(<HomeScreen />);
  await fireEvent.press(screen.getByText("Lamb"));
  expect(screen.getByText("Slow Roast Lamb")).toBeTruthy();
});

test("Pasta category shows Creamy Vegan Mushroom Pasta with its photo", async () => {
  const recipes = require("../src/data/moreRecipes").default;
  const pasta = recipes.filter((r) => r.category === "Pasta");
  expect(pasta.map((r) => r.recipeName)).toEqual(["Creamy Vegan Mushroom Pasta"]);
  expect(typeof pasta[0].recipeImage).not.toBe("string");
  await renderWithStore(<HomeScreen />);
  await fireEvent.press(screen.getByText("Pasta"));
  expect(screen.getByText(/^Creamy Vegan/)).toBeTruthy();
});
