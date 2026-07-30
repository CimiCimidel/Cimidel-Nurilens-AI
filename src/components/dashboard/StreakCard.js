import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";

export default function StreakCard() {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="flame" size={34} color="#FF8A00" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>7 Day Streak 🔥</Text>

        <Text style={styles.subtitle}>
          You've reached your calorie goal for the last 7 days. Keep it up!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2A1A08",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
  },

  content: {
    flex: 1,
  },

  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    color: Colors.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
});