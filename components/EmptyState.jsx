import { Text, View, Image } from "react-native";

import { images } from "../constants";
import CustomButtom from "./CustomButtom";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Text className="text-2xl font-psemibold text-white">{title}</Text>

      <CustomButtom
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
