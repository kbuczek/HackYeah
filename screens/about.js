import React from "react";
import { Button, StyleSheet, View, Text, Image } from "react-native";
import { globalStyles } from "../styles/global";

/*const mysql = require("mysql");

const db = mysql.createConnection({
  host: "http://149.156.115.209/phpmyadmin",
  user: "s299918",
  password: "szott-ludwikowskirobert",
  database: "s299918"
});

con.connect(function (err) {
  if (err) {
    alert("ZJEBALO SIE");
  } else {
    alert("CONNECTED");
  }
});*/

function BUTT_PRESS() {
  alert("TY KUURrwo22");
}

export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text>About KUTAS 22</Text>
      <View style={styles.IMG}>
        <Image source={require("../assets/working.jpg")} />
      </View>
      <Button
        title="KUTAS KOZŁA"
        onPress={BUTT_PRESS}
        style={styles.button}
        color="blue"
        marginTop={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  IMG: {
    paddingBottom: 100,
  },
});
