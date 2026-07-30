import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../theme/colors";

import ProgressRing from "./ProgressRing";
import ActivityChart from "./ActivityChart";

const GOAL = 2500;

export default function DashboardCard({
  calories = 0,
  protein = 0,
  carbs = 0,
  fat = 0,
}) {
  const percent = Math.min(
    Math.round((calories / GOAL) * 100),
    100
  );

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.small}>
          CALORIES
        </Text>

        <Text style={styles.value}>
          {calories}
        </Text>

        <Text style={styles.goal}>
          / {GOAL} kcal
        </Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {percent}% of daily goal
          </Text>
        </View>

        <ActivityChart />
      </View>

      <View style={styles.center}>
        <ProgressRing
          value={calories}
          max={GOAL}
        />
      </View>

      <View style={styles.right}>
        <Macro
          title="Protein"
          value={protein}
          goal={180}
          color={Colors.protein}
        />

        <Macro
          title="Carbs"
          value={carbs}
          goal={250}
          color={Colors.carbs}
        />

        <Macro
          title="Fat"
          value={fat}
          goal={70}
          color={Colors.fat}
        />
      </View>
    </View>
  );
}

function Macro({
  title,
  value,
  goal,
  color,
}) {
  const progress = Math.min(
    value / goal,
    1
  );

  return (
    <View style={styles.macro}>
      <View style={styles.row}>
        <Text style={styles.macroTitle}>
          {title}
        </Text>

        <Text style={styles.goalSmall}>
          {goal}g
        </Text>
      </View>

      <Text style={styles.macroValue}>
        {value} g
      </Text>

      <View style={styles.progressBg}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress * 100}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 18,
    backgroundColor: Colors.card,
    borderRadius: 32,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    width: 120,
  },

  center: {
    width: 210,
    alignItems: "center",
  },

  right: {
    width: 120,
  },

  small: {
    color: Colors.secondary,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "700",
  },

  value: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: "800",
    marginTop: 6,
  },

  goal: {
    color: Colors.secondary,
    fontSize: 14,
  },

  badge: {
    marginTop: 12,
    backgroundColor: "#173727",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    alignSelf: "flex-start",
  },

  badgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },

  macro: {
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  macroTitle: {
    color: Colors.secondary,
    fontSize: 12,
  },

  goalSmall: {
    color: Colors.secondary,
    fontSize: 11,
  },

  macroValue: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  progressBg: {
    height: 6,
    borderRadius: 6,
    backgroundColor: "#273244",
    overflow: "hidden",
  },

  progress: {
    height: 6,
    borderRadius: 6,
  },
});