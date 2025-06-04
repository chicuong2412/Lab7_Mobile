import { Transaction } from "@/interface/interface";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function TransactionDetail() {
  const { ID } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<Transaction>();

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
      url: "https://kami-backend-5rs0.onrender.com/transactions/" + ID,
    })
      .then((rp) => {
        return rp.data;
      })
      .then((data) => {
        console.log(data);

        setTransaction(data);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* General information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Transaction code</Text>
          <Text style={styles.value}>{transaction?._id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>
            {transaction?.customer.name} - {transaction?.customer.phone}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Creation time</Text>
          <Text style={styles.value}>{transaction?.createdAt}</Text>
        </View>
      </View>

      {/* Services list */}
      <View style={styles.section}>
        <Text style={styles.sectionTitlePink}>Services list</Text>
        {transaction?.services.map((service, index) => (
          <View key={index} style={styles.serviceRow}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceQty}>x{service.quantity}</Text>
            <Text style={styles.servicePrice}>
              {new Intl.NumberFormat("vnd", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
              }).format(service.price)}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {new Intl.NumberFormat("vnd", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format(transaction?.priceBeforePromotion as number)}
          </Text>
        </View>
      </View>

      {/* Cost */}
      <View style={styles.section}>
        <Text style={styles.sectionTitlePink}>Cost</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount of money</Text>
          <Text style={styles.value}>{new Intl.NumberFormat("vnd", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format(transaction?.priceBeforePromotion as number)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.value}>{new Intl.NumberFormat("vnd", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format((transaction?.priceBeforePromotion as number) - (transaction?.price as number))}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Total payment</Text>
          <Text style={styles.paymentValue}>{new Intl.NumberFormat("vnd", {
              style: "currency",
              currency: "VND",
              minimumFractionDigits: 0,
            }).format(transaction?.price as number)}</Text>
        </View>
      </View>
    </ScrollView>
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
