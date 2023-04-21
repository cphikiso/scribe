import React from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import PostItem from "../../../../components/PostItem";

const EveryoneScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={(post) => <PostItem post={post} />}
      />
    </View>
  );
};

export default EveryoneScreen;

const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
