import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PostItem from "../../../../components/PostItem";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        ListHeaderComponent={() => (
          <>
            <View
              style={{ flexDirection: "row", marginBottom: 16, paddingTop: 16 }}
            >
              <Image
                source={require("../../../../assets/pic.jpg")}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 80,
                  marginRight: 16,
                }}
              />
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{
                    fontFamily: "SFProRoundedHeavy",
                    fontSize: 22,
                  }}
                >
                  Chimwemwe
                </Text>
                <Text
                  style={{
                    fontFamily: "SFProRoundedMedium",
                    fontSize: 18,
                  }}
                >
                  a lil bio about me ...
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily: "SFProRoundedMedium",
                  fontSize: 18,
                  marginRight: 16,
                }}
              >
                0 <Text style={{ color: "rgba(60,60,67,0.3)" }}>Following</Text>
              </Text>
              <Text
                style={{
                  fontFamily: "SFProRoundedMedium",
                  fontSize: 18,
                }}
              >
                0 <Text style={{ color: "rgba(60,60,67,0.3)" }}>Followers</Text>
              </Text>
            </View>
            <View
              style={{ height: 1, backgroundColor: "#F5F5F5", marginBottom: 8 }}
            />
            <TouchableOpacity
              style={{
                height: 58,
                borderRadius: 58,
                width: 192,
                borderWidth: 2,
                borderColor: "rgba(60,60,67,0.3)",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: "SFProRoundedHeavy",
                  fontSize: 18,
                  color: "rgba(60,60,67,0.3)",
                }}
              >
                Invite friends
              </Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: "#F5F5F5" }} />
          </>
        )}
        data={posts}
        renderItem={(post) => <PostItem post={post} />}
      />
    </View>
  );
};

export default ProfileScreen;

const posts = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
