import { StyleSheet, ViewStyle, TextStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  date: TextStyle;
  title: TextStyle;
  timeContainer: ViewStyle;
  timeText: TextStyle;
};

export default StyleSheet.create<Styles>({
  container: {
    display: "flex",
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    width: "100%",
    flexDirection: "column",
    padding: 0,
  },
  date: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  timeText: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
});