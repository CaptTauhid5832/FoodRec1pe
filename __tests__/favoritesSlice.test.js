import reducer, { toggleFavorite, getRecipeKey } from "../src/redux/favoritesSlice";

const beefPie = { idFood: "1", recipeName: "Beef and Mustard Pie" };
const tacos = { idFood: "6", recipeName: "Beef Tacos" };
const myCake = { id: "abc", title: "My cake" };
const mySoup = { id: "xyz", title: "My soup" };

const start = reducer(undefined, { type: "@@init" });

test("starts with no favorites", () => {
  expect(start.favoriterecipes).toEqual([]);
});

test("toggling a recipe adds it, toggling again removes it", () => {
  const once = reducer(start, toggleFavorite(beefPie));
  expect(once.favoriterecipes).toHaveLength(1);
  const twice = reducer(once, toggleFavorite(beefPie));
  expect(twice.favoriterecipes).toHaveLength(0);
});

test("removing one recipe keeps the others", () => {
  let s = reducer(start, toggleFavorite(beefPie));
  s = reducer(s, toggleFavorite(tacos));
  s = reducer(s, toggleFavorite(beefPie));
  expect(s.favoriterecipes.map((r) => r.idFood)).toEqual(["6"]);
});

test("two custom recipes are tracked separately (old bug: one removed the other)", () => {
  let s = reducer(start, toggleFavorite(myCake));
  s = reducer(s, toggleFavorite(mySoup));
  expect(s.favoriterecipes).toHaveLength(2);
  s = reducer(s, toggleFavorite(mySoup));
  expect(s.favoriterecipes).toEqual([myCake]);
});

test("built-in and custom recipes never share a key", () => {
  expect(getRecipeKey({ idFood: "1" })).not.toEqual(getRecipeKey({ id: "1" }));
});

test("a recipe with no id is ignored instead of corrupting the list", () => {
  const s = reducer(start, toggleFavorite({ title: "no id" }));
  expect(s.favoriterecipes).toEqual([]);
});
