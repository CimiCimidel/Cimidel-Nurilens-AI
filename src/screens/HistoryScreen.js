import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function HistoryScreen() {
  const [meals, setMeals] = useState([]);
  const isFocused = useIsFocused();

  async function loadMeals() {
    try {
      const data = await AsyncStorage.getItem("meals");

      if (data) {
        setMeals(JSON.parse(data));
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadMeals();
  }, [isFocused]);

  function renderMeal({ item }) {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.photo }}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.food}>{item.food}</Text>

          <Text style={styles.text}>
            🔥 {item.calories} kcal
          </Text>

          <Text style={styles.text}>
            💪 {item.protein} g protein
          </Text>

          <Text style={styles.text}>
            🌾 {item.carbs} g carbs
          </Text>

          <Text style={styles.text}>
            🥑 {item.fat} g fat
          </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meal History</Text>

      <FlatList
        data={meals}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMeal}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No meals saved yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 3,
  },

  image: {
    width: 110,
    height: 110,
  },

  info: {
    flex: 1,
    padding: 14,
  },

  food: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  text: {
    fontSize: 15,
    marginBottom: 4,
  },

  empty: {
    textAlign: "center",
    marginTop: 60,
    color: "#888",
    fontSize: 17,
  },
});