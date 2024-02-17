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
import { UserProvider } from "./context/UserContext";
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
          marginTop: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#bdc3c7",
        tabBarLabelStyle: {
          fontSize: 10,
        },
      }}
      initialRouteName="Exercices"
    >
      <Tab.Screen name="Calendrier" component={HomeScreen} />
      <Tab.Screen name="Exercices" component={DiscoverScreen} />
      <Tab.Screen name="Favoris" component={InsightScreen} />
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
    <UserProvider>
      <LikedExercisesProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="MyStack" component={MyStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </LikedExercisesProvider>
    </UserProvider>
  );
}
