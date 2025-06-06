import { AuthContextProvider } from "@/components/AuthContext";
import { DeleteCustomers, DeleteFetch, DeleteTransaction } from "@/services/Data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Redirect, Stack, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu } from "react-native-paper";

export default function AppLayout() {
  const { isLogged } = useContext(AuthContextProvider);
  const navigation = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (!isLogged) {
    return <Redirect href={"/(auth)/LoginScreen"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[ID]"
        options={{
          headerShown: true,
          header: ({ route }) => (
            <>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.back();
                  }}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Service detail</Text>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onPress={openMenu}>
                      <MaterialIcons name="more-vert" size={24} color={"#fff"} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      let { ID } = route.params;
                      navigation.navigate({
                        pathname: "/(main)/EditProduct",
                        params: {
                          id: ID
                        }
                      })
                      closeMenu();
                    }}
                    title="Edit"
                  />
                  <Menu.Item
                    onPress={() => {
                      setModalVisible(true);
                      
                      closeMenu();
                    }}
                    title="Delete"
                  />
                </Menu>
              </View>
              <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={{ fontSize: 16, marginBottom: 16 }}>
                      Are you sure you want to delete?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalButton}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={async () => {
                          setModalVisible(false);
                          let { ID } = route.params;
                          DeleteFetch(ID).then((rp) => {
                            if (rp) {
                              Alert.alert("Delete successful");
                            } else {
                              Alert.alert("Failed to delete");
                            }
                          });
                        }}
                        style={[
                          styles.modalButton,
                          { backgroundColor: "#e57373" },
                        ]}
                      >
                        <Text style={{ color: "#fff" }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="AddProduct"
        options={{
          headerStyle: {
            backgroundColor: "#e84c64",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 32,
              }}
              onPress={() => navigation.navigate("/(main)/home")}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          title: "Service",
        }}
      />
      <Stack.Screen
        name="AddCustomer"
        options={{
          headerStyle: {
            backgroundColor: "#e84c64",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 32,
              }}
              onPress={() => navigation.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          title: "Add Customer",
        }}
      />
      <Stack.Screen
        name="AddTransaction"
        options={{
          headerStyle: {
            backgroundColor: "#e84c64",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 32,
              }}
              onPress={() => navigation.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          title: "Add Transaction",
        }}
      />
      <Stack.Screen
        name="EditProduct"
        options={{
          headerStyle: {
            backgroundColor: "#e84c64",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 32,
              }}
              onPress={() => navigation.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          title: "Service",
        }}
      />
      <Stack.Screen
        name="EditCustomer"
        options={{
          headerStyle: {
            backgroundColor: "#e84c64",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 32,
              }}
              onPress={() => navigation.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          title: "Add customer",
        }}
      />
      <Stack.Screen
        name="TransactionDetail"
        options={{
          headerShown: true,
          header: ({ route }) => (
            <>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.back();
                  }}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Transaction detail</Text>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onPress={openMenu}>
                      <MaterialIcons name="more-vert" size={24} color={"#fff"} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      setModalVisible(true);
                      closeMenu();
                    }}
                    title="Delete"
                  />
                </Menu>
              </View>
              <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={{ fontSize: 16, marginBottom: 16 }}>
                      Are you sure you want to delete?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalButton}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={async () => {
                          setModalVisible(false);
                          let { ID } = route.params;
                          DeleteTransaction(ID).then((rp) => {
                            if (rp) {
                              Alert.alert("Delete successful");
                            } else {
                              Alert.alert("Failed to delete");
                            }
                          });
                        }}
                        style={[
                          styles.modalButton,
                          { backgroundColor: "#e57373" },
                        ]}
                      >
                        <Text style={{ color: "#fff" }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="CustomerDetail"
        options={{
          headerShown: true,
          header: ({ route }) => (
            <>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.back();
                  }}
                >
                  <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Customer detail</Text>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onPress={openMenu}>
                      <MaterialIcons name="more-vert" size={24} color={"#fff"} />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      let { ID } = route.params;
                      navigation.navigate({
                        pathname: "/(main)/EditCustomer",
                        params: {
                          id: ID
                        }
                      })
                      closeMenu();
                    }}
                    title="Edit"
                  />
                  <Menu.Item
                    onPress={() => {
                      setModalVisible(true);
                      closeMenu();
                    }}
                    title="Delete"
                  />
                </Menu>
              </View>
              <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={{ fontSize: 16, marginBottom: 16 }}>
                      Are you sure you want to delete?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        style={styles.modalButton}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={async () => {
                          setModalVisible(false);
                          let { ID } = route.params;
                          DeleteCustomers(ID).then((rp) => {
                            if (rp) {
                              Alert.alert("Delete successful");
                              navigation.back();
                            } else {
                              Alert.alert("Failed to delete");
                            }
                          });
                        }}
                        style={[
                          styles.modalButton,
                          { backgroundColor: "#e57373" },
                        ]}
                      >
                        <Text style={{ color: "#fff" }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#e84c64",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: "space-between",
    paddingTop: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    width: 280,
  },
  modalButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
});
