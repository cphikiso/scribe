import React, { useCallback, useMemo, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import PostItem from "../../../../components/PostItem";

const HomeScreen = () => {
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

export default HomeScreen;

const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
