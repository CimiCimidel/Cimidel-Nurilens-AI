import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../theme/colors";

export default function ActivityChart({
  values = [25, 45, 80, 55, 95, 65, 40],
}) {
  const max = Math.max(...values);

  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <View
          key={index}
          style={styles.column}
        >
          <View
            style={[
              styles.bar,
              {
                height: `${(value / max) * 100}%`,
                backgroundColor:
                  index === values.length - 1
                    ? Colors.primary
                    : "#2B3646",
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
  },

  column: {
    width: 10,
    height: "100%",
    justifyContent: "flex-end",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1A212C",
  },

  bar: {
    width: "100%",
    borderRadius: 10,
  },
});