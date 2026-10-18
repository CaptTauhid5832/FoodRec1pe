// Recipes for every category besides Beef and Chicken.
// Images use each category's picture until you add a photo of your own.
const moreRecipes = [
  {
  "category": "Dessert",
    "idFood": "15",
    "idCategory": "3",
    "recipeName": "Chocolate Brownies",
    "recipeInstructions": "Heat the oven to 180C/160C fan. Line a 20cm square tin with baking paper.\r\nMelt the chocolate and butter together over a low heat, then let it cool slightly.\r\nWhisk the eggs and sugar until pale and thick, then fold in the chocolate mixture.\r\nSift in the flour and cocoa and fold gently until just combined.\r\nPour into the tin and bake for 25 minutes until the top is set but the middle is still soft.\r\nCool completely in the tin before cutting into squares.",
    "recipeImage": require("../../assets/recipes/brownies.jpg"),
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
    "idFood": "16",
    "idCategory": "3",
    "recipeName": "Classic Pancakes with Lemon",
    "recipeInstructions": "Whisk the flour, eggs and milk into a smooth batter. Rest for 10 minutes.\r\nHeat a little oil in a frying pan over a medium heat.\r\nPour in a ladle of batter, tilt the pan to coat the base and cook for 1 minute until golden underneath.\r\nFlip and cook for another minute.\r\nServe sprinkled with sugar and a squeeze of lemon.",
    "recipeImage": "https://www.themealdb.com/images/category/dessert.png",
    "recipeId": "dessert_16",
    "recipeCategory": "Dessert",
    "recipeOrigin": "British",
    "cookingDescription": "Whisk the flour, eggs and milk into a smooth batter. Rest for 10 minutes.",
    "recipeTags": "Sweet,Quick",
    "ingredients": [
      {
        "ingredientName": "Plain Flour",
        "measure": "100g"
      },
      {
        "ingredientName": "Eggs",
        "measure": "2 large"
      },
      {
        "ingredientName": "Milk",
        "measure": "300ml"
      },
      {
        "ingredientName": "Vegetable Oil",
        "measure": "1 tbs"
      },
      {
        "ingredientName": "Lemon",
        "measure": "1 cut into wedges"
      },
      {
        "ingredientName": "Caster Sugar",
        "measure": "to serve"
      }
    ]
  },
  {
  "category": "Vegan",
    "idFood": "31",
    "idCategory": "11",
    "recipeName": "Chickpea Curry",
    "recipeInstructions": "Fry the onion in a little oil until soft, then add the garlic and curry powder for 1 minute.\r\nAdd the tomatoes, coconut milk and chickpeas.\r\nSimmer for 20 minutes until thickened.\r\nStir in the spinach until wilted and serve with rice.",
    "recipeImage": "https://www.themealdb.com/images/category/vegan.png",
    "recipeId": "vegan_31",
    "recipeCategory": "Vegan",
    "recipeOrigin": "Indian",
    "cookingDescription": "Fry the onion in a little oil until soft, then add the garlic and curry powder for 1 mi...",
    "recipeTags": "Curry,Vegan",
    "ingredients": [
      {
        "ingredientName": "Chickpeas",
        "measure": "2 x 400g cans drained"
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
        "ingredientName": "Curry Powder",
        "measure": "2 tbs"
      },
      {
        "ingredientName": "Chopped Tomatoes",
        "measure": "400g"
      },
      {
        "ingredientName": "Coconut Milk",
        "measure": "400ml"
      },
      {
        "ingredientName": "Spinach",
        "measure": "100g"
      }
    ]
  },
  {
  "category": "Vegan",
    "idFood": "32",
    "idCategory": "11",
    "recipeName": "Lentil Bolognese",
    "recipeInstructions": "Soften the onion, carrot and garlic in a little oil for 10 minutes.\r\nAdd the lentils, tomatoes and 400ml water.\r\nSimmer for 25 minutes until the lentils are soft.\r\nCook the spaghetti and serve with the sauce.",
    "recipeImage": "https://www.themealdb.com/images/category/vegan.png",
    "recipeId": "vegan_32",
    "recipeCategory": "Vegan",
    "recipeOrigin": "Italian",
    "cookingDescription": "Soften the onion, carrot and garlic in a little oil for 10 minutes.",
    "recipeTags": "Pasta,Vegan",
    "ingredients": [
      {
        "ingredientName": "Red Lentils",
        "measure": "200g"
      },
      {
        "ingredientName": "Onion",
        "measure": "1 chopped"
      },
      {
        "ingredientName": "Carrot",
        "measure": "1 diced"
      },
      {
        "ingredientName": "Garlic",
        "measure": "2 cloves"
      },
      {
        "ingredientName": "Chopped Tomatoes",
        "measure": "800g"
      },
      {
        "ingredientName": "Spaghetti",
        "measure": "400g"
      }
    ]
  },
  {
  "category": "Vegetarian",
    "idFood": "33",
    "idCategory": "12",
    "recipeName": "Margherita Pizza",
    "recipeInstructions": "Heat the oven as hot as it goes, about 240C/220C fan, with a tray inside.\r\nStretch the dough into a thin round.\r\nSpread with passata and top with torn mozzarella.\r\nSlide onto the hot tray and bake for 8 to 10 minutes until bubbling.\r\nFinish with basil and a drizzle of oil.",
    "recipeImage": "https://www.themealdb.com/images/category/vegetarian.png",
    "recipeId": "vegetarian_33",
    "recipeCategory": "Vegetarian",
    "recipeOrigin": "Italian",
    "cookingDescription": "Heat the oven as hot as it goes, about 240C/220C fan, with a tray inside.",
    "recipeTags": "Pizza,Cheesy",
    "ingredients": [
      {
        "ingredientName": "Pizza Dough",
        "measure": "1 ball"
      },
      {
        "ingredientName": "Passata",
        "measure": "100ml"
      },
      {
        "ingredientName": "Mozzarella",
        "measure": "125g"
      },
      {
        "ingredientName": "Basil",
        "measure": "handful"
      },
      {
        "ingredientName": "Olive Oil",
        "measure": "1 tbs"
      }
    ]
  },
  {
  "category": "Vegetarian",
    "idFood": "34",
    "idCategory": "12",
    "recipeName": "Mushroom Risotto",
    "recipeInstructions": "Fry the mushrooms in half the butter until golden. Set aside.\r\nSoften the onion in the rest of the butter, then stir in the rice for 1 minute.\r\nAdd the stock a ladle at a time, stirring until absorbed before adding more, for about 20 minutes.\r\nStir in the mushrooms and parmesan, season and serve.",
    "recipeImage": "https://www.themealdb.com/images/category/vegetarian.png",
    "recipeId": "vegetarian_34",
    "recipeCategory": "Vegetarian",
    "recipeOrigin": "Italian",
    "cookingDescription": "Fry the mushrooms in half the butter until golden. Set aside.",
    "recipeTags": "Rice,Creamy",
    "ingredients": [
      {
        "ingredientName": "Arborio Rice",
        "measure": "300g"
      },
      {
        "ingredientName": "Mushrooms",
        "measure": "250g sliced"
      },
      {
        "ingredientName": "Onion",
        "measure": "1 chopped"
      },
      {
        "ingredientName": "Vegetable Stock",
        "measure": "1 litre hot"
      },
      {
        "ingredientName": "Butter",
        "measure": "30g"
      },
      {
        "ingredientName": "Parmesan",
        "measure": "50g grated"
      }
    ]
  },
  {
  "category": "Breakfast",
    "idFood": "35",
    "idCategory": "13",
    "recipeName": "Full English Breakfast",
    "recipeInstructions": "Grill the sausages for 15 minutes, turning, and add the bacon for the last 6 minutes.\r\nFry the mushrooms and tomato halves in a little oil.\r\nWarm the beans in a small pan.\r\nFry the eggs and toast the bread.\r\nServe everything together while hot.",
    "recipeImage": "https://www.themealdb.com/images/category/breakfast.png",
    "recipeId": "breakfast_35",
    "recipeCategory": "Breakfast",
    "recipeOrigin": "British",
    "cookingDescription": "Grill the sausages for 15 minutes, turning, and add the bacon for the last 6 minutes.",
    "recipeTags": "Breakfast,Fried",
    "ingredients": [
      {
        "ingredientName": "Sausages",
        "measure": "4"
      },
      {
        "ingredientName": "Back Bacon",
        "measure": "4 rashers"
      },
      {
        "ingredientName": "Eggs",
        "measure": "4"
      },
      {
        "ingredientName": "Baked Beans",
        "measure": "400g"
      },
      {
        "ingredientName": "Tomatoes",
        "measure": "2 halved"
      },
      {
        "ingredientName": "Mushrooms",
        "measure": "150g"
      },
      {
        "ingredientName": "Bread",
        "measure": "4 slices"
      }
    ]
  },
  {
  "category": "Breakfast",
    "idFood": "36",
    "idCategory": "13",
    "recipeName": "Overnight Oats",
    "recipeInstructions": "Mix the oats, milk, yogurt and honey in a jar.\r\nCover and leave in the fridge overnight.\r\nIn the morning, stir and add a splash more milk if it is too thick.\r\nTop with berries and serve.",
    "recipeImage": "https://www.themealdb.com/images/category/breakfast.png",
    "recipeId": "breakfast_36",
    "recipeCategory": "Breakfast",
    "recipeOrigin": "Swiss",
    "cookingDescription": "Mix the oats, milk, yogurt and honey in a jar.",
    "recipeTags": "Breakfast,Healthy",
    "ingredients": [
      {
        "ingredientName": "Rolled Oats",
        "measure": "80g"
      },
      {
        "ingredientName": "Milk",
        "measure": "200ml"
      },
      {
        "ingredientName": "Natural Yogurt",
        "measure": "2 tbs"
      },
      {
        "ingredientName": "Honey",
        "measure": "1 tbs"
      },
      {
        "ingredientName": "Berries",
        "measure": "handful"
      }
    ]
  },
  {
  "category": "Goat",
    "idFood": "37",
    "idCategory": "14",
    "recipeName": "Goat Curry",
    "recipeInstructions": "Rub the goat with 2 tbs curry powder, garlic and salt, and marinate for at least 1 hour.\r\nBrown the meat in hot oil, then add the onion and the remaining curry powder.\r\nAdd the thyme, the whole scotch bonnet and enough water to cover.\r\nCover and simmer for 2 hours until tender, adding the potatoes for the last 30 minutes.\r\nRemove the scotch bonnet and serve with rice.",
    "recipeImage": "https://images.unsplash.com/photo-1619711667542-c049700dd9e0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "recipeId": "goat_37",
    "recipeCategory": "Goat",
    "recipeOrigin": "Jamaican",
    "cookingDescription": "Rub the goat with 2 tbs curry powder, garlic and salt, and marinate for at least 1 hour.",
    "recipeTags": "Curry,Spicy",
    "ingredients": [
      {
        "ingredientName": "Goat Meat",
        "measure": "1kg bone-in pieces"
      },
      {
        "ingredientName": "Curry Powder",
        "measure": "3 tbs"
      },
      {
        "ingredientName": "Onion",
        "measure": "1 chopped"
      },
      {
        "ingredientName": "Garlic",
        "measure": "4 cloves"
      },
      {
        "ingredientName": "Thyme",
        "measure": "3 sprigs"
      },
      {
        "ingredientName": "Scotch Bonnet",
        "measure": "1 whole"
      },
      {
        "ingredientName": "Potatoes",
        "measure": "2 cubed"
      }
    ]
  },
  {
  "category": "Goat",
    "idFood": "38",
    "idCategory": "14",
    "recipeName": "Mutton Biryani",
    "recipeInstructions": "Marinate the meat in yogurt, ginger garlic paste, masala and half the fried onions for 2 hours.\r\nCook the marinated meat covered on a low heat for 1 hour until tender.\r\nPar-boil the rice for 6 minutes and drain.\r\nLayer the rice over the meat, drizzle with saffron milk and top with the remaining onions.\r\nSeal with a lid and cook on the lowest heat for 25 minutes. Fluff gently and serve.",
    "recipeImage": "https://images.unsplash.com/photo-1619711667542-c049700dd9e0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "recipeId": "goat_38",
    "recipeCategory": "Goat",
    "recipeOrigin": "Indian",
    "cookingDescription": "Marinate the meat in yogurt, ginger garlic paste, masala and half the fried onions for ...",
    "recipeTags": "Rice,Spicy",
    "ingredients": [
      {
        "ingredientName": "Goat Meat",
        "measure": "750g"
      },
      {
        "ingredientName": "Basmati Rice",
        "measure": "400g"
      },
      {
        "ingredientName": "Natural Yogurt",
        "measure": "200g"
      },
      {
        "ingredientName": "Onions",
        "measure": "3 sliced and fried"
      },
      {
        "ingredientName": "Biryani Masala",
        "measure": "2 tbs"
      },
      {
        "ingredientName": "Ginger Garlic Paste",
        "measure": "2 tbs"
      },
      {
        "ingredientName": "Saffron Milk",
        "measure": "4 tbs"
      }
    ]
  },
  {
    "category": "Dessert",
    "idFood": "39",
    "idCategory": "3",
    "recipeName": "Lemon Delicious Pudding",
    "recipeInstructions": "Heat the oven to 180C/160C fan and butter a 1.5 litre baking dish.\r\nZest the lemons until you have 1 tablespoon of zest, then squeeze out 1/2 cup of juice.\r\nBeat the melted butter, sugar and zest together, then beat in the egg yolks one at a time.\r\nStir in the flour, then slowly whisk in the milk and lemon juice. The batter will be very runny.\r\nIn a clean bowl, whisk the egg whites until soft peaks form, then gently fold them into the batter.\r\nPour into the dish and place it in a roasting tin. Pour hot water into the tin to come halfway up the dish.\r\nBake for 40 to 45 minutes until the top is golden and springs back when touched.\r\nServe warm. The top is a light sponge and underneath is a lemon custard sauce.",
    "recipeImage": require("../../assets/recipes/lemon-pudding.jpg"),
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
  }
];

export default moreRecipes;
