import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";

export default function NutritionScore() {
  const score = 91;

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.title}>Nutrition Score</Text>

        <Text style={styles.description}>
          Excellent balance of protein, carbs and healthy fats today.
        </Text>
      </View>

      <View style={styles.circle}>
        <Ionicons
          name="trophy"
          size={28}
          color="#FFD54A"
        />

        <Text style={styles.score}>{score}</Text>

        <Text style={styles.outOf}>/100</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
    paddingRight: 18,
  },

  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    color: Colors.secondary,
    fontSize: 14,
    lineHeight: 20,
  },

  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  score: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },

  outOf: {
    color: Colors.secondary,
    fontSize: 12,
  },
});