import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  question: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  answer: { fontSize: 14, color: "#555", lineHeight: 20 },
});
