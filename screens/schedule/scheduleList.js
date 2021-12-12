import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ScheduleListItem from "./scheduleListItem";
import ScheduleListAddItemForm from "./scheduleListAddItemForm";
import { globalStyles } from "../../styles/global";
import Data from "../../data/scheduleData";
import * as Progress from "react-native-progress";
import AppContext from "../../shared/AppContext";

export default function ScheduleList({ navigation }) {
  const [scheduleData, setScheduleData] = useState(Data);
  // const [isModalLoginOpen, setIsModalLoginOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false);
  const [health, setHealth] = useState(50);
  const [strength, setStrength] = useState(50);
  const [userScore, setUserScore] = useState(0);
  const [userId, setUserId] = useState(-1);
  const globalUserIdContext = useContext(AppContext);

  useEffect(() => {
    navigation.navigate("ScheduleListUserLogin");
    console.log("GLOBAL ELITE", globalUserIdContext.array);
    setUserId(globalUserIdContext.array);
  }, []);

  const pressHandlerDeleteItem = (key) => {
    setScheduleData((previousScheduleData) => {
      return previousScheduleData.filter(
        (scheduleData) => scheduleData.key != key
      );
    });
  };

  const addScheduleListItem = (item) => {
    item.key = Math.random().toString(); //find better way to generate key
    setScheduleData((prevScheduleData) => {
      return [item, ...prevScheduleData];
    });
    setIsModalOpen(false);
  };

  const handleUserLogin = (item) => {
    console.log(item);
    setIsModalLoginOpen(false);
  };

  const chooseDogImage = () => {
    if (health < 45) {
      return <Image source={require("../../assets/saddog.gif")} />;
    } else if (health > 85) {
      return <Image source={require("../../assets/hearteyesdog.gif")} />;
    } else {
      return <Image source={require("../../assets/smiledog.gif")} />;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <ScrollView> */}
      <View style={globalStyles.container}>
        {/* Modal */}
        <Modal visible={isModalOpen} animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <MaterialIcons
                name="close"
                size={24}
                style={{ ...styles.modalToggle, ...styles.modalClose }}
                onPress={() => setIsModalOpen(false)}
              />
              <ScrollView>
                <ScheduleListAddItemForm
                  setIsModalOpen={setIsModalOpen}
                  userId={userId}
                />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.topOfPage}>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <View style={styles.modalToggle}>
              <MaterialIcons name="add" size={24} />
              {/* <Text>Add</Text> */}
            </View>
          </TouchableOpacity>

          <Text style={styles.dayStreak}>Your score {userScore}</Text>
          <View></View>
        </View>

        <View style={styles.animal}>{chooseDogImage()}</View>

        <View style={styles.bar}>
          <View style={styles.barText}>
            <Text>Health {health}</Text>
          </View>
          <Progress.Bar
            progress={health / 100}
            height={15}
            width={200}
            color="rgba(222, 144, 130, 1)"
          />
        </View>

        <View style={styles.bar}>
          <View style={styles.barText}>
            <Text>Strength {strength}</Text>
          </View>
          <Progress.Bar
            progress={strength / 100}
            height={15}
            width={200}
            color="rgba(62, 255, 80, 1)"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.todayPlan}>Your today's plan:</Text>
          <View style={styles.list}>
            <FlatList
              data={scheduleData}
              // dont have to add keyExtractor if you already have key property
              renderItem={({ item }) => (
                <ScheduleListItem
                  item={item}
                  pressHandler={() =>
                    navigation.navigate("ListItemDetails", {
                      item,
                      pressHandlerDeleteItem,
                    })
                  }
                />
              )}
            />
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    // padding: 40,
    padding: 0,
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  list: {
    flex: 1,
  },
  modalToggle: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#dcdcdc",
    borderRadius: 10,
    padding: 10,
    alignSelf: "flex-start",
    // backgroundColor: "red",
  },
  modalClose: { marginTop: 20, marginBottom: 0 },
  modalContent: { flex: 1, padding: 15 },
  topOfPage: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    justifyContent: "space-between",
    maxHeight: 30,
  },
  dayStreak: { marginRight: 50 },
  animal: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    paddingBottom: 0,
    marginBottom: 0,
    maxHeight: 200,
  },

  bar: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    maxHeight: 45,
  },
  barText: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    maxHeight: 18,
    marginBottom: 3,
  },
  todayPlan: {
    fontSize: 25,
  },
});
