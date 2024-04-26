import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { icons } from "../../constants";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-4">
          <Text className="font-pbold text-2xl my-10 text-white">
            Upload Video
          </Text>

          {/* // ! flex col container */}
          <View className="flex-col">
            <View className="flex-col justify-center">
              <FormField
                title="Video Title"
                value={form.title}
                placeholder="Give your video a catchy title"
                handleChangeText={(e) => setForm({ ...form, title: e })}
                otherStyles="mb-6"
              />

              <TouchableOpacity
                onPress={() => console.log("Integrate document picker")}
              >
                <View className="flex-col space-y-2 mb-6">
                  <Text className="text-base text-gray-100 font-pmedium">
                    Upload Video
                  </Text>

                  <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                    <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        alt="upload"
                        className="w-1/2 h-1/2"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View className="flex-col space-y-2 mb-6">
                <Text className="text-base text-gray-100 font-pmedium">
                  Thumbnail Image
                </Text>

                <TouchableOpacity>
                  <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-5 h-5"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <FormField
                title="AI Prompt"
                placeholder="The AI prompt of your video . . ."
              />
              <CustomButton
                title="Submit & Publish"
                containerStyles="my-6"
                handlePress={() => console.log("Submit button pressed")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
