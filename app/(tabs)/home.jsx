import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/searchInput";
import Trending from "../../components/trending";
import EmptyDisplay from "../../components/empty";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // ! logic to refresh and fetch data
    setRefreshing(false);
  };

  const handleOnPress = async () => {
    const result = await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )} // explains react native how the items are to be rendered
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            {/* // ! this view is for title header */}
            <View className="flex-row justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-gray-200">
                  JSMastery
                </Text>
              </View>

              <Image
                source={images.logoSmall}
                resizeMode="contain"
                className="h-[46px] w-[46px]"
              />
            </View>

            <View>
              <SearchInput />
            </View>

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              {/* // ! trending videos */}
              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
              {/* // ! '??' is null coalescing, returns null values if the posts is null or undefined */}
            </View>
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
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />

      {/* // ! StatusBar (notification widgets) */}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Home;

{
  /* <TouchableOpacity onPress={() => handleOnPress()}>
<Text>Logout</Text>
</TouchableOpacity> */
}
