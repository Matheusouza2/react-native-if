import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function LongPressGesture() {
  const longPressGesture = Gesture.LongPress()
  .onEnd((e, success) => {
    if (success) {
      alert(`Pressionado por ${e.duration}ms`);
    }
  });

  return (
    <GestureDetector style={styles.container} gesture={longPressGesture}>
      <View style={styles.box} />
    </GestureDetector>
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
});
