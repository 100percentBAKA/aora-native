import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const Home = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const handleOnPress = async () => {
    const result = await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => handleOnPress()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
