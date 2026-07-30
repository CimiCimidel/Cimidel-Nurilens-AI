import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../theme/colors";

import ProgressRing from "./ProgressRing";
import ActivityChart from "./ActivityChart";

const GOAL = 2500;

function Macro({
  title,
  value,
  goal,
  color,
}) {
  const progress = Math.min(value / goal, 1);

  return (
    <View style={styles.macro}>
      <View style={styles.macroHeader}>
        <Text style={styles.macroTitle}>
          {title}
        </Text>

        <Text style={styles.macroGoal}>
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
      <View style={styles.top}>
        <View style={styles.left}>
          <Text style={styles.label}>
            CALORIES
          </Text>

          <Text style={styles.calories}>
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

        <ProgressRing
          value={calories}
          max={GOAL}
          size={150}
          strokeWidth={12}
        />
      </View>

      <View style={styles.macros}>
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

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: Colors.card,
    borderRadius: 28,
    padding: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flex: 1,
    paddingRight: 16,
  },

  label: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },

  calories: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: "800",
    marginTop: 4,
  },  goal: {
    color: Colors.secondary,
    marginTop: 2,
    fontSize: 14,
  },

  badge: {
    marginTop: 10,
    backgroundColor: "#173727",
    borderRadius: 18,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  badgeText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },

  macros: {
    marginTop: 24,
    gap: 18,
  },

  macro: {
    width: "100%",
  },

  macroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  macroTitle: {
    color: Colors.secondary,
    fontSize: 13,
    fontWeight: "600",
  },

  macroGoal: {
    color: Colors.secondary,
    fontSize: 12,
  },

  macroValue: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 8,
  },

  progressBg: {
    height: 7,
    borderRadius: 7,
    backgroundColor: "#273244",
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 7,
  },
});