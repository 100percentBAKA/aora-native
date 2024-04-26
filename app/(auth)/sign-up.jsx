import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link, Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

// ! global debug
const debug = true;

const SignUp = () => {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  // ! isSubmitting state will handle the activityLoading animation
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { isLoading, isLogged, setIsLogged, setUser } = useGlobalContext();

  // ! main logic to sign-up
  const handleSignUp = async () => {
    debug &&
      console.log(
        `UserName: ${form.username}\nEmail: ${form.email}\nPassword: ${form.password}`
      );

    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      debug && console.log(result);
      setUser(result);
      setIsLogged(true);

      // ! perform toast handling here . . .

      router.replace("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ! if the user is logged in, redirect to home
  if (!isLoading && isLogged) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center px-4">
          <View className="flex-col">
            {/* logo */}
            <Image
              source={images.logo}
              className="w-[120px] h-[80px]"
              resizeMode="contain"
            />
            <Text className="text-2xl text-white font-psemibold mb-8">
              Sign up to Aora
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mb-6"
              keyboardType="default"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mb-6"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mb-6"
            />
            <CustomButton
              title={
                isSubmitting ? (
                  <ActivityIndicator size="large" color="#161622" />
                ) : (
                  "Sign Up"
                )
              }
              handlePress={() => handleSignUp()}
              containerStyles="w-full mb-6"
            />

            <View>
              <Text className="text-lg text-white font-pregular text-center w-full">
                Have an account ?{" "}
                <Link className="text-secondary-200" href="/sign-in">
                  Sign in
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* // ! StatusBar (notification widgets) */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignUp;
