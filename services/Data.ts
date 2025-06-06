import { CustomerDetail, ProductDetail } from "@/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";

export async function DeleteFetch(id: string): Promise<boolean> {
  console.log(id);

  try {
    const rp = await axios({
      method: "DELETE",
      url: "https://kami-backend5rs0.onrender.com/services/" + id,
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
      },
      data: {
        id
      }
    });
    if (rp.status === 200) {
      return true;
    }
  } catch (error) {
    let axiosEr = error as AxiosError;
    console.log(axiosEr.toJSON());
    return false;
  }

  return false;
}

export async function AddProductHandler(name: string, price: string) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      "https://kami-backend-5rs0.onrender.com/services",
      {
        name: name,
        price: parseFloat(price),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return false;
  }

  return true;
}

export async function GetProductById(id: string): Promise<ProductDetail> {
  const rp = await axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
    url: "https://kami-backend-5rs0.onrender.com/services/" + id,
  });

  if (rp.status !== 200) {
    throw new Error("Error");
  }

  return rp.data;
}

export async function UpdateProduct(id: string, name: string, price: string) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      "https://kami-backend-5rs0.onrender.com/services/" + id,
      {
        name: name,
        price: parseFloat(price),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return false;
  }

  return true;
}

export async function GetCustomerList() {
  const rp = await axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
    url: "https://kami-backend-5rs0.onrender.com/customers",
  });

  return rp.data;
}

export async function AddCustomerHandler(name: string, phone: string) {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      "https://kami-backend-5rs0.onrender.com/customers",
      {
        name: name,
        phone: phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);

    return false;
  }

  return true;
}

export async function GetTransactionList() {
  const rp = await axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
    url: "https://kami-backend-5rs0.onrender.com/transactions",
  });

  return rp.data;
}

export async function GetCustomertById(id: string): Promise<CustomerDetail> {
  const rp = await axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
    url: "https://kami-backend-5rs0.onrender.com/customers/" + id,
  });

  if (rp.status !== 200) {
    throw new Error("Error");
  }

  return rp.data;
}

export async function UpdateCustomer(id: string, name: string, phone: string) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      "https://kami-backend-5rs0.onrender.com/customers/" + id,
      {
        name: name,
        phone: phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return false;
  }

  return true;
}

export async function DeleteCustomers(id: string) {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(
      "https://kami-backend-5rs0.onrender.com/customers/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return false;
  }

  return true;
}

export async function PostTransaction(data: any) {
  console.log(data);

  try {
    const token = await AsyncStorage.getItem("token");
    console.log("Token: " + token);

    const response = await axios.post(
      "https://kami-backend-5rs0.onrender.com/transactions",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return false;
  }

  return true;
}

export async function DeleteTransaction(id: string): Promise<boolean> {
  const rp = await axios({
    method: "DELETE",
    url: "https://kami-backend5rs0.onrender.com/transactions/" + id,
    headers: {
      Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
    },
  });

  if (rp.status === 200) {
    return true;
  }

  return false;
}
