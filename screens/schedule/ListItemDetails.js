import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import Card from "../../shared/card";
import DeleteButton from "../../shared/deleteButton";
import CustomButton from "../../shared/customButton";

export default function ListItemDetails({ route, navigation }) {
  const {
    task_id,
    activity,
    category,
    date,
    length,
    notes,
    startingHour,
    startingMinute,
  } = route.params.item;

  const pressHandlerSuccess = () => {
    navigation.goBack();
    route.params.pressHandlerDeleteItem(task_id, "true");
  };
  const pressHandlerFailure = () => {
    navigation.goBack();
    route.params.pressHandlerDeleteItem(task_id, "false");
  };

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={styles.text}>{activity}</Text>
        <Text style={styles.text}>{category}</Text>
        <Text style={styles.text}>{notes}</Text>
      </Card>
      <CustomButton text="success" onPress={pressHandlerSuccess} />
      <DeleteButton text="failure" onPress={pressHandlerFailure} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  text: {
    padding: 10,
  },
});
