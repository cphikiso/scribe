import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { styles } from "./styles";
import PostItem from "../../../../components/PostItem";
import { getFunctions, httpsCallable } from "firebase/functions";
import useAuth from "../../../hooks/useAuth";

const EveryoneScreen = () => {
  const { user, currentUser } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text
        style={{
          fontFamily: "SFProRoundedHeavy",
          fontSize: 28,
          color: "rgba(112, 112, 112, 0.2)",
          textAlign: "center",
        }}
      >
        {" "}
        Work in progress ...{"\n"} nothing to see here yet
      </Text>
    </View>
  );
};

export default EveryoneScreen;
