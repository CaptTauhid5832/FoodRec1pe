import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const STORAGE_KEY = "customrecipes";

export const makeRecipeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default function RecipesFormScreen({ route, navigation }) {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        placeholder="Recipe name"
        value={title}
        onChangeText={(t) => {
          setTitle(t);
          if (error) setError("");
        }}
        style={styles.input}
        testID="titleInput"
      />

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton} testID="uploadImageButton">
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="or paste an image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
        autoCapitalize="none"
        testID="imageInput"
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} testID="imagePreview" />
      ) : (
        <Text style={styles.imagePlaceholder}>No image selected</Text>
      )}

      <Text style={styles.label}>Ingredients (one per line)</Text>
      <TextInput
        placeholder={"2 eggs\n1 cup flour"}
        value={ingredients}
        onChangeText={setIngredients}
        multiline={true}
        numberOfLines={5}
        style={[styles.input, styles.multiline]}
        testID="ingredientsInput"
      />

      <Text style={styles.label}>Instructions (one step per line)</Text>
      <TextInput
        placeholder={"Mix the eggs and flour\nBake for 20 minutes"}
        value={instructions}
        onChangeText={setInstructions}
        multiline={true}
        numberOfLines={6}
        style={[styles.input, styles.multiline]}
        testID="instructionsInput"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton} testID="saveButton">
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
