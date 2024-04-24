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
import { Link, router, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { logUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const debug = false;

const SignIn = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { isLoading, isLogged, setIsLogged, setUser } = useGlobalContext();

  const handleSignIn = async () => {
    debug && console.log(`\nEmail: ${form.email}\nPassword: ${form.password}`);

    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await logUser(form.email, form.password);
      debug && console.log(result);
      setUser(result);
      debug && console.log("Setting result");
      debug && console.log(result);
      setIsLogged(true);

      // ! toast handling can be performed here . . .

      router.replace("/home");
    } catch (error) {
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
              Log in to Aora
            </Text>
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
                  <ActivityIndicator size="large" color="#161612" />
                ) : (
                  "Sign In"
                )
              }
              handlePress={() => handleSignIn()}
              containerStyles="w-full mb-6"
            />

            <View>
              <Text className="text-lg text-white font-pregular text-center w-full">
                Don't have an account ?{" "}
                <Link className="text-secondary-200" href="/sign-up">
                  Register
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

export default SignIn;
