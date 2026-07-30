import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";

const AnimatedCircle = Circle;

export default function ProgressRing({
  value = 0,
  max = 2500,
  size = 170,
  strokeWidth = 12,
}) {
  const progress = Math.min(value / max, 1);

  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference - circumference * progress;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
      ]}
    >
      <Svg
        width={size}
        height={size}
      >
        <Circle
          stroke="#273244"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <AnimatedCircle
          stroke={Colors.primary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Ionicons
          name="flame"
          size={34}
          color={Colors.primary}
        />

        <Text style={styles.value}>
          {value}
        </Text>

        <Text style={styles.unit}>
          kcal
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  value: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: "700",
    marginTop: 8,
  },

  unit: {
    color: Colors.secondary,
    fontSize: 16,
    marginTop: 4,
  },
});