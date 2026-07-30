import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function ResultScreen({ route, navigation }) {
  const { photo, result } = route.params;

  async function saveMeal() {
    try {
      const existing = await AsyncStorage.getItem("meals");

      const meals = existing ? JSON.parse(existing) : [];

      meals.unshift({
        id: Date.now().toString(),
        photo,
        food: result.food,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        date: new Date().toLocaleString(),
      });

      await AsyncStorage.setItem("meals", JSON.stringify(meals));

      navigation.navigate("Tabs", {
        screen: "History",
      });
    } catch (e) {
      Alert.alert("Error", "Couldn't save the meal.");
      console.log(e);
    }
  }

  const nutrition = [
    {
      icon: "flame",
      color: "#EF4444",
      title: "Calories",
      value: `${result.calories} kcal`,
    },
    {
      icon: "barbell",
      color: "#2563EB",
      title: "Protein",
      value: `${result.protein} g`,
    },
    {
      icon: "leaf",
      color: "#F59E0B",
      title: "Carbs",
      value: `${result.carbs} g`,
    },
    {
      icon: "water",
      color: "#22C55E",
      title: "Fat",
      value: `${result.fat} g`,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: photo }} style={styles.image} />

        <Text style={styles.food}>{result.food}</Text>

        <Text style={styles.subtitle}>
          AI Nutrition Analysis
        </Text>

        {nutrition.map((item) => (
          <View key={item.title} style={styles.card}>
            <Ionicons
              name={item.icon}
              size={28}
              color={item.color}
            />

            <View style={styles.cardCenter}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>
            </View>

            <Text style={styles.value}>
              {item.value}
            </Text>
          </View>
        ))}

        <Pressable
          style={styles.saveButton}
          onPress={saveMeal}
        >
          <Text style={styles.saveText}>
            Save Meal
          </Text>
        </Pressable>

        <Pressable
          style={styles.scanAgain}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.scanAgainText}>
            Scan Another Meal
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  image: {
    width: "100%",
    height: 320,
  },

  food: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 25,
    fontSize: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 18,
    borderRadius: 18,
    elevation: 4,
  },

  cardCenter: {
    flex: 1,
    marginLeft: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
  },

  saveText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },

  scanAgain: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 40,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  scanAgainText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 17,
  },
});