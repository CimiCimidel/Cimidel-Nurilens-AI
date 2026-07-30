import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Colors from "../../theme/colors";

export default function TodaysMeals({ meals = [] }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Meals</Text>

        <Pressable>
          <Text style={styles.seeAll}>
            {meals.length} meal{meals.length !== 1 ? "s" : ""}
          </Text>
        </Pressable>
      </View>

      {meals.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🍽️</Text>

          <Text style={styles.emptyTitle}>
            No meals today
          </Text>

          <Text style={styles.emptySubtitle}>
            Scan your first meal to start tracking your nutrition.
          </Text>
        </View>
      ) : (
        meals.map((meal) => (
          <View
            key={meal.id}
            style={styles.card}
          >
            <Image
              source={{
                uri: meal.photo,
              }}
              style={styles.image}
            />

            <View style={styles.info}>
              <Text
                numberOfLines={1}
                style={styles.food}
              >
                {meal.food}
              </Text>

              <Text style={styles.time}>
                {new Date(meal.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.calories}>
                {meal.calories}
              </Text>

              <Text style={styles.kcal}>
                kcal
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    marginHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "700",
  },

  seeAll: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 15,
  },

  empty: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 46,
    marginBottom: 12,
  },

  emptyTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "700",
  },

  emptySubtitle: {
    color: Colors.secondary,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#1E2633",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  food: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "700",
  },

  time: {
    color: Colors.secondary,
    marginTop: 6,
    fontSize: 14,
  },

  right: {
    alignItems: "flex-end",
  },

  calories: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 22,
  },

  kcal: {
    color: Colors.secondary,
    fontSize: 13,
    marginTop: 2,
  },
});