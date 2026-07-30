import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "meals";

export default function useDashboard() {
  const [stats, setStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    meals: [],
  });

  async function load() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);

      if (!raw) {
        setStats({
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          meals: [],
        });
        return;
      }

      const meals = JSON.parse(raw);

      const today = new Date().toDateString();

      const todayMeals = meals.filter((meal) => {
        return new Date(meal.date).toDateString() === today;
      });

      const totals = todayMeals.reduce(
        (acc, meal) => {
          acc.calories += Number(meal.calories || 0);
          acc.protein += Number(meal.protein || 0);
          acc.carbs += Number(meal.carbs || 0);
          acc.fat += Number(meal.fat || 0);

          return acc;
        },
        {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
        }
      );

      setStats({
        ...totals,
        meals: todayMeals,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return {
    ...stats,
    reload: load,
  };
}