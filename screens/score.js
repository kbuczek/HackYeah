import React from "react";
import { Button, StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";

export default function Score() {
  return (
    <View style={globalStyles.container}>
      <Text>High Score Table</Text>
      <View style={styles.IMG}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  IMG: {
    paddingBottom: 100,
  },
});
