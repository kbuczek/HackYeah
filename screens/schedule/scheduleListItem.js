import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ScheduleListItem({
  item,
  pressHandlerDeleteItem,
  pressHandler,
}) {
  const handleTaskSuccess = () => {
    pressHandlerDeleteItem(item.task_id, "true");
  };

  const handleTaskFailure = () => {
    pressHandlerDeleteItem(item.task_id, "false");
  };

  return (
    <TouchableOpacity onPress={() => pressHandler(item.task_id)}>
      <View style={styles.item}>
        <View style={{ flexDirection: "row" }}>
          <Text>
            {item.startingHour}:{item.startingMinute}
          </Text>
          <Text> {item.length} min</Text>
          <Text style={styles.itemText}>{item.activity}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name="checkcircleo"
            size={28}
            color="green"
            style={styles.greenBtn}
            onPress={handleTaskSuccess}
          />
          <AntDesign
            name="closecircleo"
            size={30}
            color="red"
            onPress={handleTaskFailure}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 0,
    borderBottomWidth: 2,
    // borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "#d8dde6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 10,
  },
  greenBtn: {
    marginRight: 11,
  },
});
