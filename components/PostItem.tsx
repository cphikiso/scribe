import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostItem = ({ post }) => {
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
                  marginBottom: 4,
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
              these aren’t just random questions. they reveal (and motivate)
              some key design decisions. for each of these, what do you *want*
              the answer to be, and why? what is the “price” of your chosen
              answer?
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            top: -16,
            height: 44,
            width: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="ios-play" size={24} color={"rgba(60,60,67,0.6)"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 32,
          paddingLeft: 48,
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 44,
            width: 44,
          }}
        >
          <Ionicons
            name="ios-chatbox-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 44,
            width: 44,
          }}
        >
          <Ionicons
            name="ios-sync-outline"
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 44,
            width: 44,
          }}
        >
          <Ionicons
            name="ios-heart-outline" //ios-heart-sharp is filled
            color={"rgba(60,60,67,0.6)"}
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 44,
            width: 44,
          }}
        >
          <Ionicons
            name="ios-ellipsis-horizontal"
            color={"rgba(60,60,67,0.3)"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: "#F5F5F5" }} />
    </View>
  );
};

export default PostItem;
