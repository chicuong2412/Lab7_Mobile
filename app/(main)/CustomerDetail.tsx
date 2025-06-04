import TransactionCard from "@/components/TransactionCard/TransactionCard";
import { CustomerDetail } from "@/interface/interface";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function CustomerDetailScreen() {
  const { ID } = useLocalSearchParams();
  const [customer, setCustomer] = useState<CustomerDetail>();

  useEffect(() => {  
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
      url: "https://kami-backend-5rs0.onrender.com/customers/" + ID,
    })
      .then((rp) => {
        return rp.data;
      })
      .then((data) => {
        setCustomer(data);
      });
  });

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{customer?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone: </Text>
          <Text style={styles.value}>{customer?.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Total Spent: </Text>
          <Text style={styles.value}>
            {new Intl.NumberFormat("vnd", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format(customer?.totalSpent as number)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Time : </Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last update : </Text>
          <Text style={styles.value}></Text>
        </View>
      </View>
      <ScrollView style={styles.section} stickyHeaderIndices={[0]}>
        <View style={{
          backgroundColor: "#FFF",
          paddingVertical: 5
        }}>
          <Text style={styles.sectionTitlePink}>Transaction list</Text>
        </View>
        {customer?.transactions.map((transaction, index) => (
          <TransactionCard
            showCustomer={false}
            transaction={transaction}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#f8bbd0",
    paddingTop: 0
  },
  sectionTitle: {
    color: "#e57373",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
  },
  sectionTitlePink: {
    color: "#e57373",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    color: "#888",
    fontSize: 14,
  },
  value: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 14,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  serviceName: {
    flex: 1,
    color: "#222",
    fontSize: 14,
  },
  serviceQty: {
    color: "#888",
    fontSize: 13,
    marginHorizontal: 8,
  },
  servicePrice: {
    color: "#222",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 4,
  },
  totalLabel: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 14,
  },
  totalValue: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 14,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  paymentLabel: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 15,
  },
  paymentValue: {
    fontWeight: "bold",
    color: "#e57373",
    fontSize: 17,
  },
});
