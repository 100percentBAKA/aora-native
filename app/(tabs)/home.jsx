import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/searchInput";
import Trending from "../../components/trending";
import EmptyDisplay from "../../components/empty";
import { StatusBar } from "expo-status-bar";
import { useAppwrite } from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "../../components/videoCard";

const debug = false;

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts, isLoading: latestPostLoading } =
    useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  debug && console.log(posts);

  debug && console.log(latestPosts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />} // ! explains react native how the items are to be rendered
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            {/* // ! this view is for title header */}
            <View className="flex-row justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-gray-200">
                  Adarsh G S
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

            {/* // ! trending posts */}
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending Videos
              </Text>

              <Trending posts={latestPosts} />
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
