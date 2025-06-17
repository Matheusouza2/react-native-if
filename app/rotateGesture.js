import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";

export default function RotateGesture() {
  const rotation = useSharedValue(1);
  const savedRotation = useSharedValue(1);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const gesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const animatedStyle = {
    transform: [
      { rotate: `${(rotation.value / Math.PI) * 180}deg ` },
      { scale: scale.value },
    ],
  };
  return (
    <GestureDetector style={styles.container} gesture={Gesture.Simultaneous(pinchGesture, gesture)}>
      <Animated.View style={[styles.box, animatedStyle]} />
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
