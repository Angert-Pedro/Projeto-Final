import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainerWeb: {
    // Estilo WEB
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  buttonsBox: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  // buttonsBox: {
  //   flexDirection: 'row', 
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
  // },

    // Estilo MOBILE
  containerMobile: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoBox: {
    alignItems: "center",
    paddingVertical: 12,
  },
  
  // Estilo LAYOUT
   container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
