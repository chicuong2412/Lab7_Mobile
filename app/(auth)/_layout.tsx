import { Stack } from "expo-router";
import React from "react";

export default function AuthRoot() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" />
    </Stack>
  );
}
