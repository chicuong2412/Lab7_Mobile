import { ProductDetail } from "@/interface/interface";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Detail() {
  const { ID } = useLocalSearchParams();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
      url:
        "https://kami-backend-5rs0.onrender.com/services/" +
        ID,
    })
      .then((rp) => {
        return rp.data;
      })
      .then((data) => {
        setProductDetail({
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt)
        });
      });
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View style={styles.textInfo}>
          <Text style={styles.label}>Service Name:</Text>
          <Text style={styles.textNormal}>{productDetail?.name}</Text>
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.textNormal}>{productDetail?.price}</Text>
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.label}>Creator:</Text>
          <Text style={styles.textNormal}>{productDetail?.user.name}</Text>
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.textNormal}>{productDetail?.createdAt?.toLocaleString()}</Text>
        </View>
        <View style={styles.textInfo}>
          <Text style={styles.label}>Final update:</Text>
          <Text style={styles.textNormal}>{productDetail?.updatedAt?.toLocaleString()}</Text>
        </View>
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
    gap: 5
  },
  textNormal: {
    fontSize: 16
  }
});
