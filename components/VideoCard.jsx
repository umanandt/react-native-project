import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
//import { ResizeMode, Video } from "expo-av";
import { WebView } from "react-native-webview";
import { useGlobalContext } from "../context/GlobalProvider";



const VideoCard = ({ videoId, title, thumbnail, video, prompt }) => {
  const { bookmarks, addBookmarks, removeBookmark } = useGlobalContext();
  const [play, setPlay] = useState(false);

  const isBookmarked = bookmarks.includes(videoId);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(videoId);
    } else {
      addBookmarks(videoId);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            {/* <Image
              source={{ uri: avatar? '':''}}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
  />*/}
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {prompt}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Pressable onPress={toggleBookmark}>
            <Image
              source={isBookmarked ? icons.eyeHide : icons.bookmark}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>

      {play ? (
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          className="w-52 h-60 rounded-xl mt-3"
          source={{ uri: getYoutubeEmbedUrl(video) }}
          resizeMode="contain"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 
        relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
