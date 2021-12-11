import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ScheduleStackNav from "./scheduleStackNav";
import ScoreStackNav from "./scoreStackNav";

const Drawer = createDrawerNavigator();

export default DrawerNav = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Harmonogram">
        <Drawer.Screen name="Harmonogram" component={ScheduleStackNav} />
        <Drawer.Screen name="High Score Table" component={ScoreStackNav} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
