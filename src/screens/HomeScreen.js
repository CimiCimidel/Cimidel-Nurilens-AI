import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import api from "../services/api";

export default function HomeScreen() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    api
      .get("/")
      .then((res) => setStatus(res.data.status))
      .catch((err) => setStatus(err.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NutriLens AI</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },
  status: {
    marginTop: 20,
    color: "#22C55E",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
