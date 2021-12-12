import React, { useState } from "react";
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
import CustomButton from "../../shared/customButton";
import Urls from "../../shared/Api/urls";
import fetchWithData from "../../shared/Api/fetchWithData";

const scheduleSchema = yup.object({
  login: yup.string().required().max(40),
  password: yup.string().required().max(40),
  password2: yup.string().required().max(40),
});

export default function ScheduleListUserRegister({ navigation }) {
  const [message, setMessage] = useState("");
  const handleUserLogin = (item) => {
    console.log("REGISTER", item);
    if (item.password === item.password2) {
      const data = { login: item.login, password: item.password };
      const response = fetchWithData(Urls.register, "POST", data);
      if (response.registered == "true") {
        navigation.goBack();
      } else {
        setMessage("Can't register on the server.");
      }
    } else {
      setMessage("Passwords are not matching.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ login: "", password: "", password2: "" }}
        validationSchema={scheduleSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          handleUserLogin(values);
        }}
      >
        {(props) => (
          <View style={styles.userLogin}>
            <Text>Login</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={props.handleChange("login")}
              value={props.values.login}
              onBlur={props.handleBlur("login")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.login && props.errors.login}
            </Text>

            <Text>Password</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              type="password"
              onBlur={props.handleBlur("password")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>

            <Text>Retype Password</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={props.handleChange("password2")}
              value={props.values.password2}
              type="password"
              onBlur={props.handleBlur("password2")}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.password2 && props.errors.password2}
            </Text>
            <Text>{message}</Text>

            <CustomButton text="Submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  userLogin: {
    marginTop: "55%",
  },
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
