import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";

export default function ScanScreen() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission required</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  async function takePicture() {
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });

      Alert.alert("Photo captured!", photo.uri);
      console.log(photo);
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
      />

      <Pressable style={styles.capture} onPress={takePicture}>
        <View style={styles.innerCircle} />
      </Pressable>
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
  text: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  capture: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#22C55E",
  },
});
