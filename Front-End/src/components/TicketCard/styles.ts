import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

type Styles = {
  container: ViewStyle;
  date: TextStyle;
  title: TextStyle;
  timeContainer: ViewStyle;
  timeText: TextStyle;
  image: ImageStyle;
  outerContainer: ViewStyle;
};

export default StyleSheet.create<Styles>({
  container: {
    display: "flex",
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    width: "90%",
    flexDirection: "column",
    padding: 0,
  },
  date: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 10,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    padding: 0,
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 0,
  },
  timeText: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 0,
  },
  image: {
    width: "25%",
    height: "100%",
    borderRadius: 8,
  },
  outerContainer: {
    flexDirection: "row",
  }, priceText: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 0,
    fontWeight: "bold",
  },
});