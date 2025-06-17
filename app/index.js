import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startCounter = () => setIsRunning(true);
  const stopCounter = () => setIsRunning(false);
  const resetCounter = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Segundos: {seconds}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Iniciar" onPress={startCounter} disabled={isRunning} />
        <Button
          title="Parar"
          onPress={stopCounter}
          disabled={!isRunning}
          color="red"
        />
        <Button title="Resetar" onPress={resetCounter} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    margin: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  counterText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00796b",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
