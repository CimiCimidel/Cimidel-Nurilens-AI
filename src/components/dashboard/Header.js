import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../theme/colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/200",
          }}
          style={styles.avatar}
        />

        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            Good Morning 👋
          </Text>

          <Text style={styles.name}>
            David
          </Text>
        </View>
      </View>

      <Pressable style={styles.notification}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={Colors.white}
        />

        <View style={styles.dot} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginHorizontal: 22,
    marginBottom: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },

  textContainer: {
    marginLeft: 14,
  },

  greeting: {
    color: Colors.secondary,
    fontSize: 14,
  },

  name: {
    marginTop: 3,
    color: Colors.white,
    fontSize: 26,
    fontWeight: "800",
  },

  notification: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.card,

    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",

    top: 13,
    right: 13,

    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: Colors.primary,
  },
});