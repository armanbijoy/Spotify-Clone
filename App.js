import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import Navigation from "./StackNavigator";
import { PlayerContext } from "./PlayerContext";
 

export default function App() {
  return (
    <>
    <PlayerContext>
    <Navigation/>
    </PlayerContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: { // Corrected container property
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
