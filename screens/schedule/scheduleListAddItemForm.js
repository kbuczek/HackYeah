import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../shared/customButton";
import FetchWithData from "../../shared/Api/fetchWithData";
import Url from "../../shared/Api/urls";
// import DatePicker from "react-native-date-picker";
import AppContext from "../../shared/AppContext";

const scheduleSchema = yup.object({
  activity: yup.string().required().max(40),
  category: yup.string().required().max(40),
  length: yup.string().required().max(40),
  date: yup.string().required().max(10),
  startingHour: yup
    .number()
    .required()
    .test(
      "is-num-0-24",
      "Godzina musi mieścić się w przedziale od 0 do 24",
      (val) => {
        return val >= 0 && val <= 24;
      }
    ),
  startingMinute: yup
    .number()
    .required()
    .test(
      "is-num-0-59",
      "Minuty muszą mieścić się w przedziale od 0 do 59",
      (val) => {
        return val >= 0 && val <= 59;
      }
    ),
  notes: yup.string().max(200),
});

export default function ScheduleListAddItemForm({
  setIsModalOpen,
  setAddData,
  userId,
}) {
  const options = ["Job & self improvement", "Workout"];
  const optionsLength = ["15", "30", "45", "60", "90", "120"];
  const globalUserIdContext = useContext(AppContext);

  const addScheduleListItem = (item) => {
    console.log("ADD");
    // console.log(item);
    // console.log(globalUserIdContext.array);
    const data = { user_id: globalUserIdContext.array, ...item };
    console.log(data);
    FetchWithData(Url.addTask, "POST", data);
    setAddData((prev) => {
      !prev;
    });
    setIsModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{
          activity: "",
          category: "Job & self improvement",
          length: "15",
          date: "",
          startingHour: "",
          startingMinute: "",
          notes: "",
        }}
        validationSchema={scheduleSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          addScheduleListItem(values);
        }}
      >
        {(props) => (
          <View>
            <Text>Activity Name</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="ex. Work on my mobile game"
              onChangeText={props.handleChange("activity")}
              value={props.values.activity}
              onBlur={props.handleBlur("activity")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.activity && props.errors.activity}
            </Text>

            <Text>Category</Text>
            <View
              style={{
                borderColor: "lightgray",
                borderRadius: 3,
                borderWidth: 1,
                marginBottom: 20,
              }}
            >
              <Picker
                style={{ height: 50, width: 360 }}
                mode="dropdown"
                prompt={"Select language"}
                itemStyle={{ backgroundColor: "gray" }}
                selectedValue={props.values.category}
                onValueChange={props.handleChange("category")}
              >
                {options.map((item, id) => {
                  return <Picker.Item label={item} value={item} key={id} />;
                })}
              </Picker>
            </View>

            <Text>Length in minutes</Text>
            <View
              style={{
                borderColor: "lightgray",
                borderRadius: 3,
                borderWidth: 1,
                marginBottom: 20,
              }}
            >
              <Picker
                style={{ height: 50, width: 360 }}
                mode="dropdown"
                prompt={"Select language"}
                itemStyle={{ backgroundColor: "gray" }}
                selectedValue={props.values.length}
                onValueChange={props.handleChange("length")}
              >
                {optionsLength.map((item, id) => {
                  return <Picker.Item label={item} value={item} key={id} />;
                })}
              </Picker>
            </View>

            <Text>Date</Text>
            <TextInput
              style={globalStyles.input}
              placeholder="DD-MM-YYYY"
              onChangeText={props.handleChange("date")}
              value={props.values.date}
              onBlur={props.handleBlur("date")}
              keyboardType="numeric"
            />
            <Text style={globalStyles.errorText}>
              {props.touched.day && props.errors.day}
            </Text>

            <Text>Starting Hour</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={globalStyles.inputSmall}
                placeholder="Hour"
                onChangeText={props.handleChange("startingHour")}
                value={props.values.startingHour}
                onBlur={props.handleBlur("startingHour")}
                keyboardType="numeric"
              />
              <Text style={globalStyles.errorText}>
                {props.touched.startingHour && props.errors.startingHour}
              </Text>

              <Text style={styles.doubleDot}>:</Text>

              <TextInput
                style={globalStyles.inputSmall}
                placeholder="Minute"
                onChangeText={props.handleChange("startingMinute")}
                value={props.values.startingMinute}
                onBlur={props.handleBlur("startingMinute")}
                keyboardType="numeric"
              />
              <Text style={globalStyles.errorText}>
                {props.touched.startingMinute && props.errors.startingMinute}
              </Text>
            </View>

            <Text>Notes</Text>
            <TextInput
              multiline
              minHeight={60}
              style={globalStyles.input}
              placeholder="add some additional info here :)"
              onChangeText={props.handleChange("notes")}
              value={props.values.notes}
              onBlur={props.handleBlur("notes")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.notes && props.errors.notes}
            </Text>

            <CustomButton text="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
  doubleDot: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
    paddingTop: 10,
  },
});
