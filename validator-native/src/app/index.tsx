import { View } from "react-native";
import Header from "@/components/Header/Header.web";
import React from "react";
import { Platform } from "react-native";

// if (Platform.OS === "web") {
//   module.exports = require("@/components/Header/Header.web").default;
// } else {
//   module.exports = require("@/components/Header/Header.native").default;
// }

export default function Index() {
  return (
    <View>
      <Header />
    </View>
  );
}
