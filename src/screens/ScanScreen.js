import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

export default function ScanScreen() {
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission required</Text>

        <Pressable
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  async function takePicture() {
    if (loading) return;

    try {
      setLoading(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: true,
      });

      const response = await fetch("http://192.168.2.194:3000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: photo.base64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      navigation.navigate("Result", {
        photo: photo.uri,
        result: data,
      });
    } catch (err) {
      alert(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size="large"
            color="#22C55E"
          />

          <Text style={styles.loadingText}>
            Analyzing your meal...
          </Text>
        </View>
      )}

      <Pressable
        style={styles.capture}
        onPress={takePicture}
      >
        <View style={styles.innerCircle} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  capture: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#22C55E",
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
  },
});