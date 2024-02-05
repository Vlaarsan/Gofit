import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DiscoverScreen from "./screens/DiscoverScreen";
import InsightScreen from "./screens/InsightScreen";
import ProfileScreen from "./screens/ProfilScreen";
import DetailsExo from "./components/DetailsExo";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Discover">
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
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
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={MainStackNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Insight" component={InsightScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
