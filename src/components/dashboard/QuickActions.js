import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";

const actions = [
  {
    title: "Scan Food",
    icon: "camera",
    color: "#43F59B",
  },
  {
    title: "Barcode",
    icon: "barcode",
    color: "#3B82F6",
  },
  {
    title: "Manual",
    icon: "create",
    color: "#FBBF24",
  },
  {
    title: "Water",
    icon: "water",
    color: "#38BDF8",
  },
];

export default function QuickActions() {
  return (
    <View style={styles.container}>
      {actions.map((item) => (
        <Pressable
          key={item.title}
          style={styles.card}
        >
          <View
            style={[
              styles.icon,
              {
                backgroundColor: item.color,
              },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color="white"
            />
          </View>

          <Text style={styles.title}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: 82,
    alignItems: "center",
  },

  icon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    color: Colors.white,
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },
});