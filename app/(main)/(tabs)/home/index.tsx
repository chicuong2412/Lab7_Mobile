import { Product } from "@/interface/interface";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ServiceListScreen() {
  const [services, setServices] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios({
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        responseType: "json",
        url: 'https://kami-backend-5rs0.onrender.com/services'
    }).then(rp => {
        return rp.data
    }).then(data => {
        setServices(data)
    })
  }, []);


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{AsyncStorage.getItem("name")}</Text>
        <TouchableOpacity onPress={() => {
          AsyncStorage.clear().then(() => {
            router.replace("/(auth)/LoginScreen")
          })
        }}>
          <MaterialIcons name="logout" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/014/861/969/non_2x/db-logo-design-initial-db-letter-logo-design-monogram-design-pro-vector.jpg' }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title and Add Button */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Danh sách dịch vụ</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {
          router.replace("/(main)/AddProduct")
        }}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
            
          <TouchableOpacity
            onPress={() => {
              router.navigate({
                pathname: "/(main)/[ID]",
                params: {
                  ID: item._id,
                },
              });
            }}
          >
            <View style={styles.serviceCard}>
              <Text style={styles.serviceName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.servicePrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
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
    borderRadius: 20,
    padding: 6,
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
