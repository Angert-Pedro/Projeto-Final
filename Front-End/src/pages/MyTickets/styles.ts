import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 10,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 50,
    marginBottom: 100,
  },

  emptyEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  errorCard: {
  backgroundColor: "#ffe6e6",
  padding: 20,
  borderRadius: 16,
  alignItems: "center",
  marginVertical: 20,
  marginHorizontal: 10,
  borderWidth: 1,
  borderColor: "#ffb3b3",
},

errorEmoji: {
  fontSize: 45,
  marginBottom: 10,
},

errorTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#cc0000",
  marginBottom: 5,
},

errorMessage: {
  fontSize: 16,
  color: "#990000",
  textAlign: "center",
},

errorDetails: {
  fontSize: 12,
  color: "#660000",
  marginTop: 8,
  textAlign: "center",
  opacity: 0.7,
},

errorHint: {
  fontSize: 14,
  marginTop: 12,
  color: "#993333",
  textAlign: "center",
},

tryAgainButton: {
  marginTop: 16,
  fontSize: 16,
  backgroundColor: "#ffcccc",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 12,
  overflow: "hidden",
  color: "#660000",
  fontWeight: "600",
},
});

export default styles;
