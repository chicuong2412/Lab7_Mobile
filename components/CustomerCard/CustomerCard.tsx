import { Customer } from "@/interface/interface";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";

export default function CustomerCard({ customer }: { customer: Customer }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>
            Customer: <Text style={styles.value}>{customer.name}</Text>
          </Text>
          <Text style={styles.label}>
            Phone: <Text style={styles.value}>{customer.phone}</Text>
          </Text>
          <Text style={styles.label}>
            Total money:{" "}
            <Text style={styles.money}>{customer.totalSpent} đ</Text>
          </Text>
        </View>
        <View style={styles.guestSection}>
          <IconSymbol name="diamond" size={28} color={"black"} />
          <Text style={styles.guestText}>Guest</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    borderWidth: 1,
    borderColor: "#f8bbd0",
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    elevation: 2, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoSection: {
    flex: 1,
  },
  label: {
    color: "#444",
    fontSize: 15,
    marginBottom: 4,
  },
  value: {
    fontWeight: "bold",
  },
  money: {
    color: "#e57373",
    fontWeight: "bold",
    fontSize: 16,
  },
  guestSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  guestText: {
    color: "#e57373",
    fontWeight: "bold",
    marginTop: 2,
  },
});
