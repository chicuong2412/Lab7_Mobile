import { AuthContextProvider } from "@/components/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { HandleLogin, setIslogged } = useContext(AuthContextProvider);

  useEffect(() => {
    async function Check() {
      const token = await AsyncStorage.getItem("token");

      if (token != null) {
        if (setIslogged !== undefined) {
          setIslogged(true);
          router.replace("/(main)/home")
        }
      }
    }

    Check();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          HandleLogin(phone, password);
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 48,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#EF506B",
    marginBottom: 24,
    marginTop: 72,
  },
  input: {
    borderColor: "#EF506B",
    borderWidth: 1,
    width: "100%",
    marginTop: 12,
    borderRadius: 10,
    paddingLeft: 12,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#EF506B",
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
