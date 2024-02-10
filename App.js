import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import InsightScreen from "./screens/InsightScreen";
import ProfilScreen from "./screens/ProfilScreen";
import DetailsExo from "./components/DetailsExo";
import { LikedExercisesProvider } from "./context/LikedExercicesContext";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignUpScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarShowLabel={false}
      screenOptions={{
        swipeEnabled: true,
        tabBarStyle: {
          backgroundColor: "#8b50de",
          marginTop: 55,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#ffffff",
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#bdc3c7",
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favoris" component={InsightScreen} />
      <Tab.Screen name="Découverte" component={DiscoverScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="DetailsExo" component={DetailsExo} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <LikedExercisesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MyStack" component={MyStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </LikedExercisesProvider>
  );
}
