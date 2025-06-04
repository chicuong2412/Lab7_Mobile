import { IAuth } from "@/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { createContext, useEffect, useState } from "react";

export const AuthContextProvider = createContext<IAuth>({
  isLogged: false,
  HandleLogin: async (phone: string, password: string) => {},
  
});

export default function AuthContext({ children }: any) {
  const [isLogged, setIslogged] = useState(false);
  const [token, setToken] = useState("");

  const router = useRouter();

  const HandleLogin = async (phone: string, password: string) => {
    axios({
      method: "post",
      url: "https://kami-backend-5rs0.onrender.com/auth",
      data: JSON.stringify({
        phone: phone,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        "origin": 'exp://10.70.164.185:8081'
      },
    })
      .then((rp) => {
        return rp.data;
      })
      .then(async (data) => {
        console.log(data);
        
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("name", data.name);
        setIslogged(true);
        router.replace("/(main)/(tabs)/home");
      });
  };

  useEffect(() => {
    async function CheckLogin() {
      const auth = await AsyncStorage.getItem("Token");

      if (auth != null) {
        setIslogged(true);
      }
    }

    CheckLogin();
  }, []);

  return (
    <AuthContextProvider.Provider value={{ isLogged, token, HandleLogin, setIslogged }}>
      {children}
    </AuthContextProvider.Provider>
  );
}
