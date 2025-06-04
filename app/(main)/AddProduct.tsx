import { AddProductHandler } from "@/services/Data";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddProduct() {
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("0");
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.labelText}>
          Service name <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Input a service name"
          placeholderTextColor="#bdbdbd"
          value={serviceName}
          onChangeText={setServiceName}
        />
        <Text style={styles.labelText}>
          Price <Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="0"
          placeholderTextColor="#bdbdbd"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (serviceName === "") {
              Alert.alert("Please input the name");
            } else {
              AddProductHandler(serviceName, price).then((rp) => {
                if (!rp) {
                  Alert.alert("Added unsuccessful");
                } else {
                  Alert.alert("Success", "Service added!");
                }
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textNormal: {
    fontSize: 16,
  },
  labelText: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#f5f5fa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#f45b6a",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
