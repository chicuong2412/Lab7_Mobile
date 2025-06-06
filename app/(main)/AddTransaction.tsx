import ServiceChooseBox from "@/components/ServiceChooseBox/ServiceChooseBox";
import { Customer, Product, ProductInCart, User } from "@/interface/interface";
import { GetCustomerList, PostTransaction } from "@/services/Data";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function AddTransaction() {
  const [isFocus, setIsFocus] = useState(false);  

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [customerSelected, setCustomerSelected] = useState<
    string | undefined
  >();
  const [users, setUsers] = useState<User[]>([]);

  const [selectedServices, setSelectedServices] = useState<ProductInCart[]>([]);

  const [services, setServices] = useState<Product[]>([]);

  const [refresh, setRefresh] = useState(0);

  const router = useRouter();

  useEffect(() => {
    GetCustomerList().then((rp) => {
      setCustomers(rp);
    });

    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
      url: "https://kami-backend-5rs0.onrender.com/services",
    })
      .then((rp) => {
        return rp.data;
      })
      .then((data) => {
        setServices(data);
      });

    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",
      url: "https://kami-backend-5rs0.onrender.com/users",
    })
      .then((rp) => {
        return rp.data;
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const cal = useMemo(() => {
    return selectedServices.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    );
  }, [refresh, selectedServices]);

  const handleSelectedServices = (id: string) => {
    let index = selectedServices.findIndex((i) => i._id === id);

    if (index === -1) {
      let service = services.find((i) => i._id === id);
      selectedServices.splice(0, 0, {
        ...service!,
        quantity: 1,
      });
    } else {
      selectedServices.splice(index, 1);
    }
    setRefresh((prev) => prev + 1);
  };

  const handleChangeExercutor = (id: string, executorId: string) => {
    let index = selectedServices.findIndex((i) => i._id === id);
    selectedServices[index].userId = executorId;
  };

  const handleQuantity = (id: string, quantity: number) => {
    let index = selectedServices.findIndex((i) => i._id === id);
    selectedServices[index].quantity = quantity;
    setRefresh((prev) => prev + 1);
  };

  const handlePostTransaction = () => {
    PostTransaction({
      customerId: customerSelected,
      services: selectedServices.map((item) => {
        return {
          _id: item._id,
          quantity: item.quantity,
          userID: item.userId,
        };
      }),
    }).then((rp) => {
      router.back();
    });
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <Dropdown
            data={customers}
            labelField={"name"}
            valueField={"name"}
            onChange={(item) => {
              let customerPre = item as Customer;
              setCustomerSelected(customerPre._id);
            }}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          />
          <View
            style={{
              gap: 5,
              marginTop: 10,
            }}
          >
            {services.map((item, index) => {
              return (
                <ServiceChooseBox
                  key={index}
                  service={item}
                  users={users}
                  handleSelectedServices={handleSelectedServices}
                  handleQuantity={handleQuantity}
                  handleChangeExercutor={handleChangeExercutor}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handlePostTransaction();
        }}
      >
        <Text style={styles.buttonText}>See summary: {cal}</Text>
      </TouchableOpacity>
    </>
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
    marginBottom: 60,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#f45b6a",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    position: "fixed",
    bottom: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
