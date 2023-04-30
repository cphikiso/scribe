import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "./colors";

function getInitials(name: string): string {
  const [firstName, lastName] = name.split(" ");

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  return firstName.charAt(0).toUpperCase();
}

export interface InitialsAvatarProps {
  name: string;
  className?: string;
}

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, className }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.initials}>{getInitials(name)}</Text>
    </View>
  );
};

export default React.memo(InitialsAvatar);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: colors.purpl30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  initials: {
    color: colors.purple,
    fontSize: 16,
    fontFamily: "SFProRoundedHeavy",
  },
});
