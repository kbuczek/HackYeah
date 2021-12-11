import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Score from "../screens/score";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default scoreStackNav = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    // <NavigationContainer headerMode="none">
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#427ad4",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="High score table"
        component={Score}
        options={{
          title: "High score table",
          headerLeft: () => (
            <MaterialIcons
              name="menu"
              size={28}
              color="white"
              onPress={openDrawer}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};
