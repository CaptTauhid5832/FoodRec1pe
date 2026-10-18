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
