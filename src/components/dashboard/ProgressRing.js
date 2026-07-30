import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";

const AnimatedCircle = Circle;

export default function ProgressRing({
  value = 0,
  max = 2500,
  size = 150,
  strokeWidth = 12,
}) {
  const progress = Math.min(value / max, 1);

  const radius = (size - strokeWidth) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference * (1 - progress);

  const percent = Math.round(progress * 100);

  const remaining = Math.max(max - value, 0);

  const gradientId = useMemo(
    () => `ringGradient-${size}-${strokeWidth}`,
    [size, strokeWidth]
  );

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
        <Defs>
          <LinearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <Stop
              offset="0%"
              stopColor="#74FFB2"
            />

            <Stop
              offset="100%"
              stopColor="#2BEF83"
            />
          </LinearGradient>
        </Defs>

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#222B38"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          rotation="-90"
          origin={`${size / 2},${size / 2}`}
        />
      </Svg>

      <View style={styles.content}>
        <View style={styles.icon}>
          <Ionicons
            name="flame"
            size={28}
            color={Colors.primary}
          />
        </View>

        <Text style={styles.value}>
          {value.toLocaleString()}
        </Text>

        <Text style={styles.unit}>
          kcal
        </Text>

        <Text style={styles.percent}>
          {percent}% of goal
        </Text>

        <Text style={styles.remaining}>
          {remaining} kcal left
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

  content: {
    position: "absolute",
    alignItems: "center",
  },  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#163626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  value: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "800",
  },

  unit: {
    color: Colors.secondary,
    fontSize: 14,
    marginTop: 2,
    fontWeight: "600",
  },

  percent: {
    marginTop: 10,
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },

  remaining: {
    marginTop: 3,
    color: Colors.secondary,
    fontSize: 12,
    textAlign: "center",
  },
});