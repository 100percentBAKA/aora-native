import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../components/videoCard";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { useAppwrite } from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import EmptyDisplay from "../../components/empty";
import { router } from "expo-router";

const debug = false;

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // ! get the user details form the global context
  const { user, setIsLogged, setUser } = useGlobalContext();

  useEffect(() => {
    // ! handle the promise
    getUserPosts(user.$id)
      .then((res) => {
        debug && console.log("User Data: ");
        debug && console.log(res);
        setUserData(res);
      })
      .catch((err) => {
        throw new Error(err);
      })
      // ! setIsLoading to false now
      .finally(() => setIsLoading(false));
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={userData}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 mb-20">
            <View className="flex-col space-y-6">
              {/* // ! logout button */}
              <TouchableOpacity className="self-end" onPress={logout}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="h-[26px] w-[26px]"
                />
              </TouchableOpacity>

              {/* // ! user profile header */}
              <View className="flex-col space-y-4 items-center justify-center">
                {/* // ! icon */}
                <View className="w-16 h-16 rounded-lg border-secondary-200 border flex items-center justify-center">
                  <Image
                    source={{ uri: userData[0].users.avatar }}
                    className="w-[90%] h-[90%] rounded-lg"
                    resizeMode="cover"
                  />
                </View>

                {/* // ! name */}
                <View>
                  <Text className="text-white font-psemibold text-xl">
                    {userData[0].users.username || "John Doe"}
                  </Text>
                </View>

                {/* // ! posts and views  */}
                <View className="flex-row space-x-10 items-center justify-center">
                  <View className="flex-col items-center justify-center">
                    <Text className="text-white font-psemibold text-2xl">
                      {userData?.length || "2"}
                    </Text>
                    <Text className="text-white">Posts</Text>
                  </View>
                  <View>
                    <Text className="text-white font-psemibold text-2xl">
                      1.2K
                    </Text>
                    <Text className="text-white">Views</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <View className="mt-12">
              <Text className="text-gray-100 text-lg font-pregular">
                Your Videos
              </Text>
            </View> */}
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyDisplay
              title="No videos found"
              subTitle="Be the first one to upload a video 👋"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
