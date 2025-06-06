import { Product, User } from "@/interface/interface";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";

export default function ServiceChooseBox({
  users,
  service,
  handleSelectedServices,
  handleQuantity,
  handleChangeExercutor
}: {
  users: User[];
  service: Product;
  handleSelectedServices: (id: string) => void;
  handleQuantity: (id: string, quantity: number) => void;
  handleChangeExercutor: (id: string, executorId: string) => void
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [executor, setExecutor] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleQuantityChange = (type: string) => {
    setQuantity((prev) => {
      if (type === "inc") {
        handleQuantity(service._id, prev + 1);
        return prev + 1;
      }
      if (type === "dec" && prev > 1) {
        handleQuantity(service._id, prev - 1);
        return prev - 1;
      }
      return prev;
    });
  };

  useEffect(() => {}, []);

  return (
    <View>
      <View style={styles.row}>
        <BouncyCheckbox
          fillColor="red"
          unFillColor="#FFFFFF"
          iconStyle={{ borderColor: "yellow" }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={(isChecked: boolean) => {
            setIsChecked(isChecked);
            handleSelectedServices(service._id);
          }}
          style={styles.box}
          size={25}
        />
        <Text style={styles.text}>{service.name}</Text>
      </View>
      {isChecked ? (
        <View style={styles.container}>
          <View style={styles.rowDown}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleQuantityChange("dec");
              }}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={String(quantity)}
              editable={false}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleQuantityChange("inc");
              }}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <Dropdown
              data={users}
              labelField={"name"}
              valueField={"_id"}
              onChange={(item) => {
                handleChangeExercutor(service._id, item._id)
                setExecutor(item._id);
              }}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              placeholder="Executor"
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            />
          </View>
          <Text style={styles.price}>
            Price:{" "}
            <Text style={styles.priceValue}>
              {new Intl.NumberFormat("vnd", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
              }).format(service.price * quantity)}
            </Text>
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    width: "90%",
  },
  box: {
    width: "10%",
  },
  container: { padding: 16 },
  rowDown: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  button: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
  },
  buttonText: { fontSize: 18, fontWeight: "bold" },
  input: {
    width: 40,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    flex: 1,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  price: { fontSize: 16, marginTop: 8 },
  priceValue: { color: "#e53935", fontWeight: "bold" },
  currency: { textDecorationLine: "underline" },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "60%",
    marginLeft: 10,
  },
});
