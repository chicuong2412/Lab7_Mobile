import CustomerCard from "@/components/CustomerCard/CustomerCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Customer } from "@/interface/interface";
import { GetCustomerList } from "@/services/Data";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CustomerScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useRouter();

  useEffect(() => {
    GetCustomerList().then((rp) => {
      setCustomers(rp);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Customers</Text>
      </View>

      {/* Customer List */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
            //   router.navigate({
            //     pathname: "/(main)/[ID]",
            //     params: {
            //       ID: item._id,
            //     },
            //   });
            }}
          >
            <CustomerCard customer={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {
        navigate.navigate("/(main)/AddCustomer")
      }}>
        <IconSymbol name="add" size={28} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#e84c64",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  logo: {
    width: 180,
    height: 70,
    alignSelf: "center",
    marginVertical: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#e84c64",
    borderRadius: 100,
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 5,
    right: 20
  },
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  serviceName: {
    fontSize: 15,
    flex: 1,
    fontWeight: "500",
  },
  servicePrice: {
    fontSize: 15,
    color: "#888",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
