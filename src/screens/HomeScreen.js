import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import Colors from "../theme/colors";

import Header from "../components/dashboard/Header";
import DashboardCard from "../components/dashboard/DashboardCard";

import useDashboard from "../hooks/useDashboard";

export default function HomeScreen() {
  const {
    calories,
    protein,
    carbs,
    fat,
  } = useDashboard();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header />

        <DashboardCard
          calories={calories}
          protein={protein}
          carbs={carbs}
          fat={fat}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingBottom: 40,
  },
});