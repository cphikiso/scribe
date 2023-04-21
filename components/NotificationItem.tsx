import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationItem = ({ notification }) => {
  return (
    <View
      style={{
        marginVertical: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", maxWidth: "80%" }}>
          <Image
            source={require("../assets/pic.jpg")}
            style={{
              height: 44,
              width: 44,
              borderRadius: 44,
              marginRight: 12,
            }}
          />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#000",
                  marginRight: 4,
                  fontFamily: "SFProRoundedBold",
                  fontSize: 16,
                }}
              >
                Travis Scott
              </Text>
              <Text
                style={{
                  color: "rgba(60,60,67, 0.6)",
                  fontFamily: "SFProRoundedMedium",
                  fontSize: 16,
                  marginRight: 4,
                }}
              >
                @laflame
              </Text>
              <View
                style={{
                  height: 2,
                  width: 2,
                  borderRadius: 2,
                  backgroundColor: "rgba(60,60,67,0.6)",
                  marginRight: 4,

                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  color: "rgba(60,60,67, 0.6)",
                  fontFamily: "SFProRoundedMedium",
                  fontSize: 16,
                }}
              >
                2m
              </Text>
            </View>
            <Text
              style={{
                color: "rgb(60,60,67)",
                fontFamily: "SFProRoundedMedium",
                fontSize: 16,
              }}
            >
              {notification.action}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: "#F5F5F5" }} />
    </View>
  );
};

export default NotificationItem;
