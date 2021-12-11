import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function healthBar({ points }) {
  // const [style, setStyle] = React.useState({});
  return (
    <View style={styles.progress}>
      <View
      // style={{ width: `${points}`, backgroundColor: "red" }}
      // style={{ opactiy: 1, width: `${points}` }}
      >
        <Text>{points}hp</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    backgroundColor: "#d8d8d8",
    borderRadius: 20,
    // position: "relative",
    height: 25,
    width: 160,
  },
  progressDone: {},
});
