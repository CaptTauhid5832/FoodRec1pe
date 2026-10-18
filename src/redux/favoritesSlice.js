import { createSlice } from "@reduxjs/toolkit";

// Built-in recipes are identified by idFood; recipes the user creates get an `id`.
// Prefixing keeps the two kinds from ever colliding.
export const getRecipeKey = (recipe) => {
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

export const { toggleFavorite } = favoritesSlice.actions;

export const selectIsFavorite = (state, recipe) => {
  const key = getRecipeKey(recipe);
  return key !== null && state.favorites.favoriterecipes.some((item) => getRecipeKey(item) === key);
};

export default favoritesSlice.reducer;
