import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const STORAGE_KEY = "customrecipes";

export const makeRecipeId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(recipeToEdit ? recipeToEdit.description : "");
  const [error, setError] = useState("");

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
      description: description.trim(),
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
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(t) => {
          setTitle(t);
          if (error) setError("");
        }}
        style={styles.input}
        testID="titleInput"
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
        autoCapitalize="none"
        testID="imageInput"
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
        testID="descriptionInput"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton} testID="saveButton">
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    paddingTop: hp(4),
    backgroundColor: "white",
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
