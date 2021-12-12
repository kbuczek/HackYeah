import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import ScheduleCalendar from "../screens/schedule/scheduleCalendar";
import ScheduleList from "../screens/schedule/scheduleList";
import ListItemDetails from "../screens/schedule/ListItemDetails";
import { MaterialIcons } from "@expo/vector-icons";
import ScheduleListUserRegister from "../screens/schedule/scheduleListUserRegister";
import ScheduleListUserLogin from "../screens/schedule/scheduleListUserLogin";

const Stack = createStackNavigator();

export default scheduleStackNav = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
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
        name="Schedule"
        component={ScheduleList}
        options={{
          title: "MotivateME",
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
      <Stack.Screen
        name="ListItemDetails"
        component={ListItemDetails}
        options={{
          title: "Activity Details",
          headerStyle: {
            backgroundColor: "#41C05A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="ScheduleListUserLogin"
        component={ScheduleListUserLogin}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: "#41C05A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="ScheduleListUserRegister"
        component={ScheduleListUserRegister}
        options={{
          title: "Register",
          headerStyle: {
            backgroundColor: "#41C05A",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};
