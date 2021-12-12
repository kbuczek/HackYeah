import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import Drawer from "./routes/drawer";
import AppContext from "./shared/AppContext";

export default function App() {
  const [globalUserId, setGlobalUserId] = useState([]);

  const changeGlobalUserId = (array) => {
    setGlobalUserId(array);
  };

  const globalUserIdObject = {
    array: globalUserId,
    changeGlobalUserId,
  };

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AppContext.Provider value={globalUserIdObject}>
      <Drawer />
    </AppContext.Provider>
  );
}
