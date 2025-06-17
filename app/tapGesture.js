import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function TapGesture() {
  const [zoom, setZoom] = useState(false);

  const singleTap = Gesture.Tap()
    .maxDuration(500)
    .onStart(() => {
      alert("Unico toque detectado!");
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(500)
    .numberOfTaps(2)
    .onStart(() => {
      setZoom(!zoom);
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <View style={[styles.box, zoom && styles.scaleBox]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
  scaleBox: {
    scale: 2,
  },
});
