import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { ContactList } from "./modules/contact-list/ContactList";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ContactList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
