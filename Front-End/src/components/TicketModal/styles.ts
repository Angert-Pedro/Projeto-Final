import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "600",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  btn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  selected: {
    backgroundColor: "#ddd",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancel: {
    padding: 10,
  },
  confirm: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
});

export default styles;
