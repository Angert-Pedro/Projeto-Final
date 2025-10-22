import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    lineHeight: 20,
  },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 5, marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 180,
    textAlignVertical: "top", // Para Android
    paddingTop: 12, // Para iOS
  },
  buttonContainer: {
    marginTop: 25,
  },
});
