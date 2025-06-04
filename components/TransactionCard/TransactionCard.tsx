import { Transaction } from "@/interface/interface";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TransactionCard({
  transaction,
  showCustomer = true
}: {
  transaction: Transaction;
  showCustomer?: boolean
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {/* Header: ID and Date */}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>
            {transaction.id} - {transaction.createdAt}
          </Text>
        </View>
        {/* Services List */}
        <View style={styles.servicesRow}>
          <View style={{ flex: 1 }}>
            {transaction.services.map((service, index) => (
              <Text key={index} style={styles.serviceText}>
                - {service.name}
              </Text>
            ))}
          </View>
          <Text style={styles.priceText}>
            {new Intl.NumberFormat("vnd", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format(transaction.price)}
          </Text>
        </View>
        {(showCustomer) ? (
          <Text style={styles.customerText}>
          Customer: {transaction.customer.name}
        </Text>
        ) : <></>}
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
    padding: 12,
  },
  headerRow: {
    marginBottom: 4,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#222",
  },
  servicesRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  serviceText: {
    fontSize: 14,
    color: "#222",
  },
  priceText: {
    color: "#e57373",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
    alignSelf: "flex-start",
  },
  customerText: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },
});
