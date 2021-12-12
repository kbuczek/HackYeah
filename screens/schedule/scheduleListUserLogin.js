import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import * as yup from "yup";
import CustomButton from "../../shared/customButton";
import Urls from "../../shared/Api/urls";
import fetchWithData from "../../shared/Api/fetchWithData";
import AppContext from "../../shared/AppContext";

const scheduleSchema = yup.object({
  login: yup.string().required().max(40),
  password: yup.string().required().max(40),
});

export default function ScheduleListUserLogin({ navigation }) {
  const globalUserIdContext = useContext(AppContext);
  const [message, setMessage] = useState("");

  const handleUserLogin = (item) => {
    console.log("LOGIN", item);
    fetchWithData(Urls.login, "POST", item).then((response) => {
      if (response.logged !== "false") {
        // console.log(response.logged);
        globalUserIdContext.changeGlobalUserId(response.logged);
        navigation.goBack();
      } else {
        setMessage("Wrong login or password. Try again.");
      }
    });
  };

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ login: "", password: "" }}
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

            <Text>{message}</Text>

            <TouchableOpacity
              style={styles.register}
              onPress={() => {
                navigation.navigate("ScheduleListUserRegister");
              }}
            >
              <Text>No account? Register</Text>
            </TouchableOpacity>

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
  register: {
    marginBottom: 15,
  },
});
