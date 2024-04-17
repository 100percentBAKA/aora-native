import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary-200 items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType || "default"}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
