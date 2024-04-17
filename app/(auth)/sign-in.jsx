import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

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
              otherStyles="mb-8"
              keyboardType="email"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mb-8"
            />

            <CustomButton
              title="Sign In"
              handlePress={() => console.log("Signing in . . .")}
              containerStyles="w-full mb-8"
            />

            <View>
              <Text className="text-lg text-white font-pregular text-center w-full">
                Don't have an account ?{" "}
                <Link className="text-secondary-200" href="/sign-up">
                  Sign up
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
