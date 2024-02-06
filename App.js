import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import InsightScreen from "./screens/InsightScreen";
import ProfilScreen from "./screens/ProfilScreen";
import DetailsExo from "./components/DetailsExo";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsExo"
        component={DetailsExo}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

const DiscoverStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsExo"
        component={DetailsExo}
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarShowLabel={false}
        screenOptions={{
          swipeEnabled: true,
          tabBarStyle: {
            backgroundColor: "#8b50de",
            marginTop: 50,
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
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Exercices" component={DiscoverStack} />
        <Tab.Screen name="Insight" component={InsightScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
