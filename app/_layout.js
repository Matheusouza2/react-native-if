import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: "Página Inicial",
        }}
      />

      <Drawer.Screen
        name="tapGesture"
        options={{
          title: "Tap Gesture",
        }}
      />

      <Drawer.Screen
        name="panGesture"
        options={{
          title: "Pan Gesture",
        }}
      />

      <Drawer.Screen
        name="longPressGesture"
        options={{
          title: "Long Press Gesture",
        }}
      />

      <Drawer.Screen
        name="pinchGesture"
        options={{
          title: "Pinch Gesture",
        }}
      />

      <Drawer.Screen
        name="rotateGesture"
        options={{
          title: "Rotation Gesture",
        }}
      />

      <Drawer.Screen
        name="getLocation"
        options={{
          title: "Localização",
        }}
      />
    </Drawer>
  );
}
